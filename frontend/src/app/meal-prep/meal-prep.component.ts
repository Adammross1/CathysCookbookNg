import { Component, inject } from '@angular/core';
import { CcRecipesService } from '../core/services/cc-recipes.service';
import { CommonModule } from '@angular/common';
import { combineLatest, map, Observable } from 'rxjs';
import { Ingredient, Recipe, RecipeDetail } from '../core/models/recipe';
import { SelectedRecipesService } from '../core/services/selected-recipes.service';

@Component({
  selector: 'app-meal-prep',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal-prep.component.html',
  styleUrl: './meal-prep.component.scss',
})
export class MealPrepComponent {
  private ccRecipesService = inject(CcRecipesService);
  private selectedRecipesService = inject(SelectedRecipesService);
  protected searchFilter = '';
  onInputChange(event: Event) {
    this.ccRecipesService.setSearchRecipeFilterSubject(
      (event.target as HTMLInputElement).value
    );
  }

  protected myRecipes$ = combineLatest([
    this.ccRecipesService.getRecipes(),
    this.ccRecipesService.getSearchRecipeFilterSubjectAsObservable(),
  ]).pipe(
    map(([data, search]) => {
      if (!search || search.trim() === '') {
        return data;
      } else {
        const searchTerm = search.trim().toLowerCase();
        return data.filter((recipe: Recipe) => {
          return recipe.recipeTitle.toLowerCase().includes(searchTerm);
        });
      }
    })
  );

  protected selectedRecipes$ =
    this.selectedRecipesService.getSelectedRecipesSubjectAsObservable();

  protected shoppingList$ = this.selectedRecipesService
    .getSelectedRecipesSubjectAsObservable()
    .pipe(
      map((recipes) => {
        const shoppingList: RecipeDetail[] = [];

        recipes.forEach((recipe: Recipe) => {
          const ingredients = recipe.recipeDetails;

          ingredients.forEach((ingredient) => {
            const existingIngredient = shoppingList.find(
              (i) => i.ingredientName === ingredient.ingredientName
            );

            if (existingIngredient) {
              existingIngredient.amount += ingredient.amount;
            } else {
              shoppingList.push({ ...ingredient });
            }
          });
        });
        return shoppingList;
      })
    );

  protected onCheckboxChange(event: any, recipe: Recipe) {
    if (event.target.checked) {
      this.selectRecipe(recipe);
    } else {
      this.deselectRecipe(recipe);
    }
  }
  private selectRecipe = (recipe: Recipe) => {
    this.selectedRecipesService.setSelectedRecipesSubjectAsObservable(recipe);
  };

  private deselectRecipe(recipe: Recipe) {
    this.selectedRecipesService.removeRecipeFromSelectedRecipes(recipe);
  }
}
