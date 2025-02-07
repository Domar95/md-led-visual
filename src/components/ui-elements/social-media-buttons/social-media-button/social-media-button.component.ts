import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { SOCIAL_MEDIA_URLS, SocialMediaCategory } from '@models/social-media.model';

@Component({
  selector: 'mdlv-social-media-button',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './social-media-button.component.html',
  styleUrl: './social-media-button.component.scss'
})
export class SocialMediaButtonComponent {
  @Input({ required: true }) category!: SocialMediaCategory;

  url!: string

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.url = SOCIAL_MEDIA_URLS[this.category]

    this.iconRegistry.addSvgIcon(
      this.category,
      this.sanitizer.bypassSecurityTrustResourceUrl(
        `assets/icons/${this.category}.svg`
      )
    );
  }
}
