using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO;

namespace riims.Repositories
{
    public class SQLHonorsAndAwardsRepository : IHonorsAndAwardsRepository
    {

        private readonly RiimsDbContext dbContext;
        public SQLHonorsAndAwardsRepository(RiimsDbContext dbContext) => this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));

        public RiimsDbContext DbContext { get; }

        public async Task<HonorsAndAwards> CreateAsync(Guid userId, HonorsAndAwards honorsandawards)
        {
            honorsandawards.UserId = userId;

            await dbContext.HonorsAndAwards.AddAsync(honorsandawards);

            await dbContext.SaveChangesAsync();

            return honorsandawards;
        }

        public async Task<HonorsAndAwards?> DeleteAsync(Guid id)
        {
            var existingHonorsAndAwards = await dbContext.HonorsAndAwards.FirstOrDefaultAsync(x => x.Id == id);

            if (existingHonorsAndAwards == null)
            {
                return null;
            }

            dbContext.HonorsAndAwards.Remove(existingHonorsAndAwards);
            await dbContext.SaveChangesAsync();
            return existingHonorsAndAwards;
        }

        public async Task<List<HonorsAndAwards>> GetAllAsync(Guid userId)
        {
            return await dbContext.HonorsAndAwards
             .Where(x => x.UserId == userId)
             .ToListAsync();
        }

        public async Task<HonorsAndAwards?> GetByIdAsync(Guid id)
        {
            return await dbContext.HonorsAndAwards.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<HonorsAndAwards?> UpdateAsync(Guid id, HonorsAndAwards honorsandawards)
        {
            var existingHonorsAndAwards = await dbContext.HonorsAndAwards.FirstOrDefaultAsync(x => x.Id == id);

            if (existingHonorsAndAwards == null)
            {
                return null;
            }

            existingHonorsAndAwards.titulli = honorsandawards.titulli;
            existingHonorsAndAwards.issuer = honorsandawards.issuer;
            existingHonorsAndAwards.dataEleshimit = honorsandawards.dataEleshimit;
            existingHonorsAndAwards.pershkrimi = honorsandawards.pershkrimi;


            await dbContext.SaveChangesAsync();
            return existingHonorsAndAwards;
        }
    }
}
