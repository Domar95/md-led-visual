import { Component, computed, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

import { isPublishable, SHOWREEL } from 'src/content/site-content';
import { RevealDirective } from 'src/shared/directives/reveal.directive';

/**
 * YouTube's thumbnail sizes, largest first. Not every video has every size;
 * a missing one comes back as a 120×90 grey placeholder, not an error.
 */
const THUMBNAIL_SIZES = ['maxresdefault', 'sddefault', 'hqdefault'];
const PLACEHOLDER_WIDTH = 120;

/**
 * A video from a real event. Shows YouTube's thumbnail with a play button;
 * the player (from youtube-nocookie.com) loads only once the visitor clicks,
 * so the page stays fast and nobody is tracked who doesn't watch.
 */
@Component({
  selector: 'mdlv-showreel',
  imports: [MatIconModule, RevealDirective],
  templateUrl: './showreel.component.html',
  styleUrl: './showreel.component.scss',
})
export class ShowreelComponent {
  video = isPublishable(SHOWREEL) ? SHOWREEL : null;
  isPlaying = signal(false);

  private sizeIndex = signal(0);
  thumbnail = computed(() =>
    this.video
      ? `https://i.ytimg.com/vi/${this.video.youtubeId}/${THUMBNAIL_SIZES[this.sizeIndex()]}.jpg`
      : '',
  );
  isThumbnailReady = signal(false);

  playerUrl: SafeResourceUrl | null = null;

  constructor(sanitizer: DomSanitizer) {
    if (this.video) {
      // built from our own id, not from user input
      this.playerUrl = sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube-nocookie.com/embed/${this.video.youtubeId}?autoplay=1&rel=0&modestbranding=1`,
      );
    }
  }

  onThumbnailLoad(image: HTMLImageElement) {
    if (image.naturalWidth <= PLACEHOLDER_WIDTH) {
      this.tryNextSize();
      return;
    }
    this.isThumbnailReady.set(true);
  }

  tryNextSize() {
    if (this.sizeIndex() < THUMBNAIL_SIZES.length - 1) {
      this.sizeIndex.update((index) => index + 1);
    }
  }
}
