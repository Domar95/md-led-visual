import { Component } from '@angular/core';

import { NavbarComponent, TitleComponent } from '@components/index';

@Component({
  selector: 'mdlv-default-layout',
  imports: [NavbarComponent, TitleComponent],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
})
export class DefaultLayoutComponent {}
