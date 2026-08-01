// Firebase configuration and connection helper
export interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  firestoreDatabaseId?: string;
}

export const defaultFirebaseConfig: FirebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "familyai-hub.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "familyai-hub",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "familyai-hub.appspot.com",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456",
  firestoreDatabaseId: "(default)"
};

export const FIRESTORE_COLLECTIONS = {
  USERS: 'users',
  FAMILIES: 'families',
  ROLES: 'roles',
  PERMISSIONS: 'permissions',
  SETTINGS: 'settings',
  NOTIFICATIONS: 'notifications',
  ACTIVITY_LOGS: 'activity_logs',
  DEVICES: 'devices',
  AI_MEMORY: 'ai_memory',
  AUDIT_LOGS: 'audit_logs'
} as const;
