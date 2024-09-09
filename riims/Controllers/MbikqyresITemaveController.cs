using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using riims.Models.Domain;
using riims.Models.DTO.MbikqyresITemaveDto;
using riims.Models.DTO.PunaVullnetareDto;
using riims.Repositories;
using System.Security.Claims;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MbikqyresITemaveController : ControllerBase
    {
        private readonly IMbikqyresRepository mbikqyresRepository;
        private readonly IDepartamentiRepository departamentiRepository;
        private readonly IMapper mapper;

        public MbikqyresITemaveController(IMbikqyresRepository mbikqyresRepository,
            IDepartamentiRepository departamentiRepository,
            IMapper mapper)
        {
            this.mbikqyresRepository = mbikqyresRepository;
            this.departamentiRepository = departamentiRepository;
            this.mapper = mapper;
        }

        [HttpGet("get-mbikqyresit-by-person-id")]
        public async Task<IActionResult> GetAll()
        {
            // Extract user ID from the token
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in the token.");
            }

            var mbikqyresDomain = await mbikqyresRepository.GetAllAsync(userId);

            return Ok(mapper.Map<List<MbikqyresITemaveDTO>>(mbikqyresDomain));
        }

        [HttpGet("get-mbikqyres-by-id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var mbikqyresDomain = await mbikqyresRepository.GetByIdAsync(id);

            if (mbikqyresDomain == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<MbikqyresITemaveDTO>(mbikqyresDomain));
        }

        [HttpPost("add-mbikqyres")]
        public async Task<IActionResult> Create([FromBody] AddMbikqyresRequestDTO addMbikqyres)
        {
            // Extract user ID from the token
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(); // Or handle as appropriate
            }

            // Find the department
            var departamenti = await departamentiRepository.GetByNameAsync(addMbikqyres.EmriDepartamentit);

            // Convert the DTO to a domain model
            var mbikqyresDomain = mapper.Map<MbikqyresITemave>(addMbikqyres);
            mbikqyresDomain.UserId = userId;
            mbikqyresDomain.DepartamentiId = departamenti.Id;

            // Use the domain model to create a PunaVullnetare
            mbikqyresDomain = await mbikqyresRepository.CreateAsync(userId, mbikqyresDomain);

            // Map the domain model back to DTO
            var mbikqyresDto = mapper.Map<MbikqyresITemaveDTO>(mbikqyresDomain);

            return CreatedAtAction(nameof(GetById), new { id = mbikqyresDto.Id }, mbikqyresDto);
        }

        [HttpPut("update-mbikqyres-by-id/{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id,
            [FromBody] UpdateMbikqyresRequestDTO updateMbikqyres)
        {
            // Find the department
            var departamenti = await departamentiRepository.GetByNameAsync(updateMbikqyres.EmriDepartamentit);

            // Fetch the existing MbikqyresITemave
            var mbikqyresDomain = await mbikqyresRepository.GetByIdAsync(id);
            if (mbikqyresDomain == null)
            {
                return NotFound();
            }

            // Update the MbikqyresITemave domain model with new data
            mbikqyresDomain = mapper.Map(updateMbikqyres, mbikqyresDomain);
            mbikqyresDomain.DepartamentiId = departamenti.Id;

            // Update PunaVullnetare in the database
            mbikqyresDomain = await mbikqyresRepository.UpdateAsync(id, mbikqyresDomain);

            return Ok(mapper.Map<MbikqyresITemaveDTO>(mbikqyresDomain));
        }

        [HttpDelete("delete-mbikqyres-by-id/{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var mbikqyresDomain = await mbikqyresRepository.DeleteAsync(id);

            if (mbikqyresDomain == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<MbikqyresITemaveDTO>(mbikqyresDomain));
        }
    }
}
