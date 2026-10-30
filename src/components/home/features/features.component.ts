import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { RevealDirective } from 'src/shared/directives/reveal.directive';
import { SpotlightDirective } from 'src/shared/directives/spotlight.directive';

interface Feature {
  /** The small lit stage drawn at the top of the card */
  scene: 'screen' | 'beams' | 'sparks';
  title: string;
  description: string;
  /** One of the logo's lights, matching the service's chip in the hero */
  light: 'cyan' | 'butter' | 'magenta';
}

@Component({
  selector: 'mdlv-features',
  imports: [MatIconModule, RouterModule, RevealDirective, SpotlightDirective],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      scene: 'screen',
      title: 'Ekrany LED',
      description:
        'Ekrany i telebimy do wnętrz i w plener. Transmisje na żywo, prezentacje, wizualizacje i materiały partnerów, w rozmiarze dobranym do sceny i widowni.',
      light: 'cyan',
    },
    {
      scene: 'beams',
      title: 'Oświetlenie',
      description:
        'Oświetlenie sceniczne i dekoracyjne, które buduje klimat wydarzenia. Od subtelnych akcentów po pełne show, zawsze dopasowane do przestrzeni.',
      light: 'butter',
    },
    {
      scene: 'sparks',
      title: 'Efekty specjalne',
      description:
        'Lasery, mgła i pirotechnika sceniczna na momenty, które mają zostać w pamięci: wejście na scenę, pierwszy taniec, finał koncertu.',
      light: 'magenta',
    },
  ];
}
