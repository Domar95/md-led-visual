import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'mdlv-slider-overlay',
  imports: [MatButtonModule, MatCardModule, MatIconModule, RouterModule],
  templateUrl: './slider-overlay.component.html',
  styleUrl: './slider-overlay.component.scss',
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', animate('2s ease-in')),
    ]),
    trigger('slideIn', [
      state('void', style({ transform: 'translateY(100%)' })),
      state('*', style({ transform: 'translateY(0)' })),
      transition('void => *', animate('1s ease-out')),
    ]),
  ],
})
export class SliderOverlayComponent {
  @Input({ required: true }) isHandset!: boolean;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) text!: string;
  @Input({ required: true }) animationState!: string;
}
