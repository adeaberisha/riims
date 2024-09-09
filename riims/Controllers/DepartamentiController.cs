using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Models.Domain;
using riims.Models.DTO.DepartamentiDto;
using riims.Models.DTO.PunaVullnetareDto;
using riims.Repositories;


namespace riims.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DepartamentiController : ControllerBase
    {
        private readonly RiimsDbContext dbContext;
        private readonly IDepartamentiRepository _departamentiRepository;
        private readonly IInstitucioniRepository institucioniRepository;
        private readonly IMapper _mapper;

        public DepartamentiController(IDepartamentiRepository departamentiRepository,
            IInstitucioniRepository institucioniRepository,
            IMapper mapper)
        {
            _departamentiRepository = departamentiRepository;
            this.institucioniRepository = institucioniRepository;
            _mapper = mapper;
        }

        //GET ALL Departaments
        [HttpGet("get-all-departamentet")]
        public async Task<IActionResult> GetAll()
        {
            var departamentiDomain = await _departamentiRepository.GetAllAsync();
            return Ok(_mapper.Map<List<DepartamentiDto>>(departamentiDomain));
        }

        //GET Departamenti BY ID
        [HttpGet("get-departamenti-by-id/{id}")]
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
        [HttpPost("add-departamenti")]
        public async Task<IActionResult> Create([FromBody] AddDepartamentiRequestDto addDepartamentiRequestDto)
        {
            // Find the institution
            var institucion = await institucioniRepository.GetByNameAsync(addDepartamentiRequestDto.EmriInstitucionit);

            // Convert the DTO to a domain model
            var departamentiDomain = _mapper.Map<Departamenti>(addDepartamentiRequestDto);
            departamentiDomain.InstitucioniId = institucion.Id;

            // Use the domain model to create a PunaVullnetare
            departamentiDomain = await _departamentiRepository.CreateAsync(departamentiDomain);

            // Map the domain model back to DTO
            var departamentiDto = _mapper.Map<DepartamentiDto>(departamentiDomain);

            return CreatedAtAction(nameof(GetById), new { id = departamentiDto.Id }, departamentiDto);
        }




        //UPDATE
        [HttpPut("update-departamenti/{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateDepartamentiRequestDto updateDepartamenti)
        {
            var institucion = await institucioniRepository.GetByNameAsync(updateDepartamenti.EmriInstitucionit);

            // Fetch the existing Departamenti
            var departamentiDomain = await _departamentiRepository.GetByIdAsync(id);
            if (departamentiDomain == null)
            {
                return NotFound();
            }

            // Update the Departamenti domain model with new data
            departamentiDomain = _mapper.Map(updateDepartamenti, departamentiDomain);
            departamentiDomain.InstitucioniId = institucion.Id;

            // Update Departamenti in the database
            departamentiDomain = await _departamentiRepository.UpdateAsync(id, departamentiDomain);

            return Ok(_mapper.Map<DepartamentiDto>(departamentiDomain));
        }

        //DELETE Departamenti
        [HttpDelete("delete-departamenti/{id}")]
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