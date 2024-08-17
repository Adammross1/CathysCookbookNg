namespace CathysCookbookAPI.Models
{
    public interface ICookbookRepository
    {
        IEnumerable<Ingredient> Ingredients { get; }
        IEnumerable<IngredientClass> IngredientClasses { get; }
        IEnumerable<Recipe> Recipes { get; }
        RecipeClass GetRecipeClassById(int recipeClassId);
        RecipeClass GetRecipeClassByName(string recipeClassName);
        Ingredient GetIngredientNameById(int ingredientID);
        Ingredient GetIngredientIdByName(string ingredientName);
        IngredientClass GetIngredientClassNameById(int ingredientClassID);
        IngredientClass GetIngredientClassIdByName(string ingredientClassName);
        MeasurementUnit GetMeasurementNameById(int measurementID);
        MeasurementUnit GetMeasurementIdByName(string measurementName);
        Recipe GetRecipeById(int recipeId);
        IEnumerable<RecipeDetail> GetRecipeDetailsByRecipeId(int recipeId);
        void AddRecipe(Recipe recipe);
        IEnumerable<RecipeDetail> RecipeDetails { get; }
        void AddRecipeDetail(RecipeDetail recipeDetail);
        IEnumerable<RecipeClass> RecipeClasses { get; }
        IEnumerable<MeasurementUnit> Measurements { get; }
    }
}
