namespace Domain
{
    public class ProjectMember
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid ProjectId { get; set; }
        public Project Project { get; set; }
    }
}