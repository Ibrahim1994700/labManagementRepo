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
                isActive=x.IsActive
              
                
            }).ToListAsync();
               

            return result;
        }

        public async Task<object> GetBrancheDetails(Guid branchId)
        {
            var res = await _context.labBranches
                .Where(x => x.ID == branchId)
                .Select(x => new
                {
                    id = x.ID,
                    nameAr = x.NameAr,
                    nameEn = x.NameEn,

                    packages = x.ListOfPackages.Select(p => new
                    {
                        p.ID,
                        p.NameAr,
                        p.NameEn,
                        price = p.price

                    }).ToList(),

                    tests = x.Tests.Select(t => new
                    {
                        t.ID,
                        t.NameAr,
                        t.TestCode,
                        t.price
                    }).ToList(),

                    days = x.Days.Select(d => new
                    {
                        dayName = d.Day.DayName,
                        numberOdDay=d.Day.numberOfDay,
                        times = d.TimeSlots.Select(t => new
                        {
                            t.FromTime,
                            t.ToTime,
                            t.FromTimePeriod,
                            t.ToTimePeriod,
                            t.MaxPatients
                        }).ToList()
                    }).OrderBy(x=>x.numberOdDay).ToList()

                })
                .FirstOrDefaultAsync();

            return res;
        }

        public async Task<object> GetPackageDetails(Guid id)
        {
            var res= await _context.Packages.Where(x=>x.ID==id).Select(x=> new
            {
                lisOfTest=x.ListOfTests.ToList()
            }).FirstOrDefaultAsync();

            return res;
        }

        public async Task<object> GetTestDetails(Guid id)
        {
            var res = await _context.ListOfTests.Where(x => x.ID == id).Select(x=> new
            {
                prepation=x.PreparationRules.ToList()
            }).FirstOrDefaultAsync();

            return res;
        }
    }



    
}
