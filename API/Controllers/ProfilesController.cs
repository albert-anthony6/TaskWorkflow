using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetProfiles()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProfile(string id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{ Id = id }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditUser([FromForm] ProfileDto profile)
        {
            return HandleResult(await Mediator.Send(new Edit.Command{ Profile = profile }));
        }
    }
}