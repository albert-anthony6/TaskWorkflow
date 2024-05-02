namespace Application.Projects
{
    public class RespProjectDto
    {
        public Guid ProjectId { get; set; }
        public string Name { get; set; }
        public string Owner { get; set; }
        public int ActiveTicketsCount { get; set; }
        public int MembersCount { get; set; }
        public int CurrentUserTickets { get; set; }
    }
}