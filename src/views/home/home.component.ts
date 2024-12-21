import { Component } from '@angular/core';
import { BackgroundSlideshowComponent } from '../../components/background-slideshow/background-slideshow.component';
import { LearnMoreComponent } from '../../components';

@Component({
  selector: 'mdlv-home',
  imports: [BackgroundSlideshowComponent, LearnMoreComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
