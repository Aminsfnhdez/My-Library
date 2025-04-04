import { Component } from '@angular/core';
;
import { CommonModule } from '@angular/common';
import { NabVarComponent } from "../nab-var/nab-var.component";
import { FooterComponent } from "../footer/footer.component";


@Component({
  selector: 'app-home',
  imports: [CommonModule, NabVarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  

    

    
}
