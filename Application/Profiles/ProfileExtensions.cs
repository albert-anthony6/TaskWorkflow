namespace Application.Profiles
{
    public static class ProfileExtensions
    {
        public static IQueryable<UserDto> Search(this IQueryable<UserDto> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => p.DisplayName.ToLower().Contains(lowerCaseSearchTerm));
        }
    }
}