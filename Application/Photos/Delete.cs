using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
            public string PhotoId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var ticket = await _context.Tickets.Include((p) => p.Attachments)
                    .FirstOrDefaultAsync((x) => x.Id == request.Id);

                    if (ticket == null) return null;

                    var photo = ticket.Attachments.FirstOrDefault((x) => x.Id == request.PhotoId);

                    if (photo == null) return null;

                    var result = await _photoAccessor.DeletePhoto(photo.Id);

                    if (result == null) return Result<Unit>.Failure("Problem deleting attachment from Cloudinary");

                    ticket.Attachments.Remove(photo);

                    var success = await _context.SaveChangesAsync() > 0;

                    if (success) return Result<Unit>.Success(Unit.Value);

                    return Result<Unit>.Failure("Problem deleting photo from API");
            }
        }
    }
}