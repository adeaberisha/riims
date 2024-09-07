using riims.Models.Domain;

namespace riims.Repositories
{
    public interface INiveliGjuhesorRepository
    {
        Task<List<NiveliGjuhesor>> GetAllAsync(string userId);

        Task<NiveliGjuhesor?> GetByIdAsync(Guid id);

        Task<NiveliGjuhesor> CreateAsync(string userId, NiveliGjuhesor niveliGjuhesor);

        Task<NiveliGjuhesor?> UpdateAsync(Guid id, NiveliGjuhesor niveliGjuhesor);

        Task<NiveliGjuhesor?> DeleteAsync(Guid id);
    }
}
