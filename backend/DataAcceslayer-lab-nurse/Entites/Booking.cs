using System;
using System.Collections.Generic;
using System.Text;

namespace DataAcceslayer_lab_nurse.Entites
{
    public class Booking:Base
    {

        public Guid BranchId { get; set; }
        public string BranchName { get; set; }

       

        public string DayName { get; set; }
        public string MonthName { get; set; }

        public TimeSpan FromTime { get; set; }
        public string FromTimePeriod { get; set; }

        public TimeSpan ToTime { get; set; }
        public string ToTimePeriod { get; set; }

        public decimal Lat { get; set; }
        public decimal Lng { get; set; }

        public string PlaceName { get; set; }
        public string FullAddress { get; set; }

        public string PaymentMethod { get; set; }


        public List<BookingPatient> Patients { get; set; }
        public List<BookingPackage> Packages { get; set; }
        public List<BookingTest> Tests { get; set; } 
    }
}
