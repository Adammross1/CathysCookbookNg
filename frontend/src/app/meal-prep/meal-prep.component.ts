import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CcRecipesService } from '../core/services/cc-recipes.service';
import { CommonModule } from '@angular/common';
import { combineLatest, map } from 'rxjs';
import { Ingredient, Recipe, RecipeDetail } from '../core/models/recipe';
import { SelectedRecipesService } from '../core/services/selected-recipes.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-meal-prep',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meal-prep.component.html',
  styleUrl: './meal-prep.component.scss',
})
export class MealPrepComponent {
  @ViewChild('shoppingListTable', { static: false })
  shoppingListTable!: ElementRef;
  private ccRecipesService = inject(CcRecipesService);
  private selectedRecipesService = inject(SelectedRecipesService);
  protected route = inject(ActivatedRoute);
  protected http = inject(HttpClient);
  protected email: string = '';
  protected searchFilter = '';
  onInputChange(event: Event) {
    this.ccRecipesService.setSearchRecipeFilterSubject(
      (event.target as HTMLInputElement).value
    );
  }

  protected myRecipes$ = combineLatest([
    this.ccRecipesService.getRecipes(),
    this.ccRecipesService.getSearchRecipeFilterSubjectAsObservable(),
  ]).pipe(
    map(([data, search]) => {
      if (!search || search.trim() === '') {
        return data;
      } else {
        const searchTerm = search.trim().toLowerCase();
        return data.filter((recipe: Recipe) => {
          return recipe.recipeTitle.toLowerCase().includes(searchTerm);
        });
      }
    })
  );

  protected selectedRecipes$ =
    this.selectedRecipesService.getSelectedRecipesSubjectAsObservable();

  private shoppingListString = '';
  protected shoppingList$ = this.selectedRecipesService
    .getSelectedRecipesSubjectAsObservable()
    .pipe(
      map((recipes) => {
        const shoppingList: RecipeDetail[] = [];
        recipes.forEach((recipe: Recipe) => {
          const ingredients = recipe.recipeDetails;

          ingredients.forEach((ingredient) => {
            const existingIngredient = shoppingList.find(
              (i) => i.ingredientName === ingredient.ingredientName
            );

            if (existingIngredient) {
              existingIngredient.amount += ingredient.amount;
            } else {
              shoppingList.push({ ...ingredient });
            }
          });
        });
        this.shoppingListString = shoppingList
          .map(
            (ingredient) =>
              `${ingredient.ingredientName} ${ingredient.amount} ${ingredient.measurementName}`
          )
          .join('\n');
        return shoppingList;
      })
    );

  protected onCheckboxChange(event: any, recipe: Recipe) {
    if (event.target.checked) {
      this.selectRecipe(recipe);
    } else {
      this.deselectRecipe(recipe);
    }
  }
  private selectRecipe = (recipe: Recipe) => {
    this.selectedRecipesService.setSelectedRecipesSubjectAsObservable(recipe);
  };

  private deselectRecipe(recipe: Recipe) {
    this.selectedRecipesService.removeRecipeFromSelectedRecipes(recipe);
  }

  sendEmail() {
    // Send the email using EmailJS
    emailjs
      .send(
        'service_upmfo5q',
        'template_59xvt0o',
        {
          to_name: this.email,
          to_email: this.email,
          message: this.shoppingListString,
        },
        'Pq3KTtKAldCwhZ467'
      )
      .then((response) => {
        console.log('Email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }

  generatePDF() {
    const tableElement = this.shoppingListTable.nativeElement;

    html2canvas(tableElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p', // 'p' for portrait, 'l' for landscape
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 paper width in mm
      const pageHeight = 295; // A4 paper height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('shopping-list.pdf');
    });
  }
}
