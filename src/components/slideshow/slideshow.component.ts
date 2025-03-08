import { Component, OnInit } from '@angular/core';

import { SlideshowImage } from '@models/slideshow.model';
import { FirebaseService } from '@services/firebase.service';
import { SliderComponent } from './slider/slider.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mdlv-slideshow',
  imports: [SliderComponent],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.scss',
})
export class SlideshowComponent implements OnInit {
  images!: SlideshowImage[];

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    this.images = await this.loadImages();
  }

  async loadImages(): Promise<SlideshowImage[]> {
    // TODO temporary texts, replace with actual text for each img
    const texts = [
      'WYNAJEM EKRANÓW LED I TELEBIMÓW',
      'OPRAWA WIZUALNA KONCERTÓW I EVENTÓW',
      'PROFESJONALNE EKRANY LED NA KONFERENCJE',
      'ROZWIĄZANIA WIZUALNE DLA TWOJEJ FIRMY',
    ];

    const images = await this.firebaseService.getFileUrls(
      `${environment.imageBaseUrl}/slideshow`
    );
    return images.map((image, index) => ({
      uri: image,
      text: texts[index % texts.length],
    }));
  }
}
