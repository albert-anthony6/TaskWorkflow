using Application.Photos;

namespace Application.Tickets
{
    public class AssigneeDto
    {
        public string AppUserId { get; set; }
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public PhotoDto Avatar { get; set; }
    }
}