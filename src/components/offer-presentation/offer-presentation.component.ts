import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '@services/firebase.service';
import { OfferPresentationGridsComponent } from './offer-presentation-grids/offer-presentation-grids.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mdlv-offer-presentation',
  imports: [OfferPresentationGridsComponent],
  templateUrl: './offer-presentation.component.html',
  styleUrl: './offer-presentation.component.scss',
})
export class OfferPresentationComponent implements OnInit {
  images: string[] = [];

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    this.images = await this.loadImages();
  }

  async loadImages(): Promise<string[]> {
    // TODO temporary images, replace with actual img
    const imageNames = [
      'koncert_1.webp',
      'impreza_firmowa_1.webp',
      'koncert_2.webp',
      'impreza_firmowa_2.webp',
      'koncert_3.webp',
    ];

    return Promise.all(
      imageNames.map(async (imageName) => {
        return await this.firebaseService.getFileUrl(
          `${environment.imageBaseUrl}/slideshow/${imageName}`
        );
      })
    );
  }
}
