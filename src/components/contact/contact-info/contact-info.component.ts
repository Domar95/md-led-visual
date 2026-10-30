import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { SpotlightDirective } from 'src/shared/directives/spotlight.directive';

@Component({
  selector: 'mdlv-contact-info',
  imports: [MatIconModule, RouterModule, SpotlightDirective],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss',
})
export class ContactInfoComponent {}
