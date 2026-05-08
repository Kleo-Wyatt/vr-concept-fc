export type GalleryItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
};

export type GalleryCategoryFilter = 'all' | string;
