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
                city=x.City,
                address=x.Address,
                ListOfPackages =x.ListOfPackages.Select(p=> new { id= p.ID ,name=p.NameAr}).ToList(),
                days=x.Days.ToList()
            }).ToListAsync();
               

            return result;
        }
    }
}
