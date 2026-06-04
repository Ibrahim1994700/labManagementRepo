using Core.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Core.CustomMiddleWare
{
    using System.Security.Cryptography;
    using System.Text;

    public class HMACAuthenticationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IMemoryCache _cache;

        private readonly IConfiguration _configuration;
        // Fake cache للتجربة
        private static readonly HashSet<string> UsedNonces
            = new();

        public HMACAuthenticationMiddleware(RequestDelegate next , IMemoryCache cache,IConfiguration configuration)
        {
            _next = next;
            _cache = cache;
            _configuration = configuration;
        }

        public async Task Invoke(HttpContext context)
        {
            context.Request.EnableBuffering();

            using var reader = new StreamReader(
                context.Request.Body,
                Encoding.UTF8,
                leaveOpen: true);

            var body = await reader.ReadToEndAsync();

            context.Request.Body.Position = 0;

            var signature =context.Request.Headers["X-Signature"].FirstOrDefault();
                
              

            var timestamp = context.Request.Headers["X-Timestamp"].FirstOrDefault();
               
              

            var nonce =context.Request.Headers["X-Nonce"].FirstOrDefault();
              
                

            // =========================
            // Validate Headers
            // =========================

            if (string.IsNullOrWhiteSpace(signature) ||
                string.IsNullOrWhiteSpace(timestamp) ||
                string.IsNullOrWhiteSpace(nonce))
            {
                context.Response.StatusCode = 401;

                await context.Response.WriteAsync(
                    "Missing security headers");

                return;
            }

            // =========================
            // Validate Timestamp
            // =========================

            if (!DateTime.TryParse(timestamp,out var requestTime))
                
            {
                context.Response.StatusCode = 401;

                await context.Response.WriteAsync(
                    "Invalid timestamp");

                return;
            }

            var timeDifference = DateTime.UtcNow - requestTime;
               

            if (timeDifference > TimeSpan.FromMinutes(5))
               
            {
                context.Response.StatusCode = 401;

                await context.Response.WriteAsync(
                    "Request expired");

                return;
            }

            // =========================
            // Replay Attack Protection
            // =========================

            if (_cache.TryGetValue(nonce, out _))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Replay attack detected");
                return;
            }

          
            _cache.Set(nonce, true, TimeSpan.FromMinutes(5));

            // =========================
            // Generate Expected Signature
            // =========================

            var rawData = body + timestamp + nonce;
               

            var expectedSignature = SecretGenerator.GenerateSignature(rawData, _configuration["SecretKey"] ?? throw new Exception("SecretKey not found"));
               
                  
               

            // =========================
            // Fixed Time Compare
            // =========================

            var providedBytes = Encoding.UTF8.GetBytes(signature);
               

            var expectedBytes = Encoding.UTF8.GetBytes(expectedSignature);
               

            var valid =  CryptographicOperations.FixedTimeEquals(providedBytes,expectedBytes);
              

            if (!valid)
            {
                context.Response.StatusCode = 401;

                await context.Response.WriteAsync(
                    "Invalid signature");

                return;
            }

            await _next(context);
        }
    }
}


