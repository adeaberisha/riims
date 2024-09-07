using riims.Models.Domain;

namespace riims.Repositories
{
    public interface IEksperiencaRepository
    {
        Task<List<Eksperienca>> GetAllAsync(string userId);

        Task<Eksperienca?> GetByIdAsync(Guid id);

        Task<Eksperienca> CreateAsync(string userId, Eksperienca eksperienca);

        Task<Eksperienca?> UpdateAsync(Guid id, Eksperienca eksperienca);

        Task<Eksperienca?> DeleteAsync(Guid id);    
    }
}
