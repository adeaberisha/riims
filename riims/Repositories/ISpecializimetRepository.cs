using riims.Models.Domain;

namespace riims.Repositories
{
    public interface ISpecializimetRepository
    {
        Task<List<Specializimet>> GetAllAsync(string userId);
        Task<Specializimet?> GetByIdAsync(Guid id);
        Task<Specializimet> CreateAsync(string userId, Specializimet specializimi);
        Task<Specializimet?> UpdateAsync(Guid id, Specializimet specializimi);
        Task<Specializimet?> DeleteAsync(Guid id);
    }
}
