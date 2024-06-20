using Domain;

namespace Application.Tickets
{
    public static class TicketExtensions
    {
        public static IQueryable<Ticket> Search(this IQueryable<Ticket> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where((t) => t.Title.ToLower().Contains(lowerCaseSearchTerm));
        }
    }
}