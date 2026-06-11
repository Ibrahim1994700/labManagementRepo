using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
    public class BranchTestCatalog:Base
    {
        public Guid BranchId { get; set; }
        public LabBranch Branch { get; set; }

        public Guid TestId { get; set; }
        public LabTest Test { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

        public bool IsAvailable { get; set; } = true;
        public bool HomeCollectionAllowed { get; set; } = true;

        public int? ResultMinHours { get; set; }
        public int? ResultMaxHours { get; set; }

        public int? DailyCapacity { get; set; }
        public DateTime? AvailableFrom { get; set; }
        public DateTime? AvailableTo { get; set; }

    }
}
