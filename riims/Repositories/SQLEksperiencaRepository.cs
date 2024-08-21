using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO;

namespace riims.Repositories
{
    public class SQLEksperiencaRepository : IEksperiencaRepository
    {
        private readonly RiimsDbContext dbContext;
        public SQLEksperiencaRepository(RiimsDbContext dbContext) => this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));

        public RiimsDbContext DbContext { get; }

        public async Task<Eksperienca> CreateAsync(Guid userId, Eksperienca eksperienca)
        {           
            eksperienca.UserId = userId;
          
            await dbContext.Eksperienca.AddAsync(eksperienca);
          
            await dbContext.SaveChangesAsync();
           
            return eksperienca;
        }

        public async Task<Eksperienca?> DeleteAsync(Guid id)
        {
            var existingEksperienca = await dbContext.Eksperienca.FirstOrDefaultAsync(x => x.Id == id);

            if (existingEksperienca == null)
            {
                return null;
            }

            dbContext.Eksperienca.Remove(existingEksperienca);
            await dbContext.SaveChangesAsync();
            return existingEksperienca;
        }

        public async Task<List<Eksperienca>> GetAllAsync(Guid userId)
        {
            return await dbContext.Eksperienca
             .Where(x => x.UserId == userId) 
             .ToListAsync();  
        }

        public async Task<Eksperienca?> GetByIdAsync(Guid id)
        {
            return await dbContext.Eksperienca.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Eksperienca?> UpdateAsync(Guid id, Eksperienca eksperienca)
        {
            var existingEksperienca = await dbContext.Eksperienca.FirstOrDefaultAsync(x => x.Id == id);

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

            await dbContext.SaveChangesAsync();
            return existingEksperienca;
        }
    }
}