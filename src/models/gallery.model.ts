type GalleryImageCategory =
  | 'imprezy firmowe'
  | 'imprezy prywatne'
  | 'imprezy plenerowe'
  | 'prezentacje';

export interface GalleryImage {
  uri: string;
  title: string;
  category?: GalleryImageCategory;
}
