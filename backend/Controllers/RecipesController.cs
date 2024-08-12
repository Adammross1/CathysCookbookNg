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
        public IActionResult Get()
        {
            var recipes = _cookbookRepository.Recipes
                .Select(recipe => 
                {
                    var recipeClass = _cookbookRepository.GetRecipeClassById(recipe.RecipeClassId);
                    var recipeDetails = _cookbookRepository.GetRecipeDetailsByRecipeId(recipe.RecipeId);

                    return new FullRecipe
                    {
                        RecipeId = recipe.RecipeId,
                        RecipeTitle = recipe.RecipeTitle,
                        Instructions = recipe.Instructions,
                        RecipeClassName = recipeClass?.RecipeClassName,
                        RecipeDetails = recipeDetails.Select(rd => new RecipeDetailDTO
                        {
                            IngredientName = _cookbookRepository.GetIngredientNameById(rd.IngredientId).IngredientName,
                            IngredientClassName = _cookbookRepository.GetIngredientClassNameById(rd.IngredientClassId).IngredientClassName,
                            MeasurementName = _cookbookRepository.GetMeasurementNameById(rd.MeasurementId).MeasurementName,
                            Amount = rd.Amount
                        }).ToList()
                    };
                })
                .ToList();

            return Ok(recipes);
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