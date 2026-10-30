import {
  Component,
  OnDestroy,
  OnInit,
  computed,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { FirebaseService } from '@services/firebase.service';
import { environment } from 'src/environments/environment';

interface HeroSlide {
  /** File name in the offer-presentation storage folder */
  file: string;
  caption: string;
  alt: string;
}

/** Keep in sync with the progress bar animation in hero.component.scss */
const SLIDE_DURATION = 6000;

@Component({
  selector: 'mdlv-hero',
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  slides: HeroSlide[] = [
    {
      file: 'grid_5.jpg',
      caption: 'Oprawa sceniczna',
      alt: 'Ekran LED na scenie podczas wydarzenia',
    },
    {
      file: 'plenerowe_1.jpg',
      caption: 'Imprezy plenerowe',
      alt: 'Ekran LED na imprezie plenerowej',
    },
    {
      file: 'firmowe_1.jpg',
      caption: 'Imprezy firmowe',
      alt: 'Ekran LED na imprezie firmowej',
    },
    {
      file: 'prywatne_1.jpg',
      caption: 'Imprezy prywatne',
      alt: 'Oprawa wizualna imprezy prywatnej',
    },
    {
      file: 'prezentacje_1.jpg',
      caption: 'Prezentacje',
      alt: 'Ekran LED podczas prezentacji',
    },
  ];
  /** Each service gets one of the logo's lights as its dot colour */
  services: { name: string; light: 'cyan' | 'butter' | 'magenta' }[] = [
    { name: 'Ekrany LED', light: 'cyan' },
    { name: 'Oświetlenie', light: 'butter' },
    { name: 'Efekty specjalne', light: 'magenta' },
  ];

  imageUrls = signal<Record<string, string>>({});
  loadedFiles = signal<ReadonlySet<string>>(new Set());
  failedFiles = signal<ReadonlySet<string>>(new Set());
  /** Null until the first photo has loaded; after that only the timer or the visitor change it */
  activeFile = signal<string | null>(null);

  /** One progress step per slide, from the start, so the row doesn't grow while photos load */
  steps = computed(() =>
    this.slides.filter((slide) => !this.failedFiles().has(slide.file)),
  );
  activeSlide = computed(() =>
    this.slides.find((slide) => slide.file === this.activeFile()),
  );

  autoplay = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  private timer?: ReturnType<typeof setInterval>;
  private restRequested = false;

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    // The first photo loads alone, so it's what visitors see first and it
    // isn't slowed down; the rest follow once it's on screen (or has failed).
    await this.loadUrl(this.slides[0]);
    if (this.failedFiles().has(this.slides[0].file)) this.loadRest();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  onImageLoad(file: string) {
    this.loadedFiles.update((files) => new Set(files).add(file));

    // the first photo to arrive opens the show and starts the countdown
    if (this.activeFile() === null) {
      this.activeFile.set(file);
      if (this.autoplay) this.startTimer();
      this.loadRest();
    }
  }

  onImageError(file: string) {
    this.markFailed(file);
    if (this.activeFile() === null) this.loadRest();
  }

  isLoaded(slide: HeroSlide) {
    return this.loadedFiles().has(slide.file);
  }

  isActive(slide: HeroSlide) {
    return this.activeFile() === slide.file;
  }

  goTo(slide: HeroSlide) {
    if (this.isActive(slide) || !this.isLoaded(slide)) return;
    this.activeFile.set(slide.file);
    // restart the countdown so the picked photo gets its full time
    if (this.autoplay) this.startTimer();
  }

  private async loadUrl(slide: HeroSlide) {
    try {
      const url = await this.firebaseService.getFileUrl(
        `${environment.imageBaseUrl}/offer-presentation/${slide.file}`,
      );
      this.imageUrls.update((urls) => ({ ...urls, [slide.file]: url }));
    } catch {
      this.markFailed(slide.file);
    }
  }

  private loadRest() {
    if (this.restRequested) return;
    this.restRequested = true;
    this.slides.slice(1).forEach((slide) => this.loadUrl(slide));
  }

  private markFailed(file: string) {
    // the slide is left out; the neutral placeholder covers an empty hero
    this.failedFiles.update((files) => new Set(files).add(file));
  }

  private startTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(() => this.next(), SLIDE_DURATION);
  }

  /** Moves to the next loaded photo, skipping any still on their way */
  private next() {
    const steps = this.steps();
    const start = steps.findIndex((slide) => this.isActive(slide));
    for (let offset = 1; offset < steps.length; offset++) {
      const slide = steps[(start + offset) % steps.length];
      if (this.isLoaded(slide)) {
        this.activeFile.set(slide.file);
        return;
      }
    }
  }
}
