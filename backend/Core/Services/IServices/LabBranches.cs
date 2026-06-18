using DataAccessLayer.ContextFolder;
using DataAccessLayer.Entities;
using DataAccessLayer.Repos.IRepos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services.IServices
{
    public class LabBranches : ILabBranches
    {
        private readonly IGenericRepository<LabBranch> _genericRepository;
        private readonly Context  _context;

        public LabBranches(IGenericRepository<LabBranch> genericRepository,Context context)
        {
            _genericRepository = genericRepository;
            _context = context;
        }
        public async Task<IEnumerable<object>> GetAllBranchesAsync()
        {
            var result = await _context.LabBranches
                .Select(b => new
                {
                    b.ID,
                    b.BranchCode,
                    b.NameAr,
                    b.NameEn,
                    b.City,
                    b.District,
                    b.Address,
                    b.Latitude,
                    b.Longitude,

                    Days = b.Days.Select(d => new
                    {
                        d.ID,
                        d.Day.DayName,

                        TimeSlots = d.TimeSlots.Select(t => new
                        {
                            t.ID,
                            t.FromTime,
                            t.ToTime
                        }).ToList()
                    }).ToList(),

                    BranchTestCatalogs=b.BranchTestCatalogs.Select(p=>new
                    {
                        AvailableTo=p.AvailableTo,
                        AvailableFrom=p.AvailableFrom,
                        DailyCapacity=p.DailyCapacity,
                        ResultMaxHours=p.ResultMaxHours,
                        ResultMinHours=p.ResultMinHours,
                        Price=p.Price,

                    }).ToList()
                })
                .ToListAsync();

            return result;
        }
    }
}
