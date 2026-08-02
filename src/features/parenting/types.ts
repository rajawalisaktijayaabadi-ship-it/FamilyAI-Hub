export interface Child {
  id: string;
  familyId: string;
  name: string;
  photo: string;
  birthDate: string; // YYYY-MM-DD
  age: number;
  gender: 'Laki-laki' | 'Perempuan';
  school: string;
  grade: string;
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  heightCm?: number;
  weightKg?: number;
  allergies: string[];
  hobbies: string[];
  interests: string[];
  talents: string[];
  goals: string[];
  parentNotes: string;
  createdAt: string;
}

export interface GrowthRecord {
  id: string;
  childId: string;
  date: string;
  heightCm: number;
  weightKg: number;
  headCircumferenceCm?: number;
  bmi: number;
  category: 
    | 'Physical Growth'
    | 'Emotional Development'
    | 'Social Development'
    | 'Language Development'
    | 'Learning Development'
    | 'Motor Skills'
    | 'Creativity'
    | 'Life Skills';
  notes: string;
  recordedBy: string;
}

export type MilestoneStatus = 'Belum Dimulai' | 'Proses' | 'Selesai';

export interface Milestone {
  id: string;
  childId: string;
  title: string;
  description: string;
  category: 
    | 'Physical Growth'
    | 'Emotional Development'
    | 'Social Development'
    | 'Language Development'
    | 'Learning Development'
    | 'Motor Skills'
    | 'Creativity'
    | 'Life Skills';
  targetAgeMonth: number;
  status: MilestoneStatus;
  completedDate?: string;
  notes?: string;
}

export type ActivityCategory = 
  | 'Belajar'
  | 'Membaca'
  | 'Olahraga'
  | 'Bermain'
  | 'Menggambar'
  | 'Musik'
  | 'Tidur'
  | 'Makan'
  | 'Ibadah'
  | 'Kegiatan Rumah';

export interface DailyActivity {
  id: string;
  childId: string;
  date: string;
  category: ActivityCategory;
  title: string;
  durationMinutes: number;
  startTime?: string;
  endTime?: string;
  notes?: string;
  moodRating?: number; // 1-5
}

export interface ScreenTimeRecord {
  id: string;
  childId: string;
  date: string;
  durationMinutes: number;
  activityType: 'Edukasi' | 'Game' | 'Video/Hiburan' | 'Media Sosial' | 'Lainnya';
  device: 'Smartphone' | 'Tablet' | 'Laptop/PC' | 'Smart TV' | 'Konsol Game';
  startTime: string;
  endTime: string;
  aiRecommendation?: string;
}

export interface Habit {
  id: string;
  childId: string;
  name: string;
  iconName: string;
  targetFrequency: 'Daily' | 'Weekly';
  currentStreak: number;
  bestStreak: number;
  completedDates: string[]; // YYYY-MM-DD
  pointReward: number;
  category: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  category: string;
  isUnlocked: boolean;
}

export interface ChildRewardSystem {
  childId: string;
  totalPoints: number;
  coins: number;
  level: number;
  levelTitle: string;
  badges: Badge[];
}

export interface ChildTask {
  id: string;
  childId: string;
  title: string;
  category: 'Belajar' | 'PR' | 'Membersihkan Kamar' | 'Membantu Orang Tua' | 'Ibadah' | 'Olahraga' | 'Lainnya';
  dueDate: string;
  dueTime?: string;
  completed: boolean;
  completedAt?: string;
  priority: 'Rendah' | 'Sedang' | 'Tinggi';
  pointReward: number;
  reminderEnabled: boolean;
}

export interface GoalSetting {
  id: string;
  childId: string;
  title: string;
  category: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  status: 'In Progress' | 'Achieved';
}

export type ParentNotePrivacy = 'Parent' | 'Child' | 'Admin' | 'Family' | 'Private Notes';

export interface ParentNote {
  id: string;
  childId: string;
  title: string;
  content: string;
  tags: string[];
  privacy: ParentNotePrivacy;
  isEncrypted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ParentingTip {
  id: string;
  title: string;
  summary: string;
  category: 'Komunikasi' | 'Disiplin Positif' | 'Belajar' | 'Motivasi' | 'Screen Time' | 'Tidur' | 'Nutrisi' | 'Aktivitas Keluarga';
  ageRange: string;
  content: string;
  doList: string[];
  dontList: string[];
}

export interface ParentingInsight {
  id: string;
  childId: string;
  date: string;
  title: string;
  summary: string;
  actionItems: string[];
  encouragementQuote: string;
  category: string;
}

export interface ChildEducationSummary {
  childId: string;
  childName: string;
  age: number;
  grade: string;
  totalLearningMinutesThisWeek: number;
  booksReadCount: number;
  activeAcademicGoals: GoalSetting[];
  recentActivities: DailyActivity[];
  habitCompletionRate: number;
}
