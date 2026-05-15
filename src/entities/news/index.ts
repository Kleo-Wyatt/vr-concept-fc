export {
  createNews,
  deleteNews,
  getFeaturedNews,
  getNews,
  updateNews,
} from './api/newsApi';

export type { NewsCategoryFilter, NewsItem, NewsPayload } from './model/types';

export { newsQueryKeys } from './model/newsQueryKeys';
