using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Dtos
{
    public class UserRegisterDto
    {

        [Required(ErrorMessage = "الاسم الكامل مطلوب")]
        [MaxLength(150, ErrorMessage = "الاسم لا يجب أن يتجاوز 150 حرف")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "رقم الهاتف مطلوب")]
        [MaxLength(20, ErrorMessage = "رقم الهاتف لا يجب أن يتجاوز 20 رقم")]
        [RegularExpression(@"^[0-9+\-\s]{7,20}$", ErrorMessage = "رقم الهاتف غير صحيح")]
        public string PhoneNumber { get; set; }

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

        [Required(ErrorMessage = "تأكيد كلمة المرور مطلوب")]
        [DataType(DataType.Password)]
        [Compare(nameof(Password), ErrorMessage = "كلمة المرور وتأكيدها غير متطابقين")]
        public string ConfirmPassword { get; set; }

       

        public Clients client { get; set; }
    }
}
