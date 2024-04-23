using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class List
    {
        public class Query : IRequest<Result<List<UserDto>>> {}

        public class Handler : IRequestHandler<Query, Result<List<UserDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<UserDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await _context.Users
                    .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();
                
                    return Result<List<UserDto>>.Success(users);
            }
        }
    }
}