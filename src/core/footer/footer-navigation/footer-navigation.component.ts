import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';

type Link = { label: string; route: string };

@Component({
  selector: 'mdlv-footer-navigation',
  imports: [MatListModule, RouterModule],
  templateUrl: './footer-navigation.component.html',
  styleUrl: './footer-navigation.component.scss',
})
export class FooterNavigationComponent {
  links: Link[] = [
    {
      label: 'Strona główna',
      route: '',
    },
    {
      label: 'Galeria',
      route: '/galeria',
    },
    {
      label: 'Wycena',
      route: '/wycena',
    },
    {
      label: 'Kontakt',
      route: '/kontakt',
    },
  ];

  constructor(private router: Router) {}
}
