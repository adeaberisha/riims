using riims.Models.Domain;

namespace riims.Repositories
{
    public interface IMbikqyresRepository
    {
        Task<List<MbikqyresITemave>> GetAllAsync(string userId);
        Task<MbikqyresITemave?> GetByIdAsync(Guid id);
        Task<MbikqyresITemave> CreateAsync(string userId, MbikqyresITemave mbikqyres);
        Task<MbikqyresITemave?> UpdateAsync(Guid id, MbikqyresITemave mbikqyres);
        Task<MbikqyresITemave?> DeleteAsync(Guid id);
    }
}
