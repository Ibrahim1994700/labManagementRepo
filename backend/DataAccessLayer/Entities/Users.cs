using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
    public class Users : Base
    {
        public string FullName { get; set; }

        public string PhoneNumber { get; set; }
        public string NormalizedPhoneNumber { get; set; }

        public string UserName { get; set; }
        public string NormalizedUserName { get; set; }

        public byte[] PasswordHash { get; set; }
        public byte[] PassworSalt { get; set; }
        public int PasswordIterations { get; set; }
        public bool IsEmailConfirmed { get; set; }
        public bool IsPhoneConfirmed { get; set; }

        public int FailedLoginAttempts { get; set; }

        public DateTime? LockoutEndAt { get; set; }

        public DateTime? LastLoginAt { get; set; }
        public bool IsLoggedIn { get; set; }


        public ICollection<UserRole> UserRoles { get; set; }

		public ICollection<RefreshToken> RefreshTokens { get; set; }


	}
}
