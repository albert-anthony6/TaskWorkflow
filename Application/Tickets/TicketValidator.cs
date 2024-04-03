using Domain;
using FluentValidation;

namespace Application.Tickets
{
    public class TicketValidator : AbstractValidator<ReqTicketDto>
    {
        public TicketValidator()
        {
            RuleFor((x) => x.Title).NotEmpty();
            RuleFor((x) => x.Severity).NotEmpty();
            RuleFor((x) => x.StartDate).NotNull();
        }
    }
}