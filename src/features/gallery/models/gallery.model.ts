export type GalleryImageCategory =
  | 'imprezy-firmowe'
  | 'imprezy-prywatne'
  | 'imprezy-plenerowe'
  | 'prezentacje';

export interface GalleryImage {
  title: string;
  imageUri: string;
  imageWidth: string;
  imageHeight: string;
  thumbnailUri: string;
  category?: GalleryImageCategory;
  date: string;
}
