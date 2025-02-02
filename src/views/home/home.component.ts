import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';

import {
  OfferBannerComponent,
  OfferPresentationComponent,
  SlideshowComponent
} from '@components/index';
import { ContactComponent } from '@views/contact/contact.component';

@Component({
  selector: 'mdlv-home',
  imports: [
    SlideshowComponent,
    ContactComponent,
    RouterModule,
    MatButtonModule,
    OfferPresentationComponent,
    OfferBannerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      if (fragment) this.jumpToSection(fragment);
    });
  }

  jumpToSection(section: string | null) {
    if (section)
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }
}
