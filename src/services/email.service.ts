import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppCheck, getToken } from '@angular/fire/app-check';
import { lastValueFrom } from 'rxjs';

import { SendEmailRequest } from '@models/send-email-request.model';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  API = 'https://send-email-oov4wtrm3q-uc.a.run.app';
  // TODO: Replace with actual email
  RECEIVER_EMAIL = 'email-placeholder';

  constructor(private http: HttpClient, private appCheck: AppCheck) {}

  async send(
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
    const headers = await this.buildHeaders();
    return this.sendEmail(composedEmail, headers);
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

  private async buildHeaders(): Promise<HttpHeaders> {
    const appCheckToken = await getToken(this.appCheck, false);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Firebase-AppCheck': appCheckToken.token,
    });
  }

  private sendEmail(
    payload: SendEmailRequest,
    headers: HttpHeaders
  ): Promise<unknown> {
    return lastValueFrom(
      this.http.post(this.API, payload, {
        headers: headers,
      })
    );
  }
}
