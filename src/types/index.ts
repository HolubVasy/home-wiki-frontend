// Models
export interface Article {
  id: number;
  name: string;
  description: string;
  category?: Category;
  tags?: Tag[] | null;
  createdBy: string;
  createdAt: string;
  modifiedBy?: string | null;
  modifiedAt?: string | null;
}

export interface Category {
  id: number;
  name: string;
  articleCount: number;
  description?: string;
  createdBy: string;
  createdAt: string;
  modifiedBy?: string;
  modifiedAt?: string;
}

export interface Tag {
  id: number;
  name: string;
  createdBy: string;
  createdAt: string;
  modifiedBy?: string;
  modifiedAt?: string;
  usageCount: number;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  token?: string;
  createdAt: string;
  updatedAt: string;
}

// States
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

// Common
export interface PagedList<T> {
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  totalItemCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: T[];
} 