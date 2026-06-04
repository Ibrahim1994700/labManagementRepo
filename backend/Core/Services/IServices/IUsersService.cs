using Core.Common;
using Core.Dtos;
using DataAccessLayer.Entities;
using DataAccessLayer.Repos.IRepos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services.IServices
{
    public interface IUsersService 
    {
        Task<OperationResult<TokenResponseDTO>> registerNewUser(UserRegisterDto userRegisterDto,Clients clients);

        Task<OperationResult<TokenResponseDTO>> LoginUsers(UserLoggedInDto  userLoggedInDto);

    }
}
