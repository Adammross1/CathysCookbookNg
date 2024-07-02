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

        [HttpPost]
        public ActionResult<Recipe> CreateRecipe(Recipe recipe)
        {
            if (recipe == null)
            {
                return BadRequest("Recipe cannot be null");
            }

            // Assuming your repository has an AddRecipe method
            _cookbookRepository.AddRecipe(recipe);

            // Return the created recipe along with a 201 Created status code
            return CreatedAtAction(nameof(Get), new { id = recipe.RecipeId }, recipe);
        }
    }
}