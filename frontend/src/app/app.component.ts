import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchRecipesComponent } from './search-recipes/search-recipes.component';
import { SearchTabsComponent } from "./search-tabs/search-tabs.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, SearchRecipesComponent, SearchTabsComponent]
})
export class AppComponent {
  title = 'CathysCookbook';
}
