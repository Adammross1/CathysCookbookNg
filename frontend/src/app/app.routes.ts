import { Routes } from '@angular/router';
import { CookbooksComponent } from './cookbooks/cookbooks.component';
import { MealPrepComponent } from './meal-prep/meal-prep.component';
import { SearchTabsComponent } from './search-tabs/search-tabs.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'search', component: SearchTabsComponent },
  { path: 'cookbooks', component: CookbooksComponent },
  { path: 'meal-prep', component: MealPrepComponent },
];
