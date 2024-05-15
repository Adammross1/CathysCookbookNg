import { Component, inject } from '@angular/core';
import { SearchRecipesComponent } from '../search-recipes/search-recipes.component';
import { SearchTabsService } from '../core/services/search-tabs.service';
import { CommonModule } from '@angular/common';
import { MyRecipesComponent } from '../my-recipes/my-recipes.component';

@Component({
  selector: 'app-search-tabs',
  standalone: true,
  imports: [CommonModule, SearchRecipesComponent, MyRecipesComponent],
  templateUrl: './search-tabs.component.html',
  styleUrl: './search-tabs.component.scss',
})
export class SearchTabsComponent {
  protected searchTabsService = inject(SearchTabsService);
  protected selectedTab$ =
    this.searchTabsService.getSearchTabSelectionSubjectAsObservable();

  protected selectTab = (tabName: string): void => {
    this.searchTabsService.changeTab(tabName);
  };
}
