import { Injectable } from '@angular/core';
import { getDownloadURL } from '@angular/fire/storage';

import { FirebaseService } from '@services/firebase.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageStorageService {
  constructor(private firebaseService: FirebaseService) {}

  private async uploadImage(
    file: File,
    category: string,
    withThumbnail?: boolean
  ): Promise<void> {
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

    if (withThumbnail) {
      const thumbnailPath = `${environment.imageBaseUrl}/gallery/thumbnails/${file.name}`;
      const thumbnail = await this.generateThumbnail(file);
      this.firebaseService.uploadFile(thumbnail, thumbnailPath, metadata);
    }

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

  async uploadImages(
    files: File[],
    category: string,
    withThumbnail: boolean = false
  ): Promise<void> {
    files.forEach((file) => this.uploadImage(file, category, withThumbnail));
  }

  private getImageResolution(
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

  private generateThumbnail(
    file: File,
    maxWidth = 600,
    maxHeight = 400
  ): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.src = objectUrl;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Canvas not supported'));
          return;
        }

        let width = img.width;
        let height = img.height;

        // maintain aspect ratio while resizing
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // convert canvas to Blob
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(
              new File([blob], `thumb_${file.name}`, { type: 'image/jpeg' })
            );
          } else {
            reject(new Error('Failed to generate thumbnail'));
          }

          // clean up memory
          URL.revokeObjectURL(objectUrl);
        });
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
        URL.revokeObjectURL(objectUrl);
      };
    });
  }
}
