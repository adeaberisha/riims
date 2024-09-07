using riims.Models.Domain;

namespace riims.Repositories
{
    public interface IProjektiRepository
    {
        Task<List<Projekti>> GetAllAsync(string userId);

        Task<Projekti?> GetByIdAsync(Guid id);

        Task<Projekti> CreateAsync(string userId, Projekti projekti);

        Task<Projekti?> UpdateAsync(Guid id, Projekti projekti);

        Task<Projekti?> DeleteAsync(Guid id);
    }
}
