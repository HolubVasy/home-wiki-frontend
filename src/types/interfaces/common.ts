export interface PagedList<T> {
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  totalItemCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: T[];
} 