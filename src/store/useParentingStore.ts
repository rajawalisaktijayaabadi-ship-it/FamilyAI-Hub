import { create } from 'zustand';
import {
  Child,
  GrowthRecord,
  Milestone,
  DailyActivity,
  ScreenTimeRecord,
  Habit,
  ChildRewardSystem,
  ChildTask,
  GoalSetting,
  ParentNote,
  ParentingTip,
  ParentingInsight,
  ChildEducationSummary
} from '../features/parenting/types';

interface ParentingStoreState {
  children: Child[];
  selectedChildId: string;
  growthRecords: GrowthRecord[];
  milestones: Milestone[];
  dailyActivities: DailyActivity[];
  screenTimeRecords: ScreenTimeRecord[];
  habits: Habit[];
  rewards: Record<string, ChildRewardSystem>; // keyed by childId
  tasks: ChildTask[];
  goals: GoalSetting[];
  parentNotes: ParentNote[];
  tips: ParentingTip[];
  insights: ParentingInsight[];

  // Actions
  setSelectedChildId: (childId: string) => void;
  addChild: (child: Omit<Child, 'id' | 'createdAt'>) => void;
  updateChild: (id: string, child: Partial<Child>) => void;
  deleteChild: (id: string) => void;

  addGrowthRecord: (record: Omit<GrowthRecord, 'id'>) => void;
  updateMilestoneStatus: (id: string, status: Milestone['status'], notes?: string) => void;
  addMilestone: (milestone: Omit<Milestone, 'id'>) => void;

  addDailyActivity: (activity: Omit<DailyActivity, 'id'>) => void;
  addScreenTimeRecord: (record: Omit<ScreenTimeRecord, 'id'>) => void;

  toggleHabitCheckin: (habitId: string, dateStr: string) => void;
  addHabit: (habit: Omit<Habit, 'id' | 'currentStreak' | 'bestStreak' | 'completedDates'>) => void;

  addTask: (task: Omit<ChildTask, 'id' | 'completed'>) => void;
  toggleTaskCompleted: (taskId: string) => void;
  deleteTask: (taskId: string) => void;

  addGoal: (goal: Omit<GoalSetting, 'id' | 'status'>) => void;
  updateGoalProgress: (goalId: string, newValue: number) => void;

