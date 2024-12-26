import { Component } from '@angular/core';

import { ContactFormComponent } from '@components/index';

@Component({
  selector: 'mdlv-contact',
  imports: [ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {}
