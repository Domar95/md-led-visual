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
        return {
          title: `Event ${url}`,
          imageUri: `${url}`,
          imageWidth: '1600',
          imageHeight: '1200',
          thumbnailUri: `${url}`,
          category: metadata.customMetadata?.[
            'category'
          ] as GalleryImageCategory,
        };
      })
    );

    this.images.set(images);
  }
}
