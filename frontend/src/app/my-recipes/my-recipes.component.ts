import { Component, inject } from '@angular/core';
import { CcRecipesService } from '../core/services/cc-recipes.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.scss'
})
export class MyRecipesComponent {
 protected ccRecipesService = inject(CcRecipesService);

 protected myRecipes$ = this.ccRecipesService.getRecipes()

}
