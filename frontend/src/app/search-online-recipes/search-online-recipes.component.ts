import { Component, inject, signal } from '@angular/core';
import { OperatorFunction, map } from 'rxjs';
import { MealDBRecipesService } from '../core/services/mealdb-recipes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-search-online-recipes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './search-online-recipes.component.html',
  styleUrl: './search-online-recipes.component.scss',
})
export class SearchOnlineRecipesComponent {
  title = 'training';
  private mealDBService = inject(MealDBRecipesService);
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
              id: meal.idMeal,
              ingredients: ingredients.join(', '),
            };
          });
        })
      )
      .subscribe((recipes: any[]) => {
        this.recipesSignal.set(recipes);
      });
  };
}
