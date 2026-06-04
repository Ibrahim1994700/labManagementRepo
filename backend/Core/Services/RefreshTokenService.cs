using Core.Dtos;
using Core.Helpers;
using Core.Services.IServices;
using DataAccessLayer.ContextFolder;
using DataAccessLayer.Entities;
using DataAccessLayer.Repos.IRepos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
	public class RefreshTokenService : IRefreshTokenService
	{

		private readonly IDataProtector _protector;
		private readonly Context _context;
		private readonly IGenericRepository<Users> _genericRepo;
		private readonly IJwt _iJWT;
		private readonly ICustomerCookieService _customerCookieService;
		private readonly IHttpContextAccessor _httpContextAccessor;
		public RefreshTokenService(IGenericRepository<Users> genericRepository, IJwt jwt, ICustomerCookieService customerCookieService, IDataProtectionProvider dataProtectionProvider, Context context,IHttpContextAccessor httpContextAccessor)
		{
			_genericRepo = genericRepository;
			_iJWT = jwt;
			_customerCookieService = customerCookieService;
			_protector = dataProtectionProvider.CreateProtector("Token");
			_context = context;
			_httpContextAccessor = httpContextAccessor;


		}
		public async Task<TokenResponseDTO> RefreshToken(RefreshTokenRequestDTO requestDto)
		{
			if (requestDto == null)
				throw new Exception("Invalid request.");
			if (requestDto.UserId.ToString() == null)
				throw new Exception("Invalid request.");

			if (!Guid.TryParse(requestDto.ClientId, out var clientGuid))
				throw new Exception("Invalid ClientId. ");



			var storedRefreshToken = await _context.refreshTokens
				.Include(rt => rt.User)
					.ThenInclude(u => u.UserRoles)
						.ThenInclude(ur => ur.Role)
				.Include(rt => rt.Client)
				.FirstOrDefaultAsync(rt =>
					rt.UserId == requestDto.UserId &&
					rt.ClientId == clientGuid && rt.IsRevoked == false);



			if (storedRefreshToken == null)
				throw new Exception("Invalid refresh token.");

			if (storedRefreshToken.IsRevoked)
				throw new Exception("Refresh token has been revoked.");

			if (storedRefreshToken.ExpiresAt <= DateTime.UtcNow)
				throw new Exception("Refresh token has expired.");

			//var hashedToken = TokenHelper.HashToken(storedRefreshToken.Token);

			var user = storedRefreshToken.User;
			var client = storedRefreshToken.Client;

			storedRefreshToken.IsRevoked = true;
			storedRefreshToken.RevokedAt = DateTime.UtcNow;

			var newRefreshToken = TokenHelper.GenerateRefreshToken();
			var hashedNewRefreshToken = TokenHelper.HashToken(newRefreshToken);


		

			var newRefreshTokenEntity = new RefreshToken
			{
				Token = hashedNewRefreshToken,
				UserId = user.ID,
				ClientId = client.Id,
				ExpiresAt = DateTime.UtcNow.AddMinutes(3),
				CreatedAt = DateTime.UtcNow,
				IsRevoked = false
			};

			_context.refreshTokens.Add(newRefreshTokenEntity);

			var userDto = new UserResponseDto
			{
				ID = user.ID,
				PhoneNumber = user.PhoneNumber,
				Email = user.UserName,
				FullName = user.FullName,
				userId= user.ID,
			};

			var newJwtToken = _iJWT.GenerateToken(userDto, client);

			await _context.SaveChangesAsync();
			

			return new TokenResponseDTO
			{
				Token = newJwtToken,
				RefreshToken = newRefreshToken
			};
		}
	}
}
