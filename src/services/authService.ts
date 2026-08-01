import { UserDocument } from '../firebase/schema';

export interface AuthState {
  user: UserDocument | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: 'super_admin' | 'parent' | 'child' | 'grandparent' | 'guest';
}

export class AuthService {
  private static currentUser: UserDocument | null = {
    uid: 'demo-user-1',
    email: 'keluarga.budi@familyai.hub',
    displayName: 'Budi Santoso',
    photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'parent',
    familyId: 'fam-1',
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    isOnline: true,
    preferences: {
      theme: 'dark',
      language: 'id',
      notificationsEnabled: true
    }
  };

  static getCurrentUser(): UserDocument | null {
    return this.currentUser;
  }

  static switchUserRole(role: 'super_admin' | 'parent' | 'child' | 'grandparent' | 'guest'): UserDocument {
    if (this.currentUser) {
      this.currentUser = {
        ...this.currentUser,
        role
      };
    }
    return this.currentUser!;
  }
}
