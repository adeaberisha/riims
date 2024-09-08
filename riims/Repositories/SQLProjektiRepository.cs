using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO;
using riims.Models.DTO.ProjektiDto;
using System.ComponentModel;

namespace riims.Repositories
{
    public class SQLProjektiRepository : IProjektiRepository
    {
        private readonly RiimsDbContext dbContext;
        public SQLProjektiRepository(RiimsDbContext dbContext) => this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));

        public RiimsDbContext DbContext { get; }

        public async Task<Projekti> CreateAsync(string userId, Projekti projekti)
        {
            projekti.UserId = userId;

            await dbContext.Projekti.AddAsync(projekti);

            await dbContext.SaveChangesAsync();

            return projekti;
        }

        public async Task<Projekti?> DeleteAsync(Guid id)
        {
            var existingProjekti = await dbContext.Projekti
                 .Include(p => p.Institucioni)
                .FirstOrDefaultAsync(x => x.Id == id); 

            if (existingProjekti == null)
            {
                return null;
            }

            dbContext.Projekti.Remove(existingProjekti);
            await dbContext.SaveChangesAsync();
            return existingProjekti;
        }

        public async Task<List<Projekti>> GetAllAsync(string userId)
        {
            return await dbContext.Projekti
              .Include(x => x.Institucioni)
             .Where(x => x.UserId == userId)
             .ToListAsync();
        }

        public async Task<Projekti?> GetByIdAsync(Guid id)
        {
            return await dbContext.Projekti
             .Include(x => x.Institucioni) // Include the Institucioni navigation property
             .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Projekti?> UpdateAsync(Guid id, Projekti projekti)
        {
            var existingProjekti = await dbContext.Projekti.FirstOrDefaultAsync(x => x.Id == id);

            if (existingProjekti == null)
            {
                return null;
            }

            existingProjekti.emriProjektit = projekti.emriProjektit;
            existingProjekti.startDate = projekti.startDate;
            existingProjekti.endDate = projekti.endDate;
            existingProjekti.collaborators = projekti.collaborators;
            existingProjekti.description = projekti.description;
            existingProjekti.asocohet = projekti.asocohet;
            existingProjekti.Institucioni = projekti.Institucioni;


            await dbContext.SaveChangesAsync();
            return existingProjekti;
        }
    }
}