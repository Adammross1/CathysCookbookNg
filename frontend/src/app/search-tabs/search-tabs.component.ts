import { Component, inject } from '@angular/core';
import { SearchOnlineRecipesComponent } from '../search-online-recipes/search-online-recipes.component';
import { SearchTabsService } from '../core/services/search-tabs.service';
import { CommonModule } from '@angular/common';
import { SearchMyRecipesComponent } from '../search-my-recipes/search-my-recipes.component';

@Component({
  selector: 'app-search-tabs',
  standalone: true,
  imports: [
    CommonModule,
    SearchOnlineRecipesComponent,
    SearchMyRecipesComponent,
  ],
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
