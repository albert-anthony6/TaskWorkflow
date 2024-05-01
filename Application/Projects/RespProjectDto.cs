namespace Application.Projects
{
    public class RespProjectDto
    {
        public Guid ProjectId { get; set; }
        public string Name { get; set; }
        public string Owner { get; set; }
        public int ActiveTickets { get; set; }
        public int Members { get; set; }
        public int CurrentUserTickets { get; set; }
    }
}