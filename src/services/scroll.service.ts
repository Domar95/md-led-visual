import { Injectable, NgZone } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import Lenis from 'lenis';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private lenis!: Lenis;

  constructor(private ngZone: NgZone, private router: Router) {}

  initLenis() {
    this.ngZone.runOutsideAngular(() => {
      this.lenis = new Lenis({
        autoRaf: true,
      });
    });

    this.restoreScrollOnNavigation();
  }

  /** Locks page scrolling, e.g. while a full-screen menu is open. */
  lock() {
    this.lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
  }

  unlock() {
    this.lenis?.start();
    document.documentElement.style.overflow = '';
  }

  /**
   * New pages start at the top; back/forward returns to the saved position.
   * Goes through Lenis, so its own position doesn't drag the page back.
   */
  private restoreScrollOnNavigation() {
    this.router.events
      .pipe(filter((event): event is Scroll => event instanceof Scroll))
      .subscribe((event) => {
        // #section links are scrolled by the router (anchorScrolling)
        if (event.anchor) return;

        const [, y] = event.position ?? [0, 0];
        this.lenis.scrollTo(y, { immediate: true, force: true });
      });
  }
}
