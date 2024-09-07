using riims.Models.Domain;

namespace riims.Repositories
{
    public interface ILicensatRepository
    {
        Task<List<Licensat>> GetAllAsync(string userId);

        Task<Licensat?> GetByIdAsync(Guid id);

        Task<Licensat> CreateAsync(string userId, Licensat licensat);

        Task<Licensat?> UpdateAsync(Guid id, Licensat licensat);

        Task<Licensat?> DeleteAsync(Guid id);
    }
}
