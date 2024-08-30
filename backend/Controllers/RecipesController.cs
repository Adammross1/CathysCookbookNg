using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using CathysCookbookAPI.Models;
using Microsoft.Extensions.ObjectPool;

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
                            RecipeId = recipe.RecipeId,
                            RecipeSeqNo = rd.RecipeSeqNo,
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
        public ActionResult<FullRecipe> CreateRecipe(FullRecipe fullRecipe)
        {
            Console.WriteLine("POST request received");
            if (fullRecipe == null)
            {
                return BadRequest("Recipe cannot be null");
            }

        var recipe = new Recipe
        {
            RecipeId = fullRecipe.RecipeId,
            RecipeTitle = fullRecipe.RecipeTitle,
            Instructions = fullRecipe.Instructions,
            RecipeClassId = _cookbookRepository.GetRecipeClassByName(fullRecipe.RecipeClassName).RecipeClassId
        };

        _cookbookRepository.AddRecipe(recipe);

        for (int i = 0; i < fullRecipe.RecipeDetails.Count; i++)
        {
            var detail = fullRecipe.RecipeDetails[i];
            var recipeDetail = new RecipeDetail
        {
            RecipeId = detail.RecipeId,
            RecipeSeqNo = detail.RecipeSeqNo,
            IngredientId = _cookbookRepository.GetIngredientIdByName(detail.IngredientName).IngredientId,
            IngredientClassId = _cookbookRepository.GetIngredientClassIdByName(detail.IngredientClassName).IngredientClassId,
            MeasurementId = _cookbookRepository.GetMeasurementIdByName(detail.MeasurementName).MeasurementId,
            Amount = detail.Amount
        };
        _cookbookRepository.AddRecipeDetail(recipeDetail);
        }

            return CreatedAtAction(nameof(Get), new { id = recipe.RecipeId }, recipe);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteRecipe(int id)
        {
            Console.WriteLine("DELETE request received for ID: " + id);
            
            var recipe = _cookbookRepository.GetRecipeById(id);
            if (recipe == null)
            {
                return NotFound();
            }

            var recipeDetails = _cookbookRepository.GetRecipeDetailsByRecipeId(id);
            foreach (var detail in recipeDetails)
            {
                _cookbookRepository.DeleteRecipeDetail(detail);
            }

            _cookbookRepository.DeleteRecipe(id);

            return NoContent(); // Return 204 No Content to indicate successful deletion
        }
    }
}