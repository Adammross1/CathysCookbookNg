export interface Recipe {
  recipeId: number;
  recipeTitle: string;
  instructions: string;
  recipeClassName: string;
  recipeDetails: Ingredient[];
}

export interface RecipeDetail {
  recipeId: number;
  recipeSeqNo: number;
  ingredientId: number;
  ingredientName: string;
  ingredientClassName: string;
  measurementName: string;
  amount: number;
}

export interface Ingredient {
  ingredientId: number;
  ingredientName: string;
  ingredientClass: string;
  measurementName: string;
  amount: number;
}
