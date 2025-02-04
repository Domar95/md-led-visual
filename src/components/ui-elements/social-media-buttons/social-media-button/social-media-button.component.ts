import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'mdlv-social-media-button',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './social-media-button.component.html',
  styleUrl: './social-media-button.component.scss'
})
export class SocialMediaButtonComponent {
  @Input({ required: true }) icon!: string;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.iconRegistry.addSvgIcon(
      this.icon,
      this.sanitizer.bypassSecurityTrustResourceUrl(
        `assets/icons/${this.icon}.svg`
      )
    );
  }
}
