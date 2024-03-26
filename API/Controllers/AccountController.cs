using System.Security.Claims;
using API.DTOs;
using API.Services;
using AutoMapper;
// using AutoMapper.QueryableExtensions;
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
        // private readonly IMapper _mapper;
        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            // _mapper = mapper;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.Include((p) => p.Photos)
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
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
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
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.Users.Include((p) => p.Photos)
                .FirstOrDefaultAsync((x) => x.Email == User.FindFirstValue(ClaimTypes.Email));
        
            return CreateUserObject(user);
        }

        // [AllowAnonymous]
        // [HttpGet("users")]
        // public async Task<ActionResult<List<UsersDto>>> GetAllUsers()
        // {
        //     // var tickets = await _context.Tickets
        //     //         .ProjectTo<TicketDto>(_mapper.ConfigurationProvider)
        //     //         .ToListAsync();

        //     var users = await _userManager.Users
        //     .ProjectTo<UsersDto>(_mapper.ConfigurationProvider)
        //     .ToListAsync();
        //     // var usersDtos = new List<UsersDto>();

        //     // foreach (var user in users)
        //     // {
        //     //     var usersDto = new UsersDto
        //     //     {
        //     //         DisplayName = user.DisplayName,
        //     //         Image = null,
        //     //         Username = user.UserName
        //     //     };
        //     //     usersDtos.Add(usersDto);
        //     // }
        
        //     return users;
        // }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = user?.Photos?.FirstOrDefault((x) => x.IsMain)?.Url,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName
            };
        }
    }
}