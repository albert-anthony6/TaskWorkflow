using Application.Tickets;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Ticket, Ticket>();
            CreateMap<Ticket, TicketDto>()
                .ForMember((d) => d.AuthorUsername, (o) => o.MapFrom((s) => s.Assignees
                    .FirstOrDefault((x) => x.IsAuthor).AppUser.UserName));
            CreateMap<TicketAssignee, AssigneeDto>()
                .ForMember((d) => d.DisplayName, (o) => o.MapFrom((s) => s.AppUser.DisplayName))
                .ForMember((d) => d.Username, (o) => o.MapFrom((s) => s.AppUser.UserName))
                .ForMember((d) => d.Bio, (o) => o.MapFrom((s) => s.AppUser.Bio))
                .ForMember((d) => d.Image, (o) => o.MapFrom((s) => s.AppUser.Photos.FirstOrDefault((x) => x.IsMain).Url));
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember((d) => d.Image, (o) => o.MapFrom((s) => s.Photos.FirstOrDefault((x) => x.IsMain).Url));
        }
    }
}