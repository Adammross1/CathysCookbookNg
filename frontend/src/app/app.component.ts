import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchOnlineRecipesComponent } from './search-online-recipes/search-online-recipes.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MealPrepComponent } from './meal-prep/meal-prep.component';
import { FooterComponent } from './footer/footer.component';
import { CookbookTabsComponent } from './cookbook-tabs/cookbook-tabs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    SearchOnlineRecipesComponent,
    NavbarComponent,
    CookbookTabsComponent,
    MealPrepComponent,
    FooterComponent,
  ],
})
export class AppComponent {
  title = "Cathy's Cookbook";

  protected back = () => {
    window.history.back();
  };
}
