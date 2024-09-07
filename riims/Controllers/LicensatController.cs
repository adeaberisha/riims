using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO.LicensatDto;
using riims.Models.DTO.SpecializimiDto;
using riims.Repositories;
using System.ComponentModel;

namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LicensatController : ControllerBase
    {
        private readonly RiimsDbContext dbContext;
        private readonly ILicensatRepository licensatRepository;
        private readonly IMapper mapper;

        public LicensatController(RiimsDbContext dbContext, ILicensatRepository licensatRepository, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.licensatRepository=licensatRepository;
            this.mapper=mapper;
        }

        [HttpGet("get-licensat-by-person-id/{userId}")]
        public async Task<IActionResult> GetAll([FromRoute] string userId)
        {
            var licensatDomain = await licensatRepository.GetAllAsync(userId);
            var licensatDTO = mapper.Map<List<LicensatDto>>(licensatDomain);
            return Ok(licensatDTO);
        }

        [HttpGet("get-licensa-by-id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var licensatDomain = await licensatRepository.GetByIdAsync(id);

            if (licensatDomain == null)
            {
                return NotFound();
            }

            var licensatDTO = mapper.Map<LicensatDto>(licensatDomain);

            return Ok(licensatDTO);
        }

        [HttpPost("add-licensa/{userId}")]
        public async Task<IActionResult> Create([FromRoute] string userId, [FromBody] AddLicensatRequestDto addLicensatRequestDto)
        {
            var institucion = await dbContext.Institucioni
                .FirstOrDefaultAsync(i => i.Emri == addLicensatRequestDto.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(), // Generate a new Guid for the institution
                    Emri = addLicensatRequestDto.EmriInstitucionit
                };

                // Add the institution to the database
                await dbContext.Institucioni.AddAsync(institucion);
                await dbContext.SaveChangesAsync(); // Save the new institution to the database
            }

            var licensatDomainModel = mapper.Map<Licensat>(addLicensatRequestDto);
            licensatDomainModel.InstitucioniId = institucion.Id;

            licensatDomainModel = await licensatRepository.CreateAsync(userId, licensatDomainModel);

            var licensatDto = mapper.Map<LicensatDto>(licensatDomainModel);

            return CreatedAtAction(nameof(GetById), new { id = licensatDto.Id }, licensatDto);
        }

        [HttpPut("update-licensa-by-id/{id}")]
        //[Route("{id:guid}")]

        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateLicensatRequestDto updateLicensatRequestDto)
        {
            var institucion = await dbContext.Institucioni
              .FirstOrDefaultAsync(i => i.Emri == updateLicensatRequestDto.EmriInstitucionit);

            // If the institution doesn't exist, create it
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(), // Generate a new Guid for the institution
                    Emri = updateLicensatRequestDto.EmriInstitucionit
                };

                // Add the institution to the database
                await dbContext.Institucioni.AddAsync(institucion);
                await dbContext.SaveChangesAsync(); // Save the new institution to the database
            }

            var existingLicensat= await licensatRepository.GetByIdAsync(id);

            
            if (existingLicensat == null)
            {
                return NotFound();
            }

            existingLicensat.Emri = updateLicensatRequestDto.Emri;
            existingLicensat.DataLeshimit = updateLicensatRequestDto.DataLeshimit;
            existingLicensat.DataSkadimit = updateLicensatRequestDto.DataSkadimit;
            existingLicensat.CredentialId = updateLicensatRequestDto.CredentialId;
            existingLicensat.CredentialUrl = updateLicensatRequestDto.CredentialUrl;
            existingLicensat.InstitucioniId = institucion.Id;

            var updatedLicensat= await licensatRepository.UpdateAsync(id, existingLicensat);

            // Map the updated domain model back to DTO
            var licensatDTO = mapper.Map<LicensatDto>(updatedLicensat);

            return Ok(licensatDTO);
        }

        [HttpDelete("delete-licensa-by-id/{id}")]
        //[Route("{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var licensatDomainModel = await licensatRepository.DeleteAsync(id);

            if (licensatDomainModel == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<Licensat>(licensatDomainModel));
        }
    }
}
