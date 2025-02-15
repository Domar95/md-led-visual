import { Component, HostBinding } from '@angular/core';

import { routeAnimationsState } from 'src/animations/route-animations';

@Component({
  selector: 'mdlv-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [routeAnimationsState],
})
export class AboutComponent {
  @HostBinding('@routeAnimations') routeAnimations = true;
}
