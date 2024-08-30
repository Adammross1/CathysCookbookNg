import { Component, inject } from '@angular/core';
import { CcRecipesService } from '../core/services/cc-recipes.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { Recipe } from '../core/models/recipe';

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.scss',
})
export class MyRecipesComponent {
  protected ccRecipesService = inject(CcRecipesService);
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

  protected deleteRecipe = (recipeId: number) => {
    this.ccRecipesService.deleteRecipe(recipeId).subscribe();
  };
  protected verifyDelete = (recipe: Recipe) => {
    const confirmed = confirm(
      `Are you sure you want to delete ${recipe.recipeTitle}?`
    );
    if (confirmed) {
      this.deleteRecipe(recipe.recipeId);
    }
  };
  protected editRecipe = (recipeId: number) => {};
}
