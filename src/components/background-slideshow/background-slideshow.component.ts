import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { BackgroundSlideshowImage } from '@models/background-slideshow.model';

@Component({
  selector: 'mdlv-background-slideshow',
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './background-slideshow.component.html',
  styleUrl: './background-slideshow.component.scss',
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [animate('1s ease-in')]),
    ]),
  ],
})
export class BackgroundSlideshowComponent implements OnInit, OnDestroy {
  images: BackgroundSlideshowImage[] = [
    {
      uri: 'assets/images/homepage_1.jpg',
      text: 'PROFESJONALNA OBSŁUGA IMPREZ',
    },
    {
      uri: 'assets/images/homepage_2.jpg',
      text: 'WYNAJEM EKRANÓW LED I TELEBIMÓW',
    },
  ];

  currentImageIndex: number = 0;
  intervalId!: ReturnType<typeof setInterval>;
  showText: boolean = false;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.images.length;
      this.showText = false;
      setTimeout(() => {
        this.showText = true;
      }, 2000);
    }, 7000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  get currentImage() {
    return this.images[this.currentImageIndex];
  }
}
