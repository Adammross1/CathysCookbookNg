import { Component, inject } from '@angular/core';
import { CcRecipesService } from '../core/services/cc-recipes.service';
import { CommonModule } from '@angular/common';
import { combineLatest, map, Observable } from 'rxjs';
import { Recipe, RecipeDetail } from '../core/models/recipe';
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

  shoppingList$ = combineLatest([
    this.ccRecipesService.getRecipeDetails(),
    this.selectedRecipesService.getSelectedRecipesSubjectAsObservable(),
  ]).pipe(
    map(([ingredients, selectedRecipes]) => {
      const recipeDetails: RecipeDetail[] = [];

      selectedRecipes.forEach((recipe: Recipe) => {
        ingredients
          .filter(
            (ingredient: RecipeDetail) =>
              ingredient.recipeId === recipe.recipeId
          )
          .forEach((ingredient: RecipeDetail) => {
            const existingIngredient = recipeDetails.find(
              (item) => item.ingredientName === ingredient.ingredientName
            );
            if (existingIngredient) {
              existingIngredient.amount += ingredient.amount;
            } else {
              recipeDetails.push({ ...ingredient });
            }
          });
      });

      return recipeDetails;
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
