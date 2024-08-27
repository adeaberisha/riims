using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;

namespace riims.Repositories
{
    public class SQLEdukimiRepository : IEdukimiRepository
    {
        private readonly RiimsDbContext dbcontext;

        public SQLEdukimiRepository(RiimsDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        public async Task<Edukimi> CreateAsync(Guid userId, Edukimi edukimi)
        {
            edukimi.UserId = userId;
            await dbcontext.Edukimi.AddAsync(edukimi);
            await dbcontext.SaveChangesAsync();
            return edukimi;
        }

        public async Task<Edukimi?> DeleteAsync(Guid id)
        {
            var existingEdukimi = await dbcontext.Edukimi.FirstOrDefaultAsync(x => x.Id == id);

            if (existingEdukimi == null)
            {
                return null;
            }

            dbcontext.Edukimi.Remove(existingEdukimi);
            await dbcontext.SaveChangesAsync();

            return existingEdukimi;
        }

        public async Task<List<Edukimi>> GetAllAsync(Guid userId)
        {
            return await dbcontext.Edukimi
                .Where(x => x.UserId == userId)
                .ToListAsync();
        }

        public async Task<Edukimi> GetByIdAsync(Guid id)
        {
            return await dbcontext.Edukimi.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Edukimi?> UpdateAsync(Guid id, Edukimi edukimi)
        {
            var existingEdukimi = await dbcontext.Edukimi.FirstOrDefaultAsync(x => x.Id == id);

            if(existingEdukimi == null)
            {
                return null;
            }

            existingEdukimi.FushaStudimit = edukimi.FushaStudimit;
            existingEdukimi.Lokacioni = edukimi.Lokacioni;
            existingEdukimi.DataFillimit = edukimi.DataFillimit;
            existingEdukimi.DataMbarimit = edukimi.DataMbarimit;
            existingEdukimi.Pershkrimi = edukimi.Pershkrimi;

            await dbcontext.SaveChangesAsync();
            return existingEdukimi;
        }
    }
}
