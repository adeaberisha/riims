using riims.Models.Domain;

namespace riims.Repositories
{
    public interface IUserGjuhetRepository
    {
        Task<List<UserGjuhet>> GetAllAsync(string userId);
        Task<UserGjuhet?> GetByIdAsync(Guid id);
        Task<UserGjuhet> CreateAsync(string userId, UserGjuhet userGjuhet);
        Task<UserGjuhet?> UpdateAsync(Guid id, UserGjuhet userGjuhet);
        Task<UserGjuhet?> DeleteAsync(Guid id);
    }
}
