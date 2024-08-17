export interface Recipe {
  recipeId: number;
  recipeTitle: string;
  instructions: string;
  recipeClassName: string;
  recipeDetails: RecipeDetail[];
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
  ingredientId: number;
  ingredientName: string;
  ingredientClass: string;
  measurementName: string;
  amount: number;
}

export interface RecipeClass {
  recipeClassId: number;
  recipeClassName: string;
}
