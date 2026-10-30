import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';

import { HomeButtonComponent } from '@components/ui-elements/home-button/home-button.component';
import { ResponsiveLayoutService } from '@services/responsive-layout.service';
import { ScrollService } from '@services/scroll.service';
import { OFFER_PAGE_HAS_CONTENT } from 'src/content/site-content';

type Link = { label: string; route: string };

@Component({
  selector: 'mdlv-navbar',
  imports: [MatButtonModule, RouterModule, MatIconModule, HomeButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('menuToggle') menuToggle?: ElementRef<HTMLButtonElement>;
  @ViewChildren('menuLink') menuLinkRefs?: QueryList<ElementRef<HTMLElement>>;

  isHandset = false;
  isScrolled = false;
  isMenuOpen = false;
  isHome = false;

  /** On the home page's photo hero: see-through, light text, until the page scrolls */
  get isOverlay() {
    return this.isHome && !this.isScrolled && !this.isMenuOpen;
  }

  readonly phone = '+48 795 641 741';
  readonly phoneHref = 'tel:+48795641741';
  readonly email = 'ledvisual@o2.pl';

  links: Link[] = [
    { label: 'Galeria', route: '/galeria' },
    // only once the page has real content to show
    ...(OFFER_PAGE_HAS_CONTENT ? [{ label: 'Oferta', route: '/oferta' }] : []),
    { label: 'Wycena', route: '/wycena' },
    { label: 'Kontakt', route: '/kontakt' },
  ];

  menuLinks: Link[] = [{ label: 'Strona główna', route: '/' }, ...this.links];

  private subscriptions = new Subscription();

  constructor(
    private responsiveLayoutService: ResponsiveLayoutService,
    private scrollService: ScrollService,
    private router: Router
  ) {}

  ngOnInit() {
    this.onScroll();
    this.updateIsHome();

    this.subscriptions.add(
      this.responsiveLayoutService.isHandset$.subscribe((isHandset) => {
        this.isHandset = isHandset;
        if (!isHandset) this.closeMenu(false);
      })
    );

    this.subscriptions.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this.closeMenu(false);
          this.updateIsHome();
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    if (this.isMenuOpen) this.scrollService.unlock();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 16;
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeMenu();
  }

  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
      return;
    }

    this.isMenuOpen = true;
    this.scrollService.lock();
    // links render on the next change detection pass
    setTimeout(() => this.menuLinkRefs?.first?.nativeElement.focus());
  }

  private updateIsHome() {
    // ignore the query and #fragment, e.g. /#oferta
    this.isHome = this.router.url.split(/[?#]/)[0] === '/';
  }

  /** Closes the menu; returns focus to the toggle unless a page change took it. */
  closeMenu(restoreFocus = true) {
    if (!this.isMenuOpen) return;

    this.isMenuOpen = false;
    this.scrollService.unlock();
    if (restoreFocus) this.menuToggle?.nativeElement.focus();
  }
}
