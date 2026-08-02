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
  addQuiz: (quiz: Omit<Quiz, 'id'>) => void;
  addQuizResult: (result: Omit<QuizResult, 'id' | 'date'>) => void;

  // Certificate actions
  addCertificate: (cert: Omit<Certificate, 'id'>) => void;

  // Teacher note actions
  addTeacherNote: (note: Omit<TeacherNote, 'id' | 'date'>) => void;

  // Getters & Analytics
  getAnalyticsForChild: (childId: string) => LearningAnalytics;
  getParentSummary: (childId: string) => ParentEducationSummary;
}

// Initial Mock Data for Family Children: m3 (Ahmad Santoso - SMA Kelas 2) & m4 (Nayla Santoso - SD Kelas 5)
const mockProfiles: Record<string, EducationProfile> = {
  'm3': {
    id: 'edprof-m3',
    childId: 'm3',
    schoolName: 'SMA Negeri 8 Jakarta',
    grade: 'SMA Kelas 2 (IPA)',
    semester: 'Semester 1 (2026/2027)',
    nisn: '0081234567',
    homeroomTeacher: 'Bpk. Drs. Sugiarto, M.Pd.',
    favoriteSubjects: ['Matematika Lanjut', 'Fisika', 'Pemrograman Python', 'Bahasa Inggris TOEFL'],
    extracurriculars: ['Tim Basket Utama SMA 8', 'Klub Robotik & AI', 'OSIS Bidang Pendidikan'],
    academicGoals: ['Juara Basket Antar SMA Se-DKI', 'Lolos UTBK SNBT ITB / UI Score ≥ 720', 'Sertifikat TOEFL Score ≥ 550'],
    specialNotes: 'Ahmad berkarakter mandiri, analitis, dan berbakat tinggi dalam logika matematika, koding Python, serta kepemimpinan tim.'
  },
  'm4': {
    id: 'edprof-m4',
    childId: 'm4',
    schoolName: 'SD Nusantara Utama Jakarta',
    grade: 'SD Kelas 5',
    semester: 'Semester 1 (2026/2027)',
    nisn: '0129384756',
    homeroomTeacher: 'Ibu Ningsih, S.Pd.',
    favoriteSubjects: ['Seni Musik & Piano', 'Matematika', 'IPA', 'Bahasa Indonesia'],
    extracurriculars: ['Sanggar Piano Cilik', 'Klub Balet & Seni Tari', 'Pramuka Penggalang'],
    academicGoals: ['Juara 1 Lomba Piano Anak Tingkat Provinsi', 'Nilai Rata-Rata Rapor ≥ 92', 'Membaca 12 Buku Cerita Edukasi'],
    specialNotes: 'Nayla sangat kreatif, memiliki pendengaran musik tajam (absolute pitch), dan tekun belajar melalui visual & nada lagu.'
  },
  'child-1': {
    id: 'edprof-1',
    childId: 'child-1',
    schoolName: 'SMA Negeri 8 Jakarta',
    grade: 'SMA Kelas 2 (IPA)',
    semester: 'Semester 1 (2026/2027)',
    nisn: '0081234567',
    homeroomTeacher: 'Bpk. Drs. Sugiarto, M.Pd.',
    favoriteSubjects: ['Matematika Lanjut', 'Fisika', 'Pemrograman Python'],
    extracurriculars: ['Tim Basket Utama', 'Klub Robotik'],
    academicGoals: ['Nilai Rata-Rata Rapor ≥ 90', 'Lolos UTBK SNBT'],
    specialNotes: 'Anak mandiri dan disiplin dalam jadwal belajar.'
  },
  'child-2': {
    id: 'edprof-2',
    childId: 'child-2',
    schoolName: 'SD Nusantara Utama Jakarta',
    grade: 'SD Kelas 5',
    semester: 'Semester 1 (2026/2027)',
    homeroomTeacher: 'Ibu Ningsih, S.Pd.',
    favoriteSubjects: ['Seni & Piano', 'IPA'],
    extracurriculars: ['Sanggar Piano'],
    academicGoals: ['Nilai Rapor ≥ 90'],
    specialNotes: 'Anak ceria dan sangat suka seni musik.'
  }
};

const mockSubjects: Subject[] = [
  // Ahmad Santoso (m3) - SMA Kelas 2
  {
    id: 'subj-m3-1',
    childId: 'm3',
    name: 'Matematika Lanjut (Kalkulus & Trigonometri)',
    category: 'Matematika',
    teacherName: 'Bpk. Drs. Sugiarto, M.Pd.',
    teacherContact: '+62 812-9988-7766',
    targetGrade: 95,
    currentGrade: 94,
    iconName: 'Calculator',
    scheduleDays: ['Senin', 'Rabu', 'Jumat'],
    attendanceRate: 98,
    notes: 'Pemahaman konsep limit fungsi, turunan, dan vektor sangat baik.'
  },
  {
    id: 'subj-m3-2',
    childId: 'm3',
    name: 'Fisika & Termodinamika',
    category: 'IPA',
    teacherName: 'Ibu Dr. Maya Kartika',
    teacherContact: '+62 813-7766-5544',
    targetGrade: 92,
    currentGrade: 90,
    iconName: 'FlaskConical',
    scheduleDays: ['Selasa', 'Kamis'],
    attendanceRate: 100,
    notes: 'Sangat menguasai hukum Termodinamika & Gelombang Elektromagnetik.'
  },
  {
    id: 'subj-m3-3',
    childId: 'm3',
    name: 'Pemrograman Python & AI Fundamentals',
    category: 'Coding',
    teacherName: 'Bpk. Rian Pratama, M.Kom.',
    teacherContact: '+62 815-6677-8899',
    targetGrade: 98,
    currentGrade: 96,
    iconName: 'Code',
    scheduleDays: ['Rabu'],
    attendanceRate: 100,
    notes: 'Telah berhasil membuat algoritma prediksi sederhana menggunakan Python.'
  },
  {
    id: 'subj-m3-4',
    childId: 'm3',
    name: 'Bahasa Inggris TOEFL & Debate',
    category: 'Bahasa Inggris',
    teacherName: 'Ms. Deborah Vance',
    teacherContact: '+62 811-2233-4455',
    targetGrade: 95,
    currentGrade: 92,
    iconName: 'Globe',
    scheduleDays: ['Selasa', 'Jumat'],
    attendanceRate: 96,
    notes: 'Kelancaran debat dan kosa kata akademis tingkat tinggi.'
  },
  {
    id: 'subj-m3-5',
    childId: 'm3',
    name: 'Kimia Organik & Stoikiometri',
    category: 'IPA',
    teacherName: 'Ibu Ratna Suminar, S.Si.',
    teacherContact: '+62 817-4433-2211',
    targetGrade: 90,
    currentGrade: 88,
    iconName: 'FlaskConical',
    scheduleDays: ['Senin', 'Kamis'],
    attendanceRate: 95,
    notes: 'Praktikum laju reaksi & tatanama senyawa berjalan lancar.'
  },

  // Nayla Santoso (m4) - SD Kelas 5
  {
    id: 'subj-m4-1',
    childId: 'm4',
    name: 'Matematika & Logika SD',
    category: 'Matematika',
    teacherName: 'Bpk. Hendra Wijaya, S.Pd.',
    teacherContact: '+62 812-3456-7890',
    targetGrade: 95,
    currentGrade: 92,
    iconName: 'Calculator',
    scheduleDays: ['Senin', 'Rabu', 'Jumat'],
    attendanceRate: 98,
    notes: 'Pemahaman operasi pecahan campuran & keliling bangun datar sangat kuat.'
  },
  {
    id: 'subj-m4-2',
    childId: 'm4',
    name: 'IPA & Daur Ekosistem',
    category: 'IPA',
    teacherName: 'Ibu Diana Putri, M.Si.',
    teacherContact: '+62 813-9876-5432',
    targetGrade: 90,
    currentGrade: 89,
    iconName: 'FlaskConical',
    scheduleDays: ['Selasa', 'Kamis'],
    attendanceRate: 100,
    notes: 'Sangat aktif bertanya saat praktikum daur air & rantai makanan.'
  },
  {
    id: 'subj-m4-3',
    childId: 'm4',
    name: 'Seni Musik & Seni Piano',
    category: 'Seni',
    teacherName: 'Ibu Clara Natalia, S.Sn.',
    teacherContact: '+62 819-0011-2233',
    targetGrade: 98,
    currentGrade: 98,
    iconName: 'BookOpen',
    scheduleDays: ['Sabtu'],
    attendanceRate: 100,
    notes: 'Teknik fingering piano dan solfeggio bernyanyi sangat unggul.'
  },
  {
    id: 'subj-m4-4',
    childId: 'm4',
    name: 'Bahasa Indonesia & Sastra',
    category: 'Bahasa Indonesia',
    teacherName: 'Ibu Ningsih, S.Pd.',
    teacherContact: '+62 818-7766-5544',
    targetGrade: 92,
    currentGrade: 90,
    iconName: 'BookOpenText',
    scheduleDays: ['Selasa', 'Jumat'],
    attendanceRate: 96,
    notes: 'Penulisan karangan narasi dan pembacaan puisi sangat menyentuh.'
  }
];

const mockHomeworks: Homework[] = [
  // Ahmad Santoso (m3)
  {
    id: 'hw-m3-1',
    childId: 'm3',
    subjectId: 'subj-m3-1',
    subjectName: 'Matematika Lanjut',
    title: 'Latihan Soal Limit Fungsi Aljabar & Trigonometri (Hal. 78-82)',
    description: 'Selesaikan 15 soal kalkulus limit fungsi dan buktikan dengan sifat-sifat turunan.',
    dueDate: '2026-08-04',
    dueTime: '20:00',
    priority: 'Tinggi',
    status: 'Sedang Dikerjakan',
    category: 'PR',
    aiHelpCount: 1
  },
  {
    id: 'hw-m3-2',
    childId: 'm3',
    subjectId: 'subj-m3-2',
    subjectName: 'Fisika & Termodinamika',
    title: 'Laporan Praktikum Hukum Hooke & Pegas Paralel',
    description: 'Buat grafik hubungan gaya terhadap pertambahan panjang pegas disertai analisis regresi linier.',
    dueDate: '2026-08-06',
    dueTime: '19:00',
    priority: 'Sedang',
    status: 'Belum Dikerjakan',
    category: 'Proyek',
    aiHelpCount: 0
  },
  {
    id: 'hw-m3-3',
    childId: 'm3',
    subjectId: 'subj-m3-4',
    subjectName: 'Bahasa Inggris TOEFL',
    title: 'Drill Exercise Reading Comprehension "Scientific Discoveries"',
    description: 'Jawab 20 soal TOEFL Reading PBT mengenai sejarah penemuan antibiotik.',
    dueDate: '2026-07-31',
    dueTime: '18:00',
    priority: 'Sedang',
    status: 'Selesai',
    category: 'Tugas Harian',
    aiHelpCount: 2,
    completedAt: '2026-07-31T17:30:00'
  },

  // Nayla Santoso (m4)
  {
    id: 'hw-m4-1',
    childId: 'm4',
    subjectId: 'subj-m4-1',
    subjectName: 'Matematika & Logika SD',
    title: 'Latihan Soal Pecahan Campuran & Desimal (Hal. 45-48)',
    description: 'Selesaikan 10 soal cerita penjumlahan dan pengurangan pecahan campuran.',
    dueDate: '2026-08-03',
    dueTime: '18:00',
    priority: 'Tinggi',
    status: 'Sedang Dikerjakan',
    category: 'PR',
    aiHelpCount: 2
  },
  {
    id: 'hw-m4-2',
    childId: 'm4',
    subjectId: 'subj-m4-2',
    subjectName: 'IPA & Daur Ekosistem',
    title: 'Bagan Skema Daur Air & Rantai Makanan Hutan',
    description: 'Gambarkan 3 tahap utama daur air (Evaporasi, Kondensasi, Presipitasi) pada kertas gambar A4.',
    dueDate: '2026-08-05',
    dueTime: '19:00',
    priority: 'Sedang',
    status: 'Belum Dikerjakan',
    category: 'Proyek',
    aiHelpCount: 0
  }
];

const mockStudyPlans: StudyPlan[] = [
  // Ahmad Santoso (m3)
  {
    id: 'sp-m3-1',
    childId: 'm3',
    title: 'Drill Soal Limit & Turunan Kalkulus',
    frequency: 'Harian',
    targetDurationMinutes: 50,
    subjectId: 'subj-m3-1',
    subjectName: 'Matematika Lanjut',
    timeOfDay: '16:30 - 17:20',
    priority: 'Tinggi',
    completed: true
  },
  {
    id: 'sp-m3-2',
    childId: 'm3',
    title: 'Latihan Coding Python Algorithm',
    frequency: 'Mingguan',
    targetDurationMinutes: 60,
    subjectId: 'subj-m3-3',
    subjectName: 'Pemrograman Python',
    timeOfDay: 'Sabtu 10:00',
    priority: 'Sedang',
    completed: false
  },

  // Nayla Santoso (m4)
  {
    id: 'sp-m4-1',
    childId: 'm4',
    title: 'Latihan Partitur Piano & Tangga Senada',
    frequency: 'Harian',
    targetDurationMinutes: 30,
    subjectId: 'subj-m4-3',
    subjectName: 'Seni Musik Piano',
    timeOfDay: '16:00 - 16:30',
    priority: 'Tinggi',
    completed: true
  },
  {
    id: 'sp-m4-2',
    childId: 'm4',
    title: 'Membaca Bab Ekosistem & Latihan Kuis IPA',
    frequency: 'Harian',
    targetDurationMinutes: 30,
    subjectId: 'subj-m4-2',
    subjectName: 'IPA',
    timeOfDay: '19:00 - 19:30',
    priority: 'Sedang',
    completed: false
  }
];

const mockExams: Exam[] = [
  // Ahmad Santoso (m3)
  {
    id: 'ex-m3-1',
    childId: 'm3',
    subjectId: 'subj-m3-1',
    subjectName: 'Matematika Lanjut',
    title: 'UTS Semester 1: Kalkulus Limit & Turunan',
    examType: 'UTS',
    date: '2026-08-15',
    time: '08:00 - 09:30',
    targetGrade: 95,
    topicsCovered: ['Limit Fungsi Aljabar', 'Turunan Pertama & Kedua', 'Aplikasi Turunan Maksimasi'],
    status: 'Mendatang'
  },
  {
    id: 'ex-m3-2',
    childId: 'm3',
    subjectId: 'subj-m3-2',
    subjectName: 'Fisika & Termodinamika',
    title: 'Kuis Fisika Bab Hukum Termodinamika',
    examType: 'Kuis',
    date: '2026-08-18',
    time: '10:00 - 10:45',
    targetGrade: 92,
    topicsCovered: ['Proses Isobarik & Isokhorik', 'Mesin Carnot & Efisiensi'],
    status: 'Mendatang'
  },

  // Nayla Santoso (m4)
  {
    id: 'ex-m4-1',
    childId: 'm4',
    subjectId: 'subj-m4-1',
    subjectName: 'Matematika & Logika SD',
    title: 'Ulangan Harian Bab 2: Pecahan & Desimal',
    examType: 'UTS',
    date: '2026-08-10',
    time: '08:00 - 09:30',
    targetGrade: 95,
    topicsCovered: ['Pecahan Senilai', 'Pecahan Campuran', 'Mengubah ke Desimal'],
    status: 'Mendatang'
  }
];

const mockReadingLogs: ReadingLog[] = [
  // Ahmad Santoso (m3)
  {
    id: 'rl-m3-1',
    childId: 'm3',
    bookTitle: 'Physics for Scientists and Engineers',
    author: 'Raymond A. Serway',
    category: 'Buku',
    totalPages: 450,
    pagesRead: 210,
    status: 'Sedang Dibaca',
    summary: 'Buku panduan mendalam konsep mekanika klasik dan gaya elektromagnetik.',
    rating: 5,
    lastReadDate: '2026-08-01'
  },
  {
    id: 'rl-m3-2',
    childId: 'm3',
    bookTitle: 'Python Crash Course for High School Coding',
    author: 'Eric Matthes',
    category: 'Buku Edukasi',
    totalPages: 320,
    pagesRead: 320,
    status: 'Selesai',
    summary: 'Panduan praktis koding Python dari variabel hingga analisis data.',
    rating: 5,
    lastReadDate: '2026-07-28'
  },

  // Nayla Santoso (m4)
  {
    id: 'rl-m4-1',
    childId: 'm4',
    bookTitle: 'Ensiklopedia Anak: Keajaiban Musik & Tata Surya',
    author: 'National Geographic Kids',
    category: 'Buku',
    totalPages: 120,
    pagesRead: 90,
    status: 'Sedang Dibaca',
    summary: 'Buku ilustrasi indah tentang frekuensi bunyi musik dan planet-planet.',
    rating: 5,
    lastReadDate: '2026-07-31'
  }
];

