using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;

namespace riims.Repositories
{
    public class SQLMbikqyresRepository: IMbikqyresRepository
    {
        private readonly RiimsDbContext dbcontext;

        public SQLMbikqyresRepository(RiimsDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        public async Task<MbikqyresITemave> CreateAsync(string userId, MbikqyresITemave mbikqyres)
        {
            mbikqyres.UserId = userId;
            await dbcontext.MbikqyresITemave.AddAsync(mbikqyres);
            await dbcontext.SaveChangesAsync();
            return mbikqyres;
        }

        public async Task<MbikqyresITemave?> DeleteAsync(Guid id)
        {
            var existingMbikqyres = await dbcontext.MbikqyresITemave
                .Include(pv => pv.Departamenti)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (existingMbikqyres == null)
            {
                return null;
            }

            dbcontext.MbikqyresITemave.Remove(existingMbikqyres);
            await dbcontext.SaveChangesAsync();

            return existingMbikqyres;
        }

        public async Task<List<MbikqyresITemave>> GetAllAsync(string userId)
        {
            return await dbcontext.MbikqyresITemave
             .Where(e => e.UserId == userId)
             .Include(e => e.Departamenti)
             .ToListAsync();
        }

        public async Task<MbikqyresITemave?> GetByIdAsync(Guid id)
        {
            return await dbcontext.MbikqyresITemave
            .Include(e => e.Departamenti)
            .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<MbikqyresITemave?> UpdateAsync(Guid id, MbikqyresITemave mbikqyres)
        {
            var existingMbikqyres = await dbcontext.MbikqyresITemave.FirstOrDefaultAsync(x => x.Id == id);

            if (existingMbikqyres == null)
            {
                return null;
            }

            existingMbikqyres.titulliTemes = mbikqyres.titulliTemes;
            existingMbikqyres.studenti = mbikqyres.studenti;
            existingMbikqyres.data = mbikqyres.data;
            existingMbikqyres.studenti = mbikqyres.studenti;
            existingMbikqyres.Departamenti = mbikqyres.Departamenti;

            await dbcontext.SaveChangesAsync();
            return existingMbikqyres;
        }
    }
}
