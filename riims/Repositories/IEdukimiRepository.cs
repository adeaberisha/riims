using Microsoft.EntityFrameworkCore.Update.Internal;
using riims.Models.Domain;

namespace riims.Repositories
{
    public interface IEdukimiRepository
    {
       Task<List<Edukimi>> GetAllAsync(string userId);
       Task<Edukimi?> GetByIdAsync(Guid id);
       Task<Edukimi>CreateAsync(string userId, Edukimi edukimi);
       Task<Edukimi?> UpdateAsync(Guid id, Edukimi edukimi);
       Task<Edukimi?> DeleteAsync(Guid id);
    }
}
