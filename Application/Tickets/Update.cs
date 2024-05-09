using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tickets
{
    public class Update
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Status { get; set; }
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
                var ticket = await _context.Tickets
                    .SingleOrDefaultAsync((x) => x.Id == request.Id);

                if (ticket == null) return null;

                // Update the status property of the ticket
                ticket.Status = request.Status;

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update task.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}