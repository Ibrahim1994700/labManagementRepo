using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Dtos
{
    public class UserLoggedInDto
    {
        [Required(ErrorMessage = "البريد الإلكتروني مطلوب")]
        [EmailAddress(ErrorMessage = "البريد الإلكتروني غير صحيح")]
        [MaxLength(150, ErrorMessage = "البريد الإلكتروني لا يجب أن يتجاوز 150 حرف")]
        public string Email { get; set; }


        [Required(ErrorMessage = "كلمة المرور مطلوبة")]
        [DataType(DataType.Password)]
        [MinLength(8, ErrorMessage = "كلمة المرور يجب أن تكون 8 أحرف على الأقل")]
        [RegularExpression(
         @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$",
         ErrorMessage = "كلمة المرور يجب أن تحتوي على حرف كبير وحرف صغير ورقم على الأقل")]
        public string Password { get; set; }

		[Required(ErrorMessage = "ClientId is required.")]
		public Clients client { get; set; }
	}
}
