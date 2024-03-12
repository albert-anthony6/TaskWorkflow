using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Tickets
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Ticket Ticket { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor((x) => x.Ticket).SetValidator(new TicketValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context; 
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Tickets.Add(request.Ticket);
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create ticket.");
            
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}