import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import {
  CLIENT_LOGOS,
  publishable,
  Testimonial,
  TESTIMONIALS,
} from 'src/content/site-content';
import { RevealDirective } from 'src/shared/directives/reveal.directive';
import { SpotlightDirective } from 'src/shared/directives/spotlight.directive';

/** The logo's lights, handed out to the cards in turn */
const LIGHTS = ['butter', 'cyan', 'magenta'] as const;

/** Client quotes and a strip of client logos; hidden when there are none */
@Component({
  selector: 'mdlv-testimonials',
  imports: [MatIconModule, RouterModule, RevealDirective, SpotlightDirective],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent {
  testimonials = publishable(TESTIMONIALS);
  logos = publishable(CLIENT_LOGOS);

  light(index: number) {
    return LIGHTS[index % LIGHTS.length];
  }

  /** "Anna i Michał" → "AM", "Katarzyna" → "K" */
  initials(item: Testimonial) {
    return item.name
      .split(/\s+/)
      .filter((word) => word.length > 1)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join('');
  }
}
