using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
    public class TimeOfEachLabBranch:Base
    {
        public Guid LabBranchDaysOnId { get; set; }
        public LabBranchDaysOn LabBranchDaysOn { get; set; }

        public TimeSpan FromTime { get; set; }
        public string FromTimePeriod { get; set; }

        public TimeSpan ToTime { get; set; }
        public string ToTimePeriod { get; set; }

        public int MaxPatients { get; set; }

    }
}
