using riims.Models.Domain;

namespace riims.Repositories
{
    public interface IHonorsAndAwardsRepository
    {
        Task<List<HonorsAndAwards>> GetAllAsync(string userId);

        Task<HonorsAndAwards?> GetByIdAsync(Guid id);

        Task<HonorsAndAwards> CreateAsync(string userId, HonorsAndAwards honorsandawards);

        Task<HonorsAndAwards?> UpdateAsync(Guid id, HonorsAndAwards honorsandawards);

        Task<HonorsAndAwards?> DeleteAsync(Guid id);
    }
}
