using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public Photo Avatar { get; set; }
        public Photo CoverImage { get; set; }
        public ICollection<Ticket> AuthoredTickets { get; set; }
        public ICollection<TicketAssignee> Tickets { get; set; }
    }
}