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
      uri: 'assets/images/homepage_1.jpg',
      title: 'Impreza firmowa BMW',
      category: 'imprezy plenerowe',
    },
    {
      uri: 'assets/images/homepage_2.jpg',
      title: 'Impreza firmowa BMW',
      category: 'imprezy plenerowe',
    },
    {
      uri: 'assets/images/2.png',
      title: 'Sylwester 2023',
      category: 'imprezy plenerowe',
    },
    {
      uri: 'assets/images/3.png',
      title: 'Sylwester 2023',
      category: 'prezentacje',
    },
    {
      uri: 'assets/images/4.png',
      title: 'Sylwester 2023',
      category: 'prezentacje',
    },
    {
      uri: 'assets/images/5.png',
      title: 'Sylwester 2023',
      category: 'prezentacje',
    },
    {
      uri: 'assets/images/IMG_0418a.JPG',
      title: '18tka Kasi',
      category: 'imprezy firmowe',
    },
    {
      uri: 'assets/images/IMAG6018.jpg',
      title: '18tka Kasi',
      category: 'imprezy firmowe',
    },
    {
      uri: 'assets/images/homepage_1.jpg',
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
