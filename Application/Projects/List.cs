using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects
{
    public class List
    {
        public class Query : IRequest<Result<List<RespProjectDto>>> {
            public string UserId { get; set; }
            public Boolean FilterProjects { get; set; }
            public string SearchTerm { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<RespProjectDto>>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler (DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<List<RespProjectDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync((u) =>
                    u.Id == request.UserId);

                var query = _context.Projects
                    .OrderBy((p) => p.Name)
                    .Search(request.SearchTerm)
                    .AsQueryable();

                // Apply filtering based on the query parameter
                if (request.FilterProjects)
                {
                    query = query.Where(project => project.Members.Any((m) => m.Id == user.Id));
                }

                var projectDtos = await query
                    .Select(project => new RespProjectDto
                    {
                        ProjectId = project.ProjectId,
                        Name = project.Name,
                        Owner = project.Owner,
                        ActiveTicketsCount = project.ActiveTicketsCount,
                        MembersCount = project.Members.Count,
                        UserTicketsCount = project.Tickets
                            .SelectMany((t) => t.Assignees)
                            .Count((a) => a.AppUserId == user.Id)
                    })
                    .ToListAsync();

                return Result<List<RespProjectDto>>.Success(projectDtos);
            }
        }
    }
}