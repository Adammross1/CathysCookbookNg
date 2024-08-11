namespace CathysCookbookAPI.Models
{
    public interface ICookbookRepository
    {
        IEnumerable<Ingredient> Ingredients { get; }
        IEnumerable<Recipe> Recipes { get; }
        RecipeClass GetRecipeClassById(int recipeClassId);
        Ingredient GetIngredientNameById(int ingredientID);
        IngredientClass GetIngredientClassNameById(int ingredientClassID);
        MeasurementUnit GetMeasurementNameById(int measurementID);
        Recipe GetRecipeById(int recipeId);
        IEnumerable<RecipeDetail> GetRecipeDetailsByRecipeId(int recipeId);
        void AddRecipe(Recipe recipe);
        IEnumerable<RecipeDetail> RecipeDetails { get; }
        void AddRecipeDetail(RecipeDetail recipeDetail);
        IEnumerable<RecipeClass> RecipeClasses { get; }
        IEnumerable<MeasurementUnit> Measurements { get; }
    }
}
