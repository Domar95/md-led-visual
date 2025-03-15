import { Component, HostListener, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';

import { GalleryImage } from 'src/features/gallery/models/gallery.model';
import { PhotoSwipeComponent } from './photo-swipe/photo-swipe.component';
import { galleryThumbnailsTrigger } from 'src/animations/gallery-animations';
import { ImageGalleryService } from '../services/image-gallery.service';

@Component({
  selector: 'mdlv-gallery',
  imports: [MatProgressSpinnerModule, PhotoSwipeComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  animations: [galleryThumbnailsTrigger],
})
export class GalleryComponent {
  activeCategory!: string;
  filteredImages = signal<GalleryImage[]>([]);
  IMAGES_BATCH: number = 18;
  imagesCount = signal<number>(this.IMAGES_BATCH);
  showImages: boolean = false;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private imageGalleryService: ImageGalleryService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.imageGalleryService.loadImages();

    this.route.paramMap.subscribe(async (params) => {
      this.activeCategory = params.get('category') || 'wszystkie';

      this.filteredImages.set(
        this.imageGalleryService
          .images()
          .sort((a, b) => b.date.localeCompare(a.date))
          .filter(
            (image) =>
              this.activeCategory === 'wszystkie' ||
              image.category === this.activeCategory
          )
          .slice(0, this.imagesCount())
      );

      setTimeout(() => {
        this.showImages = true;
      }, 50);
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 10 && !this.isLoading) {
      this.isLoading = true;
      setTimeout(() => {
        this.imagesCount.set(this.imagesCount() + this.IMAGES_BATCH);
        this.isLoading = false;
      }, 1000);
    }
  }
}
