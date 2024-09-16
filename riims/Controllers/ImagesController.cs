using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using riims.Models.Domain;
using riims.Models.DTO;
using riims.Repositories;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ImagesController : ControllerBase
    {
        private readonly IImageRepository imageRepository;

        public ImagesController(IImageRepository imageRepository)
        {
            this.imageRepository = imageRepository;
        }

        //POST: /api/Images/Upload
        [HttpPost]
        [Route("Upload")]

        public async Task<IActionResult> Upload([FromForm] ImageUploadRequestDto request)
        {
            ValidateFileUpload(request);

            if (ModelState.IsValid)
            {
                // Extract UserId from the claims in the token
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(); // Or handle as appropriate
                }

                // Convert DTO to Domain model
                var imageDomainModel = new Image
                {
                    File = request.File,
                    FileExtension = Path.GetExtension(request.File.FileName),
                    FileSizeInBytes = request.File.Length,
                    FileName = request.FileName,
                    FileDescription = request.FileDescription
                };

                // Use repository to upload image with extracted UserId
                await imageRepository.Upload(userId, imageDomainModel);

                // Return the uploaded image URL
                return Ok(new { url = imageDomainModel.FilePath });
            }

            return BadRequest(ModelState);
        }

        // GET: /api/Images/GetImageByUserId/{userId}
        [HttpGet]
        [Route("GetImageByUserId")]
        public async Task<IActionResult> GetImageByUserId()
        {
            // Extract the userId from the token
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in the token.");
            }

            // Fetch the image associated with the userId
            var image = await imageRepository.GetImageByUserId(userId);
            if (image == null)
            {
                return NotFound();
            }

            // Return the URL of the image
            return Ok(new { url = image.FilePath });
        }

        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> DeleteImageByUserId()
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in the token.");
            }

            var result = await imageRepository.DeleteImageByUserId(userId);

            if (!result)
            {
                return NotFound("Image not found or could not be deleted.");
            }

            return Ok("Image deleted successfully.");
        }



        private void ValidateFileUpload(ImageUploadRequestDto request)
        {
            var allowedExtensions = new string[] { ".jpg", ".jpeg", ".png" };

            if (!allowedExtensions.Contains(Path.GetExtension(request.File.FileName)))
            {
                ModelState.AddModelError("file", "Unsupported file extension");
            }

            if (request.File.Length > 10485670)
            {
                ModelState.AddModelError("file", "File size exceeds 10MB, please upload a smaller file.");
            }
        }
    }
}