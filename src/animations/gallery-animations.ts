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
        style({ opacity: 0, transform: 'scale(0.8)' }),
        stagger(100, [
          animate(
            '300ms ease-in',
            style({ opacity: 1, transform: 'scale(1)' })
          ),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);
