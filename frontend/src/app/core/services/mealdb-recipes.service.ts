import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MealDBRecipesService {
  private http = inject(HttpClient);

  public fetchDetails(recipeId: number) {
    return this.http.get<any>(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
    );
  }

  public fetchName(recipeSearchParam: string) {
    // Make the HTTP request and return the Observable
    return this.http.get<any>(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeSearchParam}`
    );
  }
}
