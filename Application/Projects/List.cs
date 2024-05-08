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
            public Boolean FilterUserTickets { get; set; } = false;
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
                var currentUser = await _context.Users.FirstOrDefaultAsync((u) =>
                    u.UserName == _userAccessor.GetUsername());

                var query = _context.Projects.AsQueryable();

                // Apply filtering based on the query parameter
                if (request.FilterUserTickets)
                {
                    query = query.Where(project => project.Members.Any((m) => m.UserName == _userAccessor.GetUsername()));
                }

                var projectDtos = await query
                    .Select(project => new RespProjectDto
                    {
                        ProjectId = project.ProjectId,
                        Name = project.Name,
                        Owner = project.Owner,
                        ActiveTicketsCount = project.ActiveTicketsCount,
                        MembersCount = project.Members.Count,
                        CurrentUserTickets = project.Tickets
                            .SelectMany((t) => t.Assignees)
                            .Count((a) => a.AppUserId == currentUser.Id)
                    })
                    .ToListAsync();

                return Result<List<RespProjectDto>>.Success(projectDtos);
            }
        }
    }
}