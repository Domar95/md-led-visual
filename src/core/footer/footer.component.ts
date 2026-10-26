import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

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
    MatButtonModule,
    MatIconModule,
    RouterModule,
    FooterBottomComponent,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  isHandset!: boolean;
  // pricing and contact pages have their own call to action
  showCta = false;

  constructor(
    private responsiveLayoutService: ResponsiveLayoutService,
    private router: Router
  ) {}

  ngOnInit() {
    this.responsiveLayoutService.isHandset$.subscribe((isHandset) => {
      this.isHandset = isHandset;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const url = event.urlAfterRedirects.split(/[?#]/)[0];
        this.showCta = url === '/' || url.startsWith('/galeria');
      });
  }
}
