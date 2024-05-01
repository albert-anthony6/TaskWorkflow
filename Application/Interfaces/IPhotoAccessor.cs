using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IPhotoAccessor
    {
        Task<PhotoUploadResult> AddPhoto(IFormFile file, Boolean isBanner = false);
        Task<string> DeletePhoto(string publicId);
    }
}