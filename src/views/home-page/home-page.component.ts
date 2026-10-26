import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import {
  FeaturesComponent,
  HeroComponent,
  OfferBannerComponent,
  OfferPresentationComponent,
  SlideshowComponent,
} from '@components/index';
import { routeAnimationsState } from 'src/animations/route-animations';

@Component({
  selector: 'mdlv-home-page',
  imports: [
    SlideshowComponent,
    RouterModule,
    OfferPresentationComponent,
    OfferBannerComponent,
    FeaturesComponent,
    HeroComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  animations: [routeAnimationsState],
})
export class HomePageComponent implements OnInit {
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
