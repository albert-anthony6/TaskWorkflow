using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Tickets.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var tickets = new List<Ticket>
                {
                    new Ticket
                    {
                        Title = "Past Ticket 1",
                        Description = "Ticket 2 months ago",
                        Severity = "Low",
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(5),
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee
                            {
                                AppUser = users[0],
                                IsAuthor = true
                            }
                        }
                    },
                    new Ticket
                    {
                        Title = "Past Ticket 2",
                        Description = "Ticket 1 month ago",
                        Severity = "Low",
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(5),
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee
                            {
                                AppUser = users[0],
                                IsAuthor = true
                            },
                            new TicketAssignee
                            {
                                AppUser = users[1],
                                IsAuthor = false
                            },
                        }
                    },
                    new Ticket
                    {
                        Title = "Future Ticket 1",
                        Description = "Ticket 1 month in future",
                        Severity = "Low",
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(5),
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee
                            {
                                AppUser = users[2],
                                IsAuthor = true
                            },
                            new TicketAssignee
                            {
                                AppUser = users[1],
                                IsAuthor = false
                            },
                        }
                    },
                    new Ticket
                    {
                        Title = "Future Ticket 2",
                        Description = "Ticket 2 months in future",
                        Severity = "Low",
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(5),
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee
                            {
                                AppUser = users[0],
                                IsAuthor = true
                            },
                            new TicketAssignee
                            {
                                AppUser = users[2],
                                IsAuthor = false
                            },
                        }
                    },
                    new Ticket
                    {
                        Title = "Future Ticket 3",
                        Description = "Ticket 3 months in future",
                        Severity = "Low",
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(5),
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee
                            {
                                AppUser = users[1],
                                IsAuthor = true                            
                            },
                            new TicketAssignee
                            {
                                AppUser = users[0],
                                IsAuthor = false                            
                            },
                        }
                    },
                    new Ticket
                    {
                        Title = "Future Ticket 4",
                        Description = "Ticket 4 months in future",
                        Severity = "Low",
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(5),
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee
                            {
                                AppUser = users[1],
                                IsAuthor = true                            
                            }
                        }
                    },
                    new Ticket
                    {
                        Title = "Future Ticket 5",
                        Description = "Ticket 5 months in future",
                        Severity = "Low",
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(5),
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee
                            {
                                AppUser = users[0],
                                IsAuthor = true                            
                            },
                            new TicketAssignee
                            {
                                AppUser = users[1],
                                IsAuthor = false                            
                            },
                        }
                    },
                    new Ticket
                    {
                        Title = "Future Ticket 6",
                        Description = "Ticket 6 months in future",
                        Severity = "Low",
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(5),
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee
                            {
                                AppUser = users[2],
                                IsAuthor = true                            
                            },
                            new TicketAssignee
                            {
                                AppUser = users[1],
                                IsAuthor = false                            
                            },
                        }
                    },
                    new Ticket
                    {
                        Title = "Future Ticket 7",
                        Description = "Ticket 7 months in future",
                        Severity = "Low",
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(5),
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee
                            {
                                AppUser = users[0],
                                IsAuthor = true                            
                            },
                            new TicketAssignee
                            {
                                AppUser = users[2],
                                IsAuthor = false                            
                            },
                        }
                    },
                    new Ticket
                    {
                        Title = "Future Ticket 8",
                        Description = "Ticket 8 months in future",
                        Severity = "Low",
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(5),
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee
                            {
                                AppUser = users[2],
                                IsAuthor = true                            
                            },
                            new TicketAssignee
                            {
                                AppUser = users[1],
                                IsAuthor = false                            
                            },
                        }
                    }
                };

                await context.Tickets.AddRangeAsync(tickets);
                await context.SaveChangesAsync();
            }
        }
    }
}
