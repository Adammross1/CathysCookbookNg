import { Routes } from '@angular/router';
import { MealPrepComponent } from './meal-prep/meal-prep.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { OnlineRecipeComponent } from './online-recipe/online-recipe.component';
import { CookbookTabsComponent } from './cookbook-tabs/cookbook-tabs.component';
import { SearchOnlineRecipesComponent } from './search-online-recipes/search-online-recipes.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'search', component: SearchOnlineRecipesComponent },
  { path: 'recipe/:id', component: OnlineRecipeComponent },
  { path: 'cookbooks', component: CookbookTabsComponent },
  { path: 'meal-prep', component: MealPrepComponent },
];
