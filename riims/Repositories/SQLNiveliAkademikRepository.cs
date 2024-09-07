using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;

namespace riims.Repositories
{
    public class SQLNiveliAkademikRepository : INiveliAkademikRepository
    {

        private readonly RiimsDbContext dbcontext;

        public SQLNiveliAkademikRepository(RiimsDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        public async Task<NiveliAkademik> CreateAsync(NiveliAkademik niveliAkademik)
        {
            await dbcontext.NiveliAkademik.AddAsync(niveliAkademik); 
            await dbcontext.SaveChangesAsync();
            return niveliAkademik;
        }


        public async Task<NiveliAkademik?> DeleteAsync(Guid id)
        {
            var existingNiveliAkademik = await dbcontext.NiveliAkademik.FirstOrDefaultAsync(x => x.Id == id);

            if (existingNiveliAkademik == null)
            {
                return null;
            }

            dbcontext.NiveliAkademik.Remove(existingNiveliAkademik);
            await dbcontext.SaveChangesAsync();

            return existingNiveliAkademik;
        }

        public async Task<List<NiveliAkademik>> GetAllAsync()
        {
            return await dbcontext.NiveliAkademik.ToListAsync();
        }

        public async Task<NiveliAkademik?> GetByIdAsync(Guid id)
        {
            return await dbcontext.NiveliAkademik.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<NiveliAkademik?> UpdateAsync(Guid id, NiveliAkademik niveliAkademik)
        {
            var existingNiveliAkademik = await dbcontext.NiveliAkademik.FirstOrDefaultAsync(x => x.Id == id);

            if (existingNiveliAkademik == null)
            {
                return null;
            }

            existingNiveliAkademik.lvl = niveliAkademik.lvl;

            await dbcontext.SaveChangesAsync();
            return existingNiveliAkademik;
        }
    }
}
