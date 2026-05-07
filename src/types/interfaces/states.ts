import { Article, Category, Tag, User } from './models';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface ArticleState {
  list: Article[];
  loading: boolean;
  error: string | null;
  currentArticle: Article | null;
}

export interface CategoryState {
  list: Category[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: Category | null;
}

export interface TagState {
  list: Tag[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

export interface SearchState {
  recentSearches: string[];
  currentSearch: string;
  loading: boolean;
  error: string | null;
} 