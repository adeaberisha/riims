using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;

namespace riims.Repositories
{
    public class SQLPunaVullnetareRepository : IPunaVullnetareRepository
    {
        private readonly RiimsDbContext dbcontext;

        public SQLPunaVullnetareRepository(RiimsDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        public async Task<PunaVullnetare> CreateAsync(string userId, PunaVullnetare punaVullnetare)
        {
            punaVullnetare.UserId = userId;
            await dbcontext.PunaVullnetare.AddAsync(punaVullnetare);
            await dbcontext.SaveChangesAsync();
            return punaVullnetare;
        }

        public async Task<PunaVullnetare?> DeleteAsync(Guid id)
        {
            var existingPunaVullnetare = await dbcontext.PunaVullnetare
                .Include(pv => pv.Institucioni)
                .FirstOrDefaultAsync(x => x.Id == id);

            if(existingPunaVullnetare == null)
            {
                return null;
            }

            dbcontext.PunaVullnetare.Remove(existingPunaVullnetare);
            await dbcontext.SaveChangesAsync();

            return existingPunaVullnetare;
        }

        public async Task<List<PunaVullnetare>> GetAllAsync(string userId)
        {
            // Retrieve all PunaVullnetare records for the given userId
            return await dbcontext.PunaVullnetare
                .Include(pv => pv.Institucioni) // Include the Institucioni navigation property
                .Where(pv => pv.UserId == userId)
                .ToListAsync();
        }

        public async Task<PunaVullnetare?> GetByIdAsync(Guid id)
        {
            // Retrieve the PunaVullnetare record by its Id
            return await dbcontext.PunaVullnetare
                .Include(pv => pv.Institucioni) // Include the Institucioni navigation property
                .FirstOrDefaultAsync(pv => pv.Id == id);
        }

        public async Task<PunaVullnetare?> UpdateAsync(Guid id, PunaVullnetare punaVullnetare)
        {
            var existingPunaVullnetare = await dbcontext.PunaVullnetare
                .FirstOrDefaultAsync(x => x.Id == id);

            if (existingPunaVullnetare == null)
            {
                return null;
            }

            existingPunaVullnetare.Roli = punaVullnetare.Roli;
            existingPunaVullnetare.DataFillimit = punaVullnetare.DataFillimit;
            existingPunaVullnetare.DataMbarimit = punaVullnetare.DataMbarimit;
            existingPunaVullnetare.Pershkrimi = punaVullnetare.Pershkrimi;
            existingPunaVullnetare.Institucioni = punaVullnetare.Institucioni;

            await dbcontext.SaveChangesAsync();
            return existingPunaVullnetare;
        }
    }
}
