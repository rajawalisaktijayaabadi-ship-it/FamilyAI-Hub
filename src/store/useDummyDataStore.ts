import { create } from 'zustand';

interface DummyDataStore {
  hideDummyData: boolean;
  setHideDummyData: (hide: boolean) => void;
  toggleHideDummyData: () => void;
}

const STORAGE_KEY = 'familyai_hide_dummy_data';

export const useDummyDataStore = create<DummyDataStore>((set) => ({
  hideDummyData: localStorage.getItem(STORAGE_KEY) === 'true',
  setHideDummyData: (hide: boolean) => {
    localStorage.setItem(STORAGE_KEY, String(hide));
    set({ hideDummyData: hide });
  },
  toggleHideDummyData: () => {
    set((state) => {
      const next = !state.hideDummyData;
      localStorage.setItem(STORAGE_KEY, String(next));
      return { hideDummyData: next };
    });
  },
}));

// Helper function to check if an item ID is from initial mock/dummy data
export function isDummyId(id: string | number): boolean {
  if (id === undefined || id === null) return false;
  const strId = String(id);
  
  // Custom user items usually contain Date.now() timestamp (13 digits like 172... or 'm_172...')
  if (strId.includes('_17') || strId.includes('-17') || (strId.length >= 13 && /^\d+$/.test(strId))) {
    return false;
  }

  // Known initial mock ID patterns
  const mockPrefixes = [
    'm1', 'm2', 'm3', 'm4', 'm5', 'lh_', 'p1', 'p2', 'p3', 'p4',
    'album-', 'photo-', 'video-', 'story-', 'tl-', 'map-', 'notif-',
    'child-', 'subj-', 'hw-', 'plan-', 'exam-', 'log-', 'quiz-', 'cert-', 'note-', 'tip-', 'ins-',
    'act-', 'st-', 'hb-', 'ts-', 'gl-', 'pn-', 'rec-', 'asset-', 'nutr-', 'item-', 'dev-', 'ev-'
  ];

  return mockPrefixes.some(prefix => strId.startsWith(prefix)) || !strId.includes('_');
}
