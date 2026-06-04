using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Helpers
{
    public class CustomerCookieService : ICustomerCookieService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IConfiguration _configuration;

        public CustomerCookieService(
            IHttpContextAccessor httpContextAccessor,
            IConfiguration configuration)
        {
            _httpContextAccessor = httpContextAccessor;
            _configuration = configuration;
        }

        public void SetToken(string Refreshtoken)
        {
            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null)
            {
                throw new InvalidOperationException("HttpContext is not available.");
            }

            var expireMinutes = int.Parse(_configuration["Jwt:ExpireMinutes"]!);

            httpContext.Response.Cookies.Append("RefreshToken", Refreshtoken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddMinutes(expireMinutes),
                Path = "/"
            });
        }

        public void DeleteToken()
        {
            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext == null)
            {
                throw new InvalidOperationException("HttpContext is not available.");
            }

            httpContext.Response.Cookies.Delete("AccessToken");
        }

        public bool HasToken()
        {
            var httpContext = _httpContextAccessor.HttpContext;

            return httpContext?.Request.Cookies.ContainsKey("AccessToken") == true;
        }

        public string? GetToken()
        {
            var httpContext = _httpContextAccessor.HttpContext;

            return httpContext?.Request.Cookies["AccessToken"];
        }

    }



}

