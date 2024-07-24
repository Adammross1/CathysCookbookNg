using CathysCookbookAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CathysCookbookAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeClassesController : ControllerBase
    {
        private readonly ICookbookRepository _cookbookRepository;

        public RecipeClassesController(ICookbookRepository cookbookRepository)
        {
            _cookbookRepository = cookbookRepository;
        }

        [HttpGet]
        public IEnumerable<RecipeClass> Get()
        {
            return _cookbookRepository.RecipeClasses;
        }
    }
}
