using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;

namespace riims.Repositories
{
    public class LocalImageRepository : IImageRepository
    {
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly RiimsDbContext dbContext;

        public LocalImageRepository(IWebHostEnvironment webHostEnvironment,
            IHttpContextAccessor httpContextAccessor,
            RiimsDbContext dbContext)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.httpContextAccessor = httpContextAccessor;
            this.dbContext = dbContext;
        }

        public async Task<Image> Upload(string userId, Image image)
        {
            var localFilePath = Path.Combine(webHostEnvironment.ContentRootPath, "Images",
                $"{image.FileName}{image.FileExtension}");

            // Upload image to local path
            using var stream = new FileStream(localFilePath, FileMode.Create);
            await image.File.CopyToAsync(stream);

            // Generate the URL for the uploaded image
            var urlFilePath = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}{httpContextAccessor.HttpContext.Request.PathBase}/Images/{image.FileName}{image.FileExtension}";

            image.FilePath = urlFilePath;

            // Add image to the database
            await dbContext.Images.AddAsync(image);
            await dbContext.SaveChangesAsync();

            // Retrieve the user and update with the new image Id
            var user = await dbContext.Users.FindAsync(userId);
            if (user != null)
            {
                user.ImageId = image.Id;
                await dbContext.SaveChangesAsync();
            }

            return image;
        }

        public async Task<Image?> GetImageByUserId(string userId)
        {
            // Retrieve the user
            var user = await dbContext.Users.FindAsync(userId);
            if (user != null && user.ImageId.HasValue)
            {
                // Retrieve the image associated with the user
                return await dbContext.Images.FindAsync(user.ImageId.Value);
            }

            return null;
        }

        public async Task<bool> DeleteImageByUserId(string userId)
        {
            // Retrieve the user
            var user = await dbContext.Users.FindAsync(userId);
            if (user == null || !user.ImageId.HasValue)
            {
                return false;
            }

            // Retrieve the image associated with the user
            var image = await dbContext.Images.FindAsync(user.ImageId.Value);
            if (image == null)
            {
                return false;
            }

            // Delete the local image file
            var localFilePath = Path.Combine(webHostEnvironment.ContentRootPath, "Images",
                $"{image.FileName}{image.FileExtension}");

            if (System.IO.File.Exists(localFilePath))
            {
                System.IO.File.Delete(localFilePath);
            }

            // Remove the image from the database
            dbContext.Images.Remove(image);

            // Update the user's ImageId to null
            user.ImageId = null;
            await dbContext.SaveChangesAsync();

            return true;
        }
    }
}
