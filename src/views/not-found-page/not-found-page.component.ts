import { Component, HostBinding } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routeAnimationsState } from 'src/animations/route-animations';

@Component({
  selector: 'mdlv-not-found-page',
  imports: [RouterModule],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
  animations: [routeAnimationsState],
})
export class NotFoundPageComponent {
  @HostBinding('@routeAnimations') routeAnimations = true;
}
