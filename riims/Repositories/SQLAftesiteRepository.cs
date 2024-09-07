using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;

namespace riims.Repositories
{
    public class SQLAftesiteRepository : IAftesiteRepository
    {
        private readonly RiimsDbContext dbcontext;

        public SQLAftesiteRepository(RiimsDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }
        public async Task<Aftesite> CreateAsync(string userId, Aftesite aftesite)
        {
            aftesite.UserId = userId;
            await dbcontext.Aftesite.AddAsync(aftesite);
            await dbcontext.SaveChangesAsync();
            return aftesite;
        }

        public async Task<Aftesite?> DeleteAsync(Guid id)
        {
            var existingAftesia = await dbcontext.Aftesite.FirstOrDefaultAsync(x => x.Id == id);

            if (existingAftesia == null)
            {
                return null;
            }

            dbcontext.Aftesite.Remove(existingAftesia);
            await dbcontext.SaveChangesAsync();

            return existingAftesia;
        }

        public async Task<List<Aftesite>> GetAllAsync(string userId)
        {
            return await dbcontext.Aftesite
             .Include(a => a.Institucioni) // Include the Institucioni navigation property
             .Where(a => a.UserId == userId)
             .ToListAsync();
        }

        public async Task<Aftesite?> GetByIdAsync(Guid id)
        {
            return await dbcontext.Aftesite
             .Include(a => a.Institucioni) // Include the Institucioni navigation property
             .FirstOrDefaultAsync(a => a.Id == id);
            
        }

        public async Task<Aftesite?> UpdateAsync(Guid id, Aftesite aftesite)
        {
            var existingAftesia = await dbcontext.Aftesite.FirstOrDefaultAsync(x => x.Id == id);

            if (existingAftesia == null)
            {
                return null;
            }

            existingAftesia.Emri = aftesite.Emri;
            existingAftesia.Institucioni = aftesite.Institucioni;
            
            await dbcontext.SaveChangesAsync();
            return existingAftesia;
        }
    }
}
