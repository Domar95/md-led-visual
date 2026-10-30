import { Component, Injectable, OnInit, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MAT_NATIVE_DATE_FORMATS,
  NativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';

import { EmailService } from '@services/email.service';
import { NotificationService } from '@services/notification.service';

/** Polish calendar: weeks start on Monday */
@Injectable()
class PolishDateAdapter extends NativeDateAdapter {
  override getFirstDayOfWeek() {
    return 1;
  }
}

@Component({
  selector: 'mdlv-contact-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
  ],
  providers: [
    // Polish month and day names, dates shown as dd.mm.yyyy
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
    { provide: DateAdapter, useClass: PolishDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent implements OnInit {
  isSending = signal(false);
  isSent = signal(false);

  /** Earliest date the calendar offers: today */
  readonly today = new Date(new Date().setHours(0, 0, 0, 0));

  /** Phones get the calendar as a large dialog, easier to tap */
  readonly isHandset = window.matchMedia('(max-width: 599.98px)').matches;

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
    // optional; picked in the calendar
    eventDate: new FormControl<Date | null>(null),
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

    const { name, surname, email, phone, eventDate, message } =
      this.contactForm.getRawValue();

    this.isSending.set(true);

    try {
      await this.emailService.send(
        name,
        surname,
        email,
        phone,
        message,
        // as shown in the field, e.g. 14.06.2027
        eventDate?.toLocaleDateString('pl-PL') ?? '',
      );
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
