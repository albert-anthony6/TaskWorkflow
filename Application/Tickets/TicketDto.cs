using Application.Profiles;

namespace Application.Tickets
{
    public class TicketDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Severity { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public string AuthorUsername { get; set; }
        public ICollection<AssigneeDto> Assignees { get; set; }
    }
}