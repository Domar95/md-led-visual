import { Component } from '@angular/core';

import { OfferPresentationGridsComponent } from './offer-presentation-grids/offer-presentation-grids.component';
import { RevealDirective } from 'src/shared/directives/reveal.directive';

@Component({
  selector: 'mdlv-offer-presentation',
  imports: [OfferPresentationGridsComponent, RevealDirective],
  templateUrl: './offer-presentation.component.html',
  styleUrl: './offer-presentation.component.scss',
})
export class OfferPresentationComponent {}
