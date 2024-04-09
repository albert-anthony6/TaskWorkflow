using Application.Photos;

namespace Application.Profiles
{
    public class ProfileDto
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public PhotoDto Avatar { get; set; }
    }
}