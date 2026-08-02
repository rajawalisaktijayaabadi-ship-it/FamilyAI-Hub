export type AdminRole = 
  | 'Super Admin' 
  | 'Family Owner' 
  | 'Parent' 
  | 'Child' 
  | 'Teen' 
  | 'Senior' 
  | 'Guest' 
  | 'Moderator' 
  | 'Support' 
  | 'Developer' 
  | 'Custom Role';

export interface Workspace {
  id: string;
  name: string;
  type: 'Family Workspace' | 'Organization Workspace';
  ownerEmail: string;
  memberCount: number;
  planType: 'Free' | 'Starter' | 'Family' | 'Family Plus' | 'Enterprise';
  createdAt: string;
  status: 'Active' | 'Suspended' | 'Pending Setup';
  settings: {
    timezone: string;
    language: string;
    currency: string;
    encryptionEnabled: boolean;
    aiAutoSummaries: boolean;
  };
}

export interface WorkspaceRole {
  id: string;
  roleName: AdminRole;
  description: string;
  isSystemDefault: boolean;
  assignedUsersCount: number;
}

export interface WorkspacePermission {
  id: string;
  module: string;
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canAIExport: boolean;
  canShare: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorEmail: string;
  actorRole: string;
  actionType: 'Login' | 'Logout' | 'CRUD' | 'Permission Change' | 'AI Request' | 'Export' | 'Delete' | 'Security Event';
  description: string;
  ipAddress: string;
  targetModule: string;
  status: 'Success' | 'Warning' | 'Failed';
}

export interface AnalyticsData {
  dau: number;
  wau: number;
  mau: number;
  retentionRate: number;
  aiTokensUsedToday: number;
  storageUsedGb: number;
  errorRatePercentage: number;
  featureUsageBreakdown: { feature: string; usagePercentage: number }[];
}

export interface MonitoringStatus {
  systemHealthScore: number;
  apiStatus: 'Healthy' | 'Degraded' | 'Down';
  firestoreLatencyMs: number;
  storageUsageBytes: number;
  cloudFunctionsStatus: 'Operational' | 'Issues Detected';
  notificationQueueCount: number;
  webVitals: {
    lcp: number; // Largest Contentful Paint in seconds
    fid: number; // First Input Delay in ms
    cls: number; // Cumulative Layout Shift
    ttfb: number; // Time to First Byte in ms
  };
}

export interface BillingSubscription {
  id: string;
  workspaceId: string;
  planName: 'Free' | 'Starter' | 'Family' | 'Family Plus' | 'Enterprise';
  billingCycle: 'Monthly' | 'Annually';
  priceAmount: number;
  currency: string;
  nextBillingDate: string;
  status: 'Active' | 'Past Due' | 'Canceled';
  paymentMethod: string;
}

export interface SystemSetting {
  id: string;
  category: 'General' | 'Localization' | 'Security' | 'AI Integration' | 'Notifications';
  key: string;
  value: string | boolean | number;
  description: string;
}

export interface APIUsageMetric {
  id: string;
  provider: 'Google Gemini API' | 'Firebase Firestore' | 'Google Maps' | 'Google Calendar' | 'Stripe' | 'Fitbit';
  endpoint: string;
  requestCountToday: number;
  errorCountToday: number;
  avgLatencyMs: number;
  quotaLimit: number;
}
