using Domain;

namespace Application.Tickets
{
    public class AuthorDto
    {
        public string AuthorId { get; set; }
        public string AuthorDisplayName { get; set; }
        public string AuthorUserName { get; set; }
        public Photo AuthorAvatar { get; set; }
    }
}