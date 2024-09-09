using riims.Models.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace riims.Repositories
{
    public interface INiveliGjuhesorRepository
    {
        Task<List<NiveliGjuhesor>> GetAllAsync();

        Task<NiveliGjuhesor?> GetByIdAsync(Guid id);

        Task<NiveliGjuhesor> CreateAsync(NiveliGjuhesor niveliGjuhesor);

        Task<NiveliGjuhesor?> UpdateAsync(Guid id, NiveliGjuhesor niveliGjuhesor);

        Task<NiveliGjuhesor?> DeleteAsync(Guid id);

        Task<NiveliGjuhesor?> GetByNameAsync(string niveli);

    }
}
