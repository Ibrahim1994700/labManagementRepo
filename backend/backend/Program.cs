using Core.Services;
using DataAccessLayer.ContextFolder;
using DataAccessLayer.Entities;
using DataAccessLayer.Repos.IRepos;
using DataAccessLayer.Repos;
using Microsoft.EntityFrameworkCore;
using System;
using Core.Services.IServices;
using Core.CustomMiddleWare;
using Microsoft.AspNetCore.Builder.Extensions;
using Core.Helpers;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddDbContext<Context>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddScoped<ILabServices,  LabService>();
builder.Services.AddHostedService<KeyRotationService>();
builder.Services.AddScoped<IJwt, Jwt>();
builder.Services.AddScoped<IRefreshTokenService, RefreshTokenService>();

builder.Services.AddScoped<ICustomerCookieService, CustomerCookieService>();
builder.Services.AddHttpContextAccessor();
var jwtIssuer = builder.Configuration["Jwt:Issuer"]!;
var jwtAudience = builder.Configuration["Jwt:Audience"]!;


//builder.Services.AddDistributedMemoryCache();

//builder.Services.AddSession(options =>
//{
//    options.IdleTimeout = TimeSpan.FromMinutes(30);
//    options.Cookie.Name = "ECommerceSessionCart.Session"; //Default Name is .AspNetCore.Session
//    options.Cookie.HttpOnly = true;
//    options.Cookie.IsEssential = true;
//    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
//});



builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = true;
        options.SaveToken = true;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = jwtIssuer,
            //ValidAudience = jwtAudience,
			IssuerSigningKeyResolver = (token, securityToken, kid, parameters) =>
			{
				using var httpClient = new HttpClient();
				var jwksJson = httpClient.GetStringAsync($"{builder.Configuration["Jwt:Issuer"]}/.well-known/jwks.json").Result;
				var keys = new JsonWebKeySet(jwksJson);
				return keys.Keys;
			},



		ClockSkew = TimeSpan.Zero
        };

        //options.Events = new JwtBearerEvents
        //{
        //    OnMessageReceived = context =>
        //    {
        //        var token = context.Request.Cookies["AccessToken"];

        //        if (!string.IsNullOrEmpty(token))
        //        {
        //            context.Token = token;
        //        }

        //        return Task.CompletedTask;
        //    }
        //};
    });
builder.Services.AddDataProtection();
builder.Services.AddControllers()
    .AddXmlSerializerFormatters();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                             .AllowCredentials();


		});
});

builder.Logging.ClearProviders();
// Log output to terminal or command prompt
builder.Logging.AddConsole();
// Log output to Visual Studio Debug window
builder.Logging.AddDebug();
builder.Services.AddMemoryCache();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngular");
//app.UseSession();

app.UseAuthentication(); 

app.UseAuthorization();

//app.UseMiddleware<HMACAuthenticationMiddleware>();

app.MapControllers();

app.Run();
