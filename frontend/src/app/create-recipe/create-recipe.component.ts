import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IngredientsService } from '../core/services/ingredients.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
})
export class CreateRecipeComponent {
  private ingredientsService = inject(IngredientsService);
  private formBuilder = inject(FormBuilder);

  protected recipeForm = this.formBuilder.group({
    title: ['', Validators.required],
    instructions: ['', Validators.required],
    recipeClass: ['', Validators.required],
    recipeIngredientsFormArray: this.formBuilder.array([
      this.createIngredientFormGroup(),
    ]),
  });

  get recipeIngredientsFormArray(): FormArray {
    return this.recipeForm.get('recipeIngredientsFormArray') as FormArray;
  }

  protected createIngredientFormGroup(): FormGroup {
    return this.formBuilder.group({
      ingredientName: ['', Validators.required],
      unit: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  protected addFormGroup = () => {
    this.recipeIngredientsFormArray.push(this.createIngredientFormGroup());
  };

  protected removeFormGroup = (index: number) => {
    if (this.recipeIngredientsFormArray.length > 0) {
      this.recipeIngredientsFormArray.removeAt(index);
    }
  };

  protected ingredients$ = this.ingredientsService.fetchIngredients();
}
