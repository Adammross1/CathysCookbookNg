import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ingredient, Recipe, RecipeDetail } from '../models/recipe';

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

  public getRecipeByID = (recipeId: number) => {
    return this.http.get<any>(`${this.apiUrl}/Recipes/${recipeId}`);
  };

  public getRecipeClasses(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/RecipeClasses`);
  }

  public getMeasurements(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Measurements`);
  }

  public getRecipes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Recipes`);
  }

  public addRecipe(recipe: Recipe): Observable<Recipe> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Recipe>(`${this.apiUrl}/Recipes`, recipe, {
      headers: headers,
    });
  }

  public addRecipeIngredient(
    recipeDetail: RecipeDetail
  ): Observable<RecipeDetail> {
    console.log('recipeDetail called', recipeDetail);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<RecipeDetail>(
      `${this.apiUrl}/RecipeDetails`,
      recipeDetail,
      {
        headers: headers,
      }
    );
  }

  public deleteRecipe(recipeId: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(`${this.apiUrl}/${recipeId}`, { headers });
  }

  private searchFilterSubject = new BehaviorSubject<string>('');
  public setSearchFilterSubject = (search: string) => {
    this.searchFilterSubject.next(search);
  };
  public getSearchFilterSubjectAsObservable = () => {
    return this.searchFilterSubject;
  };
}
