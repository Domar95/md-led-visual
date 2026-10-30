import { Component, HostBinding } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import {
  CaseStudiesComponent,
  EquipmentComponent,
  FaqComponent,
} from '@components/index';
import { routeAnimationsState } from 'src/animations/route-animations';

/**
 * Details for visitors weighing up a booking: equipment, example events and
 * common questions. Kept off the pricing page, which stays just the
 * calculator.
 */
@Component({
  selector: 'mdlv-offer-page',
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterModule,
    EquipmentComponent,
    CaseStudiesComponent,
    FaqComponent,
  ],
  templateUrl: './offer-page.component.html',
  styleUrl: './offer-page.component.scss',
  animations: [routeAnimationsState],
})
export class OfferPageComponent {
  @HostBinding('@routeAnimations') routeAnimations = true;
}
