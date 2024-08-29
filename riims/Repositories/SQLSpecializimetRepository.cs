using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;

namespace riims.Repositories
{
    public class SQLSpecializimetRepository : ISpecializimetRepository
    {
        private readonly RiimsDbContext dbcontext;

        public SQLSpecializimetRepository(RiimsDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }
        public async Task<Specializimet> CreateAsync(Guid userId, Specializimet specializimi)
        {
            specializimi.UserId = userId;
            await dbcontext.Specializimet.AddAsync(specializimi);
            await dbcontext.SaveChangesAsync();
            return specializimi;
        }

        public async Task<Specializimet?> DeleteAsync(Guid id)
        {
            var existingSpecializimi = await dbcontext.Specializimet.FirstOrDefaultAsync(x => x.Id == id);

            if (existingSpecializimi == null)
            {
                return null;
            }

            dbcontext.Specializimet.Remove(existingSpecializimi);
            await dbcontext.SaveChangesAsync();

            return existingSpecializimi;
        }

        public async Task<List<Specializimet>> GetAllAsync(Guid userId)
        {
            return await dbcontext.Specializimet
                .Where(x => x.UserId == userId)
                .ToListAsync();
        }

        public async Task<Specializimet?> GetByIdAsync(Guid id)
        {
            return await dbcontext.Specializimet.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Specializimet?> UpdateAsync(Guid id, Specializimet specializimi)
        {
            var existingSpecializimi = await dbcontext.Specializimet.FirstOrDefaultAsync(x => x.Id == id);

            if (existingSpecializimi == null)
            {
                return null;
            }

            existingSpecializimi.llojiIspecializimit = specializimi.llojiIspecializimit;
            existingSpecializimi.lokacionit = specializimi.lokacionit;
            existingSpecializimi.dataEFillimit = specializimi.dataEFillimit;
            existingSpecializimi.dataEMbarimit = specializimi.dataEMbarimit;
            existingSpecializimi.aftesiteEfituara = specializimi.aftesiteEfituara;
            existingSpecializimi.pershkrimi = specializimi.pershkrimi;
            existingSpecializimi.nrKredive = specializimi.nrKredive;
            existingSpecializimi.Institucioni = specializimi.Institucioni;

            await dbcontext.SaveChangesAsync();
            return existingSpecializimi;
        }
    }
}
