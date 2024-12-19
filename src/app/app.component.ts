import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from '../components/navbar/navbar.component';
import { TitleComponent } from '../components/title/title.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, TitleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
