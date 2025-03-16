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
    const imageNames = [
      'grid_1.jpg',
      'grid_2.jpg',
      'grid_3.jpg',
      'grid_4.jpg',
      'grid_5.jpg',
    ];

    return Promise.all(
      imageNames.map(async (imageName) => {
        return await this.firebaseService.getFileUrl(
          `${environment.imageBaseUrl}/offer-presentation/${imageName}`
        );
      })
    );
  }
}
