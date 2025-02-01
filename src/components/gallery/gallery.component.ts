import { Component, HostListener, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { GalleryImage } from '@models/gallery.model';
import { PhotoSwipeComponent } from './photo-swipe/photo-swipe.component';

@Component({
  selector: 'mdlv-gallery',
  imports: [MatProgressSpinnerModule, PhotoSwipeComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  @Input({ required: true }) activeCategory!: string;

  images: GalleryImage[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.images = this.loadImages(50);
    this.refreshLightGallery();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 10 && !this.isLoading) {
      this.isLoading = true;
      setTimeout(() => {
        this.images = [...this.images, ...this.loadImages(20)];
        this.refreshLightGallery();
        this.isLoading = false;
      }, 1000);
    }
  }

  loadImages(count: number): GalleryImage[] {
    return Array.from({ length: count }, (_, i) => {
      const index = this.images.length + i;
      return {
        title: `Event ${index}`,
        imageUri: `https://picsum.photos/2000/1500?random=${index}`,
        imageSize: '4000-3000',
        thumbnailUri: `https://picsum.photos/200/150?random=${index}`,
        category: this.getRandomCategory(),
      };
    });
  }

  refreshLightGallery(): void {}

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  getRandomCategory(): any {
    // temporary function to generate random category
    const categories: string[] = [
      'imprezy firmowe',
      'imprezy prywatne',
      'imprezy plenerowe',
      'prezentacje',
    ];
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  }

  get filteredImages(): GalleryImage[] {
    return this.images.filter(
      (image) =>
        this.activeCategory === 'wszystkie' ||
        image.category === this.activeCategory
    );
  }
}
