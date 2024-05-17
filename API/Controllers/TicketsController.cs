using Application.Tickets;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TicketsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetTickets()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTicket(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{ Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTicket(Guid projectId, ReqTicketDto ticket)
        {
            return HandleResult(await Mediator.Send(new Create.Command { ProjectId = projectId, ReqTicketDto = ticket }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTicket(Guid id, ReqTicketDto ticket)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Id = id, ReqTicketDto = ticket }));
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateTicket(Guid id, UpdateTicketStatusDto statusDto)
        {
            return HandleResult(await Mediator.Send(new Update.Command { Id = id, StatusDto = statusDto }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}