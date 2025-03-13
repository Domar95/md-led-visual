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
  textSecondary: string =
    'Specjalizujemy się w oprawie wizualnej wydarzeń - od prezentacji po konferencje. Oferujemy nowoczesne ekrany LED i telebimy, które nadadzą Twojemu eventowi wyjątkowy charakter. Tworzymy kompleksowe rozwiązania, dbając o każdy detal, by wizualnie zachwycić uczestników.';

  constructor(private responsiveLayoutService: ResponsiveLayoutService) {}

  ngOnInit() {
    this.responsiveLayoutService.isHandset$.subscribe((isHandset) => {
      this.isHandset = isHandset;
    });
  }
}
