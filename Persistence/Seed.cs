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
                    new AppUser
                    {
                        DisplayName = "Bob2",
                        UserName = "bob2",
                        Email = "bob2@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane2",
                        UserName = "jane2",
                        Email = "jane2@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom2",
                        UserName = "tom2",
                        Email = "tom2@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Bob3",
                        UserName = "bob3",
                        Email = "bob3@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane3",
                        UserName = "jane3",
                        Email = "jane3@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom3",
                        UserName = "tom3",
                        Email = "tom3@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Bob4",
                        UserName = "bob4",
                        Email = "bob4@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane4",
                        UserName = "jane4",
                        Email = "jane4@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom4",
                        UserName = "tom4",
                        Email = "tom4@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Bob5",
                        UserName = "bob5",
                        Email = "bob5@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane5",
                        UserName = "jane5",
                        Email = "jane5@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom5",
                        UserName = "tom5",
                        Email = "tom5@test.com"
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
                        ActiveTicketsCount = 5,
                        MembersCount = 3,
                        UserTicketsCount = 0
                    },
                    new Project
                    {
                        ProjectId = Guid.NewGuid(),
                        Name = "Project 2",
                        Owner = users[2].DisplayName,
                        ActiveTicketsCount = 5,
                        MembersCount = 3,
                        UserTicketsCount = 0
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
