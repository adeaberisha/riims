using riims.Models.Domain;

namespace riims.Repositories
{
    public interface IGjuhetRepostory
    {
        Task<List<Gjuhet>> GetAllAsync(//Guid userId
                                       );

        Task<Gjuhet?> GetByIdAsync(Guid id);

        Task<Gjuhet> CreateAsync(//Guid userId,
                                 Gjuhet gjuhet);

        Task<Gjuhet?> UpdateAsync(Guid id, Gjuhet gjuhet);

        Task<Gjuhet?> DeleteAsync(Guid id);
    }
}
