import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent, TitleComponent } from '@components/index';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, TitleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
