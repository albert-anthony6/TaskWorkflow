using Application.Photos;

namespace API.DTOs
{
    public class CurrentUserDto
    {
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string Token { get; set; }
        public PhotoDto Avatar { get; set; }
        public PhotoDto CoverImage { get; set; }
        public string Username { get; set; }
        public string FacebookLink { get; set; }
        public string LinkedinLink { get; set; }
        public string InstagramLink { get; set; }
        public string TwitterLink { get; set; }
    }
}