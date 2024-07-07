import { Component, OnInit, inject } from '@angular/core';
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
import { Ingredient, Recipe, RecipeDetail } from '../core/models/recipe';
import { DropdownModule } from 'primeng/dropdown';
import { map } from 'rxjs';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NoNegativeDirective,
    DropdownModule,
  ],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
})
export class CreateRecipeComponent implements OnInit {
  private ccRecipesService = inject(CcRecipesService);
  private formBuilder = inject(FormBuilder);
  private newRecipeId = 0;

  ngOnInit(): void {
    this.ccRecipesService
      .getRecipes()
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.reduce((prev, current) =>
            prev.recipeId > current.recipeId ? prev : current
          );
        })
      )
      .subscribe((recipe: Recipe) => {
        this.newRecipeId = recipe.recipeId + 1;
      });
  }

  protected ingredients$ = this.ccRecipesService.getIngredients();
  protected recipeClasses$ = this.ccRecipesService.getRecipeClasses();
  protected measurements$ = this.ccRecipesService.getMeasurements();

  protected recipeForm = this.formBuilder.group({
    title: ['', Validators.required],
    recipeClass: ['Main Course', Validators.required],
    image: [null],
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
      ingredientClass: [''],
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
    recipeId: 0,
    recipeTitle: '',
    instructions: '',
    recipeClassName: '',
  };

  private recipeDetail: RecipeDetail = {
    recipeId: 0,
    recipeSeqNo: 0,
    ingredientName: '',
    ingredientClassName: '',
    measurementName: '',
    amount: 0,
  };

  protected isSubmitted = false;

  protected addRecipe = () => {
    this.isSubmitted = true;
    if (this.recipeForm.valid) {
      this.recipe = {
        recipeId: this.newRecipeId,
        recipeTitle: this.recipeForm.controls.title.value!,
        instructions: this.recipeForm.controls.instructions.value!,
        recipeClassName: this.recipeForm.controls.recipeClass.value!,
      };
      this.ccRecipesService.addRecipe(this.recipe).subscribe();
    } else {
      alert('not valid');
    }
    this.isSubmitted = false;
  };

  protected addRecipeDetails = () => {
    this.isSubmitted = true;
    if (this.recipeForm.valid) {
      let recipeSeqNo = 0;
      this.recipeIngredientsFormArray.controls.forEach((ingredientControl: AbstractControl) => {
        const ingredient = ingredientControl.value as Ingredient;
          this.recipeDetail = {
            recipeId: this.newRecipeId,
            recipeSeqNo: recipeSeqNo,
            ingredientName: ingredient.ingredientName,
            ingredientClassName: ingredient.ingredientClass,
            measurementName: ingredient.unit,
            amount: ingredient.amount,
          };
          this.ccRecipesService
            .addRecipeIngredient(this.recipeDetail)
            .subscribe();
          recipeSeqNo++;
        }
      );
    }
    this.isSubmitted = false;
  };
}
