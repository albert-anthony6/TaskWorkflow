using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<TicketAssignee> TicketAssignees { get; set; }
        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<TicketAssignee>((x) => x.HasKey((ta) => new { ta.AppUserId, ta.TicketId }));
        
            builder.Entity<TicketAssignee>()
                .HasOne((u) => u.AppUser)
                .WithMany((t) => t.Tickets)
                .HasForeignKey((ta) => ta.AppUserId);

            builder.Entity<TicketAssignee>()
                .HasOne((t) => t.Ticket)
                .WithMany((a) => a.Assignees)
                .HasForeignKey((ta) => ta.TicketId);
        }
    }
}