import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ResponsiveLayoutService } from '@services/responsive-layout.service';

@Component({
  selector: 'mdlv-hero',
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  isHandset!: boolean;
  services: string[] = ['Ekrany LED', 'Oświetlenie', 'Efekty specjalne'];

  constructor(private responsiveLayoutService: ResponsiveLayoutService) {}

  ngOnInit() {
    this.responsiveLayoutService.isHandset$.subscribe((isHandset) => {
      this.isHandset = isHandset;
    });
  }
}
