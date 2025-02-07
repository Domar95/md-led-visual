import { Component } from '@angular/core';

import { SocialMediaButtonComponent } from "./social-media-button/social-media-button.component";
import { SocialMediaCategory } from '@models/social-media.model';

@Component({
  selector: 'mdlv-social-media-buttons',
  imports: [SocialMediaButtonComponent],
  templateUrl: './social-media-buttons.component.html',
  styleUrl: './social-media-buttons.component.scss'
})
export class SocialMediaButtonsComponent {
  socialMedia: SocialMediaCategory[] = [
    'facebook',
    'youtube',
    'instagram'
  ]

}
