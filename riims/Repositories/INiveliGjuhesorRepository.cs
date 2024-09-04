using riims.Models.Domain;

namespace riims.Repositories
{
    public interface INiveliGjuhesorRepository
    {
        Task<List<NiveliGjuhesor>> GetAllAsync(Guid userId);

        Task<NiveliGjuhesor?> GetByIdAsync(Guid id);

        Task<NiveliGjuhesor> CreateAsync(Guid userId, NiveliGjuhesor niveliGjuhesor);

        Task<NiveliGjuhesor?> UpdateAsync(Guid id, NiveliGjuhesor niveliGjuhesor);

        Task<NiveliGjuhesor?> DeleteAsync(Guid id);
    }
}
