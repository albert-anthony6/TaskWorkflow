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
                var projectDtos = await _context.Projects
                    .Select(project => new RespProjectDto
                    {
                        ProjectId = project.ProjectId,
                        Name = project.Name,
                        Owner = project.Owner,
                        ActiveTicketsCount = project.ActiveTicketsCount,
                        MembersCount = project.Members.Count(),
                        CurrentUserTickets = project.CurrentUserTickets
                    })
                    .ToListAsync();

                return Result<List<RespProjectDto>>.Success(projectDtos);
            }
        }
    }
}