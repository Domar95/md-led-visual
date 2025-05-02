import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { FooterAboutComponent } from './footer-about/footer-about.component';
import { FooterNavigationComponent } from './footer-navigation/footer-navigation.component';
import { FooterContactComponent } from './footer-contact/footer-contact.component';
import { FooterBottomComponent } from './footer-bottom/footer-bottom.component';
import { ResponsiveLayoutService } from '@services/responsive-layout.service';

@Component({
  selector: 'mdlv-footer',
  imports: [
    FooterAboutComponent,
    FooterNavigationComponent,
    FooterContactComponent,
    MatListModule,
    MatDividerModule,
    FooterBottomComponent,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  isHandset!: boolean;

  constructor(private responsiveLayoutService: ResponsiveLayoutService) {}

  ngOnInit() {
    this.responsiveLayoutService.isHandset$.subscribe((isHandset) => {
      this.isHandset = isHandset;
    });
  }
}
