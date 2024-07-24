import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root',
})
export class SelectedRecipesService {
  private selectedRecipesSubject = new Subject<Recipe[]>();
  private selectedRecipes: Recipe[] = [];

  public getSelectedRecipesSubjectAsObservable() {
    return this.selectedRecipesSubject;
  }

  public setSelectedRecipesSubjectAsObservable(recipe: Recipe) {
    this.selectedRecipes.push(recipe);
    this.selectedRecipesSubject.next(this.selectedRecipes);
  }

  public removeRecipeFromSelectedRecipes(recipe: Recipe) {
    this.selectedRecipes = this.selectedRecipes.filter(r => r.recipeId !== recipe.recipeId);
    this.selectedRecipesSubject.next(this.selectedRecipes);
  }
}
