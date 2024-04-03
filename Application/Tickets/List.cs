using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tickets
{
    public class List
    {
        public class Query : IRequest<Result<List<RespTicketDto>>> {}

        public class Handler : IRequestHandler<Query, Result<List<RespTicketDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<RespTicketDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var tickets = await _context.Tickets
                    .ProjectTo<RespTicketDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<RespTicketDto>>.Success(tickets);
            }
        }
    }
}