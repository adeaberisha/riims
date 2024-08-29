using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;

namespace riims.Repositories
{
    public class SQLGjuhetRepository : IGjuhetRepostory
    {
        private readonly RiimsDbContext dbContext;

        public SQLGjuhetRepository(RiimsDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Gjuhet> CreateAsync(//Guid userId,
                                              Gjuhet gjuhet)
        {
            //gjuhet.UserId = userId;
            await dbContext.Gjuhet.AddAsync(gjuhet);
            await dbContext.SaveChangesAsync();
            return gjuhet;
        }

        public async Task<Gjuhet?> DeleteAsync(Guid id)
        {
            var existingGjuhet = await dbContext.Gjuhet.FirstOrDefaultAsync(x => x.Id == id);

            if (existingGjuhet == null) { return null; }

            dbContext.Gjuhet.Remove(existingGjuhet);
            await dbContext.SaveChangesAsync();
            return existingGjuhet;

        }

        public async Task<List<Gjuhet>> GetAllAsync(//Guid userId
                                                    )
        {
            return await dbContext.Gjuhet.ToListAsync();
        }

        public async Task<Gjuhet?> GetByIdAsync(Guid id)
        {
            return await dbContext.Gjuhet.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Gjuhet?> UpdateAsync(Guid id, Gjuhet gjuhet)
        {
            var existingGjuhet = await dbContext.Gjuhet.FirstOrDefaultAsync(x => x.Id == id);

            if (existingGjuhet == null) { return null; }

            existingGjuhet.EmriGjuhes = gjuhet.EmriGjuhes;

            await dbContext.SaveChangesAsync();
            return existingGjuhet;
        }
    }
}
