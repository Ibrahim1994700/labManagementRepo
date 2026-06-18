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
        Task<IEnumerable<object>> GetAllBranchesAsync();
        
    }
}
