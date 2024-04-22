using Application.Photos;

namespace API.DTOs
{
    public class UserDto
    {
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public PhotoDto Avatar { get; set; }
        public PhotoDto CoverImage { get; set; }
        public string Username { get; set; }
    }
}