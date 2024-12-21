import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from '@components/index';

@Component({
  selector: 'mdlv-home-layout',
  imports: [RouterModule, NavbarComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss',
})
export class HomeLayoutComponent {}
