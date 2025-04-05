import { Component } from '@angular/core';
;
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { NabVarComponent } from "../nab-var/nab-var.component";
import { FooterComponent } from "../footer/footer.component";
import { EstanteComponent } from "../estante/estante.component";


@Component({
  selector: 'app-home',
  imports: [CommonModule, NabVarComponent, FooterComponent, HeaderComponent, EstanteComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  

    

    
}
