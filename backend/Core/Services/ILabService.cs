using Core.Common;
using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
    public interface ILabServices
    {
        Task< OperationResult<IEnumerable< LabServices>>> GetAllServices();
    }
}
