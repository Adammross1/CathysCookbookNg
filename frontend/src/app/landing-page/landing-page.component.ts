import { Component } from '@angular/core';
import { CustomCardComponent } from '../custom-card/custom-card.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CustomCardComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
