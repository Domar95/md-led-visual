import { Routes } from '@angular/router';

import { DefaultLayoutComponent, HomeLayoutComponent } from '@layouts/index';
import {
  AboutComponent,
  ContactComponent,
  GalleryComponent,
  HomeComponent,
  PricingComponent,
} from '@views/index';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [{ path: '', component: HomeComponent, title: 'Strona główna' }],
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: 'o-mnie', component: AboutComponent, title: 'O mnie' },
      { path: 'galeria', component: GalleryComponent, title: 'Galeria' },
      { path: 'wycena', component: PricingComponent, title: 'Wycena' },
      { path: 'kontakt', component: ContactComponent, title: 'Kontakt' },
    ],
  },
];
