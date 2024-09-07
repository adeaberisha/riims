using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;

namespace riims.Repositories
{
    public class SQLNiveliGjuhesorRepository : INiveliGjuhesorRepository
    {
        private readonly RiimsDbContext _dbContext;

        public SQLNiveliGjuhesorRepository(RiimsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<NiveliGjuhesor> CreateAsync(string userId, NiveliGjuhesor niveliGjuhesor)
        {
            // Assuming you want to associate this level with a specific user
            var userGjuhet = new UserGjuhet
            {
                UserId = userId,
                NiveliGjuhesor = niveliGjuhesor
            };

            niveliGjuhesor.UserGjuhet.Add(userGjuhet);

            await _dbContext.NiveliGjuhesor.AddAsync(niveliGjuhesor);
            await _dbContext.SaveChangesAsync();
            return niveliGjuhesor;
        }

        public async Task<NiveliGjuhesor?> DeleteAsync(Guid id)
        {
            var existingNiveliGjuhesor = await _dbContext.NiveliGjuhesor.FirstOrDefaultAsync(x => x.Id == id);

            if (existingNiveliGjuhesor == null)
            {
                return null;
            }

            _dbContext.NiveliGjuhesor.Remove(existingNiveliGjuhesor);
            await _dbContext.SaveChangesAsync();

            return existingNiveliGjuhesor;
        }

        public async Task<List<NiveliGjuhesor>> GetAllAsync(string userId)
        {
            return await _dbContext.NiveliGjuhesor
                .Where(x => x.UserGjuhet.Any(ug => ug.UserId == userId))
                .ToListAsync();
        }

        public async Task<NiveliGjuhesor?> GetByIdAsync(Guid id)
        {
            return await _dbContext.NiveliGjuhesor.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<NiveliGjuhesor?> UpdateAsync(Guid id, NiveliGjuhesor niveliGjuhesor)
        {
            var existingNiveliGjuhesor = await _dbContext.NiveliGjuhesor.FirstOrDefaultAsync(x => x.Id == id);

            if (existingNiveliGjuhesor == null)
            {
                return null;
            }

            existingNiveliGjuhesor.Niveli = niveliGjuhesor.Niveli;
            // Update other properties if needed

            await _dbContext.SaveChangesAsync();
            return existingNiveliGjuhesor;
        }
    }
}

