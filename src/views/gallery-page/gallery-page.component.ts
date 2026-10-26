import { RouterModule } from '@angular/router';
import { Component, computed, HostBinding } from '@angular/core';

import { routeAnimationsState } from 'src/animations/route-animations';
import { ImageGalleryService } from 'src/features/gallery/services/image-gallery.service';

type Link = { label: string; route: string };

@Component({
  selector: 'mdlv-gallery-page',
  imports: [RouterModule],
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
      label: 'Imprezy firmowe',
      route: 'imprezy-firmowe',
    },
    {
      label: 'Imprezy prywatne',
      route: 'imprezy-prywatne',
    },
    {
      label: 'Imprezy plenerowe',
      route: 'imprezy-plenerowe',
    },
    {
      label: 'Prezentacje',
      route: 'prezentacje',
    },
  ];

  counts = computed(() => {
    const images = this.imageGalleryService.images();
    const counts: Record<string, number> = { wszystkie: images.length };

    for (const image of images) {
      if (image.category) {
        counts[image.category] = (counts[image.category] ?? 0) + 1;
      }
    }

    return counts;
  });

  constructor(private imageGalleryService: ImageGalleryService) {}
}
