import { Component, computed, Signal, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

import { GalleryImage } from 'src/features/gallery/models/gallery.model';
import { PhotoSwipeComponent } from './photo-swipe/photo-swipe.component';
import { galleryThumbnailsTrigger } from 'src/animations/gallery-animations';
import { ImageGalleryService } from '../services/image-gallery.service';

@Component({
  selector: 'mdlv-gallery',
  imports: [MatIconModule, PhotoSwipeComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  animations: [galleryThumbnailsTrigger],
})
export class GalleryComponent {
  activeCategory = signal<string>('');
  isLoading = signal<boolean>(true);
  skeletonTiles = Array.from({ length: 9 }, (_, index) => index);

  constructor(
    private route: ActivatedRoute,
    private imageGalleryService: ImageGalleryService
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async (params) => {
      this.activeCategory.set(params.get('category') || 'wszystkie');
    });

    try {
      await this.imageGalleryService.loadImages();
    } finally {
      this.isLoading.set(false);
    }
  }

  filteredImages: Signal<GalleryImage[]> = computed(() => {
    return this.imageGalleryService
      .images()
      .filter(
        (image) =>
          this.activeCategory() === 'wszystkie' ||
          image.category === this.activeCategory()
      )
      .sort((a, b) => b.date.localeCompare(a.date));
  });
}
