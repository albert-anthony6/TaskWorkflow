using System.Security.Claims;
using API.DTOs;
using API.Services;
using Application.Photos;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<CurrentUserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                .Include((u) => u.Avatar)
                .Include((u) => u.CoverImage)
                .FirstOrDefaultAsync((x) => x.Email == loginDto.Email);

            if (user == null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
        
            if (result)
            {
                return CreateUserObject(user);
            }

            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<CurrentUserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync((x) => x.UserName == registerDto.Username))
            {
                ModelState.AddModelError("username", "Username is already taken.");
                return ValidationProblem(ModelState);
            }

            if (await _userManager.Users.AnyAsync((x) => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email is already taken.");
                return ValidationProblem(ModelState);
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest(result.Errors);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<CurrentUserDto>> GetCurrentUser()
        {
            var user = await _userManager.Users
                .Include((u) => u.Avatar)
                .Include((u) => u.CoverImage)
                .FirstOrDefaultAsync((x) => x.Email == User.FindFirstValue(ClaimTypes.Email));
        
            return CreateUserObject(user);
        }

        private CurrentUserDto CreateUserObject(AppUser user)
        {
            return new CurrentUserDto
            {
                Id = user.Id,
                DisplayName = user.DisplayName,
                Bio = user.Bio,
                Avatar = user.Avatar != null ? new PhotoDto { Id = user.Avatar.Id, Url = user.Avatar.Url } : null,
                CoverImage = user.CoverImage != null ? new PhotoDto { Id = user.CoverImage.Id, Url = user.CoverImage.Url } : null,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName,
                FacebookLink = user.FacebookLink,
                LinkedinLink = user.LinkedinLink,
                InstagramLink = user.InstagramLink,
                TwitterLink = user.TwitterLink
            };
        }
    }
}