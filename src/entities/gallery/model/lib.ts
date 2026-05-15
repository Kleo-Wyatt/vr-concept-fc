import type { GalleryCategoryFilter, GalleryItem } from './types';

export function getGalleryCategories(items: GalleryItem[]) {
  return ['all', ...new Set(items.map((item) => item.category))];
}

export function filterGalleryItems(
  items: GalleryItem[],
  selectedCategory: GalleryCategoryFilter,
) {
  if (selectedCategory === 'all') {
    return items;
  }

  return items.filter((item) => item.category === selectedCategory);
}

export function formatGalleryDate(date: string) {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
