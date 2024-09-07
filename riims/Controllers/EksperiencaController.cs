using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO.EksperiencDto;
using riims.Models.DTO.SpecializimiDto;
using riims.Repositories;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EksperiencaController : ControllerBase
    {
        private readonly RiimsDbContext dbContext;
        private readonly IEksperiencaRepository eksperiencaRepository;
        private readonly IMapper mapper;

        public EksperiencaController(RiimsDbContext dbContext, IEksperiencaRepository eksperiencaRepository, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.eksperiencaRepository=eksperiencaRepository;
            this.mapper=mapper;
        }

        [HttpGet("get-eksperiencat-by-person-id/{userId}")]
        public async Task<IActionResult> GetAll([FromRoute] string userId)
        {
            var eksperiencatDomain = await eksperiencaRepository.GetAllAsync(userId);
            var eksperiencaDTOs = mapper.Map<List<EksperiencaDto>>(eksperiencatDomain);
            return Ok(eksperiencaDTOs);
        }

        [HttpGet("get-eksperienca-by-id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var eksperiencaDomain = await eksperiencaRepository.GetByIdAsync(id);

            if (eksperiencaDomain == null)
            {
                return NotFound();
            }

            var eksperiencaDTOs = mapper.Map<EksperiencaDto>(eksperiencaDomain);
            return Ok(eksperiencaDTOs);
        }

        [HttpPost("add-eksperienca/{userId}")]
        public async Task<IActionResult> Create([FromRoute] string userId, [FromBody] AddEksperiencaRequestDto addEksperiencaRequestDto)
        {
            var institucion = await dbContext.Institucioni
               .FirstOrDefaultAsync(i => i.Emri == addEksperiencaRequestDto.EmriInstitucionit);

            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(), // Generate a new Guid for the institution
                    Emri = addEksperiencaRequestDto.EmriInstitucionit
                };

                // Add the institution to the database
                await dbContext.Institucioni.AddAsync(institucion);
                await dbContext.SaveChangesAsync(); // Save the new institution to the database
            }

            var eksperiencaDomainModel = mapper.Map<Eksperienca>(addEksperiencaRequestDto);
            eksperiencaDomainModel.InstitucioniId = institucion.Id;

            eksperiencaDomainModel = await eksperiencaRepository.CreateAsync(userId, eksperiencaDomainModel);
         
            var eksperiencaDto = mapper.Map<EksperiencaDto>(eksperiencaDomainModel);
           
            return CreatedAtAction(nameof(GetById), new { id = eksperiencaDto.Id }, eksperiencaDto);
        }

        [HttpPut("update-eksperienca-by-id/{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateEksperiencaRequestDto updateEksperiencaRequestDto)
        {
            var institucion = await dbContext.Institucioni
                .FirstOrDefaultAsync(i => i.Emri == updateEksperiencaRequestDto.EmriInstitucionit);

            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(), // Generate a new Guid for the institution
                    Emri = updateEksperiencaRequestDto.EmriInstitucionit
                };

                // Add the institution to the database
                await dbContext.Institucioni.AddAsync(institucion);
                await dbContext.SaveChangesAsync(); // Save the new institution to the database
            }

            var existingEksperienca = await eksperiencaRepository.GetByIdAsync(id);

            if (existingEksperienca == null)
            {
                return NotFound();
            }

            // Update the existing domain model with the new values
            existingEksperienca.Titulli = updateEksperiencaRequestDto.Titulli;
            existingEksperienca.LlojiPunesimit = updateEksperiencaRequestDto.LlojiPunesimit;
            existingEksperienca.Lokacioni = updateEksperiencaRequestDto.Lokacioni;
            existingEksperienca.LlojiLokacionit = updateEksperiencaRequestDto.LlojiLokacionit;
            existingEksperienca.DataFillimit = updateEksperiencaRequestDto.DataFillimit;
            existingEksperienca.DataMbarimit = updateEksperiencaRequestDto.DataMbarimit;
            existingEksperienca.Pershkrimi = updateEksperiencaRequestDto.Pershkrimi;
            existingEksperienca.InstitucioniId = institucion.Id;

            // Save the changes to the repository
            var updatedEksperienca = await eksperiencaRepository.UpdateAsync(id, existingEksperienca);

            // Map the updated domain model back to DTO
            var eksperiencaDTO = mapper.Map<EksperiencaDto>(updatedEksperienca);

            return Ok(eksperiencaDTO);
        }


        [HttpDelete("delete-eksperienca-by-id/{id}")]
        //[Route("{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var eksperiencaDomainModel = await eksperiencaRepository.DeleteAsync(id);

            if (eksperiencaDomainModel == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<Eksperienca>(eksperiencaDomainModel));
        }
    }
}
