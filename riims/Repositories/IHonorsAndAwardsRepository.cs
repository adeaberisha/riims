using riims.Models.Domain;

namespace riims.Repositories
{
    public interface IHonorsAndAwardsRepository
    {
        Task<List<HonorsAndAwards>> GetAllAsync(Guid userId);

        Task<HonorsAndAwards?> GetByIdAsync(Guid id);

        Task<HonorsAndAwards> CreateAsync(Guid userId, HonorsAndAwards honorsandawards);

        Task<HonorsAndAwards?> UpdateAsync(Guid id, HonorsAndAwards honorsandawards);

        Task<HonorsAndAwards?> DeleteAsync(Guid id);
    }
}
