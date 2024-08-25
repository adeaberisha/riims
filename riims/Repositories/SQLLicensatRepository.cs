using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO;

namespace riims.Repositories
{
    public class SQLLicensatRepository : ILicensatRepository
    {
        private readonly RiimsDbContext dbContext;
        public SQLLicensatRepository(RiimsDbContext dbContext) => this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));

        public RiimsDbContext DbContext { get; }

        public async Task<Licensat> CreateAsync(Guid userId, Licensat licensat)
        {
            licensat.UserId = userId;

            await dbContext.Licensat.AddAsync(licensat);

            await dbContext.SaveChangesAsync();

            return licensat;
        }

        public async Task<Licensat?> DeleteAsync(Guid id)
        {
            var existingLicensat = await dbContext.Licensat.FirstOrDefaultAsync(x => x.Id == id);

            if (existingLicensat == null)
            {
                return null;
            }

            dbContext.Licensat.Remove(existingLicensat);
            await dbContext.SaveChangesAsync();
            return existingLicensat;
        }

        public async Task<List<Licensat>> GetAllAsync(Guid userId)
        {
            return await dbContext.Licensat
             .Where(x => x.UserId == userId)
             .ToListAsync();
        }

        public async Task<Licensat?> GetByIdAsync(Guid id)
        {
            return await dbContext.Licensat.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Licensat?> UpdateAsync(Guid id, Licensat licensat)
        {
            var existingLicensat = await dbContext.Licensat.FirstOrDefaultAsync(x => x.Id == id);

            if (existingLicensat == null)
            {
                return null;
            }

            existingLicensat.Emri = licensat.Emri;
            existingLicensat.DataLeshimit = licensat.DataLeshimit;
            existingLicensat.DataSkadimit = licensat.DataSkadimit;
            existingLicensat.CredentialId = licensat.CredentialId;
            existingLicensat.CredentialUrl = licensat.CredentialUrl;
            
            await dbContext.SaveChangesAsync();
            return existingLicensat;
        }
    }
}