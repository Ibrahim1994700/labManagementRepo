using System;
using System.Collections.Generic;
using System.Text;

namespace DataAcceslayer_lab_nurse.Entites
{
    public class BookingTest :Base
    {

        public Guid BookingId { get; set; }
        public Booking Booking { get; set; }

        public Guid TestId { get; set; }
        public string TestName { get; set; }
    }
}
