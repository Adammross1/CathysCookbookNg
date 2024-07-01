using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using CathysCookbookAPI.Models;

namespace CathysCookbookAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly ICookbookRepository _cookbookRepository;

        public RecipesController(ICookbookRepository cookbookRepository)
        {
            _cookbookRepository = cookbookRepository;
        }

        [HttpGet]
        public IEnumerable<Recipe> Get()
        {
            return _cookbookRepository.Recipes;
        }
    }
}