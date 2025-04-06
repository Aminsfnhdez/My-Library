import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nab-var',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nab-var.component.html',
  styleUrl: './nab-var.component.scss'
})
export class NabVarComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
