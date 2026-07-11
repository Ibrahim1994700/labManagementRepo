using System;
using System.Collections.Generic;
using System.Text;

namespace DataAcceslayer_lab_nurse.Entites
{
    public class BookingPackage:Base
    {

        public Guid BookingId { get; set; }
        public Booking Booking { get; set; }

        public Guid PackageId { get; set; }
        public string PackageName { get; set; }
    }
}
