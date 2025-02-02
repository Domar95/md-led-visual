import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';

import { ContactFormComponent } from './contact-form/contact-form.component';

@Component({
  selector: 'mdlv-contact',
  imports: [
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    ContactFormComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent { }
