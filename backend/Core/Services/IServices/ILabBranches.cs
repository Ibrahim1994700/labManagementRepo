using DataAccessLayer.Entities;
using DataAccessLayer.Repos.IRepos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services.IServices
{
    public interface ILabBranches
    {
        Task<object> GetAllBranchesAsync();
        Task<object> GetBrancheDetails(Guid id);
        Task<object> GetPackageDetails(Guid id);
        Task<object> GetTestDetails(Guid id);


    }
}
