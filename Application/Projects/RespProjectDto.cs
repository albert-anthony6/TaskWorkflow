using Application.Profiles;
using Application.Tickets;

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
        public ICollection<RespTicketDto> Tickets { get; set; }
        public ICollection <RespProfileDto> Members { get; set; }
    }
}