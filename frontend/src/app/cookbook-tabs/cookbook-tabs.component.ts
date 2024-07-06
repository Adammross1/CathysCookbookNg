import { Component, inject } from '@angular/core';
import { CreateRecipeComponent } from '../create-recipe/create-recipe.component';
import { CommonModule } from '@angular/common';
import { TabsService } from '../core/services/tabs.service';
import { MyRecipesComponent } from '../my-recipes/my-recipes.component';
import { ListsComponent } from '../lists/lists.component';
import { COOKBOOKS_TABS, TABS_DISPLAY_MAP, tabOption } from '../core/constants';

@Component({
  selector: 'app-cookbook-tabs',
  standalone: true,
  templateUrl: './cookbook-tabs.component.html',
  styleUrl: './cookbook-tabs.component.scss',
  imports: [
    CommonModule,
    CreateRecipeComponent,
    MyRecipesComponent,
    ListsComponent,
  ],
})
export class CookbookTabsComponent {
  protected tabsService = inject(TabsService);
  protected selectedTab$ =
    this.tabsService.getCookbookTabSelectionSubjectAsObservable();
  protected tabs = COOKBOOKS_TABS;
  protected tabsDisplayMap = TABS_DISPLAY_MAP;

  protected selectTab = (tabName: tabOption): void => {
    this.tabsService.changeCookbookTab(tabName);
  };
}
