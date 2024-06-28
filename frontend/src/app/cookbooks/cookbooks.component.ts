import { Component } from '@angular/core';
import { CreateRecipeComponent } from '../create-recipe/create-recipe.component';

@Component({
  selector: 'app-cookbooks',
  standalone: true,
  imports: [CreateRecipeComponent],
  templateUrl: './cookbooks.component.html',
  styleUrl: './cookbooks.component.scss'
})
export class CookbooksComponent {

}
