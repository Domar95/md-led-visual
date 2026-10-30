import { Component } from '@angular/core';

import { HomeButtonComponent } from '@components/ui-elements/home-button/home-button.component';
import { SocialMediaButtonsComponent } from '@components/ui-elements/social-media-buttons/social-media-buttons.component';

@Component({
  selector: 'mdlv-footer-about',
  imports: [HomeButtonComponent, SocialMediaButtonsComponent],
  templateUrl: './footer-about.component.html',
  styleUrl: './footer-about.component.scss',
})
export class FooterAboutComponent {}
