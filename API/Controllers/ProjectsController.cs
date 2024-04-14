using Application.Projects;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProjectsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetProfiles()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
    }
}