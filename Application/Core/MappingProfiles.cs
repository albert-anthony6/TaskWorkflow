using Application.Photos;
using Application.Tickets;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Photo, PhotoDto>();
            CreateMap<ReqTicketDto, Ticket>().IgnoreAllPropertiesWithAnInaccessibleSetter();
            CreateMap<Ticket, RespTicketDto>()
                .ForMember((dest) => dest.Author, opt => opt.MapFrom((src) => new AuthorDto
                {
                    AuthorId = src.Author.Id,
                    AuthorDisplayName = src.Author.DisplayName,
                    AuthorUserName = src.Author.UserName,
                    AuthorAvatar = src.Author.Avatar
                }));
            CreateMap<TicketAssignee, AssigneeDto>()
                .ForMember((dest) => dest.DisplayName, (opt) => opt.MapFrom((src) => src.AppUser.DisplayName))
                .ForMember((dest) => dest.Username, (opt) => opt.MapFrom((src) => src.AppUser.UserName))
                .ForMember((dest) => dest.Avatar, (opt) => opt.MapFrom((src) => src.AppUser.Avatar));
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember((dest) => dest.Avatar, (opt) => opt.MapFrom((src) => src.Avatar));
            CreateMap<AppUser, Profiles.ProfileDto>()
                .ForMember((dest) => dest.Avatar, (opt) => opt.MapFrom((src) => src.Avatar));
        }
    }
}