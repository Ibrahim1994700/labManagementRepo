using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
    public class LabTestCategory :Base
    {
        // FK للتحليل
        public Guid TestId { get; set; }
        public LabTest Test { get; set; }

        // FK للتصنيف
        public Guid CategoryId { get; set; }
        public TestCatogaries Catogaries { get; set; }

    }
}
