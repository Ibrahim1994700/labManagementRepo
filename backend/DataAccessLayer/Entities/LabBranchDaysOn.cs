using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
    public class LabBranchDaysOn:Base
    {
        public Guid labBranchId { get; set; }

        public Branches  LabBranch { get; set; }
        public Guid DayId { get; set; }
        public Days Day { get; set; }
        public ICollection<TimeOfEachLabBranch> TimeSlots { get; set; }

    }
}
