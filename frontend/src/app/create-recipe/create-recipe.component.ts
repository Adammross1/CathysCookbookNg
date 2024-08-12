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
  }

  protected recipeClasses$ = this.ccRecipesService.getRecipeClasses();
  protected measurements$ = this.ccRecipesService.getMeasurements();
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

  onInputChange(event: Event) {
    this.ccRecipesService.setSearchIngredientsFilterSubject(
      (event.target as HTMLInputElement).value
    );
  }

  protected onCheckboxChange(event: any, ingredient: Ingredient) {
    if (event.target.checked) {
      this.selectedIngredientsService.setSelectedIngredientsSubjectAsObservable(
        ingredient
      );
      this.selectedIngredientsService
        .getSelectedIngredientsSubjectAsObservable()
        .subscribe((data) => {
          console.log(data);
        });
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
          console.log('ingredients: ', ingredients);
          const ingredientNames = ingredients.map(
            (ingredient) => ingredient.ingredientName
          );
          if (!ingredientNames.includes(group.get('ingredientName')?.value)) {
            console.log('deleting: ', group.get('ingredientName')?.value);
            this.recipeIngredientsFormArray.removeAt(i);
          }
        });
    }
  };

  protected recipeForm = this.formBuilder.group({
    title: ['', Validators.required],
    recipeClass: ['Main Course', Validators.required],
    image: [null],
    instructions: ['', Validators.required],
    recipeIngredientsFormArray: this.formBuilder.array([]),
  });

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
            ingredientClass: [''],
            unit: [''],
            amount: [''],
          });
          formArray.push(ingredientGroup);
        }
      });
    });
  }

  get recipeIngredientsFormArray(): FormArray {
    return this.recipeForm.get('recipeIngredientsFormArray') as FormArray;
  }

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
    ingredientId: 0,
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
        recipeDetails: [],
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
      this.recipeIngredientsFormArray.controls.forEach(
        (ingredientControl: AbstractControl) => {
          const ingredient = ingredientControl.value as Ingredient;
          this.recipeDetail = {
            recipeId: this.newRecipeId,
            recipeSeqNo: recipeSeqNo,
            ingredientId: ingredient.ingredientId,
            ingredientName: ingredient.ingredientName,
            ingredientClassName: ingredient.ingredientClass,
            measurementName: ingredient.measurementName,
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
