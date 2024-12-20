import { Component } from '@angular/core';
import { BackgroundSlideshowComponent } from '../../components/background-slideshow/background-slideshow.component';

@Component({
  selector: 'mdlv-home',
  imports: [BackgroundSlideshowComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
