using System;
using System.Collections.Generic;
using System.Text;

namespace Core_lab_nurse.Services.IServices
{
    public interface IBookingService
    {
        Task<dynamic> addBooking(dynamic booking);
    }
}
