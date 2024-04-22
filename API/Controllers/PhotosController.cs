using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] Add.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id, string photoId)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id, PhotoId = photoId}));
        }

        [HttpPut("avatar")]
        public async Task<IActionResult> SetAvatar([FromForm] SetAvatar.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpPut("cover-image")]
        public async Task<IActionResult> SetCoverImage([FromForm] SetCoverImage.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
    }
}