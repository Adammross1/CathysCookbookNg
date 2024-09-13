import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchOnlineRecipesComponent } from './search-online-recipes/search-online-recipes.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MealPrepComponent } from './meal-prep/meal-prep.component';
import { FooterComponent } from './footer/footer.component';
import { CookbookTabsComponent } from './cookbook-tabs/cookbook-tabs.component';
import { CcRecipesService } from './core/services/cc-recipes.service';

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
export class AppComponent implements OnInit {
  private ccRecipesService = inject(CcRecipesService);

  ngOnInit(): void {
    this.ccRecipesService.initializeMeasurements();
    this.ccRecipesService.initializeRecipes();
    this.ccRecipesService.initializeRecipeClasses();
    this.ccRecipesService.initializeIngredients();
    this.ccRecipesService.initializeIngredientClasses();
    this.ccRecipesService.initializeCollections();
  }
  title = "Cathy's Cookbook";

  protected back = () => {
    window.history.back();
  };
}
