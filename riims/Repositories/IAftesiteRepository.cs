using riims.Models.Domain;

namespace riims.Repositories
{
    public interface IAftesiteRepository
    {
        Task<List<Aftesite>> GetAllAsync(Guid userId);
        Task<Aftesite?> GetByIdAsync(Guid id);
        Task<Aftesite> CreateAsync(Guid userId, Aftesite aftesite);
        Task<Aftesite?> UpdateAsync(Guid id, Aftesite aftesite);
        Task<Aftesite?> DeleteAsync(Guid id);
    }
}
