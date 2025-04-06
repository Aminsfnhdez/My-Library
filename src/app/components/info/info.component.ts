import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';
import { NabVarComponent } from "../nab-var/nab-var.component";
import { AboutComponent } from "../about/about.component";
import {PrivacyPolicyComponent} from "../privacy-policy/privacy-policy.component";
import { FooterComponent } from "../footer/footer.component";
import { LicenceComponent } from "../licence/licence.component";
import { ContactComponent } from "../contact/contact.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [NabVarComponent, PrivacyPolicyComponent, FooterComponent, AboutComponent, LicenceComponent, ContactComponent, HeaderComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private scrollService: ScrollService
  ) {}

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.scrollService.scrollToElement(fragment);
      }
    });
  }
}
