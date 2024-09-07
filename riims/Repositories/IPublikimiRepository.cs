using riims.Models.Domain;

namespace riims.Repositories
{
    public interface IPublikimiRepository
    {
        Task<List<Publikimi>> GetAllAsync(string userId);
        Task<Publikimi?> GetByIdAsync(Guid id);
        Task<Publikimi> CreateAsync(string userId, Publikimi publikimi);
        Task<Publikimi?> UpdateAsync(Guid id, Publikimi publikimi);
        Task<Publikimi?> DeleteAsync(Guid id);
    }
}
