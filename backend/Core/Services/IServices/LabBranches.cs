using DataAccessLayer.ContextFolder;
using DataAccessLayer.Entities;
using DataAccessLayer.Repos.IRepos;
using Microsoft.AspNetCore.Mvc.Formatters.Internal;
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
        private readonly IGenericRepository<Branches> _genericRepository;
        private readonly Context  _context;

        public LabBranches(IGenericRepository<Branches> genericRepository,Context context)
        {
            _genericRepository = genericRepository;
            _context = context;
        }
        public async Task<object> GetAllBranchesAsync()
        {
            var result = await _context.labBranches.Select(x=>  new
            {
                id=x.ID,
                nameAr=x.NameAr,
                nameEn = x.NameEn,

                city = x.City,
                address=x.Address,
                days=x.Days.Select(d=> new
                {
                    dayName=d.Day.DayName,
                    ListOfTimes=d.TimeSlots.ToList()
                }).ToList(),
                
            }).ToListAsync();
               

            return result;
        }

        public async Task<object> GetBrancheDetails(Guid Branchid)
        {
            var res = await _context.labBranches.Select(x => new
            {
                id=x.ID,
                packages = x.ListOfPackages.ToList()
            }).FirstOrDefaultAsync(x=>x.id==Branchid);


            return res;
        }



    }
}
