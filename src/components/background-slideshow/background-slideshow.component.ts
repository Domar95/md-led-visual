import { Component, OnInit } from '@angular/core';

import { BackgroundSlideshowImage } from '@models/background-slideshow.model';
import { FirebaseService } from '@services/firebase.service';
import { SliderComponent } from './slider/slider.component';

@Component({
  selector: 'mdlv-background-slideshow',
  imports: [SliderComponent],
  templateUrl: './background-slideshow.component.html',
  styleUrl: './background-slideshow.component.scss',
})
export class BackgroundSlideshowComponent implements OnInit {
  images!: BackgroundSlideshowImage[];

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    this.images = await this.loadImages();
  }

  async loadImages(): Promise<BackgroundSlideshowImage[]> {
    // TODO temporary texts, replace with actual text for each img
    const texts = [
      'WYNAJEM EKRANÓW LED I TELEBIMÓW',
      'OPRAWA WIZUALNA KONCERTÓW I EVENTÓW',
      'PROFESJONALNE EKRANY LED NA KONFERENCJE',
      'ROZWIĄZANIA WIZUALNE DLA TWOJEJ FIRMY',
    ];

    const images = await this.firebaseService.getFileUrls('/images/slideshow');
    return images.map((image, index) => ({
      uri: image,
      text: texts[index % texts.length],
    }));
  }
}
