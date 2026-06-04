using Core.Dtos;
using Core.Services.IServices;
using DataAccessLayer.Entities;
using DataAccessLayer.Repos.IRepos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace backend.Controllers
{
	[Route("api/[controller]/[action]")]
	[ApiController]
	public class AuthController : ControllerBase
	{

		
		private readonly IGenericRepository<RefreshToken> _refreshTokenRepo;
		private readonly IRefreshTokenService refreshTokenService;
		private readonly IGenericRepository<Users> _userRepo;

		public AuthController( IGenericRepository<RefreshToken> refreshTokenRepo, IRefreshTokenService refreshTokenService, IGenericRepository<Users> userRepo)
		{
			
			this._refreshTokenRepo = refreshTokenRepo;
			this.refreshTokenService = refreshTokenService;
			this._userRepo = userRepo;
		}


		[HttpPost]
		public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequestDTO requestDto)
		{

			if (requestDto == null || requestDto.UserId.ToString() == null)
				return BadRequest("Invalid request.");
			if (requestDto.ExpiredToken == null )
				return BadRequest("Invalid request.");


			if (string.IsNullOrWhiteSpace(requestDto.ClientId))
				return BadRequest("ClientId is required.");

			

			try
			{
				
				var tokenResponse = await refreshTokenService.RefreshToken(requestDto);

				return Ok(tokenResponse);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}