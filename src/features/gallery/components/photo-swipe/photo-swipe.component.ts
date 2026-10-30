import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';

import { GalleryImage } from 'src/features/gallery/models/gallery.model';

@Component({
  selector: 'mdlv-photo-swipe',
  imports: [],
  templateUrl: './photo-swipe.component.html',
  styleUrl: './photo-swipe.component.scss',
})
export class PhotoSwipeComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) images: GalleryImage[] = [];

  photoSwipeLightbox!: PhotoSwipeLightbox;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    this.photoSwipeLightbox = new PhotoSwipeLightbox({
      gallery: this.elementRef.nativeElement,

      // Elements within gallery (slides)
      children: 'a',
      showHideAnimationType: 'zoom',
      zoom: false,

      pswpModule: PhotoSwipe,
    });

    this.photoSwipeLightbox.init();
  }

  ngOnDestroy() {
    this.photoSwipeLightbox?.destroy();
  }
}
