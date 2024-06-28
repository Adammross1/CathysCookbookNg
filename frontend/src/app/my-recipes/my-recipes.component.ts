import { Component, inject } from '@angular/core';
import { CcRecipesService } from '../core/services/cc-recipes.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.scss'
})
export class MyRecipesComponent {
  private ccRecipesService = inject(CcRecipesService);

  protected ingredients$ =
    this.ccRecipesService.getRecipe().pipe(map((response: any[]) => {
      return response.map(item => item.ingredientName);
    })
    )
}
