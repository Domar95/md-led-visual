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
    const storagePath = `${environment.imageBaseUrl}/gallery/${category}/${file.name}`;
    const metadata = {
      customMetadata: {
        category: category,
        uploaded_at: new Date().toISOString(),
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
}
