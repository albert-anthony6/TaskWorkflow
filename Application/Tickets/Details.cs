using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Tickets
{
    public class Details
    {
        public class Query : IRequest<Result<Ticket>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Ticket>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;   
            }

            public async Task<Result<Ticket>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<Ticket>.Success(await _context.Tickets.FindAsync(request.Id));
            }
        }
    }
}