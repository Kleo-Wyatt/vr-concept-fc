export type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author: string;
  image?: string;
  imageAlt?: string;
};

export type NewsCategoryFilter = 'all' | string;
