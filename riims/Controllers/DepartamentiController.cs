using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO.DepartamentiDto;
using riims.Repositories;


namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartamentiController : ControllerBase
    {
        private readonly RiimsDbContext dbContext;
        private readonly IDepartamentiRepository _departamentiRepository;
        private readonly IMapper _mapper;

        public DepartamentiController(RiimsDbContext dbContext, IDepartamentiRepository departamentiRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            _departamentiRepository = departamentiRepository;
            _mapper = mapper;
        }

        //GET ALL Departaments
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var departamentiDomain = await _departamentiRepository.GetAllAsync();
            return Ok(_mapper.Map<List<DepartamentiDto>>(departamentiDomain));
        }

        //GET Departamenti BY ID
       // [HttpGet("get-departamenti-by-id/{id}")]
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var departamentiDomain = await _departamentiRepository.GetByIdAsync(id);

            if (departamentiDomain == null)
            {
                return NotFound();
            }

            var departamentiDto = _mapper.Map<DepartamentiDto>(departamentiDomain);

            // Returning DTO back to the client
            return Ok(departamentiDto);
        }

        //CREATE Departamenti
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddDepartamentiRequestDto addDepartamentiRequestDto)
        {
            // Kontrolloni nëse Institucioni ekziston me emrin e dhënë
            var institucion = await dbContext.Institucioni
                .FirstOrDefaultAsync(i => i.Emri == addDepartamentiRequestDto.EmriInstitucionit);

            if (institucion == null)
            {
                // Nëse Institucioni nuk ekziston, krijojeni atë
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(), // Gjeneroni një Guid të ri për Institucionin
                    Emri = addDepartamentiRequestDto.EmriInstitucionit
                };

                // Shtoni Institucionin në bazën e të dhënave
                await dbContext.Institucioni.AddAsync(institucion);
                await dbContext.SaveChangesAsync();
            }

            // Maponi DTO-në në modelin e domenit dhe vendosni InstitucioniId
            var departamentiDomain = _mapper.Map<Departamenti>(addDepartamentiRequestDto);
            departamentiDomain.InstitucioniId = institucion.Id;

            // Krijo departamentin në repository
            departamentiDomain = await _departamentiRepository.CreateAsync(departamentiDomain);

            // Maponi modelin e domenit në DTO
            var departamentiDto = _mapper.Map<DepartamentiDto>(departamentiDomain);

            return CreatedAtAction(nameof(GetById), new { id = departamentiDto.Id }, departamentiDto);
        }




        //UPDATE
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateDepartamentiRequestDto updateDepartamentiRequestDto)
        {
            // Kontrollo nëse Institucioni ekziston
            var institucion = await dbContext.Institucioni
                .FirstOrDefaultAsync(i => i.Emri == updateDepartamentiRequestDto.EmriInstitucionit);

            // Nëse Institucioni nuk ekziston, krijo një të ri
            if (institucion == null)
            {
                institucion = new Institucioni
                {
                    Id = Guid.NewGuid(),
                    Emri = updateDepartamentiRequestDto.EmriInstitucionit
                };

                await dbContext.Institucioni.AddAsync(institucion);
                await dbContext.SaveChangesAsync();
            }

            // Merr departamentin ekzistues nga repository
            var existingDepartamenti = await _departamentiRepository.GetByIdAsync(id);
            if (existingDepartamenti == null)
            {
                return NotFound();
            }

            // Përditëso modelin ekzistues me vlerat e reja
            existingDepartamenti.Emri = updateDepartamentiRequestDto.Emri;
            existingDepartamenti.InstitucioniId = institucion.Id;

            // Ruaj ndryshimet në repository
            var updatedDepartamenti = await _departamentiRepository.UpdateAsync(id, existingDepartamenti);

            // Map modelin e përditësuar në DTO
            var departamentiDto = _mapper.Map<DepartamentiDto>(updatedDepartamenti);

            return Ok(departamentiDto);
        }

        //DELETE Departamenti
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var departamentiDomain = await _departamentiRepository.DeleteAsync(id);

            if (departamentiDomain == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<DepartamentiDto>(departamentiDomain));
        }
    }
}