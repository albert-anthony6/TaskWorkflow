using Application.Core;
using Application.Tickets;
using AutoMapper;
using Domain;
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
            public string SearchTerm { get; set; }
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
                        .ThenInclude((u) => u.Avatar)
                    .FirstOrDefaultAsync((p) => p.ProjectId == request.Id);

                // Ensure Tickets is IQueryable<Ticket>
                IQueryable<Ticket> ticketsQuery = _context.Tickets.Where(t => t.ProjectId == project.ProjectId);

                // Filter tickets based on search term
                if (!string.IsNullOrEmpty(request.SearchTerm))
                {
                    ticketsQuery = ticketsQuery.Search(request.SearchTerm);
                }

                // Project.Tickets is now IQueryable<Ticket>
                project.Tickets = await ticketsQuery.ToListAsync();

                var respProjectDto = _mapper.Map<RespProjectDto>(project);
                
                return Result<RespProjectDto>.Success(respProjectDto);
            }
        }
    }
}