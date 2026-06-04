using DataAccessLayer.ContextFolder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;

namespace backend.Controllers
{
	[Route(".well-known")]
	[ApiController]
	public class JWKSController : ControllerBase
	{
        private readonly Context _context;
        public JWKSController(Context contex)
        {
            _context=contex;

        }


		[HttpGet("jwks.json")]
		public IActionResult GetJWKS()
		{
			var keys = _context.signingKeys.Where(k => k.IsActive).ToList();



			var jwks = new
			{
				keys = keys.Select(k => new
				{
					kty = "RSA",
					use = "sig",
					kid = k.KeyId,
					alg = "RS256",
					n = Base64UrlEncoder.Encode(GetModulus(k.PublicKey)),
					e = Base64UrlEncoder.Encode(GetExponent(k.PublicKey))
				})
			};
			return Ok(jwks);
		}
		private byte[] GetModulus(string publicKey)
		{
			var rsa = RSA.Create();
			rsa.ImportRSAPublicKey(Convert.FromBase64String(publicKey), out _);
			var parameters = rsa.ExportParameters(false);
			rsa.Dispose();

			if (parameters.Modulus == null)
				throw new InvalidOperationException("RSA parameters are not valid.");

			return parameters.Modulus;
		}
		private byte[] GetExponent(string publicKey)
		{
			var rsa = RSA.Create();
			rsa.ImportRSAPublicKey(Convert.FromBase64String(publicKey), out _);
			var parameters = rsa.ExportParameters(false);
			rsa.Dispose();

			if (parameters.Exponent == null)
				throw new InvalidOperationException("RSA parameters are not valid.");

			return parameters.Exponent;
		}
	}
}
