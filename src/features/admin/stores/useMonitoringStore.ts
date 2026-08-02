import { create } from 'zustand';
import { MonitoringStatus } from '../../../types/enterpriseAdmin';

interface MonitoringState {
  status: MonitoringStatus;
  recentErrors: { id: string; timestamp: string; errorMsg: string; service: string; severity: 'Critical' | 'Warning' | 'Info' }[];
  refreshMonitoring: () => void;
}

export const useMonitoringStore = create<MonitoringState>((set) => ({
  status: {
    systemHealthScore: 99.8,
    apiStatus: 'Healthy',
    firestoreLatencyMs: 24,
    storageUsageBytes: 15892040000,
    cloudFunctionsStatus: 'Operational',
    notificationQueueCount: 0,
    webVitals: {
      lcp: 1.2, // seconds
      fid: 8,   // ms
      cls: 0.01,
      ttfb: 140  // ms
    }
  },

  recentErrors: [
    { id: 'err-1', timestamp: '17:05:12', errorMsg: 'Rate limit hit on external weather API backup', service: 'Smart Home / Weather', severity: 'Warning' },
    { id: 'err-2', timestamp: '14:22:00', errorMsg: 'FCM push token refresh for user offline > 30 days', service: 'Notification Engine', severity: 'Info' }
  ],

  refreshMonitoring: () =>
    set((state) => ({
      status: {
        ...state.status,
        firestoreLatencyMs: Math.floor(20 + Math.random() * 10),
        systemHealthScore: Number((99.7 + Math.random() * 0.2).toFixed(2))
      }
    }))
}));
