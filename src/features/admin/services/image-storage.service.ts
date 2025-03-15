import { Injectable } from '@angular/core';
import { getDownloadURL } from '@angular/fire/storage';

import { FirebaseService } from '@services/firebase.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageStorageService {
  constructor(private firebaseService: FirebaseService) {}

  private async uploadImage(file: File, category: string): Promise<void> {
    const { width, height } = await this.getImageResolution(file);

    const storagePath = `${environment.imageBaseUrl}/gallery/${file.name}`;
    const metadata = {
      customMetadata: {
        category: category,
        date: Date.now().toString(),
        width: width.toString(),
        height: height.toString(),
      },
    };

    const uploadTask = this.firebaseService.uploadFile(
      file,
      storagePath,
      metadata
    );

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => console.error('Upload error:', error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        console.log(`File ${file.name} uploaded at ${url}`);
      }
    );
  }

  async uploadImages(files: File[], category: string): Promise<void> {
    files.forEach((file) => this.uploadImage(file, category));
  }

  private async getImageResolution(
    file: File
  ): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });

        // clean up memory
        URL.revokeObjectURL(img.src);
      };

      img.onerror = () => reject(new Error('Failed to load image'));
    });
  }
}
