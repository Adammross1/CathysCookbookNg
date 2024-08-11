namespace CathysCookbookAPI.Models;
public class RecipeDetailDTO
  {
      public Ingredient IngredientName { get; set; }
      public IngredientClass IngredientClassName { get; set; }
      public MeasurementUnit MeasurementName { get; set; }
      public double Amount { get; set; }
  }

  public class FullRecipe
  {
      public string RecipeTitle { get; set; }
      public string Instructions { get; set; }
      public string RecipeClassName { get; set; }
      public List<RecipeDetailDTO> RecipeDetails { get; set; }
  }