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
        private readonly IDepartamentiRepository _departamentiRepository;
        private readonly IMapper _mapper;

        public DepartamentiController(IDepartamentiRepository departamentiRepository,
            IMapper mapper)
        {
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
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var departamentiDomain = await _departamentiRepository.GetByIdAsync(id);

            if (departamentiDomain == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<DepartamentiDto>(departamentiDomain));
        }

        //CREATE Departamenti
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddDepartamentiRequestDto addDepartamentiRequestDto)
        {
            var departamentiDomain = _mapper.Map<Departamenti>(addDepartamentiRequestDto);
            departamentiDomain = await _departamentiRepository.CreateAsync(departamentiDomain);
            var departamentiDto = _mapper.Map<DepartamentiDto>(departamentiDomain);

            return CreatedAtAction(nameof(GetById), new { id = departamentiDto.Id }, departamentiDto);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateDepartamentiRequestDto updateDepartamentiRequestDto)
        {
            var departamentiDomain = _mapper.Map<Departamenti>(updateDepartamentiRequestDto);
            departamentiDomain = await _departamentiRepository.UpdateAsync(id, departamentiDomain);

            if (departamentiDomain == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<DepartamentiDto>(departamentiDomain));
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