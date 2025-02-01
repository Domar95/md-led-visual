import { Component, Input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';

import { GalleryImage } from '@models/gallery.model';

@Component({
  selector: 'mdlv-photo-swipe',
  imports: [MatGridListModule],
  templateUrl: './photo-swipe.component.html',
  styleUrl: './photo-swipe.component.scss',
})
export class PhotoSwipeComponent {
  @Input({ required: true }) images: GalleryImage[] = [];

  photoSwipeLightbox!: PhotoSwipeLightbox;

  ngOnInit() {
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
