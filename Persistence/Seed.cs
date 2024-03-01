using Domain;

namespace Persistence
{
    public class Seed()
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Tickets.Any()) return;

            var tickets = new List<Ticket>
            {
                new Ticket
                {
                    Title = "Add carousel to home page",
                    Date = DateTime.UtcNow,
                    Description = "Test description",
                    Status = "To Do",
                    DueDate = DateTime.UtcNow.AddDays(5)
                },
                new Ticket
                {
                    Title = "Add README.md file",
                    Date = DateTime.UtcNow,
                    Description = "Test description",
                    Status = "To Do",
                    DueDate = DateTime.UtcNow.AddDays(5)
                },
                new Ticket
                {
                    Title = "Add more images to the About Us page",
                    Date = DateTime.UtcNow,
                    Description = "Test description",
                    Status = "To Do",
                    DueDate = DateTime.UtcNow.AddDays(5)
                },
                new Ticket
                {
                    Title = "Fix typo on Careers page",
                    Date = DateTime.UtcNow,
                    Description = "Test description",
                    Status = "In Progress",
                    DueDate = DateTime.UtcNow.AddDays(5)
                },
                new Ticket
                {
                    Title = "Add download PDF button",
                    Date = DateTime.UtcNow,
                    Description = "Test description",
                    Status = "In Progress",
                    DueDate = DateTime.UtcNow.AddDays(5)
                },
                new Ticket
                {
                    Title = "Update hero section",
                    Date = DateTime.UtcNow,
                    Description = "Test description",
                    Status = "Ready for Review",
                    DueDate = DateTime.UtcNow.AddDays(5)
                },
                new Ticket
                {
                    Title = "Filter overlay bug",
                    Date = DateTime.UtcNow,
                    Description = "Test description",
                    Status = "Done",
                    DueDate = DateTime.UtcNow.AddDays(5)
                },
            };

            await context.Tickets.AddRangeAsync(tickets);
            await context.SaveChangesAsync();
        }
    }
}