export type SupportedMoodType = 
  | 'very_happy' // 😀 Sangat Bahagia
  | 'happy'      // 😊 Bahagia
  | 'calm'       // 🙂 Tenang
  | 'neutral'    // 😐 Netral
  | 'sad'        // 😔 Sedih
  | 'very_sad'   // 😢 Sangat Sedih
  | 'anxious'    // 😰 Cemas
  | 'worried'    // 😟 Khawatir
  | 'angry'      // 😡 Marah
  | 'tired'      // 😴 Lelah
  | 'unwell'     // 🤒 Kurang Fit
  | 'grateful'   // 😍 Bersyukur
  | 'excited'    // 🥳 Semangat
  | 'energetic'  // ⚡ Enerjik / Semangat
  | 'custom';    // Custom

export interface MoodMeta {
  type: SupportedMoodType;
  label: string;
  emoji: string;
  color: string;
  bgGlow: string;
  category: 'positive' | 'neutral' | 'negative' | 'energy';
}

export type PrivacyLevel = 'private' | 'family_only' | 'parent_only' | 'self_only';

export interface DailyCheckIn {
  id: string;
  memberId: string;
  memberName: string;
  memberRole: string;
  memberAvatar: string;
  date: string; // YYYY-MM-DD
  timestamp: string;
  
  mood: SupportedMoodType;
  customMoodText?: string;
  energyLevel: number; // 1 - 10
  stressLevel: number; // 1 - 10
  sleepQuality: number; // 1 - 5 stars
  sleepHours?: number;
  
  activities: string[]; // e.g. ['olahraga', 'kerja', 'sekolah', 'keluarga']
  note: string;
  gratitudeItems: string[]; // "3 Hal yang disyukuri"
  todayGoal: string;
  
  privacy: PrivacyLevel;
  aiReflectionNote?: string;
}

export interface MoodJournal {
  id: string;
  memberId: string;
  memberName: string;
  memberRole: string;
  memberAvatar: string;
  title: string;
  content: string;
  mood: SupportedMoodType;
  tags: string[];
  date: string;
  timestamp: string;
  privacy: PrivacyLevel;
  aiGuidance?: string;
  isFavorite?: boolean;
}

export interface MoodInsight {
  id: string;
  memberId?: string;
  memberName?: string;
  type: 'productivity' | 'fatigue' | 'stress' | 'gratitude' | 'pattern';
  title: string;
  description: string;
  suggestion: string;
  confidence: number; // percentage
  date: string;
  iconType: string;
}

export interface MoodRecommendation {
  id: string;
  category: 'self_care' | 'quality_time' | 'sleep' | 'exercise' | 'meditation' | 'reading' | 'family_time' | 'communication';
  title: string;
  description: string;
  estimatedMinutes: number;
  targetMemberRole?: string;
  actionText: string;
  tag: string;
  icon: string;
}

export interface WellbeingScore {
  happinessScore: number; // 0 - 100
  stabilityIndex: number; // 0 - 100
  familyHarmonyScore: number; // 0 - 100
  stressLevelAvg: number; // 1 - 10
  energyAvg: number; // 1 - 10
  sleepAvg: number; // 1 - 5
  statusLabel: 'Sangat Stabil' | 'Optimal' | 'Membutuhkan Istirahat' | 'Butuh Perhatian';
  lastUpdated: string;
}

export interface FamilyMemberMood {
  memberId: string;
  memberName: string;
  detailedRole: string;
  avatar: string;
  currentMood: SupportedMoodType;
  moodLabel: string;
  emoji: string;
  energyLevel: number;
  stressLevel: number;
  statusBadge: 'Happy' | 'Calm' | 'Need Support' | 'Energetic' | 'Tired';
  lastCheckIn: string;
  todayNote?: string;
  privacySetting: PrivacyLevel;
}

export interface EmotionTag {
  id: string;
  name: string;
  count: number;
  color: string;
}

export interface MoodReminder {
  id: string;
  title: string;
  type: 'fill_mood' | 'take_rest' | 'drink_water' | 'sleep' | 'meditation';
  time: string; // HH:mm
  enabled: boolean;
  days: string[]; // e.g. ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
  description: string;
}

// Firestore Schema Definition Reference
export interface FirestoreMoodSchema {
  collections: {
    mood_logs: DailyCheckIn[];
    mood_journal: MoodJournal[];
    mood_history: {
      id: string;
      date: string;
      dominantMood: SupportedMoodType;
      avgEnergy: number;
      avgStress: number;
    }[];
    mood_summary: WellbeingScore;
    mood_recommendation: MoodRecommendation[];
    emotion_tags: EmotionTag[];
    daily_checkin: DailyCheckIn[];
    wellbeing_score: WellbeingScore;
  };
}
