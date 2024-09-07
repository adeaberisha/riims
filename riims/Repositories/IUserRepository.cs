using riims.Models.Domain;

namespace riims.Repositories
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllAsync();
        Task<User?> GetByIdAsync(string id);
        Task<User> CreateAsync(User user);
        Task<User?> UpdateAsync(string id, User user);
        Task<User?> DeleteAsync(string id);
    }
}
