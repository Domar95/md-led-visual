import { Component, OnInit, signal } from '@angular/core';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';

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
    MatProgressSpinnerModule,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent implements OnInit {
  isSending = signal(false);
  isSent = signal(false);

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
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // set by the "Zapytaj o termin" button on the pricing page
    const message = this.route.snapshot.queryParamMap.get('wiadomosc');
    if (message) {
      this.contactForm.controls.message.setValue(message);
    }
  }

  async onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const { name, surname, email, phone, message } =
      this.contactForm.getRawValue();

    this.isSending.set(true);

    try {
      await this.emailService.send(name, surname, email, phone, message);
      this.contactForm.reset();
      this.isSent.set(true);
    } catch (error) {
      this.notificationService.openSnackBar(
        'Nie udało się wysłać wiadomości. Spróbuj później.'
      );
      throw error;
    } finally {
      this.isSending.set(false);
    }
  }

  get requiredErrorMessage() {
    return 'To pole jest wymagane';
  }
}
