using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;


namespace riims.Repositories
{
    public class SQLDepartamentiRepository : IDepartamentiRepository
    {
        private readonly RiimsDbContext dbcontext;

        public SQLDepartamentiRepository(RiimsDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        public async Task<Departamenti?> DeleteAsync(Guid id)
        {
            var existingDepartamenti = await dbcontext.Departamenti.FirstOrDefaultAsync(x => x.Id == id);

            if (existingDepartamenti == null)
            {
                return null;
            }

            dbcontext.Departamenti.Remove(existingDepartamenti);
            await dbcontext.SaveChangesAsync();

            return existingDepartamenti;
        }

        public async Task<List<Departamenti>> GetAllAsync()
        {
            return await dbcontext.Departamenti.ToListAsync();
        }

        public async Task<Departamenti?> GetByIdAsync(Guid id)
        {
            return await dbcontext.Departamenti.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Departamenti?> UpdateAsync(Guid id, Departamenti departamenti)
        {
            var existingDepartamenti = await dbcontext.Departamenti.FirstOrDefaultAsync(x => x.Id == id);

            if (existingDepartamenti == null)
            {
                return null;
            }

            existingDepartamenti.Emri = departamenti.Emri;

            await dbcontext.SaveChangesAsync();
            return existingDepartamenti;
        }

        public async Task<Departamenti> CreateAsync(Departamenti departamenti)
        {
            await dbcontext.Departamenti.AddAsync(departamenti);
            await dbcontext.SaveChangesAsync();
            return departamenti;
        }
    }
}