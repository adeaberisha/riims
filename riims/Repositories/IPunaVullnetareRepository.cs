using riims.Models.Domain;

namespace riims.Repositories
{
    public interface IPunaVullnetareRepository
    {
        Task<List<PunaVullnetare>> GetAllAsync(Guid userId);
        Task<PunaVullnetare?> GetByIdAsync(Guid id);
        Task<PunaVullnetare> CreateAsync(Guid userId, PunaVullnetare punaVullnetare);
        Task<PunaVullnetare?> UpdateAsync(Guid id, PunaVullnetare punaVullnetare);
        Task<PunaVullnetare?> DeleteAsync(Guid id);
    }
}
