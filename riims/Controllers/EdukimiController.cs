using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO;
using riims.Models.DTO.EdukimiDto;
using riims.Repositories;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EdukimiController : ControllerBase
    {
        private readonly RiimsDbContext dbContext;
        private readonly IEdukimiRepository edukimiRepository;
        private readonly IMapper mapper;

        public EdukimiController( RiimsDbContext dbContext, IEdukimiRepository edukimiRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.edukimiRepository = edukimiRepository;
            this.mapper = mapper;
        }

        //GET ALL EDUKIMET
        [HttpGet("get-edukimet-by-person-id/{userId}")]
        //[Route("users/{userId:Guid}")]
        public async Task<IActionResult> GetAll([FromRoute] string userId)
        {
            //Getting the data from database - domain models
            var edukimetDomain = await edukimiRepository.GetAllAsync(userId);

            //Mapping domain models to DTOs
            //Returning DTOs
            return Ok(mapper.Map<List<EdukimiDTO>>(edukimetDomain));

        }

        //GET EDUKIMI BY ID
        [HttpGet("get-edukimi-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            //Getting the edukimi domain model from the database
            var edukimiDomain = await edukimiRepository.GetByIdAsync(id);

            if(edukimiDomain == null)
            {
                return NotFound();
            }

            //Mapping the edukimi domain model to EdukimiDTO
            //Returning DTO back to the client
            return Ok(mapper.Map<EdukimiDTO>(edukimiDomain));
        }

        //CREATE EDUKIMI
        [HttpPost("add-edukimi/{userId}")]
        public async Task<IActionResult> Create([FromRoute] string userId, [FromBody] AddEdukimiRequestDTO addEdukimiRequestDTO)
        {
            // Find or create NiveliAkademik
            var niveliAkademik = await dbContext.NiveliAkademik
                .FirstOrDefaultAsync(n => n.lvl == addEdukimiRequestDTO.NiveliAkademik);

            if (niveliAkademik == null)
            {
                niveliAkademik = new NiveliAkademik
                {
                    Id = Guid.NewGuid(),
                    lvl = addEdukimiRequestDTO.NiveliAkademik
                };

                await dbContext.NiveliAkademik.AddAsync(niveliAkademik);
                await dbContext.SaveChangesAsync();
            }

            // Find or create Institucioni
            var institucioni = await dbContext.Institucioni
                .FirstOrDefaultAsync(i => i.Emri == addEdukimiRequestDTO.Institucioni);

            if (institucioni == null)
            {
                institucioni = new Institucioni
                {
                    Id = Guid.NewGuid(),
                    Emri = addEdukimiRequestDTO.Institucioni
                };

                await dbContext.Institucioni.AddAsync(institucioni);
                await dbContext.SaveChangesAsync();
            }

            // Convert DTO to domain model
            var edukimiDomain = mapper.Map<Edukimi>(addEdukimiRequestDTO);
            edukimiDomain.InstitucioniId = institucioni.Id;
            edukimiDomain.NiveliAkademikId = niveliAkademik.Id;

            // Create the edukimi, passing userId
            edukimiDomain = await edukimiRepository.CreateAsync(userId, edukimiDomain);

            // Map domain model back to DTO
            var edukimiDTO = mapper.Map<EdukimiDTO>(edukimiDomain);

            return CreatedAtAction(nameof(GetById), new { id = edukimiDTO.Id }, edukimiDTO);
        }


        //UPDATE EDUKIMI
        [HttpPut("update-edukimi-by-id/{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateEdukimiRequestDTO updateEdukimiRequestDTO)
        {
            // Fetch the existing edukimi entry
            var existingEdukimi = await edukimiRepository.GetByIdAsync(id);
            if (existingEdukimi == null)
            {
                return NotFound();
            }

            // Find or create NiveliAkademik
            var niveliAkademik = await dbContext.NiveliAkademik
                .FirstOrDefaultAsync(n => n.lvl == updateEdukimiRequestDTO.NiveliAkademik);

            if (niveliAkademik == null)
            {
                niveliAkademik = new NiveliAkademik
                {
                    Id = Guid.NewGuid(),
                    lvl = updateEdukimiRequestDTO.NiveliAkademik
                };

                await dbContext.NiveliAkademik.AddAsync(niveliAkademik);
                await dbContext.SaveChangesAsync();
            }

            // Find or create Institucioni
            var institucioni = await dbContext.Institucioni
                .FirstOrDefaultAsync(i => i.Emri == updateEdukimiRequestDTO.Institucioni);

            if (institucioni == null)
            {
                institucioni = new Institucioni
                {
                    Id = Guid.NewGuid(),
                    Emri = updateEdukimiRequestDTO.Institucioni
                };

                await dbContext.Institucioni.AddAsync(institucioni);
                await dbContext.SaveChangesAsync();
            }

            // Map the updated values from DTO to the existing domain model
            existingEdukimi = mapper.Map(updateEdukimiRequestDTO, existingEdukimi);
            existingEdukimi.InstitucioniId = institucioni.Id;
            existingEdukimi.NiveliAkademikId = niveliAkademik.Id;

            // Update the edukimi entry
            existingEdukimi = await edukimiRepository.UpdateAsync(id, existingEdukimi);

            // Check if update was successful
            if (existingEdukimi == null)
            {
                return NotFound();
            }

            // Map the updated domain model back to DTO
            var edukimiDTO = mapper.Map<EdukimiDTO>(existingEdukimi);

            return Ok(edukimiDTO);
        }


        //DELETE EDUKIMI
        [HttpDelete("delete-edukimi-by-id/{id}")]
        //[Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var edukimiDomain = await edukimiRepository.DeleteAsync(id);

            if(edukimiDomain == null)
            {
                return NotFound();
            }

            //Mapping the domain model to DTOs
            //Returning the deleted edukimi back
            return Ok(mapper.Map<EdukimiDTO>(edukimiDomain));
        }
    }
}
