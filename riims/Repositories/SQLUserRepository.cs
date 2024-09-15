using riims.Data;
using riims.Models.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace riims.Repositories
{
    public class SQLUserRepository : IUserRepository
    {
        private readonly RiimsDbContext dbcontext;

        public SQLUserRepository(RiimsDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        public async Task<User> CreateAsync(User user)
        {
            await dbcontext.User.AddAsync(user);
            await dbcontext.SaveChangesAsync();
            return user;
        }

        public async Task<User?> DeleteAsync(string id)
        {
            var existingUser = await dbcontext.User.FirstOrDefaultAsync(x => x.Id == id);

            if (existingUser == null)
            {
                return null;
            }

            dbcontext.User.Remove(existingUser);
            await dbcontext.SaveChangesAsync();

            return existingUser; // Return the deleted user
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await dbcontext.User
              .Include(u => u.NiveliAkademik) 
              .ToListAsync();
        }

        public async Task<User?> GetByIdAsync(string id)
        {
            return await dbcontext.User
               .Include(u => u.NiveliAkademik) 
               .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User?> UpdateAsync(string id, User user)
        {
            var existingUser = await dbcontext.User.FirstOrDefaultAsync(x => x.Id == id);

            if (existingUser == null)
            {
                return null;
            }

            existingUser.emri = user.emri;
            existingUser.mbiemri = user.mbiemri;
            existingUser.adresa = user.adresa;
            existingUser.gjinia = user.gjinia;
            existingUser.dataELindjes = user.dataELindjes;
            existingUser.numriTelefonit = user.numriTelefonit;
            existingUser.NiveliAkademik = user.NiveliAkademik;

            if (user.ImageId.HasValue)
            {
                existingUser.ImageId = user.ImageId.Value;
            }

            await dbcontext.SaveChangesAsync();
            return existingUser;
        }
    }
}
