using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string FacebookLink { get; set; }
        public string LinkedinLink { get; set; }
        public string InstagramLink { get; set; }
        public string TwitterLink { get; set; }
        public Photo Avatar { get; set; }
        public Photo CoverImage { get; set; }
        public ICollection<Project> Projects { get; set; }
        public ICollection<Ticket> AuthoredTickets { get; set; }
        public ICollection<TicketAssignee> Tickets { get; set; }
    }
}