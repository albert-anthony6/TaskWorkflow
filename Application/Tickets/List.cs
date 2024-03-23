using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tickets
{
    public class List
    {
        public class Query : IRequest<Result<List<TicketDto>>> {}

        public class Handler : IRequestHandler<Query, Result<List<TicketDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<TicketDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var tickets = await _context.Tickets
                    .ProjectTo<TicketDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<TicketDto>>.Success(tickets);
            }
        }
    }
}