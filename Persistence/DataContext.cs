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

        public DbSet<Project> Projects { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<TicketAssignee> TicketAssignees { get; set; }
        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Project>()
                .HasMany((p) => p.Tickets)
                .WithOne((t) => t.Project)
                .HasForeignKey((t) => t.ProjectId)
                .IsRequired();

            builder.Entity<TicketAssignee>((x) => x.HasKey((ta) => new { ta.AppUserId, ta.TicketId }));
        
            builder.Entity<TicketAssignee>()
                .HasOne((u) => u.AppUser)
                .WithMany((t) => t.Tickets)
                .HasForeignKey((ta) => ta.AppUserId);

            builder.Entity<TicketAssignee>()
                .HasOne((t) => t.Ticket)
                .WithMany((a) => a.Assignees)
                .HasForeignKey((ta) => ta.TicketId);

            builder.Entity<AppUser>()
                .HasOne((u) => u.Avatar)
                .WithOne((p) => p.AvatarUser)
                .HasForeignKey<Photo>((p) => p.AvatarId);

            builder.Entity<AppUser>()
                .HasOne((u) => u.CoverImage)
                .WithOne((p) => p.CoverImageUser)
                .HasForeignKey<Photo>((p) => p.CoverImageId);
        }
    }
}