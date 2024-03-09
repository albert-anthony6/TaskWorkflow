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
                    Description = "Test description",
                    Severity = "To Do",
                    StartDate = DateTime.UtcNow,
                    EndDate = DateTime.UtcNow.AddDays(5)
                },
                new Ticket
                {
                    Title = "Add README.md file",
                    Description = "Test description",
                    Severity = "To Do",
                    StartDate = DateTime.UtcNow,
                    EndDate = DateTime.UtcNow.AddDays(5)
                },
                new Ticket
                {
                    Title = "Add more images to the About Us page",
                    Description = "Test description",
                    Severity = "To Do",
                    StartDate = DateTime.UtcNow,
                    EndDate = DateTime.UtcNow.AddDays(5)
                },
                new Ticket
                {
                    Title = "Fix typo on Careers page",
                    Description = "Test description",
                    Severity = "In Progress",
                    StartDate = DateTime.UtcNow,
                    EndDate = DateTime.UtcNow.AddDays(5)
                },
                new Ticket
                {
                    Title = "Add download PDF button",
                    Description = "Test description",
                    Severity = "In Progress",
                    StartDate = DateTime.UtcNow,
                    EndDate = DateTime.UtcNow.AddDays(5)
                },
                new Ticket
                {
                    Title = "Update hero section",
                    Description = "Test description",
                    Severity = "Ready for Review",
                    StartDate = DateTime.UtcNow,
                    EndDate = DateTime.UtcNow.AddDays(5)
                },
                new Ticket
                {
                    Title = "Filter overlay bug",
                    Description = "Test description",
                    Severity = "Done",
                    StartDate = DateTime.UtcNow,
                    EndDate = DateTime.UtcNow.AddDays(5)
                },
            };

            await context.Tickets.AddRangeAsync(tickets);
            await context.SaveChangesAsync();
        }
    }
}