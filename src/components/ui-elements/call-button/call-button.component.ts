import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

/** Pages with their own call to action at the bottom of the screen */
const PAGES_WITHOUT_BUTTON = ['/wycena', '/kontakt'];

/** Distance scrolled before the button appears, so it doesn't cover the hero */
const SCROLL_THRESHOLD = 400;

/**
 * A call button pinned to the bottom of the screen on phones, where most
 * visitors browse and the number is otherwise only in the menu.
 */
@Component({
  selector: 'mdlv-call-button',
  imports: [MatIconModule],
  templateUrl: './call-button.component.html',
  styleUrl: './call-button.component.scss',
})
export class CallButtonComponent implements OnInit, OnDestroy {
  readonly phone = '+48 795 641 741';
  readonly phoneHref = 'tel:+48795641741';

  isVisible = false;

  private isAllowedPage = true;
  private subscription?: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.updatePage();
    this.subscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updatePage());
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isVisible = this.isAllowedPage && window.scrollY > SCROLL_THRESHOLD;
  }

  private updatePage() {
    const path = this.router.url.split(/[?#]/)[0];
    this.isAllowedPage = !PAGES_WITHOUT_BUTTON.some((page) =>
      path.startsWith(page)
    );
    this.onScroll();
  }
}
