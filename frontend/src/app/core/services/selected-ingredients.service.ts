import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Ingredient } from '../models/recipe';

@Injectable({
  providedIn: 'root',
})
export class SelectedIngredientsService {
  private selectedIngredientsSubject = new BehaviorSubject<Ingredient[]>([]);
  private selectedIngredients: Ingredient[] = [];

  public getSelectedIngredientsSubjectAsObservable() {
    return this.selectedIngredientsSubject;
  }

  public setSelectedIngredientsSubjectAsObservable(ingredient: Ingredient) {
    this.selectedIngredients.push(ingredient);
    console.log(this.selectedIngredients);
    this.selectedIngredientsSubject.next(this.selectedIngredients);
  }

  public removeIngredientFromSelectedIngredients(recipe: Ingredient) {
    this.selectedIngredients = this.selectedIngredients.filter(
      (i) => i.ingredientId !== recipe.ingredientId
    );
    this.selectedIngredientsSubject.next(this.selectedIngredients);
  }
}
