import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

const BRAND = 'MD LED Visual';
/** What the business does, for search results and browser tabs */
const TAGLINE = 'Wynajem ekranów LED i telebimów';

/**
 * Appends the brand and what it does to route titles, e.g.
 * "Galeria realizacji | MD LED Visual – wynajem ekranów LED i telebimów".
 * The home page gets a descriptive one of its own.
 */
@Injectable()
export class PageTitleStrategy extends TitleStrategy {
  constructor(private title: Title) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot) {
    const pageTitle = this.buildTitle(snapshot);
    const isHome = snapshot.url === '/' || snapshot.url.startsWith('/#');

    this.title.setTitle(
      !pageTitle || isHome
        ? `${BRAND} | ${TAGLINE} – Wrocław i cała Polska`
        : `${pageTitle} | ${BRAND} – ${TAGLINE.toLowerCase()}`
    );
  }
}
