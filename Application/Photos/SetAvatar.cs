// using Application.Core;
// using Application.Interfaces;
// using MediatR;
// using Microsoft.EntityFrameworkCore;
// using Persistence;

// namespace Application.Photos
// {
//     public class SetAvatar
//     {
//         public class Command : IRequest<Result<Unit>>
//         {
//             public string Id { get; set; }
//         }

//         public class Handler : IRequestHandler<Command, Result<Unit>>
//         {
//             private readonly DataContext _context;
//             private readonly IUserAccessor _userAccessor;
//             public Handler(DataContext context, IUserAccessor userAccessor)
//             {
//                 _userAccessor = userAccessor;
//                 _context = context;
//             }

//             public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
//             {
//                 var user = await _context.Users.FirstOrDefaultAsync((x) => x.UserName == _userAccessor.GetUsername());
                
//                 if (user == null) return null;

//                 if (user.Avatar == null) return null;

//                 var currentAvatar = user.Avatar;

//                 var success = await _context.SaveChangesAsync() > 0;

//                 if (success) return Result<Unit>.Success(Unit.Value);

//                 return Result<Unit>.Failure("Problem setting avatar photo");
//             }
//         }
//     }
// }