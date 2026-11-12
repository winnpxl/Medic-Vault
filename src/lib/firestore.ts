import type { Firestore } from 'firebase/firestore';
import { app } from './firebase';

type FirestoreModule = typeof import('firebase/firestore');

let loading: Promise<{ fs: FirestoreModule; db: Firestore }> | undefined;

/**
 * Firestore (~100 KB gzipped) is only needed once someone is signed in (to read their
 * profile), so it's loaded on demand instead of with the landing page. Call early as a
 * preload when a saved session exists; repeated calls share one instance.
 */
export function loadFirestore() {
  loading ??= import('firebase/firestore').then((fs) => {
    let db: Firestore;
    try {
      // Offline cache in IndexedDB, shared across tabs (replaces the deprecated
      // enableIndexedDbPersistence, which failed with several tabs open).
      db = fs.initializeFirestore(app, {
        localCache: fs.persistentLocalCache({ tabManager: fs.persistentMultipleTabManager() }),
      });
    } catch (error) {
      console.warn('Firestore persistent cache unavailable, using memory cache', error);
      db = fs.getFirestore(app);
    }
    return { fs, db };
  });
  return loading;
}
