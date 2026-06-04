using Azure;
using Core.Dtos;
using Core.Services;
using Core.Services.IServices;
using DataAccessLayer.ContextFolder;
using DataAccessLayer.Entities;
using DataAccessLayer.Repos.IRepos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService  _usersService;
       
        private readonly Context context;
        public UsersController(IUsersService usersService, Context _context
           )
        {
            _usersService = usersService;
            context = _context;  
        }


        [HttpPost]

        public async Task <IActionResult> RegisterNewUser(UserRegisterDto userRegisterDto)
        {
            return Ok(await _usersService.registerNewUser(userRegisterDto, userRegisterDto.client));
        }


        [HttpPost]


        public async Task<IActionResult> LoginUser(UserLoggedInDto  userLoggedInDto)
        {
            return Ok(await _usersService.LoginUsers(userLoggedInDto));
        }







    }
}
