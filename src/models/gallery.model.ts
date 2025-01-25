type GalleryImageCategory =
  | 'imprezy firmowe'
  | 'imprezy prywatne'
  | 'imprezy plenerowe'
  | 'prezentacje';

export interface GalleryImage {
  title: string;
  imageUri: string;
  imageSize: string;
  thumbnailUri: string;
  category?: GalleryImageCategory;
}
