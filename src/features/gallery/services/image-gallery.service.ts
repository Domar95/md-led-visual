import { Injectable, signal } from '@angular/core';
import { getMetadata } from '@angular/fire/storage';

import { environment } from 'src/environments/environment';
import { FirebaseService } from '@services/firebase.service';
import { GalleryImage, GalleryImageCategory } from '../models/gallery.model';
import { getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class ImageGalleryService {
  images = signal<GalleryImage[]>([]);

  constructor(private firebaseService: FirebaseService) {}

  async loadImages(): Promise<void> {
    const storagePath = `${environment.imageBaseUrl}/gallery`;
    const files = await this.firebaseService.getFiles(storagePath);

    const imagePromises: Promise<GalleryImage>[] = files.items.map(
      async (file) => {
        const [metadata, url] = await Promise.all([
          getMetadata(file),
          getDownloadURL(file),
        ]);

        const thumbnailUrl = await this.firebaseService.getFileUrl(
          this.getThumnailUrl(metadata.name)
        );

        return {
          title: `${metadata.name}`,
          imageUri: `${url}`,
          imageWidth: metadata.customMetadata?.['width'] || '1600',
          imageHeight: metadata.customMetadata?.['height'] || '1200',
          thumbnailUri: `${thumbnailUrl}`,
          category: metadata.customMetadata?.[
            'category'
          ] as GalleryImageCategory,
          date: metadata.customMetadata?.['date'] || '',
        };
      }
    );

    const images: GalleryImage[] = await Promise.all(imagePromises);

    await Promise.all(
      images.map((image) => this.preloadImage(image.thumbnailUri))
    );

    this.images.set(images);
  }

  private getThumnailUrl(filename: string): string {
    return `${environment.imageBaseUrl}/gallery/thumbnails/${filename}`;
  }

  private async preloadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;

      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    });
  }
}
