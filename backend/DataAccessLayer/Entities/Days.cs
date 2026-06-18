using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
    public class Days:Base
    {
        public int numberOfDay { get; set; }
        public string DayName { get; set; }


     

        public ICollection<LabBranchDaysOn> BranchDays { get; set; }


    }
}
