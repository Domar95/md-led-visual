import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'mdlv-home-button',
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './home-button.component.html',
  styleUrl: './home-button.component.scss',
})
export class HomeButtonComponent {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon(
      'mdlv-logo',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/mdlv_logo_without_text.svg'
      )
    );
  }
}
