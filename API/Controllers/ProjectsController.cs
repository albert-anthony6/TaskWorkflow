using Application.Projects;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProjectsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetProfiles(Boolean filterUserTickets)
        {
            return HandleResult(await Mediator.Send(new List.Query{ FilterUserTickets = filterUserTickets}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject(ReqProjectDto project)
        {
            return HandleResult(await Mediator.Send(new Create.Command{ Project = project }));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectTickets(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{ Id = id }));
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateProject(Guid id, [FromForm] List<string> appUserIds)
        {
            return HandleResult(await Mediator.Send(new Update.Command { Id = id, AppUserIds = appUserIds }));
        }
    }
}