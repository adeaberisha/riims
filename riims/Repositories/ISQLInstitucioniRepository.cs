using riims.Models.Domain;

namespace riims.Repositories
{
    public interface ISQLInstitucioniRepository
    {
        Task<Institucioni> CreateAsync(Institucioni institucioni);
        Task<Institucioni?> DeleteAsync(Guid id);
        Task<List<Institucioni>> GetAllAsync();
        Task<Institucioni> GetByIdAsync(Guid id);
        Task<Institucioni?> UpdateAsync(Guid id, Institucioni institucioni);
    }
}