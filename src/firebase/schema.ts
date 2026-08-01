import { DetailedFamilyRole } from '../types';

export interface UserDocument {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'super_admin' | 'parent' | 'child' | 'grandparent' | 'guest';
  familyId: string;
  createdAt: string;
  lastLoginAt: string;
  isOnline: boolean;
  preferences?: {
    theme?: 'dark' | 'light' | 'system';
    language?: 'id' | 'en';
    notificationsEnabled?: boolean;
  };
}

export interface FamilyDocument {
  id: string;
  familyName: string;
  address: string;
  motto: string;
  familyPhoto: string;
  ownerUid: string;
  memberUids: string[];
  createdAt: string;
  updatedAt: string;
  homeCount: number;
  familyScore: number;
  smartHomeSettings?: {
    autoLockSecurity: boolean;
    nightModeSchedule: string;
  };
}

export interface FamilyMemberDocument {
  id: string;
  familyId: string;
  name: string;
  detailedRole: DetailedFamilyRole;
  relationship: string;
  age: number;
  birthDate?: string;
  gender?: 'Laki-laki' | 'Perempuan';
  phone?: string;
  email?: string;
  avatar: string;
  statusText: string;
  status: 'aktif' | 'sekolah' | 'kerja' | 'istirahat' | 'offline';
  isOnline: boolean;
  createdAt: string;
}

export interface FamilyInvitationDocument {
  id: string;
  familyId: string;
  email: string;
  role: DetailedFamilyRole;
  inviteLink: string;
  status: 'pending' | 'accepted' | 'expired';
  createdAt: string;
}

export interface FamilyActivityDocument {
  id: string;
  familyId: string;
  actorName: string;
  actorAvatar: string;
  action: string;
  category: string;
  timestamp: string;
}

export interface FamilyRoleDocument {
  id: string;
  roleName: string;
  canManageMembers: boolean;
  canManageFinance: boolean;
  canControlSmartHome: boolean;
  canAccessAI: boolean;
  canSendSOS: boolean;
}

export interface ActivityLogDocument {
  id: string;
  familyId: string;
  actorUid: string;
  actorName: string;
  action: string;
  category: string;
  timestamp: string;
  details?: Record<string, any>;
}

export interface NotificationDocument {
  id: string;
  familyId: string;
  recipientUid?: string;
  title: string;
  body: string;
  type: 'info' | 'warning' | 'emergency' | 'ai_recommendation';
  read: boolean;
  createdAt: string;
}

export interface AIMemoryDocument {
  id: string;
  familyId: string;
  persona: string;
  topic: string;
  memoryKey: string;
  memoryValue: string;
  updatedAt: string;
}

