import { IArticles } from './IArticles';

interface INewsResponse {
    status: string;
    totalResults: number;
    articles: Array<IArticles>;
  }