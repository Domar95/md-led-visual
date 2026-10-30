import { Component } from '@angular/core';

import { EQUIPMENT, publishable } from 'src/content/site-content';
import { RevealDirective } from 'src/shared/directives/reveal.directive';

/** Screen types and their specs, for buyers comparing suppliers */
@Component({
  selector: 'mdlv-equipment',
  imports: [RevealDirective],
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.scss',
})
export class EquipmentComponent {
  items = publishable(EQUIPMENT);
}
