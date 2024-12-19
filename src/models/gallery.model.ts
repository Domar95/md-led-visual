type GalleryImageCategory = 'koncerty' | 'eventy' | 'targi' | 'inne';

export interface GalleryImage {
  uri: string;
  title: string;
  category?: GalleryImageCategory;
}
