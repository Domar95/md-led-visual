import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { FirebaseService } from '@services/firebase.service';
import { environment } from 'src/environments/environment';
import { RevealDirective } from 'src/shared/directives/reveal.directive';

interface OfferCategory {
  title: string;
  description: string;
  route: string;
  /** File name in the offer-presentation storage folder */
  image?: string;
}

@Component({
  selector: 'mdlv-offer-presentation-grids',
  imports: [MatButtonModule, MatIconModule, RouterModule, RevealDirective],
  templateUrl: './offer-presentation-grids.component.html',
  styleUrl: './offer-presentation-grids.component.scss',
})
export class OfferPresentationGridsComponent implements OnInit {
  /** Image URLs keyed by category route */
  imageUrls: Record<string, string> = {};

  categories: OfferCategory[] = [
    {
      title: 'Imprezy firmowe',
      description: 'Konferencje, gale i eventy integracyjne',
      route: '/galeria/imprezy-firmowe',
      image: 'firmowe_1.jpg',
    },
    {
      title: 'Imprezy prywatne',
      description: 'Wesela, urodziny i jubileusze',
      route: '/galeria/imprezy-prywatne',
      image: 'prywatne_1.jpg',
    },
    {
      title: 'Prezentacje',
      description: 'Premiery produktów i wystąpienia',
      route: '/galeria/prezentacje',
      image: 'prezentacje_1.jpg',
    },
    {
      title: 'Imprezy plenerowe',
      description: 'Festiwale, koncerty i pikniki',
      route: '/galeria/imprezy-plenerowe',
      image: 'plenerowe_1.jpg',
    },
  ];

  allLink: OfferCategory = {
    title: 'Zobacz wszystkie realizacje',
    description: 'Pełna galeria',
    route: '/galeria/wszystkie',
  };

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    // Each image loads independently so one missing file doesn't blank the rest
    this.categories.forEach(async ({ route, image }) => {
      const path = `${environment.imageBaseUrl}/offer-presentation/${image}`;
      try {
        const url = await this.firebaseService.getFileUrl(path);
        this.imageUrls = { ...this.imageUrls, [route]: url };
      } catch (error) {
        console.error(`Failed to load offer image ${path}:`, error);
      }
    });
  }
}
