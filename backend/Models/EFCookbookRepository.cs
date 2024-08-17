
namespace CathysCookbookAPI.Models
{
    public class EFCookbookRepository : ICookbookRepository
    {
        private CookbookContext _cookbookContext;
        public EFCookbookRepository(CookbookContext temp) 
        {
            _cookbookContext = temp;
        }

        public IEnumerable<Ingredient> Ingredients => _cookbookContext.Ingredients;
        public IEnumerable<IngredientClass> IngredientClasses => _cookbookContext.IngredientClasses;
        public IEnumerable<Recipe> Recipes => _cookbookContext.Recipes;
        public IEnumerable<RecipeDetail> RecipeDetails => _cookbookContext.RecipeDetails;
        public IEnumerable<RecipeClass> RecipeClasses => _cookbookContext.RecipeClasses;
        public IEnumerable<MeasurementUnit> Measurements => _cookbookContext.MeasurementUnits;

        public void AddRecipe(Recipe recipe)
        {
            try
            {
                _cookbookContext.Recipes.Add(recipe);
                _cookbookContext.SaveChanges();
                Console.WriteLine("Recipe added successfully");
            }
            catch (Exception ex) {
                Console.WriteLine($"Error adding recipe: {ex.Message}");
            }
        }

        public void AddRecipeDetail(RecipeDetail recipeDetail)
        {
            Console.WriteLine("AddRecipeDetail called");
            try {
                _cookbookContext.RecipeDetails.Add(recipeDetail);
                _cookbookContext.SaveChanges();
                Console.WriteLine("RecipeDetail added successfully");
            }
            catch (Exception ex) {
                Console.WriteLine($"Error adding recipe: {ex.Message}");
            }
        }

        public RecipeClass GetRecipeClassById(int recipeClassId)
        {
            return _cookbookContext.RecipeClasses.Find(recipeClassId);
        }
        public RecipeClass GetRecipeClassByName(string recipeClassName)
        {
            return _cookbookContext.RecipeClasses
                .FirstOrDefault(rc => rc.RecipeClassName == recipeClassName);
        }

        public Ingredient GetIngredientNameById(int ingredientID)
        {
            return _cookbookContext.Ingredients.Find(ingredientID);
        }

        public Ingredient GetIngredientIdByName(string ingredientName)
        {
            return _cookbookContext.Ingredients
                .FirstOrDefault(i => i.IngredientName == ingredientName);
        }

        public IngredientClass GetIngredientClassNameById(int ingredientClassID)
        {
            return _cookbookContext.IngredientClasses.Find(ingredientClassID);
        }

        public IngredientClass GetIngredientClassIdByName(string ingredientClassName)
        {
            return _cookbookContext.IngredientClasses
                .FirstOrDefault(ic => ic.IngredientClassName == ingredientClassName);
        }

        public MeasurementUnit GetMeasurementNameById(int measurementID)
        {
            return _cookbookContext.MeasurementUnits.Find(measurementID);
        }

        public MeasurementUnit GetMeasurementIdByName(string measurementName)
        {
            return _cookbookContext.MeasurementUnits
                .FirstOrDefault(m => m.MeasurementName == measurementName);
        }

        public Recipe GetRecipeById(int recipeId)
        {
            return _cookbookContext.Recipes.Find(recipeId);
        }

        public IEnumerable<RecipeDetail> GetRecipeDetailsByRecipeId(int recipeId)
    {
        return _cookbookContext.RecipeDetails
            .Where(rd => rd.RecipeId == recipeId)
            .ToList();
    }
    }
}
