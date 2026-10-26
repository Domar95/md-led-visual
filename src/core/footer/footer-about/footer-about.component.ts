import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SocialMediaButtonsComponent } from '@components/ui-elements/social-media-buttons/social-media-buttons.component';

@Component({
  selector: 'mdlv-footer-about',
  imports: [RouterModule, SocialMediaButtonsComponent],
  templateUrl: './footer-about.component.html',
  styleUrl: './footer-about.component.scss',
})
export class FooterAboutComponent {}
