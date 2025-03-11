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
    const titles = [
      'Wynajem ekranów LED i telebimów',
      'Oprawa wizualna koncertów i eventów',
      'Profesjonalne ekrany LED na konferencje',
      'Rozwiązania wizualne dla Twojej firmy',
    ];

    const texts = [
      'Wynajmujemy ekrany LED i telebimy na różne wydarzenia, takie jak koncerty, konferencje, festiwale, targi, imprezy firmowe i inne.',
      'Oferujemy profesjonalną oprawę wizualną koncertów i eventów. Nasze ekrany LED zapewnią doskonałą jakość obrazu i dźwięku.',
      'Potrzebujesz ekranu na konferencję? Z nami nawet najdrobniejsze detale będą widoczne dla wszystkich uczestników.',
      'Nowoczesne ekrany, oświetlenie i efekty specjalne. Profesjonalna obsługa wizualna. Skontaktuj się nami, a my zajmiemy się resztą.',
    ];

    const images = await this.firebaseService.getFileUrls(
      `${environment.imageBaseUrl}/slideshow`
    );
    return images.map((image, index) => ({
      uri: image,
      title: titles[index % texts.length],
      text: texts[index % texts.length],
    }));
  }
}
