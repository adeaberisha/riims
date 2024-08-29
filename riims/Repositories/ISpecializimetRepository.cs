using riims.Models.Domain;

namespace riims.Repositories
{
    public interface ISpecializimetRepository
    {
        Task<List<Specializimet>> GetAllAsync(Guid userId);
        Task<Specializimet?> GetByIdAsync(Guid id);
        Task<Specializimet> CreateAsync(Guid userId, Specializimet specializimi);
        Task<Specializimet?> UpdateAsync(Guid id, Specializimet specializimi);
        Task<Specializimet?> DeleteAsync(Guid id);
    }
}
