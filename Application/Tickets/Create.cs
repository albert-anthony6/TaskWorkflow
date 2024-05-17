using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tickets
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid ProjectId { get; set; }
            public ReqTicketDto ReqTicketDto { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor((x) => x.ReqTicketDto).SetValidator(new TicketValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context; 
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var currentUser = await _context.Users.FirstOrDefaultAsync((x) => 
                    x.UserName == _userAccessor.GetUsername());

                var ticket = new Ticket
                {
                    ProjectId = request.ProjectId,
                    Id = Guid.NewGuid(),
                    Title = request.ReqTicketDto.Title,
                    Description = request.ReqTicketDto.Description,
                    Severity = request.ReqTicketDto.Severity,
                    Status = "todo",
                    StartDate = request.ReqTicketDto.StartDate,
                    EndDate = request.ReqTicketDto.EndDate,
                    Author = currentUser,
                    Attachments = request.ReqTicketDto.Attachments
                };

                // Ensure AppUserIds is not null
                if (request.ReqTicketDto.AppUserIds == null)
                {
                    request.ReqTicketDto.AppUserIds = new List<string>();
                }

                // Loop through AppUserIds and find matching users
                foreach (var userId in request.ReqTicketDto.AppUserIds)
                {
                    var appUser = await _context.Users.FindAsync(userId);
                    
                    if (appUser != null)
                    {
                        var assignee = new TicketAssignee
                        {
                            AppUser = appUser,
                            Ticket = ticket
                        };

                        ticket.Assignees.Add(assignee);
                    }
                    else
                    {
                        return Result<Unit>.Failure($"User with ID {userId} not found.");
                    }
                }

                _context.Tickets.Add(ticket);

                // Update the associated Project's ActiveTicketsCount count
                var project = await _context.Projects
                    .Include((p) => p.Tickets)
                    .FirstOrDefaultAsync(p => p.ProjectId == request.ProjectId);

                if (project != null)
                {
                    // Increment by 1 for the new ticket
                    project.ActiveTicketsCount++;
                }
                else
                {
                    return Result<Unit>.Failure($"Project with ID {request.ProjectId} not found.");
                }

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create ticket.");
            
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}