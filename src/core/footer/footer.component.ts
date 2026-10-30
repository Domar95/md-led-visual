import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';

import { FooterAboutComponent } from './footer-about/footer-about.component';
import { FooterNavigationComponent } from './footer-navigation/footer-navigation.component';
import { FooterContactComponent } from './footer-contact/footer-contact.component';
import { FooterBottomComponent } from './footer-bottom/footer-bottom.component';

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
export class FooterComponent implements OnInit, OnDestroy {
  // pricing and contact pages have their own call to action
  showCta = false;

  private navigationSubscription?: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.navigationSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const url = event.urlAfterRedirects.split(/[?#]/)[0];
        this.showCta = url === '/' || url.startsWith('/galeria');
      });
  }

  ngOnDestroy() {
    this.navigationSubscription?.unsubscribe();
  }
}
