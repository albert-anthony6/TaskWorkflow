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

                // Create projects
                var projects = new List<Project>
                {
                    new Project
                    {
                        ProjectId = Guid.NewGuid(),
                        Name = "Project 1",
                        Owner = users[0].DisplayName,
                        ActiveTickets = 5,
                        Members = 3,
                        CurrentUserTickets = 0
                    },
                    new Project
                    {
                        ProjectId = Guid.NewGuid(),
                        Name = "Project 2",
                        Owner = users[2].DisplayName,
                        ActiveTickets = 5,
                        Members = 3,
                        CurrentUserTickets = 0
                    }
                };

                await context.Projects.AddRangeAsync(projects);
                await context.SaveChangesAsync();

                var tickets = new List<Ticket>
                {
                    new Ticket
                    {
                        ProjectId = projects[0].ProjectId,
                        Title = "Past Ticket 1",
                        Description = "Ticket 2 months ago",
                        Severity = "Low",
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(5),
                        Author = users[0],
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee
                            {
                                AppUser = users[0],
                            }
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[1].ProjectId,
                        Title = "Past Ticket 2",
                        Description = "Ticket 1 month ago",
                        Severity = "Low",
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(5),
                        Author = users[0],
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee
                            {
                                AppUser = users[0],
                            },
                            new TicketAssignee
                            {
                                AppUser = users[1],
                            },
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[0].ProjectId,
                        Title = "Future Ticket 1",
                        Description = "Ticket 1 month in future",
                        Severity = "Low",
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(5),
                        Author = users[2],
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee
                            {
                                AppUser = users[2],
                            },
                            new TicketAssignee
                            {
                                AppUser = users[1],
                            },
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[1].ProjectId,
                        Title = "Future Ticket 2",
                        Description = "Ticket 2 months in future",
                        Severity = "Low",
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(5),
                        Author = users[0],
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee
                            {
                                AppUser = users[0],
                            },
                            new TicketAssignee
                            {
                                AppUser = users[2],
                            },
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[0].ProjectId,
                        Title = "Future Ticket 3",
                        Description = "Ticket 3 months in future",
                        Severity = "Low",
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(5),
                        Author = users[1],
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee
                            {
                                AppUser = users[1],
                            },
                            new TicketAssignee
                            {
                                AppUser = users[0],
                            },
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[1].ProjectId,
                        Title = "Future Ticket 4",
                        Description = "Ticket 4 months in future",
                        Severity = "Low",
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(5),
                        Author = users[1],
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee
                            {
                                AppUser = users[1],
                            }
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[0].ProjectId,
                        Title = "Future Ticket 5",
                        Description = "Ticket 5 months in future",
                        Severity = "Low",
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(5),
                        Author = users[0],
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee
                            {
                                AppUser = users[0],
                            },
                            new TicketAssignee
                            {
                                AppUser = users[1],
                            },
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[1].ProjectId,
                        Title = "Future Ticket 6",
                        Description = "Ticket 6 months in future",
                        Severity = "Low",
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(5),
                        Author = users[2],
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee
                            {
                                AppUser = users[2],
                            },
                            new TicketAssignee
                            {
                                AppUser = users[1],
                            },
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[0].ProjectId,
                        Title = "Future Ticket 7",
                        Description = "Ticket 7 months in future",
                        Severity = "Low",
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(5),
                        Author = users[0],
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee
                            {
                                AppUser = users[0],
                            },
                            new TicketAssignee
                            {
                                AppUser = users[2],
                            },
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[1].ProjectId,
                        Title = "Future Ticket 8",
                        Description = "Ticket 8 months in future",
                        Severity = "Low",
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(5),
                        Author = users[2],
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee
                            {
                                AppUser = users[2],
                            },
                            new TicketAssignee
                            {
                                AppUser = users[1],
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
