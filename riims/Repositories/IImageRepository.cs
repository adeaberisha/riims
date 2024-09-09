using riims.Models.Domain;
using System.Net;

namespace riims.Repositories
{
    public interface IImageRepository
    {
        Task<Image> Upload(string userId, Image image);
    }
}