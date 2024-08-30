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
import { combineLatest, map } from 'rxjs';
import { SelectedIngredientsService } from '../core/services/selected-ingredients.service';

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
  private selectedIngredientsService = inject(SelectedIngredientsService);
  private formBuilder = inject(FormBuilder);
  private newRecipeId = 0;
  protected valid = true;
  protected recipeAdded = false;

  private recipe: Recipe = {
    recipeId: 0,
    recipeTitle: '',
    instructions: '',
    recipeClassName: '',
    recipeDetails: [],
  };

  private recipeDetail: RecipeDetail = {
    recipeId: 0,
    recipeSeqNo: 0,
    ingredientName: '',
    ingredientClassName: '',
    measurementName: '',
    amount: 0,
  };

  ngOnInit(): void {
    this.initializeIngredients();
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
    this.recipeAdded = false;
  }

  // Form

  protected recipeForm = this.formBuilder.group({
    title: ['', Validators.required],
    recipeClass: ['Main Course', Validators.required],
    image: [null],
    instructions: ['', Validators.required],
    recipeIngredientsFormArray: this.formBuilder.array([]),
  });

  get recipeIngredientsFormArray(): FormArray {
    return this.recipeForm.get('recipeIngredientsFormArray') as FormArray;
  }

  // Observables

  protected recipeClasses$ = this.ccRecipesService.getRecipeClasses();
  protected measurements$ = this.ccRecipesService.getMeasurements();
  protected ingredientClasses$ = this.ccRecipesService.getIngredientClasses();
  protected selectedIngredients$ =
    this.selectedIngredientsService.getSelectedIngredientsSubjectAsObservable();
  protected ingredients$ = combineLatest([
    this.ccRecipesService.getIngredients(),
    this.ccRecipesService.getSearchIngredientsFilterSubjectAsObservable(),
  ]).pipe(
    map(([data, search]) => {
      if (!search || search.trim() === '') {
        return data;
      } else {
        const searchTerm = search.trim().toLowerCase();
        return data.filter((ingredient: Ingredient) => {
          return ingredient.ingredientName.toLowerCase().includes(searchTerm);
        });
      }
    })
  );

  // Methods

  protected onInputChange(event: Event) {
    this.ccRecipesService.setSearchIngredientsFilterSubject(
      (event.target as HTMLInputElement).value
    );
  }

  protected onCheckboxChange(event: any, ingredient: Ingredient) {
    if (event.target.checked) {
      this.selectedIngredientsService.setSelectedIngredientsSubjectAsObservable(
        ingredient
      );
    } else {
      this.selectedIngredientsService.removeIngredientFromSelectedIngredients(
        ingredient
      );
      this.removeFormGroup();
    }
  }

  protected removeFormGroup = () => {
    for (let i = 0; i < this.recipeIngredientsFormArray.length; i++) {
      const group = this.recipeIngredientsFormArray.at(i);
      this.selectedIngredientsService
        .getSelectedIngredientsSubjectAsObservable()
        .subscribe((ingredients) => {
          const ingredientNames = ingredients.map(
            (ingredient) => ingredient.ingredientName
          );
          if (!ingredientNames.includes(group.get('ingredientName')?.value)) {
            this.recipeIngredientsFormArray.removeAt(i);
          }
        });
    }
  };

  protected initializeIngredients() {
    this.selectedIngredients$.subscribe((ingredients) => {
      const formArray = this.recipeIngredientsFormArray;
      ingredients.forEach((ingredient) => {
        // Check if the ingredient already exists in the form array
        const exists = formArray.controls.some(
          (control) => control.value.ingredientId === ingredient.ingredientId
        );

        if (!exists) {
          // If the ingredient does not exist, add it to the form array
          const ingredientGroup = this.formBuilder.group({
            ingredientId: [ingredient.ingredientId],
            ingredientName: [ingredient.ingredientName],
            ingredientClassName: [''],
            measurementName: [''],
            amount: [''],
          });
          formArray.push(ingredientGroup);
        }
      });
    });
  }

  protected isSubmitted = false;
  protected addRecipe = () => {
    this.isSubmitted = true;
    if (this.recipeForm.valid) {
      this.valid = true;
      this.recipe = {
        recipeId: this.newRecipeId,
        recipeTitle: this.recipeForm.controls.title.value!,
        instructions: this.recipeForm.controls.instructions.value!,
        recipeClassName: this.recipeForm.controls.recipeClass.value!,
        recipeDetails: this.addRecipeDetails(),
      };
      console.log(this.recipe);
      this.ccRecipesService.addRecipe(this.recipe).subscribe();
      this.recipeAdded = true;
      this.recipeForm.reset();
    } else {
      this.valid = false;
    }
    this.isSubmitted = false;
  };

  protected addRecipeDetails = () => {
    let recipeSeqNo = 0;
    let recipeDetails: RecipeDetail[] = [];
    this.recipeIngredientsFormArray.controls.forEach(
      (ingredientControl: AbstractControl) => {
        const ingredient = ingredientControl.value as RecipeDetail;
        this.recipeDetail = {
          recipeId: this.newRecipeId,
          recipeSeqNo: recipeSeqNo,
          ingredientName: ingredient.ingredientName,
          ingredientClassName: ingredient.ingredientClassName,
          measurementName: ingredient.measurementName,
          amount: ingredient.amount,
        };
        recipeDetails.push(this.recipeDetail);
        recipeSeqNo++;
      }
    );
    return recipeDetails;
  };
}
