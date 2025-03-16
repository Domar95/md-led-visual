import {
  Component,
  computed,
  HostListener,
  Signal,
  signal,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';

import { GalleryImage } from 'src/features/gallery/models/gallery.model';
import { PhotoSwipeComponent } from './photo-swipe/photo-swipe.component';
import { galleryThumbnailsTrigger } from 'src/animations/gallery-animations';
import { ImageGalleryService } from '../services/image-gallery.service';
import { ResponsiveLayoutService } from '@services/responsive-layout.service';

@Component({
  selector: 'mdlv-gallery',
  imports: [MatProgressSpinnerModule, PhotoSwipeComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  animations: [galleryThumbnailsTrigger],
})
export class GalleryComponent {
  private readonly IMAGES_BATCH: number = 18;
  activeCategory = signal<string>('');
  imagesCount = signal<number>(this.IMAGES_BATCH);
  showImages: boolean = false;
  isLoading = signal<boolean>(true);
  spinnerDiameter!: string;
  isHandset!: boolean;

  constructor(
    private route: ActivatedRoute,
    private imageGalleryService: ImageGalleryService,
    private responsiveLayoutService: ResponsiveLayoutService
  ) {}

  async ngOnInit(): Promise<void> {
    this.responsiveLayoutService.isHandset$.subscribe((isHandset) => {
      this.isHandset = isHandset;

      if (isHandset) {
        this.spinnerDiameter = '32';
      } else {
        this.spinnerDiameter = '48';
      }
    });

    await this.imageGalleryService.loadImages();
    this.isLoading.set(false);

    this.route.paramMap.subscribe(async (params) => {
      this.activeCategory.set(params.get('category') || 'wszystkie');
      setTimeout(() => {
        this.showImages = true;
      }, 50);
    });
  }

  filteredImages: Signal<GalleryImage[]> = computed(() => {
    return this.imageGalleryService
      .images()
      .filter(
        (image) =>
          this.activeCategory() === 'wszystkie' ||
          image.category === this.activeCategory()
      )
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, this.imagesCount());
  });

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 10 && this.isLoading() === false) {
      this.isLoading.set(true);
      setTimeout(() => {
        this.imagesCount.set(this.imagesCount() + this.IMAGES_BATCH);
        this.isLoading.set(false);
      }, 1000);
    }
  }
}
