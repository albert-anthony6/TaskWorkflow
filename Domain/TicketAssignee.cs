namespace Domain
{
    public class TicketAssignee
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid TicketId { get; set; }
        public Ticket Ticket { get; set; }
    }
}