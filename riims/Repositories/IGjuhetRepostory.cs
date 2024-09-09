using riims.Models.Domain;

namespace riims.Repositories
{
    public interface IGjuhetRepostory
    {
        Task<List<Gjuhet>> GetAllAsync();
        Task<Gjuhet?> GetByIdAsync(Guid id);
        Task<Gjuhet> CreateAsync( Gjuhet gjuhet);
        Task<Gjuhet?> UpdateAsync(Guid id, Gjuhet gjuhet);
        Task<Gjuhet?> DeleteAsync(Guid id);
        Task<Gjuhet?> GetByNameAsync(string name);
    }
}
