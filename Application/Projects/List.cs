using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects
{
    public class List
    {
        public class Query : IRequest<Result<List<RespProjectDto>>> {}

        public class Handler : IRequestHandler<Query, Result<List<RespProjectDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler (DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<RespProjectDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var projects = await _context.Projects
                    .ToListAsync();

                var projectDtos = projects.Select((project) =>
                {
                    var respProjectDto = _mapper.Map<RespProjectDto>(project);
                    return respProjectDto;
                }).ToList();

                return Result<List<RespProjectDto>>.Success(projectDtos);
            }
        }
    }
}