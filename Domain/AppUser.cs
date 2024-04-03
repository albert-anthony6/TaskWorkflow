using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string Avatar { get; set; }
        public string CoverImage { get; set; }
        public ICollection<Ticket> AuthoredTickets { get; set; }
        public ICollection<TicketAssignee> Tickets { get; set; }
        // public ICollection<Photo> Photos { get; set; }
    }
}