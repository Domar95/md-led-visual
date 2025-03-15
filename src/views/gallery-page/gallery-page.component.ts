import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, HostBinding } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { map } from 'rxjs';

import { routeAnimationsState } from 'src/animations/route-animations';

type Link = { label: string; route: string };

@Component({
  selector: 'mdlv-gallery-page',
  imports: [MatTabsModule, RouterModule],
  templateUrl: './gallery-page.component.html',
  styleUrl: './gallery-page.component.scss',
  animations: [routeAnimationsState],
})
export class GalleryPageComponent {
  @HostBinding('@routeAnimations') routeAnimations = true;

  links: Link[] = [
    {
      label: 'Wszystkie',
      route: 'wszystkie',
    },
    {
      label: 'Imprezy Firmowe',
      route: 'imprezy-firmowe',
    },
    {
      label: 'Imprezy Prywatne',
      route: 'imprezy-prywatne',
    },
    {
      label: 'Imprezy Plenerowe',
      route: 'imprezy-plenerowe',
    },
    {
      label: 'Prezentacje',
      route: 'prezentacje',
    },
  ];
  activeLink!: Link;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.firstChild?.paramMap
      .pipe(map((params) => params.get('category')))
      .subscribe((category) => {
        this.activeLink =
          this.links.find((link) => link.route === category) || this.links[0];
      });
  }
}
