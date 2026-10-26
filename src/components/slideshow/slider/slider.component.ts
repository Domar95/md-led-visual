import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
  imports: [SliderOverlayComponent, MatButtonModule, MatIconModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) images!: SlideshowImage[];
  @ViewChild('swiperElement') swiperElement!: ElementRef<HTMLElement>;
  @ViewChild('paginationElement') paginationElement!: ElementRef<HTMLElement>;
  @ViewChild('prevElement', { read: ElementRef })
  prevElement!: ElementRef<HTMLElement>;
  @ViewChild('nextElement', { read: ElementRef })
  nextElement!: ElementRef<HTMLElement>;
  swiper!: Swiper;
  activeSlideIndex = 0;
  isHandset!: boolean;

  constructor(private responsiveLayoutService: ResponsiveLayoutService) {}

  ngOnInit() {
    this.responsiveLayoutService.isHandset$.subscribe((isHandset) => {
      this.isHandset = isHandset;
    });
  }

  // slides are rendered by now, so Swiper sees all of them
  ngAfterViewInit() {
    this.swiper = new Swiper(this.swiperElement.nativeElement, {
      modules: [Navigation, Pagination, Autoplay, Keyboard, EffectFade],
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      speed: 900,
      autoHeight: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        prevEl: this.prevElement.nativeElement,
        nextEl: this.nextElement.nativeElement,
      },
      pagination: {
        el: this.paginationElement.nativeElement,
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

  ngOnDestroy() {
    this.swiper?.destroy();
  }
}
