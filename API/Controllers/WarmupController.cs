using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class WarmupController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;

        public WarmupController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> Warmup()
        {
            var result = await _userManager.Users.FirstOrDefaultAsync();
            return Ok(result != null ? "Warmup successful" : "No users found");
        }
    }
}