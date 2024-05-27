using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Profiles
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<UserDto>>> 
        {
            public PagingParams Params { get; set; }
            public string SearchTerm { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<UserDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<UserDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Users
                    .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                    .OrderBy((u) => u.DisplayName)
                    .Search(request.SearchTerm)
                    .AsQueryable();
                
                    return Result<PagedList<UserDto>>.Success(
                        await PagedList<UserDto>.CreateAsync(query, request.Params.PageNumber, 
                            request.Params.PageSize)
                    );
            }
        }
    }
}