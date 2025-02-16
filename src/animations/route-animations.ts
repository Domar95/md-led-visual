import { animate, style, transition, trigger } from '@angular/animations';

export const routeAnimationsState = trigger('routeAnimations', [
  transition(':enter', [style({ opacity: 0 }), animate(300)]),
  transition(':leave', [animate(0, style({ opacity: 0 }))]),
]);
