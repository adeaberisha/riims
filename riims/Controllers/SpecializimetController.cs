using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO;
using riims.Models.DTO.SpecializimiDto;
using riims.Repositories;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecializimetController : ControllerBase
    {
        private readonly RiimsDbContext dbContext;
        private readonly ISpecializimetRepository specializimetRepository;
        private readonly IMapper mapper;
      

        public SpecializimetController(RiimsDbContext dbContext, ISpecializimetRepository specializimetRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.specializimetRepository = specializimetRepository;
            this.mapper = mapper;
        }

        //GET ALL SPECIALIZIMET
        [HttpGet("get-specializimet-by-person-id/{userId}")]
        public async Task<IActionResult> GetAll([FromRoute] Guid userId)
        {
            // Getting the data from database - domain models
            var specializimiDomain = await specializimetRepository.GetAllAsync(userId);

            // Mapping domain models to DTOs
            var specializimetDTOs = mapper.Map<List<SpecializimetDTO>>(specializimiDomain);

            // Returning DTOs
            return Ok(specializimetDTOs);
        }

        //GET SPECIALIZIMI BY ID
        [HttpGet("get-specializim-by-id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            // Getting the specializimi domain model from the database
            var specializimiDomain = await specializimetRepository.GetByIdAsync(id);

            if (specializimiDomain == null)
            {
                return NotFound();
            }

            // Mapping the specializimi domain model to SpecializimetDTO
            var specializimetDTO = mapper.Map<SpecializimetDTO>(specializimiDomain);

            // Returning DTO back to the client
            return Ok(specializimetDTO);
        }

        //CREATE Specializimi
        [HttpPost("add-specializim/{userId}")]
        public async Task<IActionResult> Create([FromRoute] Guid userId, [FromBody] AddSpecializimetRequestDTO addSpecializimi)
        {
            // Check if the institution already exists by name
            var institucion = await dbContext.Institucioni
                .FirstOrDefaultAsync(i => i.Emri == addSpecializimi.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(), // Generate a new Guid for the institution
                    Emri = addSpecializimi.EmriInstitucionit
                };

                // Add the institution to the database
                await dbContext.Institucioni.AddAsync(institucion);
                await dbContext.SaveChangesAsync(); // Save the new institution to the database
            }

            // Convert DTO to domain model and set the InstitucioniId
            var specializimiDomain = mapper.Map<Specializimet>(addSpecializimi);
            specializimiDomain.InstitucioniId = institucion.Id;

            // Use domain model to create specializimi
            specializimiDomain = await specializimetRepository.CreateAsync(userId, specializimiDomain);

            // Map the domain model back to DTO
            var specializimiDTO = mapper.Map<SpecializimetDTO>(specializimiDomain);

            return CreatedAtAction(nameof(GetById), new { id = specializimiDTO.Id }, specializimiDTO);
        }


        //UPDATE SPECIALIZIMI
        [HttpPut("update-specializim-by-id/{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateSpecializimetRequestDTO updateSpecializimi)
        {
            // Check if the institution already exists by name
            var institucion = await dbContext.Institucioni
                .FirstOrDefaultAsync(i => i.Emri == updateSpecializimi.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(), // Generate a new Guid for the institution
                    Emri = updateSpecializimi.EmriInstitucionit
                };

                // Add the institution to the database
                await dbContext.Institucioni.AddAsync(institucion);
                await dbContext.SaveChangesAsync(); // Save the new institution to the database
            }

            // Get the existing Specializimet from the database
            var existingSpecializimi = await specializimetRepository.GetByIdAsync(id);

            if (existingSpecializimi == null)
            {
                return NotFound();
            }

            // Update the existing domain model with the new values
            existingSpecializimi.llojiIspecializimit = updateSpecializimi.llojiIspecializimit;
            existingSpecializimi.lokacionit = updateSpecializimi.lokacionit;
            existingSpecializimi.dataEFillimit = updateSpecializimi.dataEFillimit;
            existingSpecializimi.dataEMbarimit = updateSpecializimi.dataEMbarimit;
            existingSpecializimi.aftesiteEfituara = updateSpecializimi.aftesiteEfituara;
            existingSpecializimi.pershkrimi = updateSpecializimi.pershkrimi;
            existingSpecializimi.nrKredive = updateSpecializimi.nrKredive;
            existingSpecializimi.InstitucioniId = institucion.Id;

            // Save the changes to the repository
            var updatedSpecializimi = await specializimetRepository.UpdateAsync(id, existingSpecializimi);

            // Map the updated domain model back to DTO
            var specializimiDTO = mapper.Map<SpecializimetDTO>(updatedSpecializimi);

            return Ok(specializimiDTO);
        }


        //DELETE SPECIALIZIMI
        [HttpDelete("delete-specializim-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var specializimiDomain = await specializimetRepository.DeleteAsync(id);

            if (specializimiDomain == null)
            {
                return NotFound();
            }

            //Mapping the domain model to DTOs
            //Returning the deleted specializimi back
            return Ok(mapper.Map<SpecializimetDTO>(specializimiDomain));
        }
    }
}

