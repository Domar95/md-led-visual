import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { FirebaseService } from '@services/firebase.service';
import { ResponsiveLayoutService } from '@services/responsive-layout.service';

@Component({
  selector: 'mdlv-offer-presentation',
  providers: [ResponsiveLayoutService],
  imports: [MatGridListModule, CommonModule, RouterModule, MatButton],
  templateUrl: './offer-presentation.component.html',
  styleUrl: './offer-presentation.component.scss',
})
export class OfferPresentationComponent implements OnInit {
  images: string[] = [];
  isHandset$: Observable<boolean>;
  cols!: number;
  rowHeight!: string;

  constructor(
    private firebaseService: FirebaseService,
    private responsiveLayoutService: ResponsiveLayoutService
  ) {
    this.isHandset$ = this.responsiveLayoutService.isHandset$;
  }

  async ngOnInit() {
    this.images = await this.loadImages();
    this.isHandset$.subscribe((isHandset) => {
      if (isHandset === true) {
        this.cols = 1;
        this.rowHeight = '2:1';
      } else {
        this.cols = 3;
        this.rowHeight = '4:3';
      }
    });
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
