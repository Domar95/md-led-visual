import { Component, HostBinding } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { routeAnimationsState } from 'src/animations/route-animations';
import {
  ABOUT_STORY,
  BUSINESS,
  isPublishable,
  TEAM_PHOTO,
} from 'src/content/site-content';

@Component({
  selector: 'mdlv-about-page',
  imports: [MatButtonModule, RouterModule],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
  animations: [routeAnimationsState],
})
export class AboutPageComponent {
  @HostBinding('@routeAnimations') routeAnimations = true;

  years = BUSINESS.years;
  story = isPublishable(ABOUT_STORY) ? ABOUT_STORY : null;
  photo = isPublishable(TEAM_PHOTO) ? TEAM_PHOTO : null;
}
