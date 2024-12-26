import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';

import { GalleryImage } from '@models/gallery.model';

@Component({
  selector: 'mdlv-gallery',
  imports: [CommonModule, MatGridListModule, MatTabsModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  images: GalleryImage[] = [
    {
      uri: 'https://picsum.photos/200/300/?random',
      title: 'Impreza firmowa BMW',
      category: 'imprezy plenerowe',
    },
    {
      uri: 'https://picsum.photos/200/300/?random',
      title: 'Impreza firmowa BMW',
      category: 'imprezy plenerowe',
    },
    {
      uri: 'https://picsum.photos/200/300/?random',
      title: 'Sylwester 2023',
      category: 'imprezy plenerowe',
    },
    {
      uri: 'https://picsum.photos/200/300/?random',
      title: 'Sylwester 2023',
      category: 'prezentacje',
    },
    {
      uri: 'https://picsum.photos/200/300/?random',
      title: 'Sylwester 2023',
      category: 'prezentacje',
    },
    {
      uri: 'https://picsum.photos/200/300/?random',
      title: 'Sylwester 2023',
      category: 'prezentacje',
    },
    {
      uri: 'https://picsum.photos/200/300/?random',
      title: '18tka Kasi',
      category: 'imprezy firmowe',
    },
    {
      uri: 'https://picsum.photos/200/300/?random',
      title: '18tka Kasi',
      category: 'imprezy firmowe',
    },
    {
      uri: 'https://picsum.photos/200/300/?random',
      title: '18tka Kasi',
      category: 'imprezy prywatne',
    },
  ];

  selectedCategory: string = 'wszystkie';

  get filteredImages(): GalleryImage[] {
    return this.images.filter(
      (image) =>
        this.selectedCategory === 'wszystkie' ||
        image.category === this.selectedCategory
    );
  }
}
