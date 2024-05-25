namespace Domain
{
    public class Project
    {
        public Guid ProjectId { get; set; }
        public string Name { get; set; }
        public string Owner { get; set; }
        public int ActiveTicketsCount { get; set; }
        public int MembersCount { get; set; }
        public int UserTicketsCount { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
        public ICollection <AppUser> Members { get; set; } = new List<AppUser>();
    }
}