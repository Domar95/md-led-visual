import { Component, HostBinding } from '@angular/core';

import { routeAnimationsState } from 'src/animations/route-animations';

@Component({
  selector: 'mdlv-about-page',
  imports: [],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
  animations: [routeAnimationsState],
})
export class AboutPageComponent {
  @HostBinding('@routeAnimations') routeAnimations = true;
}
