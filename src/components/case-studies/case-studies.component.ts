import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { CASE_STUDIES, publishable } from 'src/content/site-content';
import { RevealDirective } from 'src/shared/directives/reveal.directive';

/** A few events told in two lines each: what was needed, what we set up */
@Component({
  selector: 'mdlv-case-studies',
  imports: [MatIconModule, RouterModule, RevealDirective],
  templateUrl: './case-studies.component.html',
  styleUrl: './case-studies.component.scss',
})
export class CaseStudiesComponent {
  items = publishable(CASE_STUDIES);
}
