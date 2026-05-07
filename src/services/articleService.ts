import { Article, Category } from '../types/interfaces';
import { getDocs, Query } from 'firebase/firestore';

export const getArticles = async (q: Query) => {
  const snapshot = await getDocs(q);
  const articles = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: Number(doc.id),
      name: data.name || '',
      description: data.description || '',
      category: data.category || { id: 0, name: '', articleCount: 0, createdBy: '', createdAt: '' },
      createdBy: data.createdBy || '',
      createdAt: data.createdAt || new Date().toISOString(),
      modifiedBy: data.modifiedBy,
      modifiedAt: data.modifiedAt
    } as Article;
  });

  return {
    articles,
  };
}; 