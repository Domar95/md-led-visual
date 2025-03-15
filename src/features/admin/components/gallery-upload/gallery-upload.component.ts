import { Component } from '@angular/core';

import { GalleryUploadFormComponent } from './gallery-upload-form/gallery-upload-form.component';
import { ImageStorageService } from '../../services/image-storage.service';

@Component({
  selector: 'mdlv-gallery-upload',
  imports: [GalleryUploadFormComponent],
  templateUrl: './gallery-upload.component.html',
  styleUrl: './gallery-upload.component.scss',
})
export class GalleryUploadComponent {
  constructor(private imageStorageService: ImageStorageService) {}

  async onFormSubmitted({
    category,
    files,
  }: {
    category: string;
    files: File[];
  }) {
    await this.imageStorageService.uploadImages(files, category, true);
  }
}
