import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { InitDetail } from 'lightgallery/lg-events';
import { LightGallery } from 'lightgallery/lightgallery';
import { LightgalleryModule } from 'lightgallery/angular';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import lgZoom from 'lightgallery/plugins/zoom';

import { GalleryImage } from '@models/gallery.model';

@Component({
  selector: 'mdlv-gallery',
  imports: [
    CommonModule,
    MatGridListModule,
    MatTabsModule,
    LightgalleryModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  private lightGallery!: LightGallery;

  lightGallerySettings = {
    counter: false,
    plugins: [lgZoom],
    speed: 500,
  };

  selectedCategory: string = 'wszystkie';

  images: GalleryImage[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.images = this.loadImages(50);
    this.refreshLightGallery();
  }

  onLightGalleryInit(detail: InitDetail): void {
    this.lightGallery = detail.instance;
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
        imageUri: `https://picsum.photos/4000/3000?random=${index}`,
        imageSize: '4000-3000',
        thumbnailUri: `https://picsum.photos/300/200?random=${index}`,
        category: this.getRandomCategory(),
      };
    });
  }

  refreshLightGallery(): void {
    if (this.lightGallery) {
      this.lightGallery.refresh();
    }
  }

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
        this.selectedCategory === 'wszystkie' ||
        image.category === this.selectedCategory
    );
  }
}
