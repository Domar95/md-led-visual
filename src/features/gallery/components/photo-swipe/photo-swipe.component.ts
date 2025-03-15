import { Component, Input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';

import { GalleryImage } from 'src/features/gallery/models/gallery.model';
import { ResponsiveLayoutService } from '@services/responsive-layout.service';

@Component({
  selector: 'mdlv-photo-swipe',
  imports: [MatGridListModule],
  templateUrl: './photo-swipe.component.html',
  styleUrl: './photo-swipe.component.scss',
})
export class PhotoSwipeComponent {
  @Input({ required: true }) images: GalleryImage[] = [];

  photoSwipeLightbox!: PhotoSwipeLightbox;
  isHandset!: boolean;
  cols!: number;
  gutterSize!: string;

  constructor(private responsiveLayoutService: ResponsiveLayoutService) {}

  ngOnInit() {
    this.responsiveLayoutService.isHandset$.subscribe((isHandset) => {
      if (isHandset) {
        this.cols = 2;
        this.gutterSize = '8px';
      } else {
        this.cols = 3;
        this.gutterSize = '16px';
      }
    });

    this.photoSwipeLightbox = new PhotoSwipeLightbox({
      // may select multiple "galleries"
      gallery: '#photoswipe-gallery',

      // Elements within gallery (slides)
      children: 'a',
      showHideAnimationType: 'zoom',

      pswpModule: PhotoSwipe,
    });

    this.photoSwipeLightbox.init();
  }
}
