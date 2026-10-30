import { Routes } from '@angular/router';

import { HomeLayoutComponent } from '@layouts/index';
import {
  AboutPageComponent,
  ContactPageComponent,
  GalleryPageComponent,
  HomePageComponent,
  NotFoundPageComponent,
  OfferPageComponent,
  PricingPageComponent,
} from '@views/index';
import { AdminComponent } from 'src/features/admin/components/admin/admin.component';
import { GalleryComponent } from 'src/features/gallery/components/gallery.component';

export const routes: Routes = [
  // before the public layout, whose wildcard would otherwise catch it
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Admin',
  },
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: '', component: HomePageComponent, title: 'Strona główna' },
      {
        path: 'galeria',
        component: GalleryPageComponent,
        children: [
          { path: '', redirectTo: 'wszystkie', pathMatch: 'full' },
          { path: ':category', component: GalleryComponent, title: 'Galeria realizacji' },
        ],
      },
      {
        path: 'oferta',
        component: OfferPageComponent,
        title: 'Sprzęt, realizacje i częste pytania',
      },
      { path: 'wycena', component: PricingPageComponent, title: 'Wycena wynajmu ekranu LED' },
      { path: 'kontakt', component: ContactPageComponent, title: 'Kontakt i rezerwacja terminu' },
      { path: 'o-mnie', component: AboutPageComponent, title: 'O mnie' },
      {
        path: '**',
        component: NotFoundPageComponent,
        title: 'Nie znaleziono strony',
      },
    ],
  },
];
