import { Injectable, NgZone } from '@angular/core';
import Lenis from 'lenis';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private lenis!: Lenis;

  constructor(private ngZone: NgZone) {}

  initLenis() {
    this.ngZone.runOutsideAngular(() => {
      this.lenis = new Lenis({
        autoRaf: true,
      });
    });
  }
}
