import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'mdlv-background-slideshow',
  imports: [CommonModule],
  templateUrl: './background-slideshow.component.html',
  styleUrl: './background-slideshow.component.scss',
})
export class BackgroundSlideshowComponent implements OnInit, OnDestroy {
  images: string[] = [
    'assets/images/homepage_1.jpg',
    'assets/images/homepage_2.jpg',
  ];
  currentImageIndex: number = 0;
  intervalId!: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.images.length;
    }, 5000);
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
