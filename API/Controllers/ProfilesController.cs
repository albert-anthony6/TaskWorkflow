using Application.Core;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("users")]
        public async Task<IActionResult> GetProfiles([FromQuery]PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("users/{id}")]
        public async Task<IActionResult> GetProfile(string id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{ Id = id }));
        }

        [HttpPut("user")]
        public async Task<IActionResult> EditProfile(ReqProfileDto profile)
        {
            return HandleResult(await Mediator.Send(new Edit.Command{ ReqProfileDto = profile }));
        }
    }
}