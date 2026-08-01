import { create } from 'zustand';
import { 
  SupportedMoodType, 
  DailyCheckIn, 
  MoodJournal, 
  MoodInsight, 
  MoodRecommendation, 
  FamilyMemberMood, 
  WellbeingScore, 
  MoodReminder,
  PrivacyLevel 
} from '../types/moodTypes';
import { 
  INITIAL_WELLBEING_SCORE, 
  INITIAL_FAMILY_MOODS, 
  INITIAL_INSIGHTS, 
  INITIAL_RECOMMENDATIONS, 
  INITIAL_JOURNALS, 
  INITIAL_CHECKINS, 
  INITIAL_REMINDERS,
  MOOD_META_MAP 
} from '../utils/moodData';

export type MoodSubTab = 
  | 'overview' 
  | 'checkin' 
  | 'journal' 
  | 'calendar' 
  | 'timeline' 
  | 'parent_view' 
  | 'reminders'
  | 'biometrics';

interface MoodState {
  activeSubTab: MoodSubTab;
  setActiveSubTab: (tab: MoodSubTab) => void;
  
  wellbeingScore: WellbeingScore;
  familyMoods: FamilyMemberMood[];
  insights: MoodInsight[];
  recommendations: MoodRecommendation[];
  journals: MoodJournal[];
  checkIns: DailyCheckIn[];
  reminders: MoodReminder[];
  
  // Filters & Selected State
  selectedMemberId: string; // 'all' or member ID
  setSelectedMemberId: (id: string) => void;
  selectedDate: string; // YYYY-MM-DD
  setSelectedDate: (date: string) => void;
  journalSearchQuery: string;
  setJournalSearchQuery: (q: string) => void;
  journalTagFilter: string;
  setJournalTagFilter: (tag: string) => void;
  
  // Modals & UI States
  isCheckInModalOpen: boolean;
  setCheckInModalOpen: (open: boolean) => void;
  isJournalModalOpen: boolean;
  setJournalModalOpen: (open: boolean) => void;
  
  // Actions
  addCheckIn: (checkIn: Omit<DailyCheckIn, 'id' | 'timestamp'>) => Promise<DailyCheckIn>;
  addJournal: (journal: Omit<MoodJournal, 'id' | 'timestamp'>) => Promise<MoodJournal>;
  updateJournal: (id: string, journal: Partial<MoodJournal>) => void;
  deleteJournal: (id: string) => void;
  toggleReminder: (id: string) => void;
  updateMemberPrivacy: (memberId: string, privacy: PrivacyLevel) => void;
  
  // Helpers
  generateAIAdviceForMood: (mood: SupportedMoodType, note: string) => Promise<string>;
  getFilteredJournals: () => MoodJournal[];
  getFilteredCheckIns: () => DailyCheckIn[];
}

export const useMoodStore = create<MoodState>((set, get) => ({
  activeSubTab: 'overview',
  setActiveSubTab: (tab) => set({ activeSubTab: tab }),
  
  wellbeingScore: INITIAL_WELLBEING_SCORE,
  familyMoods: INITIAL_FAMILY_MOODS,
  insights: INITIAL_INSIGHTS,
  recommendations: INITIAL_RECOMMENDATIONS,
  journals: INITIAL_JOURNALS,
  checkIns: INITIAL_CHECKINS,
  reminders: INITIAL_REMINDERS,
  
  selectedMemberId: 'all',
  setSelectedMemberId: (id) => set({ selectedMemberId: id }),
  selectedDate: new Date().toISOString().split('T')[0],
  setSelectedDate: (date) => set({ selectedDate: date }),
  journalSearchQuery: '',
  setJournalSearchQuery: (q) => set({ journalSearchQuery: q }),
  journalTagFilter: 'all',
  setJournalTagFilter: (tag) => set({ journalTagFilter: tag }),
  
  isCheckInModalOpen: false,
  setCheckInModalOpen: (open) => set({ isCheckInModalOpen: open }),
  isJournalModalOpen: false,
  setJournalModalOpen: (open) => set({ isJournalModalOpen: open }),
  
  generateAIAdviceForMood: async (mood, note) => {
    const moodMeta = MOOD_META_MAP[mood] || MOOD_META_MAP.happy;
    try {
      const response = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Berikan 1-2 kalimat saran pendampingan emosional empati & mindful untuk kondisi mood "${moodMeta.label}" dengan catatan: "${note}". Jangan berikan diagnosis medis.`,
          persona: 'psikolog'
        })
      });
      const data = await response.json();
      if (data.reply) return data.reply;
    } catch (e) {
      console.error('Error generating AI mood reflection:', e);
    }
    
    // Fallback empathetic advice
    if (moodMeta.category === 'negative') {
      return `Tarif napas dalam-dalam. Perasaan ini valid dan wajar. Berikan jeda 10 menit untuk diri sendiri dan hubungi anggota keluarga terdekat jika butuh teman cerita.`;
    } else if (moodMeta.category === 'energy') {
      return `Kondisi fisik dan pikiran saling mempengaruhi. Dengarkan sinyal tubuhmu dan berikan waktu istirahat yang berkualitas.`;
    }
    return `Pertahankan energi positif ini! Bagikan senyuman hangatmu kepada anggota keluarga hari ini.`;
  },
  
  addCheckIn: async (checkInData) => {
    const aiReflection = await get().generateAIAdviceForMood(checkInData.mood, checkInData.note);
    const newCheckIn: DailyCheckIn = {
      ...checkInData,
      id: `chk_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      aiReflectionNote: aiReflection
    };
    
    const moodMeta = MOOD_META_MAP[checkInData.mood] || MOOD_META_MAP.happy;
    
    set((state) => {
      // Update checkIns list
      const updatedCheckIns = [newCheckIn, ...state.checkIns];
      
      // Update Family Member Mood status
      const updatedFamilyMoods = state.familyMoods.map((m) => {
        if (m.memberId === checkInData.memberId || (m.memberName === checkInData.memberName)) {
          return {
            ...m,
            currentMood: checkInData.mood,
            moodLabel: moodMeta.label,
            emoji: moodMeta.emoji,
            energyLevel: checkInData.energyLevel,
            stressLevel: checkInData.stressLevel,
            statusBadge: checkInData.stressLevel > 6 ? ('Need Support' as const) : (checkInData.energyLevel > 7 ? ('Energetic' as const) : ('Happy' as const)),
            lastCheckIn: 'Baru saja',
            todayNote: checkInData.note
          };
        }
        return m;
      });
      
      return {
        checkIns: updatedCheckIns,
        familyMoods: updatedFamilyMoods,
        wellbeingScore: {
          ...state.wellbeingScore,
          lastUpdated: 'Baru saja'
        }
      };
    });
    
    return newCheckIn;
  },
  
  addJournal: async (journalData) => {
    const aiGuidance = await get().generateAIAdviceForMood(journalData.mood, journalData.content);
    const newJournal: MoodJournal = {
      ...journalData,
      id: `j_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      aiGuidance
    };
    
    set((state) => ({
      journals: [newJournal, ...state.journals]
    }));
    
    return newJournal;
  },
  
  updateJournal: (id, partial) => {
    set((state) => ({
      journals: state.journals.map((j) => (j.id === id ? { ...j, ...partial } : j))
    }));
  },
  
  deleteJournal: (id) => {
    set((state) => ({
      journals: state.journals.filter((j) => j.id !== id)
    }));
  },
  
  toggleReminder: (id) => {
    set((state) => ({
      reminders: state.reminders.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    }));
  },
  
  updateMemberPrivacy: (memberId, privacy) => {
    set((state) => ({
      familyMoods: state.familyMoods.map((m) => (m.memberId === memberId ? { ...m, privacySetting: privacy } : m))
    }));
  },
  
  getFilteredJournals: () => {
    const { journals, selectedMemberId, journalSearchQuery, journalTagFilter } = get();
    return journals.filter((j) => {
      const matchesMember = selectedMemberId === 'all' || j.memberId === selectedMemberId;
      const matchesSearch = !journalSearchQuery.trim() || 
        j.title.toLowerCase().includes(journalSearchQuery.toLowerCase()) || 
        j.content.toLowerCase().includes(journalSearchQuery.toLowerCase());
      const matchesTag = journalTagFilter === 'all' || j.tags.includes(journalTagFilter);
      return matchesMember && matchesSearch && matchesTag;
    });
  },
  
  getFilteredCheckIns: () => {
    const { checkIns, selectedMemberId } = get();
    if (selectedMemberId === 'all') return checkIns;
    return checkIns.filter((c) => c.memberId === selectedMemberId);
  }
}));
