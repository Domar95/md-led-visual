import { Routes } from '@angular/router';
import {
  AboutComponent,
  ContactComponent,
  GalleryComponent,
  HomeComponent,
  PricingComponent,
} from '../views';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Strona główna',
  },
  {
    path: 'o-mnie',
    component: AboutComponent,
    title: 'O mnie',
  },
  {
    path: 'galeria',
    component: GalleryComponent,
    title: 'Galeria',
  },
  {
    path: 'wycena',
    component: PricingComponent,
    title: 'Wycena',
  },
  {
    path: 'kontakt',
    component: ContactComponent,
    title: 'Kontakt',
  },
];
