import { Component } from '@angular/core';

import { ResponsiveLayoutService } from '@services/responsive-layout.service';

@Component({
  selector: 'mdlv-offer-banner',
  imports: [],
  templateUrl: './offer-banner.component.html',
  styleUrl: './offer-banner.component.scss',
})
export class OfferBannerComponent {
  isHandset!: boolean;

  constructor(private responsiveLayoutService: ResponsiveLayoutService) {}

  ngOnInit() {
    this.responsiveLayoutService.isHandset$.subscribe((isHandset) => {
      this.isHandset = isHandset;
    });
  }
}
