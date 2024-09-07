using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;

namespace riims.Repositories
{
    public class SQLNiveliAkademikRepository : INiveliAkademikRepository
    {
        private readonly RiimsDbContext _dbContext;

        public SQLNiveliAkademikRepository(RiimsDbContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        // Retrieve all NiveliAkademik records
        public async Task<List<NiveliAkademik>> GetAllAsync()
        {
            return await _dbContext.NiveliAkademik.ToListAsync();
        }

        // Retrieve a specific NiveliAkademik by its Id
        public async Task<NiveliAkademik?> GetByIdAsync(Guid id)
        {
            return await _dbContext.NiveliAkademik
                .Include(n => n.Users)  // If you want to include related data
                .Include(n => n.Edukimet)  // If you want to include related data
                .FirstOrDefaultAsync(n => n.Id == id);
        }

        // Create a new NiveliAkademik
        public async Task<NiveliAkademik> CreateAsync(NiveliAkademik niveliAkademik)
        {
            if (niveliAkademik == null)
            {
                throw new ArgumentNullException(nameof(niveliAkademik));
            }

            await _dbContext.NiveliAkademik.AddAsync(niveliAkademik);
            await _dbContext.SaveChangesAsync();
            return niveliAkademik;
        }

        // Update an existing NiveliAkademik
        public async Task<NiveliAkademik?> UpdateAsync(Guid id, NiveliAkademik niveliAkademik)
        {
            var existingNiveliAkademik = await _dbContext.NiveliAkademik
                .FirstOrDefaultAsync(n => n.Id == id);

            if (existingNiveliAkademik == null)
            {
                return null;
            }

            existingNiveliAkademik.lvl = niveliAkademik.lvl;
            // Update other necessary properties if needed

            await _dbContext.SaveChangesAsync();
            return existingNiveliAkademik;
        }

        // Delete a specific NiveliAkademik by its Id
        public async Task<NiveliAkademik?> DeleteAsync(Guid id)
        {
            var existingNiveliAkademik = await _dbContext.NiveliAkademik
                .FirstOrDefaultAsync(n => n.Id == id);

            if (existingNiveliAkademik == null)
            {
                return null;
            }

            _dbContext.NiveliAkademik.Remove(existingNiveliAkademik);
            await _dbContext.SaveChangesAsync();
            return existingNiveliAkademik;
        }
    }
}
