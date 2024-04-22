using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class SetCoverImage
    {
        public class Command : IRequest<Result<Unit>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .Include((u) => u.CoverImage)
                    .FirstOrDefaultAsync((x) => x.UserName == _userAccessor.GetUsername());
                
                if (user == null) return null;

                // No file and no existing cover image
                if (request.File == null)
                {
                    if (user.CoverImage == null)
                    {
                        return Result<Unit>.Failure("No file was provided");
                    }
                }
                else
                {
                    // 10 MB limit (10485760 bytes)
                    if (request.File.Length > 10485760)
                    {
                        return Result<Unit>.Failure("File size too large. Maximum is 10 MB.");
                    }
                }

                // Delete the existing cover image
                if (user.CoverImage != null)
                {
                    var result = await _photoAccessor.DeletePhoto(user.CoverImage.Id);

                    if (result == null) return Result<Unit>.Failure("Problem updating cover image");
                
                    user.CoverImage = null;
                }

                // Upload the file if there's a file included with this api call
                if (request.File != null)
                {
                    var photoUploadResult = await _photoAccessor.AddPhoto(request.File);
                
                    var photo = new Photo
                    {
                        Url = photoUploadResult.Url,
                        Id = photoUploadResult.PublicId
                    };

                    user.CoverImage = photo;
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem updating cover image");
            }
        }
    }
}