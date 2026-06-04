using Core.Dtos;
using DataAccessLayer.ContextFolder;
using DataAccessLayer.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Core.Helpers
{
    public class Jwt :IJwt
    {

        private readonly IConfiguration _configuration;
		private readonly Context  _context;

		public Jwt(IConfiguration configuration,Context context)
        {
            _configuration = configuration;
            _context = context;
        }

        public string GenerateToken(UserResponseDto user, Clients client)
        {

			//var client = _context.Clients.FirstOrDefault(c => c.ClientId == clientId);
			//if (client == null)
			//	throw new Exception("Invalid client credentials.");

			var signingKey = _context.signingKeys.FirstOrDefault(x=>x.IsActive==true);
			if (signingKey == null) throw new Exception("No active signing key available.");


			var privateKeyBytes = Convert.FromBase64String(signingKey.PrivateKey);
			var rsa = RSA.Create();
			rsa.ImportRSAPrivateKey(privateKeyBytes, out _);
			var rsaSecurityKey = new RsaSecurityKey(rsa) { KeyId = signingKey.KeyId };

		

            var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.ToString()),
            new Claim(ClaimTypes.Name, user.FullName),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim("phoneNumber", user.PhoneNumber),
			new Claim("clientId",client.Id.ToString()),
			new Claim("clientUrl",client.ClientURL),
			new Claim("userId",user.userId.ToString()),



		};


            var credentials = new SigningCredentials(
				rsaSecurityKey,
                SecurityAlgorithms.RsaSha256
			);

			var tokenDescriptor = new JwtSecurityToken(
	             issuer: _configuration["Jwt:Issuer"],
	             audience: client.ClientURL,
	             claims: claims,
	             expires: DateTime.UtcNow.AddMinutes(1),
	             signingCredentials: credentials
 );

			return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
    }
}

