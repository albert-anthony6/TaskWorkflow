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
                        DisplayName = "Bob Evans",
                        UserName = "bob",
                        Bio = "Manager at Aura",
                        Email = "bob@test.com",
                    },
                    new AppUser
                    {
                        DisplayName = "Jane Smith",
                        UserName = "jane",
                        Bio = "Marketing at Glam",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom Smith",
                        UserName = "tom",
                        Bio = "Designer at Opal Cos.",
                        Email = "tom@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Sarah David",
                        UserName = "sarah",
                        Bio = "CEO at Luxe Glow",
                        Email = "sarah@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Michael Thomson",
                        UserName = "michael",
                        Bio = "Brand at Radiant",
                        Email = "michael@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jennifer Martinez",
                        UserName = "jennifer",
                        Bio = "Developer at Stellar",
                        Email = "jennifer@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Robert Anderson",
                        UserName = "robert",
                        Bio = "Director at Belle",
                        Email = "robert@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jessica Taylor",
                        UserName = "jessica",
                        Bio = "Artist at Ethereal",
                        Email = "jessica@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "James Thomas",
                        UserName = "james",
                        Bio = "Sales at Enchanted",
                        Email = "james@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "William Parker",
                        UserName = "william",
                        Bio = "Strategist at Serenity",
                        Email = "william@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Melissa Moore",
                        UserName = "melissa",
                        Bio = "PR at Luminous",
                        Email = "melissa@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Joshua Carter",
                        UserName = "joshua",
                        Bio = "Manager at Aurora",
                        Email = "joshua@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Nicole Lewis",
                        UserName = "nicole",
                        Bio = "Manager at Moonlit",
                        Email = "nicole@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Daniel Walker",
                        UserName = "daniel",
                        Bio = "Officer at Celestial",
                        Email = "daniel@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Andrew Baker",
                        UserName = "andrew",
                        Bio = "Founder at Velvet",
                        Email = "andrew@test.com"
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
                        Name = "Ford Motor 100",
                        Owner = users[0].DisplayName,
                        ActiveTicketsCount = 10,
                        MembersCount = 3,
                        Members = new List<AppUser>
                        {
                            users[0],
                            users[1],
                            users[2],
                        },
                        UserTicketsCount = 0
                    },
                    new Project
                    {
                        ProjectId = Guid.NewGuid(),
                        Name = "Waymo Experiential",
                        Owner = users[3].DisplayName,
                        ActiveTicketsCount = 10,
                        MembersCount = 3,
                        Members = new List<AppUser>
                        {
                            users[3],
                            users[4],
                            users[5],
                        },
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
                        Title = "Build Timeline",
                        Description = "Create a timeline of when each department should begin work for Ford Motor 100.",
                        Severity = "Medium",
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(5),
                        Author = users[0],
                        Status = "done",
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee { AppUser = users[0] }
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[0].ProjectId,
                        Title = "Prepare Marketing Strategy",
                        Description = "Draft a marketing strategy for the Ford Motor 100 launch.",
                        Severity = "High",
                        StartDate = DateTime.UtcNow.AddDays(1),
                        EndDate = DateTime.UtcNow.AddDays(7),
                        Author = users[1],
                        Status = "inProgress",
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee { AppUser = users[1] }
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[0].ProjectId,
                        Title = "Prototype Development",
                        Description = "Develop initial prototypes for Ford Motor 100 vehicle components.",
                        Severity = "Critical",
                        StartDate = DateTime.UtcNow.AddDays(2),
                        EndDate = DateTime.UtcNow.AddDays(10),
                        Author = users[2],
                        Status = "readyForReview",
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee { AppUser = users[2] }
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[0].ProjectId,
                        Title = "User Testing",
                        Description = "Conduct user testing sessions for Ford Motor 100 features.",
                        Severity = "Medium",
                        StartDate = DateTime.UtcNow.AddDays(3),
                        EndDate = DateTime.UtcNow.AddDays(6),
                        Author = users[0],
                        Status = "todo",
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee { AppUser = users[0] },
                            new TicketAssignee { AppUser = users[1] }
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[0].ProjectId,
                        Title = "Supply Chain Audit",
                        Description = "Audit the supply chain for components needed in Ford Motor 100 production.",
                        Severity = "High",
                        StartDate = DateTime.UtcNow.AddDays(4),
                        EndDate = DateTime.UtcNow.AddDays(8),
                        Author = users[2],
                        Status = "inProgress",
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee { AppUser = users[2] }
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[0].ProjectId,
                        Title = "Documentation Review",
                        Description = "Review and update documentation related to Ford Motor 100 production processes.",
                        Severity = "Medium",
                        StartDate = DateTime.UtcNow.AddDays(5),
                        EndDate = DateTime.UtcNow.AddDays(7),
                        Author = users[1],
                        Status = "readyForReview",
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee { AppUser = users[1] },
                            new TicketAssignee { AppUser = users[2] }
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[0].ProjectId,
                        Title = "Quality Control Testing",
                        Description = "Perform quality control tests on Ford Motor 100 prototypes.",
                        Severity = "High",
                        StartDate = DateTime.UtcNow.AddDays(6),
                        EndDate = DateTime.UtcNow.AddDays(9),
                        Author = users[0],
                        Status = "done",
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee { AppUser = users[0] },
                            new TicketAssignee { AppUser = users[2] }
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[0].ProjectId,
                        Title = "Final Assembly Planning",
                        Description = "Plan the final assembly process for Ford Motor 100 production.",
                        Severity = "Medium",
                        StartDate = DateTime.UtcNow.AddDays(7),
                        EndDate = DateTime.UtcNow.AddDays(10),
                        Author = users[0],
                        Status = "todo",
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee { AppUser = users[0] },
                            new TicketAssignee { AppUser = users[1] }
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[0].ProjectId,
                        Title = "Launch Event Coordination",
                        Description = "Coordinate logistics for the Ford Motor 100 launch event.",
                        Severity = "High",
                        StartDate = DateTime.UtcNow.AddDays(8),
                        EndDate = DateTime.UtcNow.AddDays(11),
                        Author = users[1],
                        Status = "inProgress",
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee { AppUser = users[1] },
                            new TicketAssignee { AppUser = users[2] }
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[0].ProjectId,
                        Title = "Post-Launch Analysis",
                        Description = "Conduct analysis of customer feedback and performance data post Ford Motor 100 launch.",
                        Severity = "Medium",
                        StartDate = DateTime.UtcNow.AddDays(9),
                        EndDate = DateTime.UtcNow.AddDays(12),
                        Author = users[0],
                        Status = "readyForReview",
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee { AppUser = users[0] },
                            new TicketAssignee { AppUser = users[1] }
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[1].ProjectId,
                        Title = "Route Mapping",
                        Description = "Update route mapping data for Waymo Experiential testing.",
                        Severity = "Medium",
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddDays(5),
                        Author = users[3],
                        Status = "todo",
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee { AppUser = users[3] }
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[1].ProjectId,
                        Title = "Sensor Calibration",
                        Description = "Calibrate sensors for Waymo Experiential vehicles.",
                        Severity = "High",
                        StartDate = DateTime.UtcNow.AddDays(1),
                        EndDate = DateTime.UtcNow.AddDays(6),
                        Author = users[4],
                        Status = "inProgress",
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee { AppUser = users[4] }
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[1].ProjectId,
                        Title = "User Experience Testing",
                        Description = "Conduct user experience testing sessions for Waymo Experiential.",
                        Severity = "Critical",
                        StartDate = DateTime.UtcNow.AddDays(2),
                        EndDate = DateTime.UtcNow.AddDays(7),
                        Author = users[5],
                        Status = "readyForReview",
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee { AppUser = users[5] }
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[1].ProjectId,
                        Title = "Performance Evaluation",
                        Description = "Evaluate performance metrics of Waymo Experiential vehicles.",
                        Severity = "High",
                        StartDate = DateTime.UtcNow.AddDays(3),
                        EndDate = DateTime.UtcNow.AddDays(8),
                        Author = users[3],
                        Status = "done",
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee { AppUser = users[3] }
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[1].ProjectId,
                        Title = "Data Analysis",
                        Description = "Analyze data collected from Waymo Experiential testing.",
                        Severity = "Medium",
                        StartDate = DateTime.UtcNow.AddDays(4),
                        EndDate = DateTime.UtcNow.AddDays(9),
                        Author = users[4],
                        Status = "todo",
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee { AppUser = users[4] }
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[1].ProjectId,
                        Title = "Regulatory Compliance",
                        Description = "Ensure Waymo Experiential complies with local regulations.",
                        Severity = "High",
                        StartDate = DateTime.UtcNow.AddDays(5),
                        EndDate = DateTime.UtcNow.AddDays(10),
                        Author = users[5],
                        Status = "inProgress",
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee { AppUser = users[5] }
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[1].ProjectId,
                        Title = "System Integration Testing",
                        Description = "Perform system integration testing for Waymo Experiential.",
                        Severity = "Medium",
                        StartDate = DateTime.UtcNow.AddDays(6),
                        EndDate = DateTime.UtcNow.AddDays(11),
                        Author = users[3],
                        Status = "readyForReview",
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee { AppUser = users[3] },
                            new TicketAssignee { AppUser = users[4] }
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[1].ProjectId,
                        Title = "Documentation Update",
                        Description = "Update documentation for Waymo Experiential system changes.",
                        Severity = "Low",
                        StartDate = DateTime.UtcNow.AddDays(7),
                        EndDate = DateTime.UtcNow.AddDays(12),
                        Author = users[4],
                        Status = "done",
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee { AppUser = users[4] }
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[1].ProjectId,
                        Title = "Stakeholder Presentation",
                        Description = "Prepare and deliver a presentation on Waymo Experiential progress to stakeholders.",
                        Severity = "High",
                        StartDate = DateTime.UtcNow.AddDays(8),
                        EndDate = DateTime.UtcNow.AddDays(13),
                        Author = users[5],
                        Status = "todo",
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee { AppUser = users[5] },
                            new TicketAssignee { AppUser = users[3] }
                        }
                    },
                    new Ticket
                    {
                        ProjectId = projects[1].ProjectId,
                        Title = "Final Testing Phase",
                        Description = "Execute final testing phase for Waymo Experiential before deployment.",
                        Severity = "Critical",
                        StartDate = DateTime.UtcNow.AddDays(9),
                        EndDate = DateTime.UtcNow.AddDays(14),
                        Author = users[3],
                        Status = "todo",
                        Assignees = new List<TicketAssignee>
                        {
                            new TicketAssignee { AppUser = users[3] },
                            new TicketAssignee { AppUser = users[4] },
                            new TicketAssignee { AppUser = users[5] }
                        }
                    }
                };

                await context.Tickets.AddRangeAsync(tickets);
                await context.SaveChangesAsync();
            }
        }
    }
}
