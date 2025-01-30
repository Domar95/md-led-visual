import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { FirebaseService } from '@services/firebase.service';

@Component({
  selector: 'mdlv-offer-presentation',
  imports: [MatGridListModule, CommonModule, RouterModule, MatButton],
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
          `/images/slideshow/${imageName}`
        );
      })
    );
  }
}
