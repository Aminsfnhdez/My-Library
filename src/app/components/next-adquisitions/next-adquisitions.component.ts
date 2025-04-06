import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { NabVarComponent } from "../nab-var/nab-var.component";
import { FooterComponent } from "../footer/footer.component";
import { WishesComponent } from "../wishes/wishes.component";

@Component({
  selector: 'app-next-adquisitions',
  imports: [HeaderComponent, NabVarComponent, FooterComponent, WishesComponent],
  templateUrl: './next-adquisitions.component.html',
  styleUrl: './next-adquisitions.component.scss'
})
export class NextAdquisitionsComponent {

}
