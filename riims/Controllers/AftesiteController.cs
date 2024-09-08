using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO;
using riims.Models.DTO.AftesiteDto;
using riims.Models.DTO.PunaVullnetareDto;
using riims.Repositories;
using System.Security.Claims;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AftesiteController : ControllerBase
    {

        private readonly IAftesiteRepository aftesiteRepository;
        private readonly IInstitucioniRepository institucioniRepository;
        private readonly IMapper mapper;

        public AftesiteController(IAftesiteRepository aftesiteRepository, IInstitucioniRepository institucioniRepository,
            IMapper mapper)
        {
            this.aftesiteRepository = aftesiteRepository;
            this.institucioniRepository = institucioniRepository;
            this.mapper = mapper;
        }

        //GET ALL AFTESITE
        [HttpGet("get-aftesite-by-person-id")]
        public async Task<IActionResult> GetAll()
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in the token.");
            }

            // Getting the data from database - domain models
            var aftesiteDomain = await aftesiteRepository.GetAllAsync(userId);

            // Returning DTOs
            return Ok(mapper.Map<List<AftesiteDTO>>(aftesiteDomain));
        }


        //GET AFTESIA BY ID
        [HttpGet("get-aftesia-by-id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            // Getting the aftesia domain model from the database
            var aftesiteDomain = await aftesiteRepository.GetByIdAsync(id);

            if (aftesiteDomain == null)
            {
                return NotFound();
            }

            // Returning DTO back to the client
            return Ok(mapper.Map<AftesiteDTO>(aftesiteDomain));
        }

        //CREATE AFTESIA
        [HttpPost("add-aftesia")]
        public async Task<IActionResult> Create([FromBody] AddAftesiteRequestDTO addAftesite)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(); // Or handle as appropriate
            }

            // Check if the institution exists by name
            var institucion = await institucioniRepository.GetByNameAsync(addAftesite.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(),
                    Emri = addAftesite.EmriInstitucionit
                };

                institucion = await institucioniRepository.CreateAsync(institucion);
            }

            // Converting DTO to domain model (manually set InstitucioniId based on the institution found or created)
            var aftesiaDomain = mapper.Map<Aftesite>(addAftesite);
            aftesiaDomain.UserId = userId;
            aftesiaDomain.InstitucioniId = institucion.Id;

            // Using domain model to create aftesia
            aftesiaDomain = await aftesiteRepository.CreateAsync(userId, aftesiaDomain);

            // Mapping the domain model back to DTO
            var aftesiteDTO = mapper.Map<AftesiteDTO>(aftesiaDomain);

            return CreatedAtAction(nameof(GetById), new { id = aftesiteDTO.Id }, aftesiteDTO);
        }



        //UPDATE AFTESIA
        [HttpPut("update-aftesia-by-id/{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateAftesiteRequestDTO updateAftesite)
        {
           
            // Check if the institution exists by name
            var institucion = await institucioniRepository.GetByNameAsync(updateAftesite.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(),
                    Emri = updateAftesite.EmriInstitucionit
                };

                institucion = await institucioniRepository.CreateAsync(institucion);
            }

            // Fetch the existing aftesia
            var aftesiaDomain = await aftesiteRepository.GetByIdAsync(id);
            if (aftesiaDomain == null)
            {
                return NotFound();
            }

            // Update the PunaVullnetare domain model with new data
            aftesiaDomain = mapper.Map(updateAftesite, aftesiaDomain);
            aftesiaDomain.InstitucioniId = institucion.Id;

            // Update PunaVullnetare in the database
            aftesiaDomain = await aftesiteRepository.UpdateAsync(id, aftesiaDomain);

            return Ok(mapper.Map<AftesiteDTO>(aftesiaDomain));
        }



        //DELETE AFTESIA
        [HttpDelete("delete-aftesia-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var aftesiteDomain = await aftesiteRepository.DeleteAsync(id);

            if (aftesiteDomain == null)
            {
                return NotFound();
            }

            //Mapping the domain model to DTOs
            //Returning the deleted aftesia back
            return Ok(mapper.Map<AftesiteDTO>(aftesiteDomain));
        }
    }
}

