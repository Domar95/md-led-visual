import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'mdlv-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
})
export class TitleComponent implements OnInit {
  title: string = '';

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.title = this.getTitle();

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          return this.getTitle();
        })
      )
      .subscribe((title: string) => {
        this.title = title;
      });
  }

  getTitle(): string {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.title || '';
  }
}
