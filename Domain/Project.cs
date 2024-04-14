namespace Domain
{
    public class Project
    {
        public Guid ProjectId { get; set; }
        public string Name { get; set; }
        public string Owner { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
    }
}