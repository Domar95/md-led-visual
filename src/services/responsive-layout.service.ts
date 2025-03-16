import { Injectable } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveLayoutService {
  isHandset$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    // TODO: correct breakpoint name accross app to match actual breakpoint
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
      map((state: BreakpointState) => state.matches),
      shareReplay()
    );
  }
}
