using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
    public class SampleType :Base
    {
        public string code { get; set; }
        public string name_ar { get; set; }

        public string name_en { get; set; }
        public string description_ar { get; set; }
        public string description_en { get; set; }


    }
}
