import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { GalleryComponent } from '@components/index';

type Link = { label: string; route: string };

@Component({
  selector: 'mdlv-gallery-page',
  imports: [CommonModule, MatTabsModule, RouterModule, GalleryComponent],
  templateUrl: './gallery-page.component.html',
  styleUrl: './gallery-page.component.scss',
})
export class GalleryPageComponent {
  links: Link[] = [
    {
      label: 'wszystkie',
      route: 'wszystkie',
    },
    {
      label: 'imprezy firmowe',
      route: 'imprezy-firmowe',
    },
    {
      label: 'imprezy prywatne',
      route: 'imprezy-prywatne',
    },
    {
      label: 'imprezy plenerowe',
      route: 'imprezy-plenerowe',
    },
    {
      label: 'prezentacje',
      route: 'prezentacje',
    },
  ];
  activeLink!: Link;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activeLink = this.getActiveLink();
  }

  getActiveLink(): Link {
    // Use the Router's current URL to parse out the last segment.
    const urlSegments = this.router.url.split('/');
    const lastSegment = urlSegments[urlSegments.length - 1];

    // Find the matching link based on the last segment.
    const foundLink = this.links.find((link) => link.route === lastSegment);
    return foundLink ? foundLink : this.links[0];
  }
}
