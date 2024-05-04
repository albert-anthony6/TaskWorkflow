using Application.Photos;
using Application.Projects;
using Application.Tickets;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Project, RespProjectDto>()
                .ForMember((dest) => dest.MembersCount, (opt) => opt.MapFrom((src) => src.Members.Count));

            CreateMap<ReqTicketDto, Ticket>().IgnoreAllPropertiesWithAnInaccessibleSetter();

            CreateMap<Ticket, RespTicketDto>()
                .ForMember((dest) => dest.Attachments, (opt) => opt.MapFrom((src) => src.Attachments.Select((photo) => new PhotoDto
                {
                    Id = photo.Id,
                    Url = photo.Url
                })))
                .ForMember((dest) => dest.Author, (opt) => opt.MapFrom((src) => new AuthorDto
                {
                    AuthorId = src.Author.Id,
                    AuthorDisplayName = src.Author.DisplayName,
                    AuthorUserName = src.Author.UserName,
                    AuthorAvatar = src.Author.Avatar != null ? new PhotoDto
                        { 
                            Id = src.Author.Avatar.Id,
                            Url = src.Author.Avatar.Url 
                        }
                        : null
                }));

            CreateMap<TicketAssignee, AssigneeDto>()
                .ForMember((dest) => dest.DisplayName, (opt) => opt.MapFrom((src) => src.AppUser.DisplayName))
                .ForMember((dest) => dest.Username, (opt) => opt.MapFrom((src) => src.AppUser.UserName))
                .ForMember((dest) => dest.Avatar, (opt) => opt.MapFrom((src) =>
                    src.AppUser.Avatar != null
                        ? new PhotoDto { Id = src.AppUser.Avatar.Id, Url = src.AppUser.Avatar.Url }
                        : null));

            CreateMap<AppUser, Profiles.Profile>()
                .ForMember((dest) => dest.Avatar, (opt) => opt.MapFrom((src) =>
                    src.Avatar != null
                        ? new PhotoDto { Id = src.Avatar.Id, Url = src.Avatar.Url }
                        : null))
                .ForMember((dest) => dest.CoverImage, (opt) => opt.MapFrom((src) =>
                    src.CoverImage != null
                        ? new PhotoDto { Id = src.CoverImage.Id, Url = src.CoverImage.Url }
                        : null));

            CreateMap<Profiles.ReqProfileDto, AppUser>().IgnoreAllPropertiesWithAnInaccessibleSetter();

            CreateMap<AppUser, Profiles.RespProfileDto>()
                .ForMember((dest) => dest.Avatar, (opt) => opt.MapFrom((src) =>
                    src.Avatar != null
                        ? new PhotoDto { Id = src.Avatar.Id, Url = src.Avatar.Url }
                        : null));
                        
            CreateMap<AppUser, Profiles.UserDto>()
                .ForMember((dest) => dest.Avatar, (opt) => opt.MapFrom((src) =>
                    src.Avatar != null
                        ? new PhotoDto { Id = src.Avatar.Id, Url = src.Avatar.Url }
                        : null));
        }
    }
}