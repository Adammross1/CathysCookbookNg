namespace CathysCookbookAPI.Models;
public class RecipeDetailDTO
  {
      public int RecipeId { get; set; }
      public int RecipeSeqNo { get; set; }
      public string IngredientName { get; set; }
      public string IngredientClassName { get; set; }
      public string MeasurementName { get; set; }
      public double Amount { get; set; }
  }

  public class FullRecipe
  {
      public int RecipeId { get; set; }
      public string RecipeTitle { get; set; }
      public string Instructions { get; set; }
      public string RecipeClassName { get; set; }
      public List<RecipeDetailDTO> RecipeDetails { get; set; }
  }