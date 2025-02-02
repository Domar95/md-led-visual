import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';

import {
  OfferBannerComponent,
  OfferPresentationComponent,
  SlideshowComponent
} from '@components/index';
import { ContactPageComponent } from '@views/contact-page/contact-page.component';

@Component({
  selector: 'mdlv-home',
  imports: [
    SlideshowComponent,
    ContactPageComponent,
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
