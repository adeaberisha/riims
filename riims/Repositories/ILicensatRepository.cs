using riims.Models.Domain;

namespace riims.Repositories
{
    public interface ILicensatRepository
    {
        Task<List<Licensat>> GetAllAsync(Guid userId);

        Task<Licensat?> GetByIdAsync(Guid id);

        Task<Licensat> CreateAsync(Guid userId, Licensat licensat);

        Task<Licensat?> UpdateAsync(Guid id, Licensat licensat);

        Task<Licensat?> DeleteAsync(Guid id);
    }
}
