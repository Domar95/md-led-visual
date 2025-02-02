import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';

import { ResponsiveLayoutService } from '@services/responsive-layout.service';

@Component({
  selector: 'mdlv-offer-presentation-grids',
  imports: [MatGridListModule, MatButton, RouterModule],
  templateUrl: './offer-presentation-grids.component.html',
  styleUrl: './offer-presentation-grids.component.scss',
})
export class OfferPresentationGridsComponent {
  @Input({ required: true }) images!: string[];

  cols!: number;
  rowHeight!: string;

  constructor(private responsiveLayoutService: ResponsiveLayoutService) {}

  ngOnInit() {
    this.responsiveLayoutService.isHandset$.subscribe((isHandset) => {
      if (isHandset === true) {
        this.cols = 1;
        this.rowHeight = '2:1';
      } else {
        this.cols = 3;
        this.rowHeight = '4:3';
      }
    });
  }
}
