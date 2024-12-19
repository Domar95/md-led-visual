import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { GalleryImage } from '../../models/gallery.model';

@Component({
  selector: 'mdlv-gallery',
  imports: [CommonModule, MatGridListModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  images: GalleryImage[] = [
    {
      uri: 'https://picsum.photos/200/300/?random',
      title: 'Impreza firmowa BMW',
    },
    {
      uri: 'https://picsum.photos/200/300/?random',
      title: 'Impreza firmowa BMW',
    },
    {
      uri: 'https://picsum.photos/200/300/?random',
      title: 'Sylwester 2023',
    },
    {
      uri: 'https://picsum.photos/200/300/?random',
      title: 'Sylwester 2023',
    },
    {
      uri: 'https://picsum.photos/200/300/?random',
      title: 'Sylwester 2023',
    },
    {
      uri: 'https://picsum.photos/200/300/?random',
      title: 'Sylwester 2023',
    },
    {
      uri: 'https://picsum.photos/200/300/?random',
      title: '18tka Kasi',
    },
    {
      uri: 'https://picsum.photos/200/300/?random',
      title: '18tka Kasi',
    },
    {
      uri: 'https://picsum.photos/200/300/?random',
      title: '18tka Kasi',
    },
  ];
}
