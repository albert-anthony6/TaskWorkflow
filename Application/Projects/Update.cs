using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects
{
    public class Update
    {
        public class Command : IRequest<Result<Unit>>
        {
            public List<string> AppUserIds { get; set; }
            public Guid Id { get; set; }
        }
        
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var project = await _context.Projects
                    .Include((p) => p.Members)
                    .SingleOrDefaultAsync((x) => x.ProjectId == request.Id);

                if (project == null) return null;

                var updatedMembers = new List<AppUser>();

                // Loop through AppUserIds and find matching users
                foreach (var userId in request.AppUserIds)
                {
                    var appUser = await _context.Users.FindAsync(userId);
                    
                    if (appUser != null)
                    {
                        updatedMembers.Add(appUser);
                    }
                    else
                    {
                        return Result<Unit>.Failure($"User with ID {userId} not found.");
                    }
                }

                project.Members = updatedMembers;

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update project.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}