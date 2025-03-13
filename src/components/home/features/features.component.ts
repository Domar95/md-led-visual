import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { ResponsiveLayoutService } from '@services/responsive-layout.service';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'mdlv-features',
  imports: [MatCardModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
})
export class FeaturesComponent {
  isHandset!: boolean;

  features: Feature[] = [
    {
      icon: '/assets/icons/screen.png',
      title: 'Ekrany LED',
      description:
        'Najnowsze ekrany LED o krystalicznej jakości obrazu. Od transmisji na żywo po kreatywne wizualizacje – sprawiamy, że Twój event staje się niezapomniany.',
    },
    {
      icon: '/assets/icons/lighting.png',
      title: 'Oświetlenie',
      description:
        'Tworzymy niepowtarzalny klimat dzięki profesjonalnemu oświetleniu. Dopasowujemy efekty do Twojej wizji – od delikatnych akcentów po spektakularne show.',
    },
    {
      icon: '/assets/icons/special-effects.png',
      title: 'Efekty specjalne',
      description:
        'Lasery, mgła, pirotechnika sceniczna – dodajemy wydarzeniom magii i emocji. Podkręć atmosferę z naszymi efektami specjalnymi.',
    },
  ];

  constructor(private responsiveLayoutService: ResponsiveLayoutService) {}

  ngOnInit() {
    this.responsiveLayoutService.isHandset$.subscribe((isHandset) => {
      this.isHandset = isHandset;
    });
  }
}
