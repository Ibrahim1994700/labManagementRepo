using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
    public class LabServices : Base
    {

        public string Name { get; set; } = null!; // اسم الخدمة، مثال: "طلب سحب منزلي"
        public string Description { get; set; } = null!; // وصف الخدمة
        public string Icon { get; set; } = null!; // أيقونة Bootstrap أو اسم الصورة

        public int DisplayOrder { get; set; }
    }
}
