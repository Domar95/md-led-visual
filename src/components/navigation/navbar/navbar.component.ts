import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { NavbarVariant } from '@models/navbar-variant.model';
import { HomeButtonComponent } from '@components/ui-elements/home-button/home-button.component';
import { ResponsiveLayoutService } from '@services/responsive-layout.service';

@Component({
  selector: 'mdlv-navbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    CommonModule,
    HomeButtonComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  @Input() variant: NavbarVariant = NavbarVariant.Default;

  @ViewChild('centerPill') centerPill?: ElementRef<HTMLElement>;
  @ViewChild('indicator') indicator?: ElementRef<HTMLElement>;

  isHandset!: boolean
  isScrolled = false;
  private indicatorPlaced = false;
  private indicatorAnimation?: Animation;
  private navigationSubscription?: Subscription;

  links: { label: string; route: string }[] = [
    { label: 'Galeria', route: '/galeria' },
    { label: 'Wycena', route: '/wycena' },
    { label: 'Kontakt', route: '/kontakt' },
  ];

  constructor(
    private responsiveLayoutService: ResponsiveLayoutService,
    private router: Router
  ) { }

  ngOnInit() {
    this.responsiveLayoutService.isHandset$.subscribe((isHandset) => {
      this.isHandset = isHandset
      this.scheduleIndicatorUpdate();
    })
  }

  ngAfterViewInit() {
    // routerLinkActive marks the active link after NavigationEnd, so wait a tick
    this.navigationSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.scheduleIndicatorUpdate());

    this.scheduleIndicatorUpdate();

    // link widths change once the web font loads
    document.fonts?.ready.then(() => this.updateIndicator(false));
  }

  ngOnDestroy() {
    this.navigationSubscription?.unsubscribe();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateIndicator(false);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 24;
  }

  private scheduleIndicatorUpdate() {
    setTimeout(() => this.updateIndicator(this.indicatorPlaced));
  }

  /** Moves the highlight under the active link with a jelly squish. */
  private updateIndicator(animate: boolean) {
    const pill = this.centerPill?.nativeElement;
    const indicator = this.indicator?.nativeElement;
    if (!pill || !indicator) return;

    const active = pill.querySelector<HTMLElement>('[aria-current="page"]');
    if (!active) {
      indicator.style.opacity = '0';
      return;
    }

    const pillRect = pill.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const x = activeRect.left - pillRect.left - pill.clientLeft;
    const y = activeRect.top - pillRect.top - pill.clientTop;
    const { width, height } = activeRect;
    const moved = indicator.style.width !== `${width}px` ||
      indicator.style.transform !== `translate(${x}px, ${y}px)`;

    indicator.classList.toggle('no-transition', !animate);
    indicator.style.width = `${width}px`;
    indicator.style.height = `${height}px`;
    indicator.style.transform = `translate(${x}px, ${y}px)`;
    indicator.style.opacity = '1';

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (animate && moved && !reducedMotion) {
      // hide link hover states until the highlight arrives
      this.indicatorAnimation?.cancel();
      pill.classList.add('animating');

      this.indicatorAnimation = indicator.animate(
        [
          { scale: '1 1' },
          { scale: '1.12 0.86', offset: 0.35 },
          { scale: '0.97 1.04', offset: 0.7 },
          { scale: '1 1' },
        ],
        // matches the transform transition in the stylesheet
        { duration: 550, easing: 'ease-out' }
      );
      this.indicatorAnimation.onfinish = () =>
        pill.classList.remove('animating');
    }

    if (!animate) {
      // re-enable transitions after this frame is painted
      requestAnimationFrame(() => indicator.classList.remove('no-transition'));
    }
    this.indicatorPlaced = true;
  }

  get isDefault() {
    return this.variant === NavbarVariant.Default;
  }
}