  addParentNote: (note: Omit<ParentNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateParentNote: (id: string, note: Partial<ParentNote>) => void;
  deleteParentNote: (id: string) => void;

  addInsight: (insight: Omit<ParentingInsight, 'id'>) => void;

  // Integrations
  getChildEducationSummary: (childId: string) => ChildEducationSummary;
}

const mockChildren: Child[] = [
  {
    id: 'm3',
    familyId: 'fam-1',
    name: 'Ahmad Santoso',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    birthDate: '2010-04-15',
    age: 16,
    gender: 'Laki-laki',
    school: 'SMA Negeri 8 Jakarta',
    grade: 'SMA Kelas 2',
    bloodType: 'O+',
    heightCm: 172,
    weightKg: 62,
    allergies: ['Debu Lingkungan'],
    hobbies: ['Bermain Basket', 'Membaca Komik Sains', 'Lego Robotics'],
    interests: ['Astronomi', 'Koding Scratch', 'Sepeda Gunung'],
    talents: ['Matematika Logika', 'Olahraga Basket'],
    goals: ['Juara Basket Antar SMA', 'Lolos UTBK SNBT', 'Lancar Bahasa Inggris'],
    parentNotes: 'Ahmad anak yang mandiri dan berani, bercita-cita di bidang sains & olahraga.',
    createdAt: '2026-01-01'
  },
  {
    id: 'm4',
    familyId: 'fam-1',
    name: 'Nayla Santoso',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    birthDate: '2016-08-20',
    age: 10,
    gender: 'Perempuan',
    school: 'SD Nusantara Utama',
    grade: 'SD Kelas 5',
    bloodType: 'A+',
    heightCm: 138.5,
    weightKg: 32.4,
    allergies: ['Susu Sapi (Toleransi Rendah)'],
    hobbies: ['Menari Balet', 'Bermain Piano', 'Mewarnai'],
    interests: ['Musik Harmoni', 'Dongeng Seri Putri', 'Origami'],
    talents: ['Daya Ingat Lagu', 'Seni Musik Piano'],
    goals: ['Juara Lomba Piano', 'Membaca 10 Buku Cerita'],
    parentNotes: 'Nayla anak yang kreatif dan penyayang, suka mendengarkan musik usai les.',
    createdAt: '2026-01-01'
  }
];

const mockGrowthRecords: GrowthRecord[] = [
  {
    id: 'growth-1',
    childId: 'm3',
    date: '2026-07-01',
    heightCm: 172.0,
    weightKg: 62.0,
    headCircumferenceCm: 55.0,
    bmi: 21.0,
    category: 'Physical Growth',
    notes: 'Pertumbuhan fisik dan tinggi badan sangat cepat khas remaja. Postur tubuh athletic basket.',
    recordedBy: 'Ayah'
  },
  {
    id: 'growth-2',
    childId: 'm4',
    date: '2026-07-10',
    heightCm: 138.5,
    weightKg: 32.4,
    headCircumferenceCm: 52.1,
    bmi: 16.9,
    category: 'Physical Growth',
    notes: 'Bertambah tinggi dengan berat badan stabil dan sehat.',
    recordedBy: 'Ibu'
  }
];

const mockMilestones: Milestone[] = [
  {
    id: 'ms-1',
    childId: 'child-1',
    title: 'Kemampuan Matematika & Pemecahan Masalah Kompleks',
    description: 'Mampu menyelesaikan soal cerita pecahan dan algoritma dasar.',
    category: 'Learning Development',
    targetAgeMonth: 120,
    status: 'Selesai',
    completedDate: '2026-06-20',
    notes: 'Berhasil membuat game Scratch labirin sederhana.'
  },
  {
    id: 'ms-2',
    childId: 'child-1',
    title: 'Regulasi Emosi & Manajemen Konflik Teman Sebaya',
    description: 'Mengungkapkan kekecewaan dengan kata-kata tanpa tantrum atau menarik diri.',
    category: 'Emotional Development',
    targetAgeMonth: 120,
    status: 'Proses',
    notes: 'Sudah mulai mampu menarik napas dalam saat kesal saat kalah bermain game.'
  },
  {
    id: 'ms-3',
    childId: 'child-1',
    title: 'Kemandirian Menyiapkan Perlengkapan Sekolah',
    description: 'Menyiapkan jadwal pelajaran dan seragam sendiri tanpa perlu diingatkan berkali-kali.',
    category: 'Life Skills',
    targetAgeMonth: 120,
    status: 'Selesai',
    completedDate: '2026-07-15',
    notes: 'Konsisten selama 3 minggu berturut-turut.'
  },
  {
    id: 'ms-4',
    childId: 'child-2',
    title: 'Membaca Kalimat Pendek 3-4 Kata',
    description: 'Mampu merangkai huruf konsonan-vokal dan membaca buku cerita anak bergambar.',
    category: 'Language Development',
    targetAgeMonth: 72,
    status: 'Proses',
    notes: 'Mampu membaca 5 halaman buku "Si Kancil" dengan bimbingan.'
  },
  {
    id: 'ms-5',
    childId: 'child-2',
    title: 'Keseimbangan Motorik Kasar Bersepeda Roda Dua',
    description: 'Mengayuh sepeda tanpa roda bantuan selama 50 meter.',
    category: 'Motor Skills',
    targetAgeMonth: 72,
    status: 'Belum Dimulai',
    notes: 'Rencana latihan di taman sore ini.'
  }
];

const mockActivities: DailyActivity[] = [
  {
    id: 'act-1',
    childId: 'child-1',
    date: '2026-07-31',
    category: 'Belajar',
    title: 'Mengerjakan Latihan Soal Matematika Bab Pecahan',
    durationMinutes: 45,
    startTime: '16:00',
    endTime: '16:45',
    notes: 'Fokus tinggi, mendapat skor 90/100.',
    moodRating: 5
  },
  {
    id: 'act-2',
    childId: 'child-1',
    date: '2026-07-31',
    category: 'Membaca',
    title: 'Membaca Buku Ensiklopedia Sains "Tata Surya"',
    durationMinutes: 30,
    startTime: '19:30',
    endTime: '20:00',
    notes: 'Sangat tertarik dengan bab planet Jupiter.',
    moodRating: 5
  },
  {
    id: 'act-3',
    childId: 'child-1',
    date: '2026-07-31',
    category: 'Olahraga',
    title: 'Bersepeda di Kompleks Rumah Bersama Teman',
    durationMinutes: 40,
    startTime: '16:50',
    endTime: '17:30',
    notes: 'Aktivitas fisik kardio yang sangat menyenangkan.',
    moodRating: 5
  },
  {
    id: 'act-4',
    childId: 'child-2',
    date: '2026-07-31',
    category: 'Menggambar',
    title: 'Mewarnai Gambar Pemandangan & Hewan Peliharaan',
    durationMinutes: 35,
    startTime: '15:00',
    endTime: '15:35',
    notes: 'Mengenal perpaduan warna gradasi.',
    moodRating: 4
  }
];

const mockScreenTime: ScreenTimeRecord[] = [
  {
    id: 'st-1',
    childId: 'child-1',
    date: '2026-07-31',
    durationMinutes: 40,
    activityType: 'Edukasi',
    device: 'Tablet',
    startTime: '14:00',
    endTime: '14:40',
    aiRecommendation: 'Sangat baik! Penggunaan tablet berdurasi 40 menit fokus pada koding Scratch. Disarankan rehat mata 15 menit sebelum aktivitas lainnya.'
  },
  {
    id: 'st-2',
    childId: 'child-1',
    date: '2026-07-30',
    durationMinutes: 60,
    activityType: 'Game',
    device: 'Smart TV',
    startTime: '17:00',
    endTime: '18:00',
    aiRecommendation: 'Screen time game sudah mencapai batas ideal 60 menit per hari. Pastikan malam hari bebas layar untuk mendukung melatonin tidur.'
  }
];

const mockHabits: Habit[] = [
  {
    id: 'hb-1',
    childId: 'child-1',
    name: 'Bangun Pagi Pukul 05.00',
    iconName: 'Sun',
    targetFrequency: 'Daily',
    currentStreak: 12,
    bestStreak: 18,
    completedDates: ['2026-07-29', '2026-07-30', '2026-07-31'],
    pointReward: 15,
    category: 'Disiplin'
  },
  {
    id: 'hb-2',
    childId: 'child-1',
    name: 'Merapikan Tempat Tidur',
    iconName: 'Bed',
    targetFrequency: 'Daily',
    currentStreak: 10,
    bestStreak: 14,
    completedDates: ['2026-07-29', '2026-07-30', '2026-07-31'],
    pointReward: 10,
    category: 'Membantu Rumah'
  },
  {
    id: 'hb-3',
    childId: 'child-1',
    name: 'Sikat Gigi Sebelum Tidur',
    iconName: 'Sparkles',
    targetFrequency: 'Daily',
    currentStreak: 15,
    bestStreak: 21,
    completedDates: ['2026-07-29', '2026-07-30', '2026-07-31'],
    pointReward: 10,
    category: 'Kesehatan'
  },
  {
    id: 'hb-4',
    childId: 'child-1',
    name: 'Membaca Buku Minimal 20 Menit',
    iconName: 'BookOpen',
    targetFrequency: 'Daily',
    currentStreak: 8,
    bestStreak: 12,
    completedDates: ['2026-07-29', '2026-07-30', '2026-07-31'],
    pointReward: 20,
    category: 'Belajar'
  },
  {
    id: 'hb-5',
    childId: 'child-1',
    name: 'Minum Air Putih 8 Gelas',
    iconName: 'Droplet',
    targetFrequency: 'Daily',
    currentStreak: 6,
    bestStreak: 10,
    completedDates: ['2026-07-30', '2026-07-31'],
    pointReward: 10,
    category: 'Kesehatan'
  }
];

const mockRewards: Record<string, ChildRewardSystem> = {
  'child-1': {
    childId: 'child-1',
    totalPoints: 480,
    coins: 120,
    level: 5,
    levelTitle: 'Bintang Mandiri Cilik',
    badges: [
      {
        id: 'bdg-1',
        name: 'Rajin Membaca',
        description: 'Membaca buku 7 hari berturut-turut tanpa terputus.',
        icon: 'BookMarked',
        unlockedAt: '2026-07-20',
        category: 'Literasi',
        isUnlocked: true
      },
      {
        id: 'bdg-2',
        name: 'Anak Disiplin',
        description: 'Menyelesaikan seluruh tugas harian tepat waktu.',
        icon: 'ShieldCheck',
        unlockedAt: '2026-07-25',
        category: 'Karakter',
        isUnlocked: true
      },
      {
        id: 'bdg-3',
        name: 'Bintang Matematika',
        description: 'Mencapai target belajar matematika 10 sesi berturut-turut.',
        icon: 'Award',
        unlockedAt: '2026-07-28',
        category: 'Akademik',
        isUnlocked: true
      },
      {
        id: 'bdg-4',
        name: 'Juara Kebersihan',
        description: 'Merapikan kamar dan meja belajar setiap hari selama 2 minggu.',
        icon: 'Sparkles',
        unlockedAt: '2026-07-30',
        category: 'Kemandirian',
        isUnlocked: true
      },
      {
        id: 'bdg-5',
        name: 'Family Helper',
        description: 'Membantu orang tua melakukan pekerjaan rumah tangga ringan.',
        icon: 'HeartHandshake',
        unlockedAt: '2026-07-15',
        category: 'Sosial',
        isUnlocked: true
      }
    ]
  },
  'child-2': {
    childId: 'child-2',
    totalPoints: 260,
    coins: 60,
    level: 3,
    levelTitle: 'Pena Ceria Cilik',
    badges: [
      {
        id: 'bdg-21',
        name: 'Pena Mewarnai',
        description: 'Menggambar & mewarnai 5 karya seni indah.',
        icon: 'Palette',
        unlockedAt: '2026-07-18',
        category: 'Kreativitas',
        isUnlocked: true
      },
      {
        id: 'bdg-22',
        name: 'Anak Disiplin',
        description: 'Merapikan mainan sendiri setelah selesai.',
        icon: 'ShieldCheck',
        unlockedAt: '2026-07-22',
        category: 'Karakter',
        isUnlocked: true
      }
    ]
  }
};

const mockTasks: ChildTask[] = [
  {
    id: 'task-1',
    childId: 'child-1',
    title: 'Mengerjakan PR Matematika Bab Pecahan',
    category: 'PR',
    dueDate: '2026-08-01',
    dueTime: '17:00',
    completed: true,
    completedAt: '2026-07-31T16:45:00',
    priority: 'Tinggi',
    pointReward: 25,
    reminderEnabled: true
  },
  {
    id: 'task-2',
    childId: 'child-1',
    title: 'Membersihkan Meja Belajar & Kamar Tidur',
    category: 'Membersihkan Kamar',
    dueDate: '2026-08-01',
    dueTime: '18:00',
    completed: false,
    priority: 'Sedang',
    pointReward: 15,
    reminderEnabled: true
  },
  {
    id: 'task-3',
    childId: 'child-1',
    title: 'Membaca Komik Sains Bab 4 Astronomi',
    category: 'Belajar',
    dueDate: '2026-08-01',
    dueTime: '19:30',
    completed: false,
    priority: 'Rendah',
    pointReward: 20,
    reminderEnabled: false
  },
  {
    id: 'task-4',
    childId: 'child-1',
    title: 'Membantu Ibu Menyiram Tanaman Halaman',
    category: 'Membantu Orang Tua',
    dueDate: '2026-08-01',
    dueTime: '16:30',
    completed: false,
    priority: 'Sedang',
    pointReward: 15,
    reminderEnabled: true
  }
];

const mockGoals: GoalSetting[] = [
  {
    id: 'gl-1',
    childId: 'child-1',
    title: 'Membaca 10 Buku Sains & Ensiklopedia',
    category: 'Literasi & Edukasi',
    targetValue: 10,
    currentValue: 7,
    unit: 'Buku',
    deadline: '2026-08-31',
    status: 'In Progress'
  },
  {
    id: 'gl-2',
    childId: 'child-1',
    title: 'Belajar Koding Scratch Minimal 30 Menit x 4 Hari',
    category: 'Kreativitas & Keterampilan',
    targetValue: 4,
    currentValue: 3,
    unit: 'Sesi',
    deadline: '2026-08-07',
    status: 'In Progress'
  },
  {
    id: 'gl-3',
    childId: 'child-1',
    title: 'Olahraga Bersepeda 3 Kali Seminggu',
    category: 'Kesehatan & Fisik',
    targetValue: 3,
    currentValue: 3,
    unit: 'Kali',
    deadline: '2026-08-02',
    status: 'Achieved'
  },
  {
    id: 'gl-4',
    childId: 'child-1',
    title: 'Tidur Tepat Waktu Sebelum Pukul 21.00',
    category: 'Kedisiplinan & Tidur',
    targetValue: 7,
    currentValue: 6,
    unit: 'Malam',
    deadline: '2026-08-07',
    status: 'In Progress'
  }
];

const mockParentNotes: ParentNote[] = [
  {
    id: 'pnote-1',
    childId: 'child-1',
    title: 'Perkembangan Minat Koding & Astronomi',
    content: 'Arsa menunjukkan antusiasme sangat tinggi pada buku astronomi dan Scratch. Disarankan memberikan modul sains tingkat lanjut serta pujian spesifik pada usahanya saat memecahkan bug koding.',
    tags: ['Minat', 'Koding', 'Edukasi'],
    privacy: 'Parent',
    isEncrypted: false,
    createdAt: '2026-07-25',
    updatedAt: '2026-07-25'
  },
  {
    id: 'pnote-2',
    childId: 'child-1',
    title: 'Catatan Alergi & Pertolongan Pertama',
    content: 'Arsa alergi terhadap kacang tanah dan debu tebal. Jika kambuh rasa gatal ringan, berikan obat sirup antihistamin sesuai resep dokter. Simpan antihistamin di kotak P3K ruang tengah.',
    tags: ['Alergi', 'Kesehatan', 'Emergency'],
    privacy: 'Private Notes',
    isEncrypted: true,
    createdAt: '2026-07-10',
    updatedAt: '2026-07-10'
  }
];

const mockTips: ParentingTip[] = [
  {
    id: 'tip-1',
    title: 'Seni Membangun Komunikasi Dua Arah & Positif dengan Anak Usia Sekolah',
    summary: 'Dengarkan aktif tanpa langsung menghakimi atau menyela saat anak bercerita tentang harinya di sekolah.',
    category: 'Komunikasi',
    ageRange: '6-12 Tahun',
    content: 'Anak usia sekolah sedang mengembangkan konsep diri dan identitas sosial. Ketika anak menyampaikan kekecewaannya di sekolah, gunakan pertanyaan terbuka seperti "Bagaimana perasaanmu saat itu?" alih-alih langsung memberikan instruksi atau teguran.',
    doList: [
      'Beri perhatian penuh (kontak mata, taruh HP saat anak bicara).',
      'Validasi emosi anak terlebih dahulu sebelum memberi masukan.',
      'Gunakan kata-kata "I-statement" seperti "Ibu senang melihatmu berusaha."'
    ],
    dontList: [
      'Menyela pembicaraan anak dengan ceramah panjang.',
      'Membandingkan anak dengan saudara atau temannya.',
      'Meremehkan perasaan anak ("Gitu aja kok sedih").'
    ]
  },
  {
    id: 'tip-2',
    title: 'Disiplin Positif Tanpa Bentakan & Tanpa Hukuman Fisik',
    summary: 'Fokus pada konsekuensi logis dan kesepakatan bersama yang disepakati secara hangat.',
    category: 'Disiplin Positif',
    ageRange: 'Semua Usia',
    content: 'Disiplin positif bertujuan mengajarkan anak tanggung jawab, bukan memunculkan rasa takut. Buat aturan rumah bersama anak dan tuliskan konsekuensi logis jika kesepakatan dilanggar.',
    doList: [
      'Sepakati aturan bersama anak saat suasana tenang.',
      'Berikan pujian langsung pada perilaku positif spesifik.',
      'Tetap tenang dan konsisten saat menegakkan konsekuensi.'
    ],
    dontList: [
      'Menaikkan nada suara atau membentak.',
      'Memberikan hukuman yang tidak relevan dengan pelanggaran.',
      'Melanggar aturan yang dibuat sendiri oleh orang tua.'
    ]
  },
  {
    id: 'tip-3',
    title: 'Mengatur Screen Time Sehat Tanpa Konflik & Tantrum',
    summary: 'Gunakan pengingat visual atau alarm bersama sebelum durasi layar berakhir.',
    category: 'Screen Time',
    ageRange: '5-12 Tahun',
    content: 'Menarik gadget secara mendadak sering memicu tantrum karena anak kaget. Gunakan strategi countdown (misal 5 menit lagi) dan siapkan kegiatan transisi yang menyenangkan.',
    doList: [
      'Atur timer alarm yang bunyinya disukai anak.',
      'Tentukan area bebas gadget di rumah (misal ruang makan & kamar tidur).',
      'Tunjukkan teladan positif dengan tidak terus menerus main HP.'
    ],
    dontList: [
      'Merebut HP dari tangan anak secara langsung.',
      'Membiarkan anak main HP 1 jam sebelum tidur.',
      'Jadikan screen time sebagai satu-satunya penenang saat anak bosan.'
    ]
  }
];

const mockInsights: ParentingInsight[] = [
  {
    id: 'ins-1',
    childId: 'child-1',
    date: '2026-07-31',
    title: 'Konsistensi Belajar & Keterampilan Mandiri Arsa Sangat Baik!',
    summary: 'Arsa telah menyelesaikan 85% tugas harian dan mempertahankan habit membaca selama 8 hari berturut-turut.',
    actionItems: [
      'Berikan apresiasi verbal atas usahanya menjaga kerapian meja belajar.',
      'Ajak Arsa berdiskusi tentang ide proyek Scratch atau ensiklopedia sains minggu ini.',
      'Jaga durasi tidur malam tetap sebelum pukul 21.00.'
    ],
    encouragementQuote: 'Pengasuhan dengan hangat dan konsistensi logis membentuk pondasi kemandirian seumur hidup anak.',
    category: 'Apresiasi & Motivasi'
  }
];

export const useParentingStore = create<ParentingStoreState>((set, get) => ({
  children: mockChildren,
  selectedChildId: 'm3',
  growthRecords: mockGrowthRecords,
  milestones: mockMilestones,
  dailyActivities: mockActivities,
  screenTimeRecords: mockScreenTime,
  habits: mockHabits,
  rewards: mockRewards,
  tasks: mockTasks,
  goals: mockGoals,
  parentNotes: mockParentNotes,
  tips: mockTips,
  insights: mockInsights,

  setSelectedChildId: (childId: string) => set({ selectedChildId: childId }),

  addChild: (childData) => set((state) => {
    const newId = `child-${Date.now()}`;
    const newChild: Child = {
      ...childData,
      id: newId,
      createdAt: new Date().toISOString()
    };
    const defaultReward: ChildRewardSystem = {
      childId: newId,
      totalPoints: 0,
      coins: 0,
      level: 1,
      levelTitle: 'Bintang Pemula Cilik',
      badges: []
    };
    return {
      children: [...state.children, newChild],
      selectedChildId: state.selectedChildId || newId,
      rewards: {
        ...state.rewards,
        [newId]: defaultReward
      }
    };
  }),

  updateChild: (id, childData) => set((state) => ({
    children: state.children.map((c) => (c.id === id ? { ...c, ...childData } : c))
  })),

  deleteChild: (id) => set((state) => ({
    children: state.children.filter((c) => c.id !== id),
    selectedChildId: state.selectedChildId === id ? (state.children.find((c) => c.id !== id)?.id || '') : state.selectedChildId
  })),

  addGrowthRecord: (record) => set((state) => {
    const newRecord: GrowthRecord = {
      ...record,
      id: `growth-${Date.now()}`
    };
    return { growthRecords: [newRecord, ...state.growthRecords] };
  }),

  updateMilestoneStatus: (id, status, notes) => set((state) => ({
    milestones: state.milestones.map((m) =>
      m.id === id
        ? {
            ...m,
            status,
            notes: notes !== undefined ? notes : m.notes,
            completedDate: status === 'Selesai' ? new Date().toISOString().split('T')[0] : m.completedDate
          }
        : m
    )
  })),

  addMilestone: (milestone) => set((state) => ({
    milestones: [
      { ...milestone, id: `ms-${Date.now()}` },
      ...state.milestones
    ]
  })),

  addDailyActivity: (activity) => set((state) => {
    const newAct: DailyActivity = {
      ...activity,
      id: `act-${Date.now()}`
    };
    return { dailyActivities: [newAct, ...state.dailyActivities] };
  }),

  addScreenTimeRecord: (record) => set((state) => {
    const newRec: ScreenTimeRecord = {
      ...record,
      id: `st-${Date.now()}`
    };
    return { screenTimeRecords: [newRec, ...state.screenTimeRecords] };
  }),

  toggleHabitCheckin: (habitId, dateStr) => set((state) => {
    const updatedHabits = state.habits.map((h) => {
      if (h.id !== habitId) return h;
      const alreadyCompleted = h.completedDates.includes(dateStr);
      let newDates: string[];
      let newStreak = h.currentStreak;

      if (alreadyCompleted) {
        newDates = h.completedDates.filter((d) => d !== dateStr);
        newStreak = Math.max(0, newStreak - 1);
      } else {
        newDates = [...h.completedDates, dateStr];
        newStreak = newStreak + 1;
      }

      return {
        ...h,
        completedDates: newDates,
        currentStreak: newStreak,
        bestStreak: Math.max(h.bestStreak, newStreak)
      };
    });

    // Also award points if checked in
    const targetHabit = state.habits.find((h) => h.id === habitId);
    if (targetHabit && !targetHabit.completedDates.includes(dateStr)) {
      const childId = targetHabit.childId;
      const currentReward = state.rewards[childId];
      if (currentReward) {
        const updatedPoints = currentReward.totalPoints + targetHabit.pointReward;
        const updatedCoins = currentReward.coins + Math.floor(targetHabit.pointReward / 2);
        state.rewards[childId] = {
          ...currentReward,
          totalPoints: updatedPoints,
          coins: updatedCoins
        };
      }
    }

    return { habits: updatedHabits, rewards: { ...state.rewards } };
  }),

  addHabit: (habit) => set((state) => ({
    habits: [
      ...state.habits,
      {
        ...habit,
        id: `hb-${Date.now()}`,
        currentStreak: 0,
        bestStreak: 0,
        completedDates: []
      }
    ]
  })),

  addTask: (task) => set((state) => ({
    tasks: [
      ...state.tasks,
      {
        ...task,
        id: `task-${Date.now()}`,
        completed: false
      }
    ]
  })),

  toggleTaskCompleted: (taskId) => set((state) => {
    let childIdToReward = '';
    let pointsToAdd = 0;

    const updatedTasks = state.tasks.map((t) => {
      if (t.id === taskId) {
        const nextCompleted = !t.completed;
        if (nextCompleted) {
          childIdToReward = t.childId;
          pointsToAdd = t.pointReward;
        }
        return {
          ...t,
          completed: nextCompleted,
          completedAt: nextCompleted ? new Date().toISOString() : undefined
        };
      }
      return t;
    });

    if (childIdToReward && pointsToAdd > 0) {
      const rewardSystem = state.rewards[childIdToReward];
      if (rewardSystem) {
        state.rewards[childIdToReward] = {
          ...rewardSystem,
          totalPoints: rewardSystem.totalPoints + pointsToAdd,
          coins: rewardSystem.coins + Math.floor(pointsToAdd / 2)
        };
      }
    }

    return { tasks: updatedTasks, rewards: { ...state.rewards } };
  }),

  deleteTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter((t) => t.id !== taskId)
  })),

