import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'mdlv-slider-overlay',
  imports: [],
  templateUrl: './slider-overlay.component.html',
  styleUrl: './slider-overlay.component.scss',
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(24px)' })),
      state('*', style({ opacity: 1, transform: 'none' })),
      transition(
        'void => *',
        animate('900ms {{ delay }}ms cubic-bezier(0.2, 0.7, 0.2, 1)'),
        { params: { delay: 0 } }
      ),
    ]),
  ],
})
export class SliderOverlayComponent {
  @Input({ required: true }) isHandset!: boolean;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) text!: string;
  @Input({ required: true }) animationState!: string;
}
