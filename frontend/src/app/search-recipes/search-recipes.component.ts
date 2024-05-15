import { Component, inject, signal } from '@angular/core';
import { map } from 'rxjs';
import { MealDBRecipesService } from '../core/services/mealdb-recipes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-recipes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-recipes.component.html',
  styleUrl: './search-recipes.component.scss',
})
export class SearchRecipesComponent {
  title = 'training';
  private mealDBService = inject(MealDBRecipesService);
  protected recipeNamesSignal = signal<string[]>([]);
  protected recipeSearchParam = '';
  protected searchRecipe = (searchParam: string) => {
    this.mealDBService
      .fetchName(searchParam)
      .pipe(
        map((data) => {
          const meals = data.meals;
          if (!meals) {
            return ['sorry, no results'];
          }
          return meals.map((meal: { strMeal: any }) => meal.strMeal);
        })
      )
      .subscribe((recipes) => {
        this.recipeNamesSignal.set(recipes);
      });
  };
}
