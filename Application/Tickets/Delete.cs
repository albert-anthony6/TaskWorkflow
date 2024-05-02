using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tickets
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var ticket = await _context.Tickets.FindAsync(request.Id);
                
                if (ticket == null) return null;
                
                _context.Remove(ticket);

                // Update the associated Project's ActiveTicketsCount count
                var project = await _context.Projects
                    .Include(p => p.Tickets)
                    .FirstOrDefaultAsync((p) => p.ProjectId == ticket.ProjectId);

                if (project != null)
                {
                    project.ActiveTicketsCount--;
                }
                else
                {
                    return Result<Unit>.Failure($"Project with ID {ticket.ProjectId} not found.");
                }

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the ticket.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}