import { Firestore, DocumentData, CollectionReference, DocumentReference, Query } from 'firebase/firestore';

// Mock data with real categories and tags from API
const mockData: { [key: string]: any[] } = {
  articles: [],
  categories: [
    {
      id: 1,
      name: "Уход за домом",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    },
    {
      id: 2,
      name: "Бытовая техника",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    },
    {
      id: 3,
      name: "Огород и растения",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    },
    {
      id: 4,
      name: "Ремонт и инструменты",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    },
    {
      id: 5,
      name: "Отдых и уют",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    },
    {
      id: 6,
      name: "Развлечение",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    }
  ],
  tags: [
    {
      id: 1,
      name: "Советы",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    },
    {
      id: 2,
      name: "Безопасность",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    },
    {
      id: 3,
      name: "Энергосбережение",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    },
    {
      id: 4,
      name: "Секреты",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    },
    {
      id: 5,
      name: "Проверено",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    },
    {
      id: 6,
      name: "Экологично",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    },
    {
      id: 7,
      name: "Практично",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    },
    {
      id: 8,
      name: "Ручной труд",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    },
    {
      id: 9,
      name: "Бюджетно",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    },
    {
      id: 10,
      name: "Технологии",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    },
    {
      id: 11,
      name: "Минимализм",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    },
    {
      id: 12,
      name: "Хранение",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    },
    {
      id: 13,
      name: "Декор",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    },
    {
      id: 14,
      name: "DIY",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    },
    {
      id: 15,
      name: "Комфорт",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    },
    {
      id: 16,
      name: "Юмор",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    },
    {
      id: 17,
      name: "Фильмы",
      createdBy: "system",
      createdAt: "2025-03-23T17:40:42.3187211",
      modifiedBy: null,
      modifiedAt: null
    }
  ]
};

// Mock Firestore implementation
export const db = {
  collection: (collectionPath: string) => {
    return {
      type: 'collection',
      id: collectionPath,
      path: collectionPath,
      parent: null,
      firestore: db,
      
      // Basic CRUD operations
      doc: (id?: string) => ({
        id: id || 'mock-id',
        exists: () => false,
        data: () => null,
        get: async () => ({
          exists: false,
          data: () => null
        }),
        set: async () => {},
        update: async () => {},
        delete: async () => {}
      }),

      // Query operations
      where: () => ({
        get: async () => ({
          empty: false,
          docs: mockData[collectionPath]?.map(doc => ({
            id: doc.id,
            data: () => doc
          })) || []
        }),
        limit: () => ({
          get: async () => ({
            empty: false,
            docs: mockData[collectionPath]?.map(doc => ({
              id: doc.id,
              data: () => doc
            })) || []
          })
        })
      }),

      // Add document
      add: async (data: any) => ({
        id: 'mock-id',
        ...data
      }),

      // Get collection data
      get: async () => ({
        empty: false,
        docs: mockData[collectionPath]?.map(doc => ({
          id: doc.id,
          data: () => doc
        })) || []
      })
    };
  }
} as unknown as Firestore;

// Mock auth instance
export const auth = {
  currentUser: null,
  onAuthStateChanged: (callback: (user: any) => void) => {
    callback(null);
    return () => {};
  },
  signInWithEmailAndPassword: async () => {
    throw new Error('Auth is disabled');
  },
  createUserWithEmailAndPassword: async () => {
    throw new Error('Auth is disabled');
  },
  signOut: async () => {
    return Promise.resolve();
  }
};

// Mock storage instance
export const storage = {
  ref: () => ({
    put: async () => ({
      ref: {
        getDownloadURL: async () => 'https://example.com/mock-image.jpg'
      }
    })
  })
};

export default {
  auth,
  db,
  storage
};
