import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { NavbarVariant } from '@models/navbar-variant.model';
import { HomeButtonComponent } from '@components/ui-elements/home-button/home-button.component';
import { SocialMediaButtonsComponent } from '@components/ui-elements/social-media-buttons/social-media-buttons.component';
import { EmailButtonComponent } from '@components/ui-elements/email-button/email-button.component';

@Component({
  selector: 'mdlv-navbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    CommonModule,
    HomeButtonComponent,
    SocialMediaButtonsComponent,
    EmailButtonComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() variant: NavbarVariant = NavbarVariant.Default;

  constructor() { }

  get isDefault() {
    return this.variant === NavbarVariant.Default;
  }
}
