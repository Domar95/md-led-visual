import { Component, HostBinding, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';

import {
  OfferBannerComponent,
  OfferPresentationComponent,
  SlideshowComponent,
} from '@components/index';
import { ContactPageComponent } from '@views/contact-page/contact-page.component';
import { routeAnimationsState } from 'src/animations/route-animations';

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
  animations: [routeAnimationsState],
})
export class HomeComponent implements OnInit {
  @HostBinding('@routeAnimations') routeAnimations = true;

  constructor(private activatedRoute: ActivatedRoute) {}

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