const mockSkills: SkillDevelopment[] = [
  // Ahmad Santoso (m3)
  {
    id: 'sk-m3-1',
    childId: 'm3',
    skillName: 'Python Programming & AI',
    level: 'Lanjutan',
    projectsBuiltCount: 5,
    certificatesEarnedCount: 2,
    notes: 'Telah menguasai Pandas, NumPy, dan pembuatan bot otomatisasi.',
    iconName: 'Code',
    progressPercent: 85
  },
  {
    id: 'sk-m3-2',
    childId: 'm3',
    skillName: 'Olahraga Basket & Strategi Tim',
    level: 'Lanjutan',
    projectsBuiltCount: 12,
    certificatesEarnedCount: 3,
    notes: 'Kapten lapangan tim sekolah dengan kemampuan analisis taktik lawan.',
    iconName: 'Trophy',
    progressPercent: 90
  },

  // Nayla Santoso (m4)
  {
    id: 'sk-m4-1',
    childId: 'm4',
    skillName: 'Bermain Piano Klassik',
    level: 'Menengah',
    projectsBuiltCount: 6,
    certificatesEarnedCount: 2,
    notes: 'Mampu memainkan partitur Sonatina Beethoven dengan tempo presisi.',
    iconName: 'Music',
    progressPercent: 88
  },
  {
    id: 'sk-m4-2',
    childId: 'm4',
    skillName: 'Seni Tari Balet',
    level: 'Pemula',
    projectsBuiltCount: 2,
    certificatesEarnedCount: 1,
    notes: 'Kelenturan tubuh dan ritme gerakan balet terus meningkat.',
    iconName: 'Sparkles',
    progressPercent: 60
  }
];

