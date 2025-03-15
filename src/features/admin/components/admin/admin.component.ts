import { Component } from '@angular/core';
import { GalleryUploadComponent } from '../gallery-upload/gallery-upload.component';

@Component({
  selector: 'mdlv-admin',
  imports: [GalleryUploadComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {}
