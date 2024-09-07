using riims.Data;
using riims.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace riims.Repositories
{
    public class SQLUserGjuhetRepository : IUserGjuhetRepository
    {
        private readonly RiimsDbContext dbcontext;

        public SQLUserGjuhetRepository(RiimsDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }
        public async Task<UserGjuhet> CreateAsync(string userId, UserGjuhet userGjuhet)
        {
            userGjuhet.UserId = userId;
            await dbcontext.UserGjuhet.AddAsync(userGjuhet);
            await dbcontext.SaveChangesAsync();
            return userGjuhet;

        }

        public async Task<UserGjuhet?> DeleteAsync(Guid id)
        {
            var existingUserGjuhet = await dbcontext.UserGjuhet.FirstOrDefaultAsync(x => x.Id == id);

            if (existingUserGjuhet  == null)
            {
                return null;
            }

            dbcontext.UserGjuhet.Remove(existingUserGjuhet);
            await dbcontext.SaveChangesAsync();

            return existingUserGjuhet;
        }

        public async Task<List<UserGjuhet>> GetAllAsync(string userId)
        {
            return await dbcontext.UserGjuhet
              .Include(ug => ug.Gjuha) // Include Gjuha
              .Include(ug => ug.NiveliGjuhesor) // Include NiveliGjuhesor
              .Where(ug => ug.UserId == userId)
              .ToListAsync();
        }

        public async Task<UserGjuhet?> GetByIdAsync(Guid id)
        {
            return await dbcontext.UserGjuhet
              .Include(ug => ug.Gjuha) // Include Gjuha
              .Include(ug => ug.NiveliGjuhesor) // Include NiveliGjuhesor
              .FirstOrDefaultAsync(ug => ug.Id == id);
        }

        public async Task<UserGjuhet?> UpdateAsync(Guid id, UserGjuhet userGjuhet)
        {
            var existingUserGjuhet = await dbcontext.UserGjuhet.FirstOrDefaultAsync(x => x.Id == id);

            if (existingUserGjuhet == null)
            {
                return null;
            }

            existingUserGjuhet.Gjuha = userGjuhet.Gjuha;
            existingUserGjuhet.NiveliGjuhesor = userGjuhet.NiveliGjuhesor;

            await dbcontext.SaveChangesAsync();
            return existingUserGjuhet;
        }
    }
}
