export interface Article {
  id: number;
  name: string;
  description: string;
  category?: Category;
  tags?: Tag[];
  createdBy: string;
  createdAt: string;
  modifiedBy?: string;
  modifiedAt?: string;
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