using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;

namespace riims.Repositories
{
    public class SQLPublikimiRepository:IPublikimiRepository
    {
        private readonly RiimsDbContext dbContext;

        public SQLPublikimiRepository(RiimsDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Publikimi> CreateAsync(string userId, Publikimi publikimi)
        {
            publikimi.UserId = userId;
            await dbContext.Publikimi.AddAsync(publikimi);
            await dbContext.SaveChangesAsync();
            return publikimi;
        }

        public async Task<Publikimi?> DeleteAsync(Guid id)
        {
            var existingPublikimi = await dbContext.Publikimi
                .Include(d => d.Departamenti)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (existingPublikimi == null)
            {
                return null;
            }

            dbContext.Publikimi.Remove(existingPublikimi);
            await dbContext.SaveChangesAsync();

            return existingPublikimi;
        }

        public async Task<List<Publikimi>> GetAllAsync(string userId)
        {
            return await dbContext.Publikimi
                .Include(d => d.Departamenti)
                .Where(x => x.UserId == userId)
                .ToListAsync();
        }

        public async Task<Publikimi?> GetByIdAsync(Guid id)
        {
            return await dbContext.Publikimi
                .Include(d => d.Departamenti)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Publikimi?> UpdateAsync(Guid id, Publikimi publikimi)
        {
            var existingPublikimi = await dbContext.Publikimi.FirstOrDefaultAsync(x => x.Id == id);

            if (existingPublikimi == null)
            {
                return null;
            }

            existingPublikimi.Titulli = publikimi.Titulli;
            existingPublikimi.LlojiPublikimit = publikimi.LlojiPublikimit;
            existingPublikimi.LinkuPublikimit = publikimi.LinkuPublikimit;
            existingPublikimi.AutoriKryesor = publikimi.AutoriKryesor;
            existingPublikimi.DataPublikimi = publikimi.DataPublikimi;
            existingPublikimi.Departamenti = publikimi.Departamenti;

            await dbContext.SaveChangesAsync();
            return existingPublikimi;
        }
    }
}
