using Core.Common;
using Core.Services;
using Core.Services.IServices;
using DataAccessLayer.ContextFolder;
using DataAccessLayer.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LabServiceController : ControllerBase
    {

        private readonly ILabServices _LabService;

        private readonly Context context;
        public LabServiceController(ILabServices LabService, Context _context)

        {
            _LabService = LabService;
            context = _context;
        }



        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllServices()
        {
            var result = await _LabService.GetAllServices();
            return Ok(result);
        }

		[Authorize]
		[HttpGet]

        public async Task<IActionResult> GetAllServices2()
        {
           // HttpContext.Session.SetString("UserName2", "Ahmad");

          //  var xx = HttpContext.Request.Headers;
            var result = await _LabService.GetAllServices();
            return Ok(result);
        }

        [HttpGet]

        public async Task<IActionResult> GetAllServices3()
        {
            var xx = HttpContext.Request.Headers;



            var result = await _LabService.GetAllServices();
            return Ok(result);
        }


    }

}