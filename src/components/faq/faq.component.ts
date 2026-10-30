import { Component } from '@angular/core';

import { FAQ, publishable } from 'src/content/site-content';
import { RevealDirective } from 'src/shared/directives/reveal.directive';

/** Questions customers ask before booking; hidden when there are none */
@Component({
  selector: 'mdlv-faq',
  imports: [RevealDirective],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  items = publishable(FAQ);
}
