using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tickets
{
    public class List
    {
        public class Query : IRequest<Result<List<Ticket>>> {}

        public class Handler : IRequestHandler<Query, Result<List<Ticket>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Ticket>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Ticket>>.Success(await _context.Tickets.ToListAsync());
            }
        }
    }
}