import { Component, inject, signal } from '@angular/core';
import { CcRecipesService } from '../core/services/cc-recipes.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-my-recipes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './search-my-recipes.component.html',
  styleUrl: './search-my-recipes.component.scss',
})
export class SearchMyRecipesComponent {
  title = 'training';
  private ccRecipesService = inject(CcRecipesService);
  protected recipesSignal = signal<
    {
      name: string;
      category: string;
      area: string;
      ingredients: string[];
      id: string;
    }[]
  >([]);
  protected recipeSearchParam = '';
  protected searchRecipe = (searchParam: string) => {};

  protected recipes$ = this.ccRecipesService.getRecipes();
}
