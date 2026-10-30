import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { RevealDirective } from 'src/shared/directives/reveal.directive';

interface Step {
  title: string;
  description: string;
}

/** How a booking goes, from the first call to teardown; from the About page */
@Component({
  selector: 'mdlv-process',
  imports: [MatButtonModule, MatIconModule, RouterModule, RevealDirective],
  templateUrl: './process.component.html',
  styleUrl: './process.component.scss',
})
export class ProcessComponent {
  steps: Step[] = [
    {
      title: 'Rozmowa',
      description: 'Ustalamy termin, miejsce i rodzaj wydarzenia.',
    },
    {
      title: 'Wycena i dobór sprzętu',
      description:
        'Przygotowujemy wycenę i dobieramy ekrany, oświetlenie i efekty do miejsca.',
    },
    {
      title: 'Montaż i realizacja',
      description:
        'W dniu wydarzenia montujemy sprzęt i dbamy o to, żeby wszystko działało.',
    },
    {
      title: 'Demontaż',
      description:
        'Po wydarzeniu wszystko zabieramy, a Ty możesz skupić się na gościach.',
    },
  ];
}
