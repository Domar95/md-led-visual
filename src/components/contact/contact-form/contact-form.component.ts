import { Component, Input } from '@angular/core';
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

import { EmailService } from '@services/email.service';
import { NotificationService } from '@services/notification.service';

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
  @Input() isHandset!: boolean;

  //TODO: Add privacy policy checkbox
  contactForm = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    surname: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    message: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  constructor(
    private emailService: EmailService,
    private notificationService: NotificationService
  ) {}

  async onSubmit() {
    if (this.contactForm.invalid) {
      console.warn('Form is invalid, cannot submit.');
      return;
    }

    const { name, surname, email, phone, message } =
      this.contactForm.getRawValue();

    try {
      await this.emailService.send(name, surname, email, phone, message);
      this.notificationService.openSnackBar('Wiadomość została wysłana!');
    } catch (error) {
      this.notificationService.openSnackBar(
        'Nie udało się wysłać wiadomości. Spróbuj później.'
      );
      throw error;
    }
  }

  get requiredErrorMessage() {
    return 'To pole jest wymagane';
  }
}