const mockQuizzes: Quiz[] = [
  {
    id: 'qz-1',
    subject: 'Matematika',
    topic: 'Kalkulus & Pecahan',
    difficulty: 'Sedang',
    questions: [
      {
        id: 1,
        question: 'Berapakah hasil dari 1/2 + 2/4?',
        options: ['1', '3/4', '1/2', '2'],
        correctIndex: 0,
        explanation: '2/4 disederhanakan menjadi 1/2. Jadi 1/2 + 1/2 = 1.'
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
    id: 'qr-m3-1',
    childId: 'm3',
    quizId: 'qz-1',
    subject: 'Matematika Lanjut',
    topic: 'Kalkulus & Limit',
    score: 100,
    totalQuestions: 2,
    correctCount: 2,
    date: '2026-07-30'
  },
  {
    id: 'qr-m4-1',
    childId: 'm4',
    quizId: 'qz-1',
    subject: 'Matematika SD',
    topic: 'Pecahan',
    score: 100,
    totalQuestions: 2,
    correctCount: 2,
    date: '2026-07-29'
  }
];

const mockCertificates: Certificate[] = [
  // Ahmad Santoso (m3)
  {
    id: 'cert-m3-1',
    childId: 'm3',
    title: 'Juara 2 Lomba Olimpiade Fisika SMA Tingkat Kota',
    category: 'Olimpiade',
    issuer: 'Dinas Pendidikan DKI Jakarta',
    dateReceived: '2026-05-18',
    description: 'Penghargaan atas keunggulan pemecahan 25 soal mekanika & gelombang fisika.'
  },
  {
    id: 'cert-m3-2',
    childId: 'm3',
    title: 'Sertifikat Kelulusan Python Data Science Junior',
    category: 'Keterampilan',
    issuer: 'Indonesia High School AI Academy',
    dateReceived: '2026-06-25',
    description: 'Berhasil membuat model analisis data menggunakan library Pandas & Matplotlib.'
  },

  // Nayla Santoso (m4)
  {
    id: 'cert-m4-1',
    childId: 'm4',
    title: 'Juara 1 Lomba Piano Anak Tingkat Provinsi',
    category: 'Seni',
    issuer: 'Yayasan Seni Musik Nusantara',
    dateReceived: '2026-06-10',
    description: 'Penghargaan interpretasi musik piano klasik terbaik kategori usia 9-11 tahun.'
  }
];

const mockTeacherNotes: TeacherNote[] = [
  // Ahmad Santoso (m3)
  {
    id: 'tn-m3-1',
    childId: 'm3',
    teacherName: 'Bpk. Drs. Sugiarto, M.Pd.',
    subject: 'Wali Kelas / Matematika',
    date: '2026-07-28',
    note: 'Ahmad sangat santun, berjiwa kepemimpinan tinggi, dan menjadi panutan belajar teman-temannya di kelas XI IPA.',
    type: 'Pujian'
  },

  // Nayla Santoso (m4)
  {
    id: 'tn-m4-1',
    childId: 'm4',
    teacherName: 'Ibu Ningsih, S.Pd.',
    subject: 'Wali Kelas SD',
    date: '2026-07-26',
    note: 'Nayla sangat ceria dan rajin merapikan alat tulis serta buku bacaan perpustakaan.',
    type: 'Pujian'
  }
];

const mockInsights: EducationInsight[] = [
  // Ahmad Santoso (m3)
  {
    id: 'eins-m3-1',
    childId: 'm3',
    date: '2026-08-01',
    title: 'Fokus Belajar Kalkulus Ahmad Mencapai Performa Puncak di Pagi & Sore Hari!',
    summary: 'Berdasarkan analisis aktivitas 2 minggu terakhir, Ahmad menyelesaikan soal kalkulus 35% lebih cepat pada jam 16.30 dibanding larut malam.',
    recommendations: [
      'Jadwalkan latihan soal kalkulus & latihan UTBK berat pada jam 16.30 - 17.30.',
      'Jaga kecukupan hidrasi air & asupan karbohidrat kompleks seusai latihan basket.',
      'Gunakan sesi malam untuk ulasan santai koding Python atau membaca literatur fisika.'
    ],
    category: 'Fokus Belajar',
    scoreImprovement: '+15% Akurasi Soal'
  },

  // Nayla Santoso (m4)
  {
    id: 'eins-m4-1',
    childId: 'm4',
    date: '2026-07-31',
    title: 'Kombinasi Musik Piano & Visual Terbukti Meningkatkan Daya Ingat Matematika Nayla!',
    summary: 'Nayla menunjukkan pemahaman pecahan lebih cepat ketika soal dihubungkan dengan ritme tempo ketukan lagu.',
    recommendations: [
      'Gunakan lagu interaktif saat mendampingi Nayla belajar matematika.',
      'Berikan pujian positif saat Nayla menyelesaikan latihan tanpa ditunda.'
    ],
    category: 'Gaya Belajar Visual-Auditori',
    scoreImprovement: '+10% Pemahaman'
  }
];

export const useEducationStore = create<EducationStoreState>((set, get) => ({
  selectedChildId: 'm3',
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

  addQuiz: (quiz) => set((state) => ({
    quizzes: [{ ...quiz, id: `qz-${Date.now()}` }, ...state.quizzes]
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
    const profile = state.profiles[childId] || mockProfiles['m3'] || mockProfiles['child-1'];
    const childHws = state.homeworks.filter((h) => h.childId === childId);
    const pendingHws = childHws.filter((h) => h.status !== 'Selesai').length;
    const childExams = state.exams.filter((e) => e.childId === childId && e.status === 'Mendatang').length;
    const certs = state.certificates.filter((c) => c.childId === childId).map((c) => c.title);

    const childNameMap: Record<string, string> = {
      'm3': 'Ahmad Santoso',
      'm4': 'Nayla Santoso',
      'child-1': 'Ahmad Santoso',
      'child-2': 'Nayla Santoso'
    };

    const resolvedName = childNameMap[childId] || 'Siswa';

    return {
      childId,
      childName: resolvedName,
      school: profile.schoolName,
      grade: profile.grade,
      overallGPA: childId === 'm3' ? 92.8 : 91.5,
      studyHoursWeekly: childId === 'm3' ? 7.5 : 5.2,
      pendingHomeworkCount: pendingHws,
      upcomingExamsCount: childExams,
      recentAchievements: certs.length > 0 ? certs : ['Juara Olimpiade Sains'],
      aiCoachAdvice:
        childId === 'm3'
          ? 'Ahmad menunjukkan ketekunan luar biasa dalam kalkulus & koding Python. Berikan ruang untuk menyeimbangkan latihan basket dan persiapan UTBK.'
          : 'Nayla belajar sangat efektif melalui kombinasi nada musik piano dan latihan visual. Apresiasi semangat belajarnya secara konsisten.'
    };
  }
}));
