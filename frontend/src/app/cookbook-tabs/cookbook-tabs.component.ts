import { Component, inject } from '@angular/core';
import { CreateRecipeComponent } from '../create-recipe/create-recipe.component';
import { CommonModule } from '@angular/common';
import { TabsService } from '../core/services/tabs.service';
import { MyRecipesComponent } from "../my-recipes/my-recipes.component";

@Component({
    selector: 'app-cookbook-tabs',
    standalone: true,
    templateUrl: './cookbook-tabs.component.html',
    styleUrl: './cookbook-tabs.component.scss',
    imports: [CommonModule, CreateRecipeComponent, MyRecipesComponent]
})
export class CookbookTabsComponent {
  protected tabsService = inject(TabsService);
  protected selectedTab$ =
    this.tabsService.getCookbookTabSelectionSubjectAsObservable();

  protected selectTab = (tabName: string): void => {
    this.tabsService.changeCookbookTab(tabName);
  };
}
