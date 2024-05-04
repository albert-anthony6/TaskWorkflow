using Application.Core;
using Application.Tickets;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects
{
    public class Details
    {
        public class Query : IRequest<Result<RespProjectDto>>
        {
            public Guid Id { get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<RespProjectDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler (DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<RespProjectDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var project = await _context.Projects
                    .Include((p) => p.Members)
                    .Include((p) => p.Tickets)
                    .FirstOrDefaultAsync((p) => p.ProjectId == request.Id);

                var respProjectDto = _mapper.Map<RespProjectDto>(project);
                
                return Result<RespProjectDto>.Success(respProjectDto);
            }
        }
    }
}