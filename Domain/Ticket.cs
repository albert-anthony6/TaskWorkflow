namespace Domain
{
    public class Ticket
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Severity { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public AppUser Author { get; set; }
        public Guid ProjectId { get; set; }
        public Project Project { get; set; }
        public ICollection<Photo> Attachments { get; set; } = new List<Photo>();
        public ICollection<TicketAssignee> Assignees { get; set; } = new List<TicketAssignee>();
    }
}