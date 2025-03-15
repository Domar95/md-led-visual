import { Routes } from '@angular/router';
import { GalleryComponent } from '@components/index';

import { DefaultLayoutComponent, HomeLayoutComponent } from '@layouts/index';
import {
  AboutPageComponent,
  ContactPageComponent,
  GalleryPageComponent,
  HomePageComponent,
  NotFoundPageComponent,
  PricingPageComponent,
} from '@views/index';
import { AdminComponent } from 'src/features/admin/components/admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: '', component: HomePageComponent, title: 'Strona główna' },
    ],
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: 'o-mnie', component: AboutPageComponent, title: 'O mnie' },
      {
        path: 'galeria',
        component: GalleryPageComponent,
        children: [
          { path: '', redirectTo: 'wszystkie', pathMatch: 'full' },
          { path: ':category', component: GalleryComponent, title: 'Galeria' },
        ],
      },
      { path: 'wycena', component: PricingPageComponent, title: 'Wycena' },
      { path: 'kontakt', component: ContactPageComponent, title: 'Kontakt' },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Admin',
  },
  { path: '**', component: NotFoundPageComponent },
];
