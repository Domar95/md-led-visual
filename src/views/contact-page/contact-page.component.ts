import { Component, HostBinding } from '@angular/core';

import { ContactComponent } from '@components/index';
import { routeAnimationsState } from 'src/animations/route-animations';

@Component({
  selector: 'mdlv-contact-page',
  imports: [ContactComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
  animations: [routeAnimationsState],
})
export class ContactPageComponent {
  @HostBinding('@routeAnimations') routeAnimations = true;
}
