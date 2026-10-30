import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OFFER_PAGE_HAS_CONTENT } from 'src/content/site-content';

type Link = { label: string; route: string };

@Component({
  selector: 'mdlv-footer-navigation',
  imports: [RouterModule],
  templateUrl: './footer-navigation.component.html',
  styleUrl: './footer-navigation.component.scss',
})
export class FooterNavigationComponent {
  links: Link[] = [
    {
      label: 'Strona główna',
      route: '/',
    },
    {
      label: 'Galeria',
      route: '/galeria',
    },
    // only once the page has real content to show
    ...(OFFER_PAGE_HAS_CONTENT ? [{ label: 'Oferta', route: '/oferta' }] : []),
    {
      label: 'Wycena',
      route: '/wycena',
    },
    {
      label: 'Kontakt',
      route: '/kontakt',
    },
  ];
}
