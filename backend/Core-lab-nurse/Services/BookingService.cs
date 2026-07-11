using Core_lab_nurse.Services.IServices;
using DataAcceslayer_lab_nurse.Entites;
using DataAcceslayer_lab_nurse.Repo.IRepo;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core_lab_nurse.Services
{
    public class BookingService 
    {
        private readonly IGenericRepository<Booking> _bookingRepo;
        public BookingService(IGenericRepository<Booking> bookingRepo)
        {
            _bookingRepo=bookingRepo;
        }
        //public async Task<dynamic> addBooking(dynamic booking)
        //{
           
        //}
    }
}
