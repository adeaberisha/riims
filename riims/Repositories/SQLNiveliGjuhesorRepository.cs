using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO;

namespace riims.Repositories
{
    public class SQLNiveliGjuhesorRepository : INiveliGjuhesorRepository
    {
        private readonly RiimsDbContext dbContext;

        public SQLNiveliGjuhesorRepository(RiimsDbContext dbContext) => this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));

        public RiimsDbContext DbContext { get; }

        // Create a new NiveliGjuhesor
        public async Task<NiveliGjuhesor> CreateAsync(NiveliGjuhesor niveliGjuhesor)
        {
            await dbContext.NiveliGjuhesor.AddAsync(niveliGjuhesor);
            await dbContext.SaveChangesAsync();
            return niveliGjuhesor;
        }

        // Delete an existing NiveliGjuhesor by Id
        public async Task<NiveliGjuhesor?> DeleteAsync(Guid id)
        {
            var existingNiveliGjuhesor = await dbContext.NiveliGjuhesor.FirstOrDefaultAsync(x => x.Id == id);

            if (existingNiveliGjuhesor == null)
            {
                return null;
            }

            dbContext.NiveliGjuhesor.Remove(existingNiveliGjuhesor);
            await dbContext.SaveChangesAsync();

            return existingNiveliGjuhesor;
        }

        // Get all NiveliGjuhesor records
        public async Task<List<NiveliGjuhesor>> GetAllAsync()
        {
            return await dbContext.NiveliGjuhesor.ToListAsync();
        }

        // Get a specific NiveliGjuhesor by its Id
        public async Task<NiveliGjuhesor?> GetByIdAsync(Guid id)
        {
            return await dbContext.NiveliGjuhesor.FirstOrDefaultAsync(x => x.Id == id);
        }

        // Update an existing NiveliGjuhesor
        public async Task<NiveliGjuhesor?> UpdateAsync(Guid id, NiveliGjuhesor niveliGjuhesor)
        {
            var existingNiveliGjuhesor = await dbContext.NiveliGjuhesor.FirstOrDefaultAsync(x => x.Id == id);

            if (existingNiveliGjuhesor == null)
            {
                return null;
            }

            existingNiveliGjuhesor.Niveli = niveliGjuhesor.Niveli;
            // Update other necessary properties if needed

            await dbContext.SaveChangesAsync();
            return existingNiveliGjuhesor;
        }
    }
}

