using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO;

namespace riims.Repositories
{
    public class SQLEksperiencaRepository : IEksperiencaRepository
    {
        private readonly RiimsDbContext _dbContext;

        public SQLEksperiencaRepository(RiimsDbContext dbContext)
            => _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));

        public async Task<Eksperienca> CreateAsync(Guid userId, Eksperienca eksperienca)
        {
            eksperienca.UserId = userId;
            await _dbContext.Eksperienca.AddAsync(eksperienca);
            await _dbContext.SaveChangesAsync();
            return eksperienca;
        }

        public async Task<Eksperienca?> DeleteAsync(Guid id)
        {
            var existingEksperienca = await _dbContext.Eksperienca.FirstOrDefaultAsync(x => x.Id == id);

            if (existingEksperienca == null)
            {
                return null;
            }

            _dbContext.Eksperienca.Remove(existingEksperienca);
            await _dbContext.SaveChangesAsync();
            return existingEksperienca;
        }

        public async Task<List<Eksperienca>> GetAllAsync(Guid userId)
        {
            return await _dbContext.Eksperienca
                .Include(x => x.Institucioni)
                .Where(x => x.UserId == userId)
                .ToListAsync();
        }

        public async Task<Eksperienca?> GetByIdAsync(Guid id)
        {
            return await _dbContext.Eksperienca
                .Include(x => x.Institucioni) // Include the Institucioni navigation property
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Eksperienca?> UpdateAsync(Guid id, Eksperienca eksperienca)
        {
            var existingEksperienca = await _dbContext.Eksperienca.FirstOrDefaultAsync(x => x.Id == id);

            if (existingEksperienca == null)
            {
                return null;
            }

            existingEksperienca.Titulli = eksperienca.Titulli;
            existingEksperienca.LlojiPunesimit = eksperienca.LlojiPunesimit;
            existingEksperienca.Lokacioni = eksperienca.Lokacioni;
            existingEksperienca.LlojiLokacionit = eksperienca.LlojiLokacionit;
            existingEksperienca.DataFillimit = eksperienca.DataFillimit;
            existingEksperienca.DataMbarimit = eksperienca.DataMbarimit;
            existingEksperienca.Pershkrimi = eksperienca.Pershkrimi;
            existingEksperienca.Institucioni = eksperienca.Institucioni;

            await _dbContext.SaveChangesAsync();
            return existingEksperienca;
        }
    }
}
