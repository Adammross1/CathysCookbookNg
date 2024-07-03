import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CcRecipesService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5202/api';

  // Existing methods for fetching data
  public getIngredients(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Ingredients`);
  }

  public getRecipeDetails(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/RecipeDetails`);
  }

  public getRecipeDetailsById(recipeId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/RecipeDetails/${recipeId}`);
  }

  public getRecipes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Recipes`);
  }

  public getRecipeClasses(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/RecipeClasses`);
  }

  public getMeasurements(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Measurements`);
  }

  // Method to add a new recipe
  public addRecipe(recipe: any): Observable<any> {
    console.log('service called');
    return this.http.post<any>(`${this.apiUrl}/Recipes`, recipe);
  }

//  For Postman  {
//     RecipeId: 2
//     RecipeTitle: 'spaghetti',
//     Instructions: 'make spaghetti',
//     RecipeClassName: 'main course',
// }
}
