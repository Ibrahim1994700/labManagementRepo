using Azure;
using Core.Common;
using Core.Dtos;
using Core.Helpers;
using Core.Services.IServices;
using DataAccessLayer.ContextFolder;
using DataAccessLayer.Entities;
using DataAccessLayer.Repos.IRepos;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
namespace Core.Services
{
    public class UsersService : IUsersService
    {
        private readonly IDataProtector _protector;
        private readonly Context _context;
        private readonly IGenericRepository<Users>  _genericRepo;
        private readonly IJwt _iJWT;
        private readonly ICustomerCookieService _customerCookieService;
        private readonly IHttpContextAccessor _contextAccessor;
        public UsersService(IGenericRepository<Users> genericRepository, IJwt jwt, ICustomerCookieService customerCookieService, IDataProtectionProvider dataProtectionProvider, Context context,IHttpContextAccessor httpContextAccessor)
        {
            _genericRepo = genericRepository;
            _iJWT = jwt;
            _customerCookieService = customerCookieService;
            _protector = dataProtectionProvider.CreateProtector("Token");
            _context = context;
            _contextAccessor = httpContextAccessor;


        }

        public async Task<OperationResult<TokenResponseDTO>> registerNewUser(UserRegisterDto model, Clients clients)
        {

            var errors = new List<string>();

            var fullName = NormalizeName(model.FullName);
            var email = model.Email.Trim();
            var normalizedEmail = NormalizeEmail(model.Email);
            var phoneNumber = NormalizePhone(model.PhoneNumber);

            if (await IsEmailUsedAsync(normalizedEmail))
            {
                errors.Add("هذا البريد الإلكتروني مستخدم مسبقًا");
            }

            if (await IsPhoneUsedAsync(phoneNumber))
            {
                errors.Add("رقم الهاتف مستخدم مسبقًا");
            }


            if (errors.Any())
            {
                return OperationResult<TokenResponseDTO>.Failure(errors);
            }


            if (model is not null)
            {
                try
                {
                    HashPassword.CreatePasswordHash(model.Password, out byte[] passWordHash, out byte[] passWordSalt);

                    Users users = new Users();

                    users.FullName = fullName;
                    users.UserName = email;
                    users.NormalizedUserName = normalizedEmail;
                    users.PhoneNumber = phoneNumber;
                    users.NormalizedPhoneNumber = phoneNumber;
                    users.PasswordHash = passWordHash;
                    users.PassworSalt = passWordSalt;
                    users.PasswordIterations = 210_000;
                    users.IsPhoneConfirmed = false;
                    users.IsEmailConfirmed = false;
                    users.FailedLoginAttempts = 0;
                    users.LockoutEndAt = null;
                    users.LastLoginAt = null;
                    users.IsActive = true;
                    users.IsDeleted = false;
                    users.IsLoggedIn = true;
                    await _genericRepo.BeginTransactionAsync();

                    await _genericRepo.AddAsync(users);

                    await _genericRepo.SaveChangesAsync();

                    var RegistedUser = await _genericRepo.GetByExpression(x => x.UserName == model.Email);
                    if (HashPassword.VerifyPasswordHash(model.Password, RegistedUser.PasswordHash, RegistedUser.PassworSalt) && RegistedUser is not null)
                    {
                        UserResponseDto userRegisterResponseDto = new UserResponseDto();
                        userRegisterResponseDto.ID = RegistedUser.ID;
                        userRegisterResponseDto.PhoneNumber = RegistedUser.PhoneNumber;
                        userRegisterResponseDto.Email = RegistedUser.UserName;
                        userRegisterResponseDto.FullName = RegistedUser.FullName;

                        var Token = _iJWT.GenerateToken(userRegisterResponseDto,clients);
						var refreshToken = TokenHelper. GenerateRefreshToken();
						var hashedRefreshToken = TokenHelper.HashToken(refreshToken);


						var refreshTokenEntity = new RefreshToken
						{
							Token = hashedRefreshToken,
							UserId = RegistedUser.ID,
							ClientId = clients.Id,
							ExpiresAt = DateTime.UtcNow.AddDays(7),
							CreatedAt = DateTime.UtcNow,
							IsRevoked = false
						};

						_context.refreshTokens.Add(refreshTokenEntity);
						await _genericRepo.SaveChangesAsync();

                        TokenResponseDTO tokenResponseDTO = new();
                        tokenResponseDTO.Token = Token;
                        tokenResponseDTO.RefreshToken = refreshToken;
						userRegisterResponseDto.Usertoken = Token;
                        _customerCookieService.SetToken(_protector.Protect(Token));
                        await _genericRepo.CommitAsync();

                        return OperationResult<TokenResponseDTO>.Success(tokenResponseDTO);
                    }
                    else
                    {
                        await _genericRepo.RollbackAsync();
                        return OperationResult<TokenResponseDTO>.Failure("An Error When Register User");
                    }

                }
                catch (Exception ex)
                {
                    errors.Add(ex.InnerException?.Message ?? ex.Message);
                    _customerCookieService.DeleteToken();
                    await _genericRepo.RollbackAsync();
                    return OperationResult<TokenResponseDTO>.Failure(errors);
                }
            }
            else
            {
                throw new Exception("User object is null");
            }
        }


