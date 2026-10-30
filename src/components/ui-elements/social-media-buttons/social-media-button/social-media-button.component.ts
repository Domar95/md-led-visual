import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { SOCIAL_MEDIA_URLS, SocialMediaCategory } from '@models/social-media.model';

const LABELS: Record<SocialMediaCategory, string> = {
  facebook: 'Facebook',
  youtube: 'YouTube',
  instagram: 'Instagram',
};

@Component({
  selector: 'mdlv-social-media-button',
  imports: [MatIconModule],
  templateUrl: './social-media-button.component.html',
  styleUrl: './social-media-button.component.scss'
})
export class SocialMediaButtonComponent implements OnInit {
  @Input({ required: true }) category!: SocialMediaCategory;

  url!: string
  label!: string

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.url = SOCIAL_MEDIA_URLS[this.category]
    this.label = `MD LED Visual – ${LABELS[this.category]}`

    this.iconRegistry.addSvgIcon(
      this.category,
      this.sanitizer.bypassSecurityTrustResourceUrl(
        `assets/icons/${this.category}.svg`
      )
    );
  }
}
