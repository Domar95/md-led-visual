import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InitDetail } from 'lightgallery/lg-events';
import { LightGallery } from 'lightgallery/lightgallery';
import { LightgalleryModule } from 'lightgallery/angular';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import lgZoom from 'lightgallery/plugins/zoom';

import { GalleryImage } from '@models/gallery.model';

@Component({
  selector: 'mdlv-gallery',
  imports: [CommonModule, MatGridListModule, MatTabsModule, LightgalleryModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  private lightGallery!: LightGallery;

  lightGallerySettings = {
    counter: false,
    plugins: [lgZoom],
  };

  selectedCategory: string = 'wszystkie';

  images: GalleryImage[] = Array.from({ length: 50 }, (_, i) => {
    return {
      title: `Event ${i}`,
      imageUri: `https://picsum.photos/4000/3000?random=${i}`,
      imageSize: '4000-3000',
      thumbnailUri: `https://picsum.photos/300/200?random=${i}`,
    };
  });

  onLightGalleryInit(detail: InitDetail): void {
    this.lightGallery = detail.instance;
  }

  get filteredImages(): GalleryImage[] {
    return this.images.filter(
      (image) =>
        this.selectedCategory === 'wszystkie' ||
        image.category === this.selectedCategory
    );
  }
}
