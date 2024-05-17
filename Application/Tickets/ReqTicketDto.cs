using System.Text.Json.Serialization;
using Domain;

namespace Application.Tickets
{
    public class ReqTicketDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Severity { get; set; }
        public string Status { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        [JsonIgnore]
        public ICollection<Photo> Attachments { get; set; }
        public List<string> AppUserIds { get; set; }
    }
}