import { Component, computed, Signal, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';

import { GalleryImage } from 'src/features/gallery/models/gallery.model';
import { PhotoSwipeComponent } from './photo-swipe/photo-swipe.component';
import { galleryThumbnailsTrigger } from 'src/animations/gallery-animations';
import { ImageGalleryService } from '../services/image-gallery.service';
import { ResponsiveLayoutService } from '@services/responsive-layout.service';

@Component({
  selector: 'mdlv-gallery',
  imports: [MatProgressSpinnerModule, PhotoSwipeComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  animations: [galleryThumbnailsTrigger],
})
export class GalleryComponent {
  activeCategory = signal<string>('');
  isLoading = signal<boolean>(true);
  spinnerDiameter!: string;
  isHandset!: boolean;

  constructor(
    private route: ActivatedRoute,
    private imageGalleryService: ImageGalleryService,
    private responsiveLayoutService: ResponsiveLayoutService
  ) {}

  async ngOnInit(): Promise<void> {
    this.responsiveLayoutService.isHandset$.subscribe((isHandset) => {
      this.isHandset = isHandset;

      if (isHandset) {
        this.spinnerDiameter = '32';
      } else {
        this.spinnerDiameter = '48';
      }
    });

    await this.imageGalleryService.loadImages();
    this.isLoading.set(false);

    this.route.paramMap.subscribe(async (params) => {
      this.activeCategory.set(params.get('category') || 'wszystkie');
    });
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
