import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CcRecipesService {
  private http = inject(HttpClient);

  public getRecipe() {
    return this.http.get<any>(
      `https://localhost:5202/cookbook`
    );
  }
}
