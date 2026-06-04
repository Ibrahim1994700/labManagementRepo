using Core.Common;
using DataAccessLayer.Entities;
using DataAccessLayer.Repos.IRepos;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
    public class LabService : ILabServices
    {
        private readonly IGenericRepository<LabServices> _genericRepo;
        private readonly IHttpContextAccessor _contextAccessor;
        public LabService(IGenericRepository<LabServices> genericRepo, IHttpContextAccessor contextAccessor)
        {
            _genericRepo= genericRepo;
        }
        public async Task<OperationResult<IEnumerable<LabServices>>> GetAllServices()
        {

            var LabServicesActive= await _genericRepo.GetAllAsync();

            return OperationResult<IEnumerable<LabServices>>.Success(LabServicesActive);
        }
    }
}
