using Domain;

namespace Application.Projects
{
    public static class ProjectExtensions
    {
        public static IQueryable<Project> Search(this IQueryable<Project> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where((p) => p.Name.ToLower().Contains(lowerCaseSearchTerm));
        }
    }
}