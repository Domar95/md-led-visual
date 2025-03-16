import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageUtilsService {
  constructor() {}

  preloadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;

      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    });
  }
}
