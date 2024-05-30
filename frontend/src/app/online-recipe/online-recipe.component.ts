import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { MealDBRecipesService } from '../core/services/mealdb-recipes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-online-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './online-recipe.component.html',
  styleUrl: './online-recipe.component.scss'
})
export class OnlineRecipeComponent {
  private mealDBService = inject(MealDBRecipesService);
  protected selectedId: number = 0;
  protected route = inject(ActivatedRoute);

  protected recipe$ = this.route.paramMap.pipe(
    switchMap((params) => {
      this.selectedId = Number(params.get('id'));
      return this.mealDBService.fetchDetails(this.selectedId).pipe(
        map((response) => {
          const meal = response.meals[0];
          const ingredients = [];
  
          for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measurement = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== '') {
              ingredients.push(`${ingredient} - ${measurement}`);
            }
          }
  
          return {
            strMeal: meal.strMeal,
            ingredients,
            instructions: meal.strInstructions,
            category: meal.strCategory,
            area: meal.strArea,
          };
        })
      );
    })
  );

  protected getIngredients = (recipe: any): string[] => {
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }
    return ingredients;
  };
  protected getMeasurements = (recipe: any): string[] => {
    const measurements: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const measure = recipe[`strMeasure${i}`];
      if (measure) {
        measurements.push(measure);
      }
    }
    return measurements;
  };
}
