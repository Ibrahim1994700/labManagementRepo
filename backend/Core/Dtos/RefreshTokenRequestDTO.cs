using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Dtos
{
	public class RefreshTokenRequestDTO
	{
        [Required]
        public string ExpiredToken { get; set; }

		public Guid UserId { get; set; }

		public string ClientUrl { get; set; }
		public string ClientId { get; set; }

	}
}
