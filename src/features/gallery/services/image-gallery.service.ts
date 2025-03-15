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

    const images: GalleryImage[] = await Promise.all(
      files.items.map(async (file) => {
        const metadata = await getMetadata(file);
        const url = await getDownloadURL(file);
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
        };
      })
    );

    this.images.set(images);
  }

  private getThumnailUrl(filename: string): string {
    return `${environment.imageBaseUrl}/gallery/thumbnails/${filename}`;
  }
}
