import { Component, inject } from '@angular/core';
import { CcRecipesService } from '../core/services/cc-recipes.service';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-recipe.component.html',
  styleUrl: './my-recipe.component.scss',
})
export class MyRecipeComponent {
  private ccRecipesService = inject(CcRecipesService);
  protected route = inject(ActivatedRoute);
  protected selectedId: number = 0;

  protected recipe$ = this.route.paramMap.pipe(
    switchMap((params) => {
      this.selectedId = Number(params.get('id'));
      return this.ccRecipesService.getRecipeByID(this.selectedId);
    })
  );

  // protected deleteRecipe = () => {
  //   console.log('called');
  //   this.route.paramMap.pipe(
  //     switchMap((params) => {
  //       return this.ccRecipesService.deleteRecipe(Number(params.get('id')));
  //     })
  //   );
  // };
}
