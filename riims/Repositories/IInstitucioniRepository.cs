using riims.Models.Domain;

namespace riims.Repositories
{
    public interface IInstitucioniRepository
    {
        Task<List<Institucioni>> GetAllAsync();
        Task<Institucioni?> GetByIdAsync(Guid id);
        Task<Institucioni> CreateAsync(Institucioni institucioni);
        Task<Institucioni?> UpdateAsync(Guid id, Institucioni institucioni);
        Task<Institucioni?> DeleteAsync(Guid id);
    }
}
