using Application.Photos;

namespace Application.Tickets
{
    public class RespTicketDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Severity { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public AuthorDto Author { get; set; }
        public ICollection<PhotoDto> Attachments { get; set; }
        public ICollection<AssigneeDto> Assignees { get; set; }
    }
}