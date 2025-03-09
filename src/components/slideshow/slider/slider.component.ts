import { Component, Input } from '@angular/core';
import Swiper from 'swiper';
import {
  Autoplay,
  EffectFade,
  Keyboard,
  Navigation,
  Pagination,
} from 'swiper/modules';

import { SlideshowImage } from '@models/slideshow.model';
import { ResponsiveLayoutService } from '@services/responsive-layout.service';
import { SliderOverlayComponent } from './slider-overlay/slider-overlay.component';

@Component({
  selector: 'mdlv-slider',
  imports: [SliderOverlayComponent],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent {
  @Input({ required: true }) images!: SlideshowImage[];

  swiper!: Swiper;
  activeSlideIndex = 0;

  isHandset!: boolean;

  constructor(private responsiveLayoutService: ResponsiveLayoutService) {}

  ngOnInit() {
    this.responsiveLayoutService.isHandset$.subscribe((isHandset) => {
      this.isHandset = isHandset;
    });

    this.swiper = new Swiper('.heroSwiper', {
      modules: [Navigation, Pagination, Autoplay, Keyboard, EffectFade],
      speed: 300,
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
