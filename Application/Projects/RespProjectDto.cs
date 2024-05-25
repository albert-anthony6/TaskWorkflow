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
        public int UserTicketsCount { get; set; }
        public ICollection<MinRespTicketDto> Tickets { get; set; }
        public ICollection <RespProfileDto> Members { get; set; }
    }
}