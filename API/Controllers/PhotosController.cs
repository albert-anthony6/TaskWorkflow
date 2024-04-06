using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] Guid id)
        {
            return HandleResult(await Mediator.Send(new Add.Command{ Id = id }));
        }

        // [HttpDelete("{id}")]
        // public async Task<IActionResult> Delete(string id)
        // {
        //     return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        // }

        // [HttpPost("{id}/SetAvatar")]
        // public async Task<IActionResult> SetAvatar(string id)
        // {
        //     return HandleResult(await Mediator.Send(new SetAvatar.Command{Id = id}));
        // }
    }
}