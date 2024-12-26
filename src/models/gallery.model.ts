type GalleryImageCategory =
  | 'imprezy plenerowe'
  | 'imprezy firmowe'
  | 'imprezy prywatne'
  | 'prezentacje';

export interface GalleryImage {
  uri: string;
  title: string;
  category?: GalleryImageCategory;
}
