using Application.Photos;

namespace Application.Profiles
{
    public class UserDto
    {
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public PhotoDto Avatar { get; set; }
    }
}