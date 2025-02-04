import { Component } from '@angular/core';

import { SocialMediaButtonComponent } from "./social-media-button/social-media-button.component";

@Component({
  selector: 'mdlv-social-media-buttons',
  imports: [SocialMediaButtonComponent],
  templateUrl: './social-media-buttons.component.html',
  styleUrl: './social-media-buttons.component.scss'
})
export class SocialMediaButtonsComponent {
  socialMedia = [
    'facebook',
    'youtube',
    'instagram'
  ]

}
