export interface Recipe {
  recipeId: number;
  recipeTitle: string;
  instructions: string;
  recipeClassName: string;
}

export interface RecipeDetail {
  recipeId: number;
  recipeSeqNo: number;
  ingredientName: string;
  ingredientClassName: string;
  measurementName: string;
  amount: number;
}

export interface Ingredient {
  ingredientName: string;
  ingredientClass: string;
  unit: string;
  amount: number;
}
