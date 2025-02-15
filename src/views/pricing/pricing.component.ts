import { Component, HostBinding } from '@angular/core';

import { PricingFormComponent } from '@components/index';
import { routeAnimationsState } from 'src/animations/route-animations';

@Component({
  selector: 'mdlv-pricing',
  imports: [PricingFormComponent],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
  animations: [routeAnimationsState],
})
export class PricingComponent {
  @HostBinding('@routeAnimations') routeAnimations = true;
}
