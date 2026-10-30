import { Directive, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';

/**
 * Tracks the mouse over the host element and exposes its position as the
 * `--spot-x` / `--spot-y` CSS variables, for the `spotlight` mixin.
 */
@Directive({
  selector: '[mdlvSpotlight]',
})
export class SpotlightDirective implements OnInit, OnDestroy {
  private readonly onPointerMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;

    const element = this.elementRef.nativeElement;
    const rect = element.getBoundingClientRect();
    element.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    element.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  };

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    // pointermove fires constantly; nothing here needs change detection
    this.ngZone.runOutsideAngular(() =>
      this.elementRef.nativeElement.addEventListener(
        'pointermove',
        this.onPointerMove,
      ),
    );
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.removeEventListener(
      'pointermove',
      this.onPointerMove,
    );
  }
}
