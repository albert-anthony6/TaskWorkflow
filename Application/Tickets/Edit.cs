using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tickets
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ReqTicketDto ReqTicketDto { get; set; }
            public Guid Id { get; set; }
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var ticket = await _context.Tickets
                    .Include((x) => x.Assignees)
                    .SingleOrDefaultAsync((x) => x.Id == request.Id);

                if (ticket == null) return null;

                _mapper.Map(request.ReqTicketDto, ticket);

                ticket.Assignees.Clear();

                // Ensure AppUserIds is not null
                if (request.ReqTicketDto.AppUserIds == null)
                {
                    request.ReqTicketDto.AppUserIds = new List<string>();
                }

                if (request.ReqTicketDto.AppUserIds.Any())
                {
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
                }

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to edit task.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}