using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tickets
{
    public class Details
    {
        public class Query : IRequest<Result<RespTicketDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<RespTicketDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;   
            }

            public async Task<Result<RespTicketDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var ticket = await _context.Tickets
                .ProjectTo<RespTicketDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync((x) => x.Id == request.Id);

                return Result<RespTicketDto>.Success(ticket);
            }
        }
    }
}