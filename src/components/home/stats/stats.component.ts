import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';

import { publishable, STATS } from 'src/content/site-content';
import { RevealDirective } from 'src/shared/directives/reveal.directive';

const COUNT_DURATION_MS = 1400;

/**
 * On tall screens the band is in view without scrolling; counting then waits
 * until the hero's entrance has played, so it isn't missed while the eye is
 * on the headline. Once the visitor has scrolled, it starts straight away.
 */
const UNSCROLLED_DELAY_MS = 1500;

/** "do 40 m²" → { prefix: "do ", target: 40, suffix: " m²" }; null if no number */
function parseValue(value: string) {
  const match = value.match(/^(\D*?)(\d+)(.*)$/);
  return match
    ? { prefix: match[1], target: Number(match[2]), suffix: match[3] }
    : null;
}

/**
 * A short band of numbers between the hero and the services. The numbers
 * count up from zero the first time any of them comes into view.
 */
@Component({
  selector: 'mdlv-stats',
  imports: [RevealDirective],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('band') band?: ElementRef<HTMLElement>;

  stats = publishable(STATS);
  private parts = this.stats.map((stat) => parseValue(stat.value));

  private reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  /** What each figure shows right now: from zero, or the final value */
  display = signal(
    this.stats.map((stat, i) =>
      this.reducedMotion ? stat.value : this.format(i, 0),
    ),
  );

  private observer?: IntersectionObserver;
  private fallback?: ReturnType<typeof setTimeout>;
  private delayed?: ReturnType<typeof setTimeout>;
  private frame?: number;
  private started = false;
  private readonly createdAt = performance.now();

  ngAfterViewInit() {
    const band = this.band?.nativeElement;
    if (!band || this.reducedMotion) return;

    // Watch the numbers themselves, not the band: counting starts as soon as
    // any sliver of a number shows, so there's no scroll position where a
    // number sits at zero. (The band's padding can peek in without it.)
    const values = [...band.querySelectorAll<HTMLElement>('.value')];

    this.observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        this.startWhenNoticed();
      }
    });
    values.forEach((value) => this.observer?.observe(value));

    // the observer can miss numbers that are on screen right after a page
    // change (see RevealDirective); check their position directly as well
    this.fallback = setTimeout(() => {
      const onScreen = values.some((value) => {
        const rect = value.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      if (onScreen) this.startWhenNoticed();
    }, 800);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    clearTimeout(this.fallback);
    clearTimeout(this.delayed);
    if (this.frame !== undefined) cancelAnimationFrame(this.frame);
  }

  /** Straight away after a scroll; otherwise once the hero has played */
  private startWhenNoticed() {
    const wait = UNSCROLLED_DELAY_MS - (performance.now() - this.createdAt);
    if (window.scrollY > 0 || wait <= 0) {
      this.start();
    } else if (!this.delayed) {
      this.delayed = setTimeout(() => this.start(), wait);
    }
  }

  private start() {
    if (this.started) return;
    this.started = true;
    this.observer?.disconnect();
    clearTimeout(this.fallback);
    clearTimeout(this.delayed);

    const begin = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - begin) / COUNT_DURATION_MS);
      // ease out: quick at first, settling on the final number
      const eased = 1 - Math.pow(1 - t, 3);
      this.display.set(
        this.stats.map((stat, i) => {
          const part = this.parts[i];
          return part ? this.format(i, Math.round(part.target * eased)) : stat.value;
        }),
      );
      if (t < 1) this.frame = requestAnimationFrame(tick);
    };
    this.frame = requestAnimationFrame(tick);
  }

  /** The stat's value with its number replaced by n; text-only stats as is */
  private format(index: number, n: number) {
    const part = this.parts[index];
    return part ? `${part.prefix}${n}${part.suffix}` : this.stats[index].value;
  }
}
