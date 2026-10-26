import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ResponsiveLayoutService } from '@services/responsive-layout.service';
import { RevealDirective } from 'src/shared/directives/reveal.directive';

interface OfferCategory {
  title: string;
  description: string;
  route: string;
}

@Component({
  selector: 'mdlv-offer-presentation-grids',
  imports: [MatIconModule, RouterModule, RevealDirective],
  templateUrl: './offer-presentation-grids.component.html',
  styleUrl: './offer-presentation-grids.component.scss',
})
export class OfferPresentationGridsComponent {
  @Input({ required: true }) images!: string[];
  isHandset!: boolean;

  categories: OfferCategory[] = [
    {
      title: 'Imprezy firmowe',
      description: 'Konferencje, gale i eventy integracyjne',
      route: '/galeria/imprezy-firmowe',
    },
    {
      title: 'Imprezy prywatne',
      description: 'Wesela, urodziny i jubileusze',
      route: '/galeria/imprezy-prywatne',
    },
    {
      title: 'Prezentacje',
      description: 'Premiery produktów i wystąpienia',
      route: '/galeria/prezentacje',
    },
    {
      title: 'Imprezy plenerowe',
      description: 'Festiwale, koncerty i pikniki',
      route: '/galeria/imprezy-plenerowe',
    },
    {
      title: 'Wszystkie realizacje',
      description: 'Zobacz pełną galerię naszych projektów',
      route: '/galeria/wszystkie',
    },
  ];

  constructor(private responsiveLayoutService: ResponsiveLayoutService) {}

  ngOnInit() {
    this.responsiveLayoutService.isHandset$.subscribe((isHandset) => {
      this.isHandset = isHandset;
    });
  }
}
