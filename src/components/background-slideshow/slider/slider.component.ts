import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import Swiper from 'swiper';
import {
  Autoplay,
  EffectFade,
  Keyboard,
  Navigation,
  Pagination,
} from 'swiper/modules';

import { BackgroundSlideshowImage } from '@models/background-slideshow.model';

@Component({
  selector: 'mdlv-slider',
  imports: [MatButtonModule, RouterModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
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
export class SliderComponent {
  @Input({ required: true }) images!: BackgroundSlideshowImage[];

  swiper!: Swiper;
  activeSlideIndex = 0;

  ngOnInit() {
    this.swiper = new Swiper('.heroSwiper', {
      modules: [Navigation, Pagination, Autoplay, Keyboard, EffectFade],
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      speed: 1400,
      centeredSlides: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      on: {
        slideChange: () => {
          this.activeSlideIndex = this.swiper.realIndex;
        },
      },
    });
  }
}
