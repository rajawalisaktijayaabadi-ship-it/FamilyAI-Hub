import { create } from 'zustand';
import {
  EducationProfile,
  Subject,
  Homework,
  StudyPlan,
  Exam,
  ReadingLog,
  SkillDevelopment,
  Quiz,
  QuizResult,
  Certificate,
  TeacherNote,
  EducationInsight,
  LearningAnalytics,
  ParentEducationSummary
} from '../features/education/types';

interface EducationStoreState {
  selectedChildId: string;
  profiles: Record<string, EducationProfile>;
  subjects: Subject[];
  homeworks: Homework[];
  studyPlans: StudyPlan[];
  exams: Exam[];
  readingLogs: ReadingLog[];
  skills: SkillDevelopment[];
  quizzes: Quiz[];
  quizResults: QuizResult[];
  certificates: Certificate[];
  teacherNotes: TeacherNote[];
  insights: EducationInsight[];

  // Actions
  setSelectedChildId: (childId: string) => void;

  // Profile actions
  updateProfile: (childId: string, data: Partial<EducationProfile>) => void;

  // Subject actions
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  updateSubject: (id: string, data: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;

  // Homework actions
  addHomework: (hw: Omit<Homework, 'id' | 'aiHelpCount'>) => void;
  updateHomeworkStatus: (id: string, status: Homework['status']) => void;
  deleteHomework: (id: string) => void;
  incrementAiHelpCount: (id: string) => void;

  // Study plan actions
  addStudyPlan: (plan: Omit<StudyPlan, 'id' | 'completed'>) => void;
  toggleStudyPlan: (id: string) => void;
  deleteStudyPlan: (id: string) => void;

  // Exam actions
  addExam: (exam: Omit<Exam, 'id' | 'status'>) => void;
  updateExamGrade: (id: string, actualGrade: number) => void;
  deleteExam: (id: string) => void;

  // Reading log actions
  addReadingLog: (log: Omit<ReadingLog, 'id'>) => void;
  updateReadingProgress: (id: string, pagesRead: number) => void;
  deleteReadingLog: (id: string) => void;

  // Skill actions
  addSkill: (skill: Omit<SkillDevelopment, 'id'>) => void;
  updateSkillLevel: (id: string, level: SkillDevelopment['level'], progressPercent: number) => void;

  // Quiz actions
  addQuizResult: (result: Omit<QuizResult, 'id' | 'date'>) => void;

  // Certificate actions
  addCertificate: (cert: Omit<Certificate, 'id'>) => void;

  // Teacher note actions
  addTeacherNote: (note: Omit<TeacherNote, 'id' | 'date'>) => void;

  // Getters & Analytics
  getAnalyticsForChild: (childId: string) => LearningAnalytics;
  getParentSummary: (childId: string) => ParentEducationSummary;
}

// Initial Mock Data for Child 1 (Arsa - SD Kelas 5) & Child 2 (Bening - TK B)
const mockProfiles: Record<string, EducationProfile> = {
  'child-1': {
    id: 'edprof-1',
    childId: 'child-1',
    schoolName: 'SD Nusantara Utama Jakarta',
    grade: 'Kelas 5 SD',
    semester: 'Semester 1 (2026/2027)',
    nisn: '0129384756',
    homeroomTeacher: 'Bpk. Hendra Wijaya, S.Pd.',
    favoriteSubjects: ['Matematika', 'Komputer', 'IPA'],
    extracurriculars: ['Klub Catur Sekolah', 'Pramuka', 'Robotics Club'],
    academicGoals: ['Juara 1 Olimpiade Sains Matematika SD', 'Nilai Rata-Rata Rapor ≥ 92', 'Membaca 12 Buku Sains'],
    specialNotes: 'Sangat tertarik pada konsep logika matematika dan pemrograman Scratch.'
  },
  'child-2': {
    id: 'edprof-2',
    childId: 'child-2',
    schoolName: 'TK Permata Hati',
    grade: 'TK B',
    semester: 'Semester 1 (2026/2027)',
    homeroomTeacher: 'Ibu Ratna Dewi, S.Pd.',
    favoriteSubjects: ['Seni & Mewarnai', 'Bahasa & Dongeng', 'Musik'],
    extracurriculars: ['Seni Balet Cilik', 'Sanggar Gambar'],
    academicGoals: ['Lancar Membaca Dongeng Kalimat Pendek', 'Mengenal Angka Penjumlahan 1-20'],
    specialNotes: 'Belajar paling efektif melalui visual gambar dan nyanyian lagu interaktif.'
  }
};

const mockSubjects: Subject[] = [
  {
    id: 'subj-1',
    childId: 'child-1',
    name: 'Matematika & Logika',
    category: 'Matematika',
    teacherName: 'Bpk. Hendra Wijaya, S.Pd.',
    teacherContact: '+62 812-3456-7890',
    targetGrade: 95,
    currentGrade: 92,
    iconName: 'Calculator',
    scheduleDays: ['Senin', 'Rabu', 'Jumat'],
    attendanceRate: 98,
    notes: 'Pemahaman materi pecahan & geometri bangun ruang sangat kuat.'
  },
  {
    id: 'subj-2',
    childId: 'child-1',
    name: 'Ilmu Pengetahuan Alam (IPA)',
    category: 'IPA',
    teacherName: 'Ibu Diana Putri, M.Si.',
    teacherContact: '+62 813-9876-5432',
    targetGrade: 90,
    currentGrade: 89,
    iconName: 'FlaskConical',
    scheduleDays: ['Selasa', 'Kamis'],
    attendanceRate: 100,
    notes: 'Sangat aktif bertanya saat praktikum ekosistem & tata surya.'
  },
  {
    id: 'subj-3',
    childId: 'child-1',
    name: 'Bahasa Inggris (English)',
    category: 'Bahasa Inggris',
    teacherName: 'Ms. Sarah Jenkins',
    teacherContact: '+62 811-2233-4455',
    targetGrade: 90,
    currentGrade: 88,
    iconName: 'Globe',
    scheduleDays: ['Senin', 'Kamis'],
    attendanceRate: 96,
    notes: 'Grammar & Vocabulary bagus. Perlu latihan kelancaran percakapan oral.'
  },
  {
    id: 'subj-4',
    childId: 'child-1',
    name: 'Komputer & Coding Scratch',
    category: 'Coding',
    teacherName: 'Bpk. Rian Pratama, S.Kom.',
    teacherContact: '+62 815-6677-8899',
    targetGrade: 98,
    currentGrade: 96,
    iconName: 'Code',
    scheduleDays: ['Rabu'],
    attendanceRate: 100,
    notes: 'Telah berhasil menyelesaikan 3 proyek game mini Scratch.'
  },
  {
    id: 'subj-5',
    childId: 'child-1',
    name: 'Bahasa Indonesia',
    category: 'Bahasa Indonesia',
    teacherName: 'Ibu Ningsih, S.Pd.',
    targetGrade: 90,
    currentGrade: 87,
    iconName: 'BookOpenText',
    scheduleDays: ['Selasa', 'Jumat'],
    attendanceRate: 95,
    notes: 'Menulis puisi & karangan narasi sudah baik.'
  }
];

const mockHomeworks: Homework[] = [
  {
    id: 'hw-1',
    childId: 'child-1',
    subjectId: 'subj-1',
    subjectName: 'Matematika & Logika',
    title: 'Latihan Soal Pecahan Campuran & Desimal (Hal. 45-48)',
    description: 'Selesaikan 10 soal cerita penjumlahan dan pengurangan pecahan campuran.',
    dueDate: '2026-08-02',
    dueTime: '18:00',
    priority: 'Tinggi',
    status: 'Sedang Dikerjakan',
    category: 'PR',
    aiHelpCount: 2
  },
  {
    id: 'hw-2',
    childId: 'child-1',
    subjectId: 'subj-2',
    subjectName: 'Ilmu Pengetahuan Alam (IPA)',
    title: 'Laporan Praktikum Sederhana Daur Air & Rantai Makanan',
    description: 'Tuliskan bagan skema daur air disertai penjelasan 3 tahap utama (Evaporasi, Kondensasi, Presipitasi).',
    dueDate: '2026-08-04',
    dueTime: '19:00',
    priority: 'Sedang',
    status: 'Belum Dikerjakan',
    category: 'Proyek',
    aiHelpCount: 0
  },
  {
    id: 'hw-3',
    childId: 'child-1',
    subjectId: 'subj-3',
    subjectName: 'Bahasa Inggris (English)',
    title: 'Reading Comprehension "Solar System Exploration"',
    description: 'Jawab 5 pertanyaan esai berdasarkan teks bacaan tentang planet-planet.',
    dueDate: '2026-07-30',
    dueTime: '17:00',
    priority: 'Rendah',
    status: 'Selesai',
    category: 'Tugas Harian',
    aiHelpCount: 1,
    completedAt: '2026-07-30T16:20:00'
  }
];

const mockStudyPlans: StudyPlan[] = [
  {
    id: 'sp-1',
    childId: 'child-1',
    title: 'Review Rumus Pecahan & Operasi Hitung Campuran',
    frequency: 'Harian',
    targetDurationMinutes: 45,
    subjectId: 'subj-1',
    subjectName: 'Matematika',
    timeOfDay: '16:00 - 16:45',
    priority: 'Tinggi',
    completed: true
  },
  {
    id: 'sp-2',
    childId: 'child-1',
    title: 'Membaca Bab Ekosistem & Latihan Kuis IPA',
    frequency: 'Harian',
    targetDurationMinutes: 30,
    subjectId: 'subj-2',
    subjectName: 'IPA',
    timeOfDay: '19:00 - 19:30',
    priority: 'Sedang',
    completed: false
  },
  {
    id: 'sp-3',
    childId: 'child-1',
    title: 'Latihan Koding Scratch: Variabel & Loop',
    frequency: 'Mingguan',
    targetDurationMinutes: 60,
    subjectId: 'subj-4',
    subjectName: 'Komputer & Coding',
    timeOfDay: 'Sabtu 10:00',
    priority: 'Sedang',
    completed: false
  }
];

const mockExams: Exam[] = [
  {
    id: 'ex-1',
    childId: 'child-1',
    subjectId: 'subj-1',
    subjectName: 'Matematika & Logika',
    title: 'Ulangan Harian Bab 2: Pecahan & Persen',
    examType: 'UTS',
    date: '2026-08-10',
    time: '08:00 - 09:30',
    targetGrade: 95,
    topicsCovered: ['Pecahan Senilai', 'Pecahan Campuran', 'Mengubah ke Desimal & Persen'],
    status: 'Mendatang'
  },
  {
    id: 'ex-2',
    childId: 'child-1',
    subjectId: 'subj-2',
    subjectName: 'Ilmu Pengetahuan Alam (IPA)',
    title: 'Kuis IPA Bab Daur Hidup Hewan & Daur Air',
    examType: 'Kuis',
    date: '2026-08-12',
    time: '10:00 - 10:45',
    targetGrade: 92,
    topicsCovered: ['Metamorfosis Sempurna & Tidak Sempurna', 'Evaporasi & Kondensasi'],
    status: 'Mendatang'
  },
  {
    id: 'ex-3',
    childId: 'child-1',
    subjectId: 'subj-3',
    subjectName: 'Bahasa Inggris',
    title: 'Mid-Semester English Assessment',
    examType: 'UTS',
    date: '2026-07-20',
    time: '09:00 - 10:30',
    targetGrade: 90,
    actualGrade: 91,
    topicsCovered: ['Past Tense Narrative', 'Vocabulary Solar System'],
    status: 'Selesai'
  }
];

const mockReadingLogs: ReadingLog[] = [
  {
    id: 'rl-1',
    childId: 'child-1',
    bookTitle: 'Ensiklopedia Anak: Keajaiban Tata Surya & Alam Semesta',
    author: 'National Geographic Kids',
    category: 'Buku',
    totalPages: 120,
    pagesRead: 85,
    status: 'Sedang Dibaca',
    summary: 'Buku penuh ilustrasi indah tentang planet, bintang, dan lubang hitam di luar angkasa.',
    rating: 5,
    lastReadDate: '2026-07-31'
  },
  {
    id: 'rl-2',
    childId: 'child-1',
    bookTitle: 'Petualangan Detektif Cilik & Rahasia Kode Matematika',
    author: 'Karakter Edukasi',
    category: 'Novel',
    totalPages: 90,
    pagesRead: 90,
    status: 'Selesai',
    summary: 'Menceritakan sekelompok anak sekolah yang memecahkan misteri dengan teka-teki logika.',
    rating: 5,
    lastReadDate: '2026-07-25'
  },
  {
    id: 'rl-3',
    childId: 'child-2',
    bookTitle: 'Seri Dongeng Menyayangi Hewan: Si Kelinci Cerdik',
    author: 'Bunda Kirana',
    category: 'Komik Edukasi',
    totalPages: 24,
    pagesRead: 20,
    status: 'Sedang Dibaca',
    summary: 'Dongeng bergambar dengan tulisan cetak besar cocok untuk anak belajar mengeja.',
    rating: 5,
    lastReadDate: '2026-07-30'
  }
];

const mockSkills: SkillDevelopment[] = [
  {
    id: 'sk-1',
    childId: 'child-1',
    skillName: 'Coding',
    level: 'Menengah',
    projectsBuiltCount: 4,
    certificatesEarnedCount: 2,
    notes: 'Telah menguasai blok perulangan, variabel skor, dan sensor sentuh di Scratch.',
    iconName: 'Code',
    progressPercent: 75
  },
  {
    id: 'sk-2',
    childId: 'child-1',
    skillName: 'Robotik',
    level: 'Pemula',
    projectsBuiltCount: 2,
    certificatesEarnedCount: 1,
    notes: 'Mampu merakit mobil robotic kit sederhana dengan sensor garis.',
    iconName: 'Bot',
    progressPercent: 40
  },
  {
    id: 'sk-3',
    childId: 'child-1',
    skillName: 'Public Speaking',
    level: 'Pemula',
    projectsBuiltCount: 1,
    certificatesEarnedCount: 0,
    notes: 'Latihan presentasi tugas sekolah di depan kelas dengan percaya diri.',
    iconName: 'Mic',
    progressPercent: 35
  }
];

const mockQuizzes: Quiz[] = [
  {
    id: 'qz-1',
    subject: 'Matematika',
    topic: 'Pecahan & Desimal',
    difficulty: 'Sedang',
    questions: [
      {
        id: 1,
        question: 'Berapakah hasil dari 1/2 + 2/4?',
        options: ['1', '3/4', '1/2', '2'],
        correctIndex: 0,
        explanation: '2/4 dapat disederhanakan menjadi 1/2. Jadi 1/2 + 1/2 = 1.'
      },
      {
        id: 2,
        question: 'Bentuk desimal dari 3/4 adalah...',
        options: ['0.25', '0.50', '0.75', '0.80'],
        correctIndex: 2,
        explanation: '3 dibagi 4 = 0.75'
      }
    ]
  }
];

const mockQuizResults: QuizResult[] = [
  {
    id: 'qr-1',
    childId: 'child-1',
    quizId: 'qz-1',
    subject: 'Matematika',
    topic: 'Pecahan & Desimal',
    score: 100,
    totalQuestions: 2,
    correctCount: 2,
    date: '2026-07-28'
  }
];

const mockCertificates: Certificate[] = [
  {
    id: 'cert-1',
    childId: 'child-1',
    title: 'Juara 2 Lomba Matematika Cilik Tingkat Kota',
    category: 'Olimpiade',
    issuer: 'Dinas Pendidikan Kota Jakarta',
    dateReceived: '2026-05-14',
    description: 'Penghargaan prestasi atas penyelesaian 30 soal olimpiade logika matematika.'
  },
  {
    id: 'cert-2',
    childId: 'child-1',
    title: 'Sertifikat Kelulusan Scratch Coding Junior Level 1',
    category: 'Keterampilan',
    issuer: 'Indonesian Kids Code Academy',
    dateReceived: '2026-06-20',
    description: 'Berhasil membuat game interaktif labirin dan animasi edukasi sains.'
  }
];

const mockTeacherNotes: TeacherNote[] = [
  {
    id: 'tn-1',
    childId: 'child-1',
    teacherName: 'Bpk. Hendra Wijaya, S.Pd.',
    subject: 'Wali Kelas / Matematika',
    date: '2026-07-26',
    note: 'Arsa sangat santun dan aktif membantu temannya yang kesulitan dalam pelajaran matematika. Pertahankan ketelitiannya!',
    type: 'Pujian'
  },
  {
    id: 'tn-2',
    childId: 'child-1',
    teacherName: 'Ms. Sarah Jenkins',
    subject: 'Bahasa Inggris',
    date: '2026-07-20',
    note: 'Mohon ingatkan Arsa untuk membawa buku modul cerita English Reader pada hari Kamis.',
    type: 'Perhatian'
  }
];

const mockInsights: EducationInsight[] = [
  {
    id: 'eins-1',
    childId: 'child-1',
    date: '2026-07-31',
    title: 'Fokus Belajar Arsa Berada pada Performa Puncak di Pagi & Sore Hari!',
    summary: 'Berdasarkan data aktivitas 2 minggu terakhir, Arsa menyelesaikan soal matematika 30% lebih cepat saat sesi belajar pukul 16.00 dibanding malam hari.',
    recommendations: [
      'Jadwalkan soal hitungan & logika berat pada jam 16.00 - 17.00.',
      'Gunakan sesi malam khusus untuk membaca buku dongeng/ensiklopedia santai.',
      'Berikan jeda minum air & camilan buah tiap 25 menit.'
    ],
    category: 'Fokus Belajar',
    scoreImprovement: '+12% Ketelitian'
  }
];

export const useEducationStore = create<EducationStoreState>((set, get) => ({
  selectedChildId: 'child-1',
  profiles: mockProfiles,
  subjects: mockSubjects,
  homeworks: mockHomeworks,
  studyPlans: mockStudyPlans,
  exams: mockExams,
  readingLogs: mockReadingLogs,
  skills: mockSkills,
  quizzes: mockQuizzes,
  quizResults: mockQuizResults,
  certificates: mockCertificates,
  teacherNotes: mockTeacherNotes,
  insights: mockInsights,

  setSelectedChildId: (childId: string) => set({ selectedChildId: childId }),

  updateProfile: (childId, data) => set((state) => ({
    profiles: {
      ...state.profiles,
      [childId]: {
        ...(state.profiles[childId] || {
          id: `edprof-${Date.now()}`,
          childId,
          schoolName: 'Sekolah',
          grade: 'Kelas 1',
          semester: 'Semester 1',
          homeroomTeacher: 'Guru',
          favoriteSubjects: [],
          extracurriculars: [],
          academicGoals: []
        }),
        ...data
      }
    }
  })),

  addSubject: (subject) => set((state) => ({
    subjects: [...state.subjects, { ...subject, id: `subj-${Date.now()}` }]
  })),

  updateSubject: (id, data) => set((state) => ({
    subjects: state.subjects.map((s) => (s.id === id ? { ...s, ...data } : s))
  })),

  deleteSubject: (id) => set((state) => ({
    subjects: state.subjects.filter((s) => s.id !== id)
  })),

  addHomework: (hw) => set((state) => ({
    homeworks: [
      {
        ...hw,
        id: `hw-${Date.now()}`,
        aiHelpCount: 0
      },
      ...state.homeworks
    ]
  })),

  updateHomeworkStatus: (id, status) => set((state) => ({
    homeworks: state.homeworks.map((h) =>
      h.id === id
        ? {
            ...h,
            status,
            completedAt: status === 'Selesai' ? new Date().toISOString() : h.completedAt
          }
        : h
    )
  })),

  deleteHomework: (id) => set((state) => ({
    homeworks: state.homeworks.filter((h) => h.id !== id)
  })),

  incrementAiHelpCount: (id) => set((state) => ({
    homeworks: state.homeworks.map((h) => (h.id === id ? { ...h, aiHelpCount: h.aiHelpCount + 1 } : h))
  })),

  addStudyPlan: (plan) => set((state) => ({
    studyPlans: [
      {
        ...plan,
        id: `sp-${Date.now()}`,
        completed: false
      },
      ...state.studyPlans
    ]
  })),

  toggleStudyPlan: (id) => set((state) => ({
    studyPlans: state.studyPlans.map((p) => (p.id === id ? { ...p, completed: !p.completed } : p))
  })),

  deleteStudyPlan: (id) => set((state) => ({
    studyPlans: state.studyPlans.filter((p) => p.id !== id)
  })),

  addExam: (exam) => set((state) => ({
    exams: [
      {
        ...exam,
        id: `ex-${Date.now()}`,
        status: 'Mendatang'
      },
      ...state.exams
    ]
  })),

  updateExamGrade: (id, actualGrade) => set((state) => ({
    exams: state.exams.map((e) =>
      e.id === id ? { ...e, actualGrade, status: 'Selesai' } : e
    )
  })),

  deleteExam: (id) => set((state) => ({
    exams: state.exams.filter((e) => e.id !== id)
  })),

  addReadingLog: (log) => set((state) => ({
    readingLogs: [{ ...log, id: `rl-${Date.now()}` }, ...state.readingLogs]
  })),

  updateReadingProgress: (id, pagesRead) => set((state) => ({
    readingLogs: state.readingLogs.map((l) => {
      if (l.id === id) {
        const nextPages = Math.min(l.totalPages, Math.max(0, pagesRead));
        return {
          ...l,
          pagesRead: nextPages,
          status: nextPages >= l.totalPages ? 'Selesai' : 'Sedang Dibaca',
          lastReadDate: new Date().toISOString().split('T')[0]
        };
      }
      return l;
    })
  })),

  deleteReadingLog: (id) => set((state) => ({
    readingLogs: state.readingLogs.filter((l) => l.id !== id)
  })),

  addSkill: (skill) => set((state) => ({
    skills: [...state.skills, { ...skill, id: `sk-${Date.now()}` }]
  })),

  updateSkillLevel: (id, level, progressPercent) => set((state) => ({
    skills: state.skills.map((sk) => (sk.id === id ? { ...sk, level, progressPercent } : sk))
  })),

  addQuizResult: (result) => set((state) => ({
    quizResults: [
      {
        ...result,
        id: `qr-${Date.now()}`,
        date: new Date().toISOString().split('T')[0]
      },
      ...state.quizResults
    ]
  })),

  addCertificate: (cert) => set((state) => ({
    certificates: [{ ...cert, id: `cert-${Date.now()}` }, ...state.certificates]
  })),

  addTeacherNote: (note) => set((state) => ({
    teacherNotes: [
      {
        ...note,
        id: `tn-${Date.now()}`,
        date: new Date().toISOString().split('T')[0]
      },
      ...state.teacherNotes
    ]
  })),

  getAnalyticsForChild: (childId: string): LearningAnalytics => {
    const state = get();
    const childSubjects = state.subjects.filter((s) => s.childId === childId);
    const childHws = state.homeworks.filter((h) => h.childId === childId);
    const completedHws = childHws.filter((h) => h.status === 'Selesai').length;
    const homeworkCompletionRate = childHws.length > 0 ? Math.round((completedHws / childHws.length) * 100) : 85;

    const avgSubjectGrade =
      childSubjects.length > 0
        ? Math.round(childSubjects.reduce((acc, curr) => acc + curr.currentGrade, 0) / childSubjects.length)
        : 90;

    const childBooks = state.readingLogs.filter((l) => l.childId === childId && l.status === 'Selesai').length;

    const subjectGradeDistribution = childSubjects.map((s) => ({
      subject: s.name,
      score: s.currentGrade
    }));

    return {
      childId,
      totalStudyMinutesThisWeek: 310,
      homeworkCompletionRate,
      averageGrade: avgSubjectGrade,
      attendanceRate: 98,
      booksReadCount: childBooks || 3,
      quizAverageScore: 95,
      subjectGradeDistribution:
        subjectGradeDistribution.length > 0
          ? subjectGradeDistribution
          : [
              { subject: 'Matematika', score: 92 },
              { subject: 'IPA', score: 89 },
              { subject: 'B. Inggris', score: 88 },
              { subject: 'Coding', score: 96 }
            ],
      weeklyStudyTrend: [
        { day: 'Senin', minutes: 45 },
        { day: 'Selasa', minutes: 60 },
        { day: 'Rabu', minutes: 50 },
        { day: 'Kamis', minutes: 40 },
        { day: 'Jumat', minutes: 55 },
        { day: 'Sabtu', minutes: 30 },
        { day: 'Minggu', minutes: 30 }
      ],
      monthlyGradeTrend: [
        { month: 'Mei', score: 86 },
        { month: 'Juni', score: 88 },
        { month: 'Juli', score: 91 }
      ]
    };
  },

  getParentSummary: (childId: string): ParentEducationSummary => {
    const state = get();
    const profile = state.profiles[childId] || mockProfiles['child-1'];
    const childHws = state.homeworks.filter((h) => h.childId === childId);
    const pendingHws = childHws.filter((h) => h.status !== 'Selesai').length;
    const childExams = state.exams.filter((e) => e.childId === childId && e.status === 'Mendatang').length;
    const certs = state.certificates.filter((c) => c.childId === childId).map((c) => c.title);

    return {
      childId,
      childName: childId === 'child-2' ? 'Bening Putri Kirana' : 'Arsa Putra Pratama',
      school: profile.schoolName,
      grade: profile.grade,
      overallGPA: 91.2,
      studyHoursWeekly: 5.2,
      pendingHomeworkCount: pendingHws,
      upcomingExamsCount: childExams,
      recentAchievements: certs.length > 0 ? certs : ['Juara 2 Lomba Matematika Cilik'],
      aiCoachAdvice:
        'Arsa menunjukkan kemajuan signifikan pada logika pecahan dan koding. Berikan apresiasi saat menyelesaikan PR tanpa perlu diingatkan.'
    };
  }
}));
