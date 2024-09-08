using riims.Models.Domain;

namespace riims.Repositories
{
    public interface INiveliAkademikRepository
    {
        Task<List<NiveliAkademik>> GetAllAsync();
        Task<NiveliAkademik?> GetByIdAsync(Guid id);
        Task<NiveliAkademik> CreateAsync(NiveliAkademik niveliAkademik);
        Task<NiveliAkademik?> UpdateAsync(Guid id, NiveliAkademik niveliAkademik);
        Task<NiveliAkademik?> DeleteAsync(Guid id);
        Task<NiveliAkademik?> GetByNameAsync(string lvl);
    }
}
