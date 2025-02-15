import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SendEmailRequest } from '@models/send-email-request.model';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  API = 'https://send-email-oov4wtrm3q-uc.a.run.app';
  // TODO: Replace with actual email
  RECEIVER_EMAIL = 'email-placeholder';

  constructor(private http: HttpClient) {}

  send(
    name: string,
    surname: string,
    email: string,
    phone: string,
    message: string
  ): Promise<unknown> {
    /* Compose and send email */
    const subject = this.buildSubject();
    const composedMessage = this.buildMessage(
      name,
      surname,
      email,
      phone,
      message
    );
    const composedEmail = this.buildEmail(subject, composedMessage);
    return this.sendEmail(composedEmail);
  }

  private buildMessage(
    name: string,
    surname: string,
    email: string,
    phone: string,
    message: string
  ): string {
    message = `Imię: ${name}
Nazwisko: ${surname}
Email: ${email}
Telefon: ${phone}
Wiadomość: ${message}`;
    return message;
  }

  private buildSubject(): string {
    return '[MD-LED-Visual] Nowa wiadomość poprzez formularz kontaktowy';
  }

  private buildEmail(subject: string, message: string): SendEmailRequest {
    return {
      email: this.RECEIVER_EMAIL,
      subject: subject,
      message: message,
    };
  }

  private sendEmail(payload: SendEmailRequest): Promise<unknown> {
    return lastValueFrom(this.http.post(this.API, payload));
  }
}
