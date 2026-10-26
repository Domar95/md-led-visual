import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const galleryThumbnailsTrigger = trigger('galleryThumbnailsTrigger', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(16px)' }),
        stagger(40, [
          animate(
            '450ms cubic-bezier(0.2, 0.7, 0.2, 1)',
            style({ opacity: 1, transform: 'none' })
          ),
        ]),
      ],
      { optional: true, limit: 18 }
    ),
  ]),
]);
