import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

/**
 * Fades the host element in once it scrolls into view.
 * Stagger multiple elements by setting the `--reveal-delay` CSS variable.
 */
@Directive({
  selector: '[mdlvReveal]',
})
export class RevealDirective implements OnInit, OnDestroy {
  private observer?: IntersectionObserver;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit() {
    const element = this.elementRef.nativeElement;
    element.classList.add('reveal');

    if (!('IntersectionObserver' in window)) {
      element.classList.add('revealed');
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('revealed');
          this.observer?.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    this.observer.observe(element);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
