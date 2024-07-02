import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CcRecipesService {
  private http = inject(HttpClient);

  public getIngredients() {
    return this.http.get<any>(`http://localhost:5202/api/Ingredients`);
  }

  public getRecipeDetails() {
    return this.http.get<any>(`http://localhost:5202/api/RecipeDetails`);
  }

  public getRecipeDetailsById(recipeId: number) {
    return this.http.get<any>(
      `http://localhost:5202/api/RecipeDetails/${recipeId}`
    );
  }

  public getRecipes() {
    return this.http.get<any>(`http://localhost:5202/api/Recipes`);
  }

  public getRecipeClasses() {
    return this.http.get<any>(`http://localhost:5202/api/RecipeClasses`);
  }

  public getMeasurements() {
    return this.http.get<any>(`http://localhost:5202/api/Measurements`);
  }
}
