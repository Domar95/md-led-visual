import { Component, HostBinding } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routeAnimationsState } from 'src/animations/route-animations';

@Component({
  selector: 'mdlv-not-found',
  imports: [RouterModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  animations: [routeAnimationsState],
})
export class NotFoundComponent {
  @HostBinding('@routeAnimations') routeAnimations = true;
}
