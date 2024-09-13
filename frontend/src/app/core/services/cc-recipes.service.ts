import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root',
})
export class CcRecipesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5202/api';

  // Subjects
  private ingredientsSubject = new ReplaySubject<any>(1);
  private ingredientClassesSubject = new ReplaySubject<any>(1);
  private recipeClassesSubject = new ReplaySubject<any>(1);
  private measurementsSubject = new ReplaySubject<any>(1);
  private recipesSubject = new ReplaySubject<any>(1);
  private collectionsSubject = new ReplaySubject<any>(1);
  private searchRecipeFilterSubject = new BehaviorSubject<string>('');
  private searchIngredientsFilterSubject = new BehaviorSubject<string>('');

  // Initialize methods
  public initializeIngredients(): void {
    this.http.get<any>(`${this.apiUrl}/Ingredients`).subscribe((data) => {
      this.ingredientsSubject.next(data);
    });
  }
  public initializeIngredientClasses(): void {
    this.http.get<any>(`${this.apiUrl}/IngredientClasses`).subscribe((data) => {
      this.ingredientClassesSubject.next(data);
    });
  }
  public initializeRecipeClasses(): void {
    this.http.get<any>(`${this.apiUrl}/RecipeClasses`).subscribe((data) => {
      this.recipeClassesSubject.next(data);
    });
  }
  public initializeMeasurements(): void {
    this.http.get<any>(`${this.apiUrl}/Measurements`).subscribe((data) => {
      this.measurementsSubject.next(data);
    });
  }
  public initializeRecipes(): void {
    this.http.get<any>(`${this.apiUrl}/Recipes`).subscribe((data) => {
      this.recipesSubject.next(data);
    });
  }
  public initializeCollections(): void {
    this.http.get<any>(`${this.apiUrl}/Collections`).subscribe((data) => {
      this.collectionsSubject.next(data);
    });
  }

  // Getters and Setters
  public getIngredients(): Observable<any> {
    return this.ingredientsSubject.asObservable();
  }

  public getIngredientClasses(): Observable<any> {
    return this.ingredientClassesSubject.asObservable();
  }

  public getRecipeDetails(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/RecipeDetails`);
  }

  public getRecipeDetailsById(recipeId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/RecipeDetails/${recipeId}`);
  }

  public getRecipeByID = (recipeId: number) => {
    return this.http.get<any>(`${this.apiUrl}/FullRecipe/${recipeId}`);
  };

  public getRecipeClasses(): Observable<any> {
    return this.recipeClassesSubject.asObservable();
  }

  public getMeasurements(): Observable<any> {
    return this.measurementsSubject.asObservable();
  }

  public getRecipes(): Observable<any> {
    return this.recipesSubject.asObservable();
  }

  public getCollections(): Observable<any> {
    return this.collectionsSubject.asObservable();
  }

  public setSearchRecipeFilterSubject = (search: string) => {
    this.searchRecipeFilterSubject.next(search);
  };
  public getSearchRecipeFilterSubjectAsObservable = () => {
    return this.searchRecipeFilterSubject;
  };

  public setSearchIngredientsFilterSubject = (search: string) => {
    this.searchIngredientsFilterSubject.next(search);
  };
  public getSearchIngredientsFilterSubjectAsObservable = () => {
    return this.searchIngredientsFilterSubject;
  };

  // Other Methods
  public addRecipe(recipe: Recipe) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(this.apiUrl + '/Recipes', recipe);
    return this.http.post(`${this.apiUrl}/Recipes`, recipe, {
      headers: headers,
    });
  }
  public deleteRecipe(recipeId: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(`${this.apiUrl}/Recipes/${recipeId}`, { headers });
  }
}
