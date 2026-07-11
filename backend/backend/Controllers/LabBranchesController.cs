using Core.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LabBranchesController : ControllerBase
    {
        private readonly ILabBranches _labBranches;
        public LabBranchesController(ILabBranches labBranches)
        {
            _labBranches = labBranches;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> getAllBranches()
        {
            return Ok(await _labBranches.GetAllBranchesAsync());
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetBrancheDetails(Guid id)
        {
            return Ok(await _labBranches.GetBrancheDetails(id));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> getPackageDetails(Guid id)
        {
            return Ok(await _labBranches.GetPackageDetails(id));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> getTestDetails(Guid id)
        {
            return Ok(await _labBranches.GetTestDetails(id));
        }

    }
}