  addGoal: (goal) => set((state) => ({
    goals: [
      ...state.goals,
      {
        ...goal,
        id: `gl-${Date.now()}`,
        status: goal.currentValue >= goal.targetValue ? 'Achieved' : 'In Progress'
      }
    ]
  })),

  updateGoalProgress: (goalId, newValue) => set((state) => ({
    goals: state.goals.map((g) => {
      if (g.id === goalId) {
        const updatedVal = Math.max(0, newValue);
        return {
          ...g,
          currentValue: updatedVal,
          status: updatedVal >= g.targetValue ? 'Achieved' : 'In Progress'
        };
      }
      return g;
    })
  })),

  addParentNote: (note) => set((state) => ({
    parentNotes: [
      {
        ...note,
        id: `pnote-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      },
      ...state.parentNotes
    ]
  })),

  updateParentNote: (id, noteData) => set((state) => ({
    parentNotes: state.parentNotes.map((pn) =>
      pn.id === id
        ? {
            ...pn,
            ...noteData,
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : pn
    )
  })),

  deleteParentNote: (id) => set((state) => ({
    parentNotes: state.parentNotes.filter((pn) => pn.id !== id)
  })),

  addInsight: (insight) => set((state) => ({
    insights: [{ ...insight, id: `ins-${Date.now()}` }, ...state.insights]
  })),

  // Export summary getter for Prompt 8 (AI Education Center Integration)
  getChildEducationSummary: (childId: string): ChildEducationSummary => {
    const state = get();
    const child = state.children.find((c) => c.id === childId) || state.children[0];
    const learningActivities = state.dailyActivities.filter(
      (a) => a.childId === childId && (a.category === 'Belajar' || a.category === 'Membaca')
    );
    const totalLearningMinutes = learningActivities.reduce((acc, curr) => acc + curr.durationMinutes, 0);

    const bookGoal = state.goals.find((g) => g.childId === childId && g.title.toLowerCase().includes('buku'));
    const booksReadCount = bookGoal ? bookGoal.currentValue : 7;

    const childHabits = state.habits.filter((h) => h.childId === childId);
    const completedCount = childHabits.filter((h) => h.completedDates.length > 0).length;
    const habitCompletionRate = childHabits.length > 0 ? Math.round((completedCount / childHabits.length) * 100) : 80;

    return {
      childId: child?.id || childId,
      childName: child?.name || 'Anak',
      age: child?.age || 10,
      grade: child?.grade || 'Kelas 5 SD',
      totalLearningMinutesThisWeek: totalLearningMinutes,
      booksReadCount,
      activeAcademicGoals: state.goals.filter((g) => g.childId === childId),
      recentActivities: learningActivities,
      habitCompletionRate
    };
  }
}));
