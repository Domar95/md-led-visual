import { Component } from '@angular/core';

import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';

@Component({
  selector: 'mdlv-contact',
  imports: [
    ContactFormComponent,
    ContactInfoComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent { }
