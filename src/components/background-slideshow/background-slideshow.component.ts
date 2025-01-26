import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import 'swiper/css/bundle';

import { BackgroundSlideshowImage } from '@models/background-slideshow.model';

@Component({
  selector: 'mdlv-background-slideshow',
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './background-slideshow.component.html',
  styleUrl: './background-slideshow.component.scss',
})
export class BackgroundSlideshowComponent implements OnInit {
  swiper!: Swiper;
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

  ngOnInit() {
    this.swiper = new Swiper('.heroSwiper', {
      modules: [Navigation, Pagination, Autoplay, Keyboard, EffectFade],
      loop: true,
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
    });
  }
}
