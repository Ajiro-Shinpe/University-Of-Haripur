// Database service for handling IndexedDB operations
const DB_NAME = 'examPortalDB';
const DB_VERSION = 1;

// Store names
const STORES = {
  STUDENTS: 'students',
  CURRENT_USER: 'currentUser',
  EXAM_RESULTS: 'examResults',
  SYNC_QUEUE: 'syncQueue'
};

class DatabaseService {
  constructor() {
    this.db = null;
    this.initPromise = this.init();
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('Error opening database');
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('Database opened successfully');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create object stores
        if (!db.objectStoreNames.contains(STORES.STUDENTS)) {
          db.createObjectStore(STORES.STUDENTS, { keyPath: 'rollNumber' });
        }
        if (!db.objectStoreNames.contains(STORES.CURRENT_USER)) {
          db.createObjectStore(STORES.CURRENT_USER, { keyPath: 'rollNumber' });
        }
        if (!db.objectStoreNames.contains(STORES.EXAM_RESULTS)) {
          const examStore = db.createObjectStore(STORES.EXAM_RESULTS, { keyPath: 'id', autoIncrement: true });
          examStore.createIndex('userRollNumber', 'user.rollNumber', { unique: false });
          examStore.createIndex('examId', 'examId', { unique: false });
        }
        if (!db.objectStoreNames.contains(STORES.SYNC_QUEUE)) {
          const syncStore = db.createObjectStore(STORES.SYNC_QUEUE, { keyPath: 'id', autoIncrement: true });
          syncStore.createIndex('type', 'type', { unique: false });
        }
      };
    });
  }

  // Generic method to add/update data
  async set(storeName, data) {
    await this.initPromise;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      const request = store.put(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Generic method to get data
  async get(storeName, key) {
    await this.initPromise;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);

      const request = store.get(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Generic method to get all data from a store
  async getAll(storeName) {
    await this.initPromise;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);

      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Method to get exam results for a specific user
  async getUserExamResults(userRollNumber) {
    await this.initPromise;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(STORES.EXAM_RESULTS, 'readonly');
      const store = transaction.objectStore(STORES.EXAM_RESULTS);
      const index = store.index('userRollNumber');

      const request = index.getAll(userRollNumber);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Method to add an item to sync queue
  async addToSyncQueue(item) {
    await this.initPromise;
    return this.set(STORES.SYNC_QUEUE, {
      ...item,
      timestamp: new Date().toISOString(),
      status: 'pending'
    });
  }

  // Method to get pending sync items
  async getPendingSyncItems() {
    await this.initPromise;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(STORES.SYNC_QUEUE, 'readonly');
      const store = transaction.objectStore(STORES.SYNC_QUEUE);
      const index = store.index('type');

      const request = index.getAll('pending');

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Method to update sync item status
  async updateSyncItemStatus(id, status) {
    await this.initPromise;
    const item = await this.get(STORES.SYNC_QUEUE, id);
    if (item) {
      item.status = status;
      return this.set(STORES.SYNC_QUEUE, item);
    }
  }

  // Method to migrate data from localStorage to IndexedDB
  async migrateFromLocalStorage() {
    try {
      // Migrate students
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      for (const student of students) {
        await this.set(STORES.STUDENTS, student);
      }

      // Migrate current user
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        await this.set(STORES.CURRENT_USER, currentUser);
      }

      // Migrate exam results
      const examResults = JSON.parse(localStorage.getItem('examResults') || '[]');
      for (const result of examResults) {
        await this.set(STORES.EXAM_RESULTS, result);
      }

      console.log('Migration completed successfully');
    } catch (error) {
      console.error('Error during migration:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const dbService = new DatabaseService();
export default dbService; 