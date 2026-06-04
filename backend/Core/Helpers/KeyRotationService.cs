using DataAccessLayer.ContextFolder;
using DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Core.Helpers
{
	public class KeyRotationService : BackgroundService
	{
		private readonly IServiceProvider _serviceProvider;
		private readonly TimeSpan _rotationInterval = TimeSpan.FromDays(7);
		public KeyRotationService(IServiceProvider serviceProvider)
		{
			_serviceProvider = serviceProvider;
		}
		protected override async Task ExecuteAsync(CancellationToken stoppingToken)
		{
			while (!stoppingToken.IsCancellationRequested)
			{
				await RotateKeysAsync();
				await Task.Delay(_rotationInterval, stoppingToken);
			}
		}
		private async Task RotateKeysAsync()
		{
			using var scope = _serviceProvider.CreateScope();
			var context = scope.ServiceProvider.GetRequiredService<Context>();
			var activeKey = await context.signingKeys.FirstOrDefaultAsync(k => k.IsActive);
			if (activeKey == null || activeKey.ExpiresAt <= DateTime.UtcNow.AddDays(10))
			{
				if (activeKey != null)
				{
					activeKey.IsActive = false;
					context.signingKeys.Update(activeKey);
				}
				using var rsa = RSA.Create(2048);
				var privateKey = Convert.ToBase64String(rsa.ExportRSAPrivateKey());
				var publicKey = Convert.ToBase64String(rsa.ExportRSAPublicKey());
				var newKeyId = Guid.NewGuid().ToString();
				var newKey = new SigningKey
				{
					KeyId = newKeyId,
					PrivateKey = privateKey,
					PublicKey = publicKey,
					IsActive = true,
					CreatedAt = DateTime.UtcNow,
					ExpiresAt = DateTime.UtcNow.AddYears(1) 
				};
				await context.signingKeys.AddAsync(newKey);
				await context.SaveChangesAsync();
			}
		}
	}
}
