import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const databaseId = firebaseConfig.firestoreDatabaseId || '(default)';

let dbInstance;
try {
  dbInstance = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  }, databaseId);
} catch (e) {
  dbInstance = getFirestore(app, databaseId);
}

export const db = dbInstance;
export const auth = getAuth(app);

