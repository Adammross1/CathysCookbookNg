import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchRecipesComponent } from './search-recipes/search-recipes.component';
import { SearchTabsComponent } from './search-tabs/search-tabs.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CookbooksComponent } from './cookbooks/cookbooks.component';
import { MealPrepComponent } from './meal-prep/meal-prep.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    SearchRecipesComponent,
    SearchTabsComponent,
    NavbarComponent,
    CookbooksComponent,
    MealPrepComponent,
  ],
})
export class AppComponent {
  title = 'CathysCookbook';
}
