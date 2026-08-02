import { create } from 'zustand';
import { AnalyticsData } from '../../../types/enterpriseAdmin';

interface AnalyticsState {
  analytics: AnalyticsData;
  monthlyGrowthTrend: { month: string; users: number; aiTokens: number }[];
}

export const useAnalyticsStore = create<AnalyticsState>(() => ({
  analytics: {
    dau: 1420,
    wau: 4850,
    mau: 18400,
    retentionRate: 89.4,
    aiTokensUsedToday: 485200,
    storageUsedGb: 14.8,
    errorRatePercentage: 0.02,
    featureUsageBreakdown: [
      { feature: 'AI Assistant & Chat', usagePercentage: 28 },
      { feature: 'Smart Calendar & Reminders', usagePercentage: 18 },
      { feature: 'Meal Planner & Shopping', usagePercentage: 16 },
      { feature: 'Health & Protection Center', usagePercentage: 14 },
      { feature: 'Finance & Family Budget', usagePercentage: 12 },
      { feature: 'Smart Home & Memories', usagePercentage: 12 }
    ]
  },

  monthlyGrowthTrend: [
    { month: 'Mar', users: 3200, aiTokens: 120000 },
    { month: 'Apr', users: 5400, aiTokens: 210000 },
    { month: 'Mei', users: 8900, aiTokens: 340000 },
    { month: 'Jun', users: 12800, aiTokens: 410000 },
    { month: 'Jul', users: 18400, aiTokens: 485200 }
  ]
}));
