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
import { map } from 'rxjs';
import { NoNegativeDirective } from '../directives/no-negative.directive';

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
    instructions: ['', Validators.required],
    recipeClass: ['', Validators.required],
    recipeIngredientsFormArray: this.formBuilder.array([
      this.createIngredientFormGroup(),
    ]),
  });

  get recipeIngredientsFormArray(): FormArray {
    return this.recipeForm.get('recipeIngredientsFormArray') as FormArray;
  }

  private amountValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const amountValue = control.value;
      if (amountValue !== null && (isNaN(amountValue) || amountValue < 0)) {
        return { invalidAmount: true };
      }
      return null;
    };
  }

  protected createIngredientFormGroup(): FormGroup {
    return this.formBuilder.group({
      ingredientName: ['', Validators.required],
      unit: ['', Validators.required],
      amount: ['', Validators.required, this.amountValidator()],
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

  private recipe = {};
  protected isSubmitted = false;
  protected addRecipe = () => {
    console.log('called');
    this.isSubmitted = true;
    // if (this.recipeForm.valid) {
    this.recipe = {
      RecipeTitle: this.recipeForm.controls.title.value,
      Instructions: this.recipeForm.controls.instructions.value,
      RecipeClassName: this.recipeForm.controls.recipeClass.value,
    };
    console.log(this.recipe);
    this.ccRecipesService.addRecipe(this.recipe);
    // }
    // else {
    //   alert('not valid');
    // }
    this.isSubmitted = false;
  };

  protected ingredients$ = this.ccRecipesService.getIngredients();
  protected recipeClasses$ = this.ccRecipesService.getRecipeClasses();
  protected measurements$ = this.ccRecipesService.getMeasurements();
}
