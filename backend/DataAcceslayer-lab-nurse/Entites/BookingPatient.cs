using System;
using System.Collections.Generic;
using System.Text;

namespace DataAcceslayer_lab_nurse.Entites
{
    public class BookingPatient:Base
    {

        public Guid BookingId { get; set; }
        public Booking Booking { get; set; }

        public string Name { get; set; }
        public int Age { get; set; }
    }
}
