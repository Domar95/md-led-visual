import { Component, HostBinding } from '@angular/core';

import { PricingFormComponent } from '@components/index';
import { routeAnimationsState } from 'src/animations/route-animations';

@Component({
  selector: 'mdlv-pricing-page',
  imports: [PricingFormComponent],
  templateUrl: './pricing-page.component.html',
  styleUrl: './pricing-page.component.scss',
  animations: [routeAnimationsState],
})
export class PricingPageComponent {
  @HostBinding('@routeAnimations') routeAnimations = true;
}
