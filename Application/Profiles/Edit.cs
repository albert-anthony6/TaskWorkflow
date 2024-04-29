using Application.Core;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ReqProfileDto ReqProfileDto { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler (DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var currentUser = await _context.Users.FirstOrDefaultAsync((u) =>
                    u.UserName == _userAccessor.GetUsername());

                if (currentUser == null) return null;

                if (request.ReqProfileDto.DisplayName == null)
                {
                    return Result<Unit>.Failure("Display Name is required.");
                }

                _mapper.Map(request.ReqProfileDto, currentUser);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update user profile.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}