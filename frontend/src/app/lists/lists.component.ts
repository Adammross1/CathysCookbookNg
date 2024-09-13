import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { of } from 'rxjs';
import { CcRecipesService } from '../core/services/cc-recipes.service';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss',
})
export class ListsComponent {
  private ccRecipesService = inject(CcRecipesService);
  protected lists$ = this.ccRecipesService.getCollections();
  // of([
  //   {
  //     listId: 1,
  //     listName: 'Juices',
  //     recipeId: 1,
  //   },
  //   {
  //     listId: 1,
  //     listName: 'Main Dishes',
  //     recipeId: 1,
  //   },
  //   {
  //     listId: 1,
  //     listName: 'Cheap Meals',
  //     recipeId: 1,
  //   },
  //   {
  //     listId: 1,
  //     listName: 'Quick Meals',
  //     recipeId: 1,
  //   },
  //   {
  //     listId: 1,
  //     listName: 'Treats',
  //     recipeId: 1,
  //   },
  //   {
  //     listId: 1,
  //     listName: 'Bread',
  //     recipeId: 1,
  //   },
  //   {
  //     listId: 1,
  //     listName: 'Quick Meals',
  //     recipeId: 1,
  //   },
  //   {
  //     listId: 1,
  //     listName: 'Treats',
  //     recipeId: 1,
  //   },
  //   {
  //     listId: 1,
  //     listName: 'Juices',
  //     recipeId: 1,
  //   },
  //   {
  //     listId: 1,
  //     listName: 'Main Dishes',
  //     recipeId: 1,
  //   },
  //   {
  //     listId: 1,
  //     listName: 'Cheap Meals',
  //     recipeId: 1,
  //   },
  //   {
  //     listId: 1,
  //     listName: 'Quick Meals',
  //     recipeId: 1,
  //   },
  //   {
  //     listId: 1,
  //     listName: 'Treats',
  //     recipeId: 1,
  //   },
  //   {
  //     listId: 1,
  //     listName: 'Bread',
  //     recipeId: 1,
  //   },
  //   {
  //     listId: 1,
  //     listName: 'Quick Meals',
  //     recipeId: 1,
  //   },
  //   {
  //     listId: 1,
  //     listName: 'Treats',
  //     recipeId: 1,
  //   },

  // ]);
}
