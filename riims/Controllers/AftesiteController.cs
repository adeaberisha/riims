using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO;
using riims.Models.DTO.AftesiteDto;
using riims.Repositories;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AftesiteController : ControllerBase
    {
        private readonly RiimsDbContext dbContext;
        private readonly IAftesiteRepository aftesiteRepository;
        private readonly IMapper mapper;

        public AftesiteController(RiimsDbContext dbContext, IAftesiteRepository aftesiteRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.aftesiteRepository = aftesiteRepository;
            this.mapper = mapper;
        }

        //GET ALL AFTESITE
        [HttpGet("get-aftesite-by-person-id/{userId}")]
        public async Task<IActionResult> GetAll([FromRoute] Guid userId)
        {
            // Getting the data from database - domain models
            var aftesiteDomain = await aftesiteRepository.GetAllAsync(userId);

            // Mapping domain models to DTOs
            var aftesiteDTOs = mapper.Map<List<AftesiteDTO>>(aftesiteDomain);

            // Returning DTOs
            return Ok(aftesiteDTOs);
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

            // Mapping the aftesia domain model to AftesiteDTO
            var aftesiteDTO = mapper.Map<AftesiteDTO>(aftesiteDomain);

            // Returning DTO back to the client
            return Ok(aftesiteDTO);
        }

        //CREATE AFTESIA
        [HttpPost("add-aftesia/{userId}")]
        public async Task<IActionResult> Create([FromRoute] Guid userId, [FromBody] AddAftesiteRequestDTO addAftesite)
        {
            // Check if the institution already exists by name
            var institucion = await dbContext.Institucioni.FirstOrDefaultAsync(i => i.Emri == addAftesite.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(), // Generate a new Guid for the institution
                    Emri = addAftesite.EmriInstitucionit
                };

                // Add the institution to the database
                await dbContext.Institucioni.AddAsync(institucion);
                await dbContext.SaveChangesAsync(); // Save the new institution to the database
            }

            // Converting DTO to domain model (manually set InstitucioniId based on the institution found or created)
            var aftesiteDomain = new Aftesite
            {
                Emri = addAftesite.Emri,
                UserId = userId,
                InstitucioniId = institucion.Id // Set the InstitucioniId from the institution
            };

            // Using domain model to create aftesia
            aftesiteDomain = await aftesiteRepository.CreateAsync(userId, aftesiteDomain);

            // Mapping the domain model back to DTO
            var aftesiteDTO = mapper.Map<AftesiteDTO>(aftesiteDomain);

            return CreatedAtAction(nameof(GetById), new { id = aftesiteDTO.Id }, aftesiteDTO);
        }



        //UPDATE AFTESIA
        [HttpPut("update-aftesia-by-id/{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateAftesiteRequestDTO updateAftesite)
        {
            // Check if the institution already exists by name
            var institucion = await dbContext.Institucioni.FirstOrDefaultAsync(i => i.Emri == updateAftesite.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(), // Generate a new Guid for the institution
                    Emri = updateAftesite.EmriInstitucionit
                };

                // Add the institution to the database
                await dbContext.Institucioni.AddAsync(institucion);
                await dbContext.SaveChangesAsync(); // Save the new institution to the database
            }

            // Fetch the existing aftesia
            var aftesiaDomain = await aftesiteRepository.GetByIdAsync(id);
            if (aftesiaDomain == null)
            {
                return NotFound();
            }

            // Update the aftesia domain model with new data
            aftesiaDomain.Emri = updateAftesite.Emri;
            aftesiaDomain.InstitucioniId = institucion.Id; // Update the institution

            // Update aftesia in the database
            aftesiaDomain = await aftesiteRepository.UpdateAsync(id, aftesiaDomain);

            // Convert back to DTO and return
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

