using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Dtos
{
    public class UserResponseDto
    {
        public Guid ID { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }

        public string Usertoken { get; set; }
		public Guid userId { get; set; }

		public string ClientId { get; set; }
	}
}
