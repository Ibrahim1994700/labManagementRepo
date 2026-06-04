using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
	public class Clients
	{
		[Key]
		public Guid Id { get; set; }
		// Unique identifier for the client application.
		[Required]
		[MaxLength(100)]
		public string ClientId { get; set; }
		// Name of the client application.
		[Required]
		[MaxLength(100)]
		public string Name { get; set; }
		// URL for the client application.
		[Required]
		[MaxLength(200)]
		public string ClientURL { get; set; }
	}
}
