using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ReqProjectDto Project { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler (DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var currentUser = await _context.Users.FirstOrDefaultAsync((x) => 
                    x.UserName == _userAccessor.GetUsername());

                var project = new Project
                {
                    ProjectId = Guid.NewGuid(),
                    Name = request.Project.Name,
                    Owner = currentUser.Id
                };

                _context.Projects.Add(project);
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create project.");
            
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}