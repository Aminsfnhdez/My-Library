import { Component } from '@angular/core';
import { NabVarComponent } from "../nab-var/nab-var.component";
import { AboutComponent } from "../about/about.component";
import {PrivacyPolicyComponent} from "../privacy-policy/privacy-policy.component";
import { FooterComponent } from "../footer/footer.component";
import { LicenceComponent } from "../licence/licence.component";
import { ContactComponent } from "../contact/contact.component";

@Component({
  selector: 'app-info',
  imports: [NabVarComponent, PrivacyPolicyComponent, FooterComponent, AboutComponent, LicenceComponent, ContactComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {

}
