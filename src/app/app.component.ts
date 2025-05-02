import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ScrollService } from '@services/scroll.service';
import { FooterComponent } from 'src/core/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private scrollService: ScrollService) {}

  ngOnInit() {
    this.scrollService.initLenis();
  }
}
