import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'mdlv-contact-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });

  onSubmit() {
    console.warn(this.contactForm.value);
    // TODO: Implement solution to send email; prob use EmailJS
  }

  get requiredErrorMessage() {
    return 'To pole jest wymagane';
  }
}
