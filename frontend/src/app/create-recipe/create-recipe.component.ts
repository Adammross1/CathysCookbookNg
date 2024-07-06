import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CcRecipesService } from '../core/services/cc-recipes.service';
import { NoNegativeDirective } from '../directives/no-negative.directive';
import { Recipe } from '../core/models/recipe';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NoNegativeDirective],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
})
export class CreateRecipeComponent {
  private ccRecipesService = inject(CcRecipesService);
  private formBuilder = inject(FormBuilder);

  protected recipeForm = this.formBuilder.group({
    title: ['', Validators.required],
    recipeClass: ['Main Course', Validators.required],
    image: [''],
    instructions: ['', Validators.required],
    recipeIngredientsFormArray: this.formBuilder.array([
      this.createIngredientFormGroup(),
    ]),
  });

  get recipeIngredientsFormArray(): FormArray {
    return this.recipeForm.get('recipeIngredientsFormArray') as FormArray;
  }

  protected createIngredientFormGroup(): FormGroup {
    return this.formBuilder.group({
      ingredientName: [''],
      unit: [''],
      amount: [''],
    });
  }

  protected addFormGroup = () => {
    this.recipeIngredientsFormArray.push(this.createIngredientFormGroup());
  };

  protected removeFormGroup = (index: number) => {
    if (this.recipeIngredientsFormArray.length > 1) {
      this.recipeIngredientsFormArray.removeAt(index);
    }
  };

  private recipe: Recipe = {
    recipeTitle: '',
    instructions: '',
    recipeClassName: '',
  };
  protected isSubmitted = false;
  protected addRecipe = () => {
    console.log('called');
    this.isSubmitted = true;
    if (this.recipeForm.valid) {
      this.recipe = {
        recipeTitle: this.recipeForm.controls.title.value!,
        instructions: this.recipeForm.controls.instructions.value!,
        recipeClassName: this.recipeForm.controls.recipeClass.value!,
      };
      console.log(this.recipe);
      this.ccRecipesService.addRecipe(this.recipe).subscribe();
    } else {
      alert('not valid');
    }
    this.isSubmitted = false;
  };

  protected ingredients$ = this.ccRecipesService.getIngredients();
  protected recipeClasses$ = this.ccRecipesService.getRecipeClasses();
  protected measurements$ = this.ccRecipesService.getMeasurements();
}
