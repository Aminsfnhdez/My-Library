import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-anterooms',
  imports: [ButtonModule],
  templateUrl: './anterooms.component.html',
  styleUrl: './anterooms.component.scss'
})
export class AnteroomsComponent {
  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/inicio']);
  }
}
