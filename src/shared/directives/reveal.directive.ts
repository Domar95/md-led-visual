import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

/**
 * When to double-check the element's position after it's created: on the
 * next frames and once the route's fade and scroll restoration have run
 */
const CHECK_DELAYS_MS = [0, 350, 800];

/**
 * Fades the host element in once it scrolls into view.
 * Stagger multiple elements by setting the `--reveal-delay` CSS variable.
 */
@Directive({
  selector: '[mdlvReveal]',
})
export class RevealDirective implements OnInit, OnDestroy {
  private observer?: IntersectionObserver;
  private timers: ReturnType<typeof setTimeout>[] = [];
  private frame?: number;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit() {
    const element = this.elementRef.nativeElement;
    element.classList.add('reveal');

    if (!('IntersectionObserver' in window)) {
      this.reveal();
      return;
    }

    // Any visible pixel counts: with a ratio threshold, an element peeking in
    // at the bottom of the screen stayed blank until scrolled further.
    // The root reaches up past the page top, so elements already scrolled past
    // (e.g. back navigation jumping mid-page) count as seen and show at once.
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) this.reveal();
      },
      { rootMargin: '100000px 0px 0px 0px' }
    );
    this.observer.observe(element);

    // The observer can miss an element that starts on screen when a page is
    // swapped in while the scroll jumps back to the top: it then stayed
    // invisible (seen on /oferta after clicking the menu link). Check the
    // position directly once things have settled.
    this.frame = requestAnimationFrame(() => {
      this.timers = CHECK_DELAYS_MS.map((delay) =>
        setTimeout(() => this.revealIfOnScreen(), delay)
      );
    });
  }

  ngOnDestroy() {
    this.cleanUp();
  }

  /** Reveals the element if it's in view or already scrolled past */
  private revealIfOnScreen() {
    const element = this.elementRef.nativeElement;
    if (!element.isConnected) return;
    if (element.getBoundingClientRect().top < window.innerHeight) {
      this.reveal();
    }
  }

  private reveal() {
    this.elementRef.nativeElement.classList.add('revealed');
    this.cleanUp();
  }

  private cleanUp() {
    this.observer?.disconnect();
    this.timers.forEach(clearTimeout);
    this.timers = [];
    if (this.frame !== undefined) cancelAnimationFrame(this.frame);
  }
}
