namespace Domain
{
    public class Photo
    {
        public string Id { get; set; }
        public string Url { get; set; }

        public string AvatarId { get; set; }
        public AppUser AvatarUser { get; set; }
        
        public string CoverImageId { get; set; }
        public AppUser CoverImageUser { get; set; }
    }
}