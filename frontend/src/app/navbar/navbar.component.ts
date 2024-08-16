import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CcRecipesService } from '../core/services/cc-recipes.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  protected ccRecipesService = inject(CcRecipesService);
  protected resetRecipeFilter = () => {
    this.ccRecipesService.setSearchRecipeFilterSubject('');
  };
}
