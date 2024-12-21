import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavbarComponent, TitleComponent } from '@components/index';

@Component({
  selector: 'mdlv-default-layout',
  imports: [RouterModule, NavbarComponent, TitleComponent],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
})
export class DefaultLayoutComponent {}
