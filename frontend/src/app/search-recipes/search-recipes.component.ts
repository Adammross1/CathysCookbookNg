import { Component, inject, signal } from '@angular/core';
import { OperatorFunction, map } from 'rxjs';
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
  protected recipesSignal = signal<
    { name: string; category: string; area: string; ingredients: string[] }[]
  >([]);
  protected recipeSearchParam = '';
  protected searchRecipe = (searchParam: string) => {
    this.mealDBService
      .fetchName(searchParam)
      .pipe(
        map((data: { meals: any[] }) => {
          const meals = data.meals;
          if (!meals) {
            return ['sorry, no results'];
          }
          return meals.map((meal: any) => {
            const ingredients = [];
            for (let i = 1; i <= 20; i++) {
              const ingredient = meal[`strIngredient${i}`];
              if (ingredient) {
                ingredients.push(ingredient);
              } else {
                break;
              }
            }
            return {
              name: meal.strMeal,
              category: meal.strCategory,
              area: meal.strArea,
              ingredients: ingredients.join(', '),
            };
          });
        })
      )
      .subscribe((recipes: any[]) => {
        this.recipesSignal.set(recipes);
        console.log(recipes);
      });
  };
}