        public async Task<OperationResult<TokenResponseDTO>> LoginUsers(UserLoggedInDto userLoggedInDto)
        {
            if(userLoggedInDto is not null)
            {
                try
                {
                    bool isExist = await _genericRepo.CheckIfExist(x => x.UserName == userLoggedInDto.Email);
                    if (isExist)
                    {
                        Users? users = await _genericRepo.GetByExpression(x => x.UserName == userLoggedInDto.Email);



                        if(HashPassword.VerifyPasswordHash(userLoggedInDto.Password, users.PasswordHash, users.PassworSalt))
                        {
                            if (!users.IsLoggedIn)
                            {
                                UserResponseDto userResponse = new();
                                userResponse.ID = users.ID;
                                userResponse.FullName = users.FullName;
                                userResponse.Email = users.UserName;
                                userResponse.PhoneNumber=users.PhoneNumber;
                                userResponse.ClientId= userLoggedInDto.client.ClientId;
                                userResponse.userId = users.ID;

								userResponse.Usertoken = _iJWT.GenerateToken(userResponse, userLoggedInDto.client); // generate token

								var refreshToken = TokenHelper.GenerateRefreshToken(); // generate refresh token

								var hashedRefreshToken = TokenHelper.HashToken(refreshToken);  // hash token
								var refreshTokenEntity = new RefreshToken
								{
									Token = hashedRefreshToken,
									UserId = users.ID,
									ClientId = userLoggedInDto.client.Id,
									ExpiresAt = DateTime.UtcNow.AddMinutes(3),
									CreatedAt = DateTime.UtcNow,
									IsRevoked = false
								};
								_context.refreshTokens.Add(refreshTokenEntity);
								await _context.SaveChangesAsync();
                                users.IsLoggedIn = true;
                                
                                _genericRepo.Update(users);
                               await _genericRepo.SaveChangesAsync();
                                var res = new TokenResponseDTO
                                {
                                    Token = userResponse.Usertoken,
                                    RefreshToken = refreshToken
                                };

								//_customerCookieService.SetToken(_protector.Protect(userResponse.Usertoken));


								return OperationResult<TokenResponseDTO>.Success(res);
                            }
                            else
                            {
                                throw new Exception("user is Already Logged in");
                            }
                          
                        }
                        else
                        {
                            throw new Exception("incorrect username or password");
                        }
                    }
                    else
                    {
                        throw new Exception("incorrect username or password");
                    }
                }
                catch
                {
                    throw;
                }
              
            }
            else
            {
                throw new Exception("please enter username And Password");
            }
        }

        private async Task<bool> IsPhoneUsedAsync(string normalizedPhoneNumber)
        {
            return await _genericRepo.CheckIfExist(x => x.NormalizedPhoneNumber == normalizedPhoneNumber); ;
        }

        private static string NormalizeEmail(string email)
        {
            return email.Trim().ToUpperInvariant();
        }

        private static string NormalizeName(string name)
        {
            return string.Join(
                " ",
                name.Trim()
                    .Split(' ', StringSplitOptions.RemoveEmptyEntries));
        }

        private static string NormalizePhone(string phone)
        {
            return phone
                .Trim()
                .Replace(" ", "")
                .Replace("-", "");
        }

        private async Task<bool> IsEmailUsedAsync(string normalizedEmail)
        {
            return await _genericRepo.CheckIfExist(x => x.NormalizedUserName == normalizedEmail);

        }



		

	}


}

