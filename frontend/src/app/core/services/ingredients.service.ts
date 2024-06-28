import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  private http = inject(HttpClient);

  public fetchIngredients() {
    return this.http.get<any>(`https://localhost:5202/Cookbook`);
  }
}
