import { Component, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { MealDBRecipesService } from '../core/services/mealdb-recipes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-recipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-recipes.component.html',
  styleUrl: './search-recipes.component.scss'
})
export class SearchRecipesComponent {
  title = 'training';
  protected recipe$: Observable<{strMeal: string, ingredients: string[]}[]> = of([]);
  protected recipeNames$: Observable<string> = of('');
  
  private recipesService = inject(MealDBRecipesService);

  getRecipeDetails = (recipeIdValue: string) => {
    this.recipe$ = this.recipesService.fetchDetails(recipeIdValue).pipe(
      map(data => {
        const recipes = data.map((response: { meals: any[]; }) => response.meals[0]);
        return recipes.map((recipe: { strMeal: any; }) => ({
          strMeal: recipe.strMeal,
          ingredients: this.getIngredients(recipe)
        }));
      }),
    );
  }

  getIngredients = (recipe: any): string[] => {
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && measure) {
        ingredients.push(`${ingredient} - ${measure}`);
      } else if (ingredient) {
        ingredients.push(ingredient);
      }
    }
    return ingredients;
  }

  getRecipe = (recipeNameValue: string) => {
    this.recipeNames$ = this.recipesService.fetchName(recipeNameValue);
  }
}
