import { Component } from '@angular/core';

import {
  BackgroundSlideshowComponent,
  LearnMoreComponent,
} from '@components/index';

@Component({
  selector: 'mdlv-home',
  imports: [BackgroundSlideshowComponent, LearnMoreComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
