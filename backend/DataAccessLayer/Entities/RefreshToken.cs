using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
	[Index(nameof(Token), Name = "IX_Token_Unique", IsUnique = true)]
	public class RefreshToken
	{
		[Key]
		public Guid Id { get; set; }

		[Required]
		public string Token { get; set; }

		[Required]
		public Guid UserId { get; set; }

		[ForeignKey("UserId")]
		public Users User { get; set; }

		[Required]
		public Guid ClientId { get; set; }

		[ForeignKey(nameof(ClientId))]
		public Clients Client { get; set; }

		[Required]
		public DateTime ExpiresAt { get; set; }

		[Required]
		public bool IsRevoked { get; set; } = false;

		[Required]
		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		public DateTime? RevokedAt { get; set; }
	}
}
