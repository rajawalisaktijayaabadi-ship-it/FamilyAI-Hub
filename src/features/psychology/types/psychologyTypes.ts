export type PsychologySubTab = 
  | 'dashboard'
  | 'assessment'
  | 'communication'
  | 'conflict'
  | 'couple'
  | 'parenting'
  | 'teen'
  | 'senior'
  | 'challenge'
  | 'reflection'
  | 'report'
  | 'database';

export type AssessmentCategory = 
  | 'Communication'
  | 'Stress'
  | 'Family Time'
  | 'Work-Life Balance'
  | 'Parenting'
  | 'Relationship'
  | 'Self Care'
  | 'Sleep Habit'
  | 'Emotion Awareness'
  | 'Gratitude';

export type PrivacyLevel = 'private' | 'family_only' | 'parent_only' | 'admin_only';

export interface WellnessScore {
  overallScore: number;
  communicationScore: number;
  qualityTimeScore: number;
  stressIndicator: number; // 0-100 (lower is better, or inverted)
  relationshipHealth: number; // 0-100
  weeklyChange: number;
  monthlyChange: number;
  breakdown: {
    moodCheckinScore: number;
    qualityTimeScore: number;
    familyActivityScore: number;
    calendarActivityScore: number;
    journalActivityScore: number;
    communicationActivityScore: number;
  };
}

export type QuestionType = 'multiple_choice' | 'rating' | 'emoji' | 'slider' | 'checkbox';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  minLabel?: string;
  maxLabel?: string;
  minVal?: number;
  maxVal?: number;
}

export interface Assessment {
  id: string;
  category: AssessmentCategory;
  title: string;
  description: string;
  timeEstimate: string;
  iconName: string;
  questions: Question[];
}

export interface AssessmentResult {
  id: string;
  assessmentId: string;
  category: AssessmentCategory;
  score: number; // 0-100
  level: 'Sangat Baik' | 'Optimal' | 'Perlu Perhatian' | 'Butuh Pendampingan';
  summary: string;
  recommendations: string[];
  date: string;
}

export interface CommunicationSuggestion {
  id: string;
  originalInput: string;
  empathyRewrite: string;
  tone: string;
  explanation: string;
  tips: string[];
  date: string;
}

export interface ConflictCase {
  id: string;
  title: string;
  category: string;
  status: 'open' | 'reflecting' | 'resolved';
  participants: string[];
  reflectionNotes: string;
  perspectives: Record<string, string>; // memberName -> perspective
  solutions: string[];
  agreementNotes: string;
  followUpDate: string;
  createdAt: string;
}

export interface CoupleRelationshipSummary {
  communicationScore: number;
  qualityTimeScore: number;
  sharedActivities: string[];
  goals: string[];
  anniversaryDate: string;
  daysToAnniversary: number;
  relationshipInsight: string;
}

export interface ParentingSummary {
  parentStressLevel: number; // 1-10
  childInteractionScore: number; // 1-100
  learningTimeMinutes: number;
  playTimeMinutes: number;
  familyTimeMinutes: number;
  tips: string[];
}

export interface ReflectionJournal {
  id: string;
  memberName: string;
  date: string;
  bestThing: string;
  gratitude: string;
  improvement: string;
  tomorrowTarget: string;
  privacy: PrivacyLevel;
  createdAt: string;
}

export interface TeenSupport {
  reflectionJournals: ReflectionJournal[];
  goalSetting: string[];
  stressTips: string[];
  studyBalanceScore: number;
  motivationQuote: string;
}

export interface SeniorCare {
  moodSummary: string;
  activityReminders: { id: string; title: string; time: string; done: boolean }[];
  medicineReminders: { id: string; name: string; dosage: string; time: string; taken: boolean }[];
  familyVisitReminder: string;
  memoryActivities: string[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  category: string;
  rewardPoints: number;
  badgeName: string;
  completedDays: number;
  status: 'available' | 'active' | 'completed';
}

export interface Achievement {
  id: string;
  title: string;
  badgeIcon: string;
  description: string;
  category: string;
  unlocked: boolean;
  unlockedDate?: string;
}

export interface WellnessReport {
  period: 'weekly' | 'monthly' | 'quarterly';
  dateRange: string;
  familyWellnessSummary: string;
  communicationSummary: string;
  relationshipSummary: string;
  qualityTimeSummary: string;
  highlights: string[];
}
