import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'mdlv-email-button',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './email-button.component.html',
  styleUrl: './email-button.component.scss'
})
export class EmailButtonComponent {
  constructor(private clipboard: Clipboard) { }

  email: string = 'ledvisual@o2.pl'

  copyEmail() {
    this.clipboard.copy(this.email);
  }
}
