import { Component, HostListener } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';

import { GalleryImage } from '@models/gallery.model';
import { PhotoSwipeComponent } from './photo-swipe/photo-swipe.component';
import { galleryThumbnailsTrigger } from 'src/animations/gallery-animations';

const routeMap: { [key: string]: string } = {
  wszystkie: 'wszystkie',
  'imprezy-firmowe': 'imprezy firmowe',
  'imprezy-prywatne': 'imprezy prywatne',
  'imprezy-plenerowe': 'imprezy plenerowe',
  prezentacje: 'prezentacje',
};

@Component({
  selector: 'mdlv-gallery',
  imports: [MatProgressSpinnerModule, PhotoSwipeComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  animations: [galleryThumbnailsTrigger],
})
export class GalleryComponent {
  activeCategory!: string;

  images: GalleryImage[] = [];
  showImages: boolean = false;
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const category = params.get('category') || 'wszystkie';
      this.activeCategory = routeMap[category];
      this.images = this.loadImages(50);

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
        this.images = [...this.images, ...this.loadImages(20)];
        this.isLoading = false;
      }, 1000);
    }
  }

  loadImages(count: number): GalleryImage[] {
    return Array.from({ length: count }, (_, i) => {
      const index = this.images.length + i;
      return {
        title: `Event ${index}`,
        imageUri: `https://picsum.photos/1600/1200?random=${index}`,
        imageWidth: '1600',
        imageHeight: '1200',
        thumbnailUri: `https://picsum.photos/800/600?random=${index}`,
        category: this.getRandomCategory(),
      };
    });
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
        this.activeCategory === 'wszystkie' ||
        image.category === this.activeCategory
    );
  }
}
