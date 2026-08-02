export type SubjectCategory =
  | 'Matematika'
  | 'IPA'
  | 'IPS'
  | 'Bahasa Indonesia'
  | 'Bahasa Inggris'
  | 'Agama'
  | 'PPKn'
  | 'Seni'
  | 'Olahraga'
  | 'Komputer'
  | 'Coding'
  | 'Robotik'
  | 'Bahasa Asing'
  | 'Lainnya';

export type PriorityLevel = 'Tinggi' | 'Sedang' | 'Rendah';

export type HomeworkStatus = 'Belum Dikerjakan' | 'Sedang Dikerjakan' | 'Menunggu Review' | 'Selesai';

export type HomeworkCategory = 'Tugas Harian' | 'PR' | 'Proyek' | 'Presentasi' | 'Portofolio';

export type ReadingCategory = 'Buku' | 'Artikel' | 'Komik Edukasi' | 'Novel' | 'Jurnal' | 'Buku Edukasi' | string;

export type SkillCategory =
  | 'Coding'
  | 'Robotik'
  | 'Musik'
  | 'Desain'
  | 'Public Speaking'
  | 'Bahasa'
  | 'Menulis'
  | 'Menggambar'
  | 'Fotografi'
  | 'Video Editing'
  | 'Entrepreneurship'
  | string;

export type SkillLevel = 'Pemula' | 'Menengah' | 'Lanjutan' | 'Mahir';

export interface EducationProfile {
  id: string;
  childId: string;
  schoolName: string;
  grade: string;
  semester: string;
  major?: string;
  nisn?: string;
  homeroomTeacher: string;
  favoriteSubjects: string[];
  extracurriculars: string[];
  academicGoals: string[];
  specialNotes?: string;
}

export interface Subject {
  id: string;
  childId: string;
  name: string;
  category: SubjectCategory;
  teacherName: string;
  teacherContact?: string;
  targetGrade: number;
  currentGrade: number;
  iconName: string;
  scheduleDays: string[];
  attendanceRate: number; // percentage
  notes?: string;
}

export interface Homework {
  id: string;
  childId: string;
  subjectId: string;
  subjectName: string;
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  priority: PriorityLevel;
  status: HomeworkStatus;
  category: HomeworkCategory;
  attachmentName?: string;
  attachmentUrl?: string;
  aiHelpCount: number;
  completedAt?: string;
}

export interface StudyPlan {
  id: string;
  childId: string;
  title: string;
  frequency: 'Harian' | 'Mingguan' | 'Bulanan';
  targetDurationMinutes: number;
  subjectId: string;
  subjectName: string;
  timeOfDay: string;
  priority: PriorityLevel;
  completed: boolean;
  dateStr?: string;
}

export interface Exam {
  id: string;
  childId: string;
  subjectId: string;
  subjectName: string;
  title: string;
  examType: 'UTS' | 'UAS' | 'Kuis' | 'Tryout' | 'Ujian Nasional';
  date: string;
  time: string;
  targetGrade: number;
  actualGrade?: number;
  topicsCovered: string[];
  status: 'Mendatang' | 'Selesai';
}

export interface ReadingLog {
  id: string;
  childId: string;
  bookTitle: string;
  author: string;
  category: ReadingCategory;
  totalPages: number;
  pagesRead: number;
  status: 'Sedang Dibaca' | 'Selesai' | 'Rencana';
  summary?: string;
  rating?: number; // 1-5
  lastReadDate: string;
  coverImage?: string;
}

export interface SkillDevelopment {
  id: string;
  childId: string;
  skillName: SkillCategory;
  level: SkillLevel;
  projectsBuiltCount: number;
  certificatesEarnedCount: number;
  notes: string;
  iconName: string;
  progressPercent: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  subject: string;
  topic: string;
  difficulty: 'Mudah' | 'Sedang' | 'Tantangan';
  questions: QuizQuestion[];
}

export interface QuizResult {
  id: string;
  childId: string;
  quizId: string;
  subject: string;
  topic: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  date: string;
}

export interface Certificate {
  id: string;
  childId: string;
  title: string;
  category: 'Akademik' | 'Olimpiade' | 'Seni' | 'Olahraga' | 'Keterampilan' | 'Karakter';
  issuer: string;
  dateReceived: string;
  imageUrl?: string;
  description: string;
}

export interface TeacherNote {
  id: string;
  childId: string;
  teacherName: string;
  subject: string;
  date: string;
  note: string;
  type: 'Pujian' | 'Perhatian' | 'Pengumuman' | 'Tugas';
}

export interface EducationInsight {
  id: string;
  childId: string;
  date: string;
  title: string;
  summary: string;
  recommendations: string[];
  category: 'Fokus Belajar' | 'Peningkatan Nilai' | 'Pengelolaan Waktu' | 'Literasi' | string;
  scoreImprovement?: string;
}

export interface LearningAnalytics {
  childId: string;
  totalStudyMinutesThisWeek: number;
  homeworkCompletionRate: number;
  averageGrade: number;
  attendanceRate: number;
  booksReadCount: number;
  quizAverageScore: number;
  subjectGradeDistribution: { subject: string; score: number }[];
  weeklyStudyTrend: { day: string; minutes: number }[];
  monthlyGradeTrend: { month: string; score: number }[];
}

export interface ParentEducationSummary {
  childId: string;
  childName: string;
  school: string;
  grade: string;
  overallGPA: number;
  studyHoursWeekly: number;
  pendingHomeworkCount: number;
  upcomingExamsCount: number;
  recentAchievements: string[];
  aiCoachAdvice: string;
}
