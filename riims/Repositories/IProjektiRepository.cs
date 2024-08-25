using riims.Models.Domain;

namespace riims.Repositories
{
    public interface IProjektiRepository
    {
        Task<List<Projekti>> GetAllAsync(Guid userId);

        Task<Projekti?> GetByIdAsync(Guid id);

        Task<Projekti> CreateAsync(Guid userId, Projekti projekti);

        Task<Projekti?> UpdateAsync(Guid id, Projekti projekti);

        Task<Projekti?> DeleteAsync(Guid id);
    }
}
