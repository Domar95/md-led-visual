import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'mdlv-email-button',
  imports: [ClipboardModule, MatButtonModule, MatIconModule],
  templateUrl: './email-button.component.html',
  styleUrl: './email-button.component.scss',
})
export class EmailButtonComponent {
  email: string = 'ledvisual@o2.pl';

  constructor(private notificationService: NotificationService) {}

  onCopied(copied: boolean) {
    this.notificationService.openSnackBar(
      copied
        ? 'Skopiowano adres e-mail'
        : 'Nie udało się skopiować adresu e-mail'
    );
  }
}
