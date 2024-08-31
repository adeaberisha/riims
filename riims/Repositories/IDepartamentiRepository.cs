using riims.Models.Domain;

namespace riims.Repositories
{
    public interface IDepartamentiRepository
    {
        Task<List<Departamenti>> GetAllAsync();
        Task<Departamenti?> GetByIdAsync(Guid id);
        Task<Departamenti> CreateAsync(Departamenti departamenti);
        Task<Departamenti?> UpdateAsync(Guid id, Departamenti departamenti);
        Task<Departamenti?> DeleteAsync(Guid id);
    }
}
