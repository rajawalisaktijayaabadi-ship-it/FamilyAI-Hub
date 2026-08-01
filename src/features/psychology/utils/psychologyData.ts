import { 
  WellnessScore, 
  Assessment, 
  AssessmentResult, 
  CommunicationSuggestion, 
  ConflictCase, 
  CoupleRelationshipSummary, 
  ParentingSummary, 
  TeenSupport, 
  SeniorCare, 
  Challenge, 
  Achievement, 
  ReflectionJournal, 
  WellnessReport 
} from '../types/psychologyTypes';

export const INITIAL_WELLNESS_SCORE: WellnessScore = {
  overallScore: 86,
  communicationScore: 88,
  qualityTimeScore: 82,
  stressIndicator: 24, // Low stress
  relationshipHealth: 90,
  weeklyChange: 4.2,
  monthlyChange: 8.5,
  breakdown: {
    moodCheckinScore: 88,
    qualityTimeScore: 85,
    familyActivityScore: 84,
    calendarActivityScore: 80,
    journalActivityScore: 90,
    communicationActivityScore: 89,
  },
};

export const INITIAL_ASSESSMENTS: Assessment[] = [
  {
    id: 'ass_comm',
    category: 'Communication',
    title: 'Evaluasi Keterbukaan & Komunikasi Empatis',
    description: 'Ukur seberapa terbuka dan efektif pola komunikasi antar anggota keluarga dalam menyampaikan emosi.',
    timeEstimate: '3 Menit',
    iconName: 'MessageCircle',
    questions: [
      {
        id: 'q1',
        text: 'Seberapa nyaman Anda menyampaikan perasaan kecewa atau cemas kepada pasangan / keluarga?',
        type: 'rating',
        minLabel: 'Sangat Canggung',
        maxLabel: 'Sangat Leluasa',
        minVal: 1,
        maxVal: 5,
      },
      {
        id: 'q2',
        text: 'Bagaimana perasaan Anda saat anggota keluarga lain sedang berbicara?',
        type: 'multiple_choice',
        options: [
          'Saya mendengarkan penuh perhatian tanpa memotong',
          'Saya sering tidak sabar ingin memberikan solusi',
          'Saya sering terdistraksi HP/gadget',
          'Saya cenderung bertahan dan membela diri'
        ]
      },
      {
        id: 'q3',
        text: 'Pilih emoji yang menggambarkan iklim diskusi rumah minggu ini:',
        type: 'emoji',
        options: ['😊 Hangat', '🤝 Empatis', '😐 Biasa', '⚡ Rusuh', '🤐 Tertutup']
      }
    ]
  },
  {
    id: 'ass_stress',
    category: 'Stress',
    title: 'Indikator Beban Kerja & Stress Keluarga',
    description: 'Deteksi dini akumulasi keletihan emosional dan tingkat ketegangan rumah tangga.',
    timeEstimate: '2 Menit',
    iconName: 'Activity',
    questions: [
      {
        id: 'q1',
        text: 'Seberapa sering Anda merasa kewalahan dengan tumpukan tugas harian?',
        type: 'slider',
        minLabel: 'Jarang Sekali',
        maxLabel: 'Hampir Setiap Hari',
        minVal: 1,
        maxVal: 10
      },
      {
        id: 'q2',
        text: 'Gejala ketegangan apa saja yang paling sering muncul minggu ini?',
        type: 'checkbox',
        options: [
          'Kualitas tidur menurun',
          'Mudah tersulut emosi kecil',
          'Sakit kepala / pegal pundak',
          'Sulit fokus',
          'Merasa tidak ada energi'
        ]
      }
    ]
  },
  {
    id: 'ass_time',
    category: 'Family Time',
    title: 'Penilaian Kualitas Waktu Bersama (Quality Time)',
    description: 'Analisis seberapa bermakna waktu yang dihabiskan bersama tanpa gangguan media.',
    timeEstimate: '3 Menit',
    iconName: 'Users',
    questions: [
      {
        id: 'q1',
        text: 'Berapa rata-rata waktu berkualitas tanpa gadget yang dihabiskan bersama keluarga setiap hari?',
        type: 'multiple_choice',
        options: ['Kurang dari 15 menit', '15 - 30 menit', '30 - 60 menit', 'Lebih dari 1 jam']
      }
    ]
  },
  {
    id: 'ass_worklife',
    category: 'Work-Life Balance',
    title: 'Keseimbangan Karir & Kehidupan Rumah',
    description: 'Ukur batas antara pekerjaan/sekolah dengan ruang waktu personal keluarga.',
    timeEstimate: '2 Menit',
    iconName: 'Briefcase',
    questions: [
      {
        id: 'q1',
        text: 'Apakah urusan pekerjaan sering membawa beban emosi negatif saat sampai di rumah?',
        type: 'rating',
        minLabel: 'Tidak Pernah',
        maxLabel: 'Sangat Sering',
        minVal: 1,
        maxVal: 5
      }
    ]
  },
  {
    id: 'ass_parenting',
    category: 'Parenting',
    title: 'Pola Pengasuhan Positif & Koneksi Anak',
    description: 'Evaluasi kehangatan, aturan konsisten, dan kedekatan emosional dengan anak.',
    timeEstimate: '3 Menit',
    iconName: 'Heart',
    questions: [
      {
        id: 'q1',
        text: 'Seberapa sering Anda memberikan pujian atas usaha/proses yang anak lakukan?',
        type: 'rating',
        minLabel: 'Jarang',
        maxLabel: 'Sangat Sering',
        minVal: 1,
        maxVal: 5
      }
    ]
  },
  {
    id: 'ass_relationship',
    category: 'Relationship',
    title: 'Kesehatan Hubungan Pasangan (Couple Bonding)',
    description: 'Menilai keintiman emosional, apresiasi harian, dan keselarasan tujuan bersama.',
    timeEstimate: '3 Menit',
    iconName: 'Sparkles',
    questions: [
      {
        id: 'q1',
        text: 'Seberapa sering Anda memberikan apresiasi kecil kepada pasangan setiap hari?',
        type: 'rating',
        minLabel: 'Jarang',
        maxLabel: 'Selalu',
        minVal: 1,
        maxVal: 5
      }
    ]
  },
  {
    id: 'ass_selfcare',
    category: 'Self Care',
    title: 'Kesejahteraan Diri & Amunisi Emosi',
    description: 'Pentingnya merawat diri sendiri agar dapat mengasuh keluarga dengan penuh kasih.',
    timeEstimate: '2 Menit',
    iconName: 'Smile',
    questions: [
      {
        id: 'q1',
        text: 'Apakah Anda memiliki waktu "Me Time" berkualitas minimal 20 menit sehari?',
        type: 'multiple_choice',
        options: ['Ya, rutin', 'Kadang-kadang', 'Hampir tidak pernah']
      }
    ]
  },
  {
    id: 'ass_sleep',
    category: 'Sleep Habit',
    title: 'Kualitas Tidur & Pemulihan Energi',
    description: 'Tidur adalah fondasi regulasi emosi dan kesabaran dalam keluarga.',
    timeEstimate: '2 Menit',
    iconName: 'Moon',
    questions: [
      {
        id: 'q1',
        text: 'Berapa jam rata-rata durasi tidur nyenyak Anda dalam semalam?',
        type: 'multiple_choice',
        options: ['< 5 jam', '5 - 6 jam', '7 - 8 jam', '> 8 jam']
      }
    ]
  },
  {
    id: 'ass_emotion',
    category: 'Emotion Awareness',
    title: 'Kesadaran Emosi (Emotional Literacy)',
    description: 'Kemampuan mengenali, menamai, dan merespons emosi secara bijak.',
    timeEstimate: '2 Menit',
    iconName: 'Brain',
    questions: [
      {
        id: 'q1',
        text: 'Saat emosi memuncak, apa reaksi pertama yang biasa Anda lakukan?',
        type: 'multiple_choice',
        options: [
          'Mengambil nafas dalam & jeda 10 detik',
          'Langsung mengekspresikan kekesalan',
          'Memilih diam dan memendam',
          'Pergi sejenak untuk menenangkan diri'
        ]
      }
    ]
  },
  {
    id: 'ass_gratitude',
    category: 'Gratitude',
    title: 'Rasa Syukur & Sikap Positif Keluarga',
    description: 'Ukur kebiasaan saling mengucapkan terima kasih dan merayakan momen kecil.',
    timeEstimate: '2 Menit',
    iconName: 'Sun',
    questions: [
      {
        id: 'q1',
        text: 'Seberapa sering keluarga mengadakan momen refleksi ucapan syukur bersama?',
        type: 'multiple_choice',
        options: ['Setiap malam', 'Seminggu sekali', 'Bila ada momen istimewa', 'Jarang sekali']
      }
    ]
  }
];

export const INITIAL_ASSESSMENT_RESULTS: AssessmentResult[] = [
  {
    id: 'res_1',
    assessmentId: 'ass_comm',
    category: 'Communication',
    score: 88,
    level: 'Sangat Baik',
    summary: 'Komunikasi keluarga tergolong sangat terbuka dan penuh empati. Anggota keluarga merasa aman mengekspresikan emosi.',
    recommendations: [
      'Pertahankan kebiasaan mendengarkan tanpa interupsi saat diskusi malam.',
      'Gunakan metode validasi emosi saat anak menceritakan kendala sekolahnya.'
    ],
    date: '2026-07-28'
  },
  {
    id: 'res_2',
    assessmentId: 'ass_stress',
    category: 'Stress',
    score: 82,
    level: 'Optimal',
    summary: 'Beban stress berada di level terkontrol. Tidak ada indikasi keletihan emosional kronis.',
    recommendations: [
      'Jaga keseimbangan antara jadwal kerja/sekolah dan sesi santai bersama.',
      'Lakukan sesi peregangan ringan 10 menit sebelum tidur.'
    ],
    date: '2026-07-25'
  }
];

export const INITIAL_COMMUNICATION_HISTORY: CommunicationSuggestion[] = [
  {
    id: 'comm_1',
    originalInput: 'Aku kesal sama kamu, kamu ga pernah perhatiin aku!',
    empathyRewrite: 'Aku merasa kesepian dan merindukan perhatianmu belakangan ini. Bisakah kita meluangkan waktu berdua malam ini?',
    tone: 'Empatis, Konstruktif, & Lembut',
    explanation: 'Mengubah tuduhan ("Kamu tidak pernah...") menjadi ungkapan perasaan diri ("Aku merasa...") mencegah respon defensif dari pasangan.',
    tips: [
      'Gunakan formula "Saya merasa [Emosi] saat [Situasi], karena [Kebutuhan Saya]"',
      'Hindari kata-kata mutlak seperti "tidak pernah" atau "selalu".'
    ],
    date: '2026-07-30'
  },
  {
    id: 'comm_2',
    originalInput: 'Kenapa sih main HP terus? Ga mikirin rumah tangga!',
    empathyRewrite: 'Sayang, aku butuh bantuanmu sebentar untuk mendampingi anak. Setelah itu, kamu bisa lanjut istirahat.',
    tone: 'Jelas, Spesifik, & Bebas Penghakiman',
    explanation: 'Menyampaikan permintaan bantuan spesifik lebih cepat menggerakkan pasangan ketimbang meluapkan kejengkolan.',
    tips: [
      'Ajukan permintaan tindakan nyata yang terukur.',
      'Apresiasi saat bantuan langsung direspon.'
    ],
    date: '2026-07-29'
  }
];

export const INITIAL_CONFLICT_CASES: ConflictCase[] = [
  {
    id: 'conf_1',
    title: 'Pengaturan Jam Malam & Penggunaan Gadget Anak Remaja',
    category: 'Parenting & Teen Boundaries',
    status: 'reflecting',
    participants: ['Ayah (Budi)', 'Rizky (Anak Remaja)'],
    reflectionNotes: 'Rizky merasa dikekang jam malamnya, sementara Ayah khawatir dengan keselamatan dan kesehatan tidur anak.',
    perspectives: {
      'Ayah (Budi)': 'Ingin Rizky belajar disiplin tidur sebelum jam 10 malam dan membatasi game online.',
      'Rizky': 'Merasa game online adalah sarana bersosialisasi dengan teman sebaya di sekolah.'
    },
    solutions: [
      'Kesepakatan jam bebas gadget dimulai pukul 21.30 pada hari sekolah.',
      'Akhir pekan diberikan kelonggaran hingga pukul 23.00 dengan syarat tugas sekolah selesai.'
    ],
    agreementNotes: 'Kedua belah pihak setuju mencoba aturan ini selama 2 minggu dan mengevaluasi bersama.',
    followUpDate: '2026-08-05',
    createdAt: '2026-07-27'
  }
];

export const INITIAL_COUPLE_DATA: CoupleRelationshipSummary = {
  communicationScore: 92,
  qualityTimeScore: 88,
  sharedActivities: ['Olahraga Pagi Sabtu', 'Kencan Malam Jumat', 'Merawat Tanaman'],
  goals: ['Liburan keluarga akhir tahun', 'Sesi ngobrol 15 menit setiap malam sebelum tidur'],
  anniversaryDate: '2026-10-15',
  daysToAnniversary: 76,
  relationshipInsight: 'Koneksi emosional pasangan berada dalam kondisi puncak. Saling apresiasi harian meningkatkan ketahanan terhadap kecemasan.'
};

export const INITIAL_PARENTING_DATA: ParentingSummary = {
  parentStressLevel: 3, // out of 10
  childInteractionScore: 88,
  learningTimeMinutes: 45,
  playTimeMinutes: 60,
  familyTimeMinutes: 90,
  tips: [
    'Berikan pelukan 20 detik kepada anak sebelum berangkat sekolah untuk memicu hormon oksitosin.',
    'Dengarkan cerita anak dengan kontak mata penuh tanpa memegang gadget.'
  ]
};

export const INITIAL_REFLECTIONS: ReflectionJournal[] = [
  {
    id: 'ref_1',
    memberName: 'Budi Santoso',
    date: '2026-07-31',
    bestThing: 'Makan malam bersama seluruh keluarga dan melihat Rizky tersenyum gembira saat dipuji.',
    gratitude: 'Bersyukur atas kesehatan seluruh anggota keluarga dan suasana rumah yang damai.',
    improvement: 'Ingin mengurangi kebiasaan memeriksa email pekerjaan setelah pukul 20.00.',
    tomorrowTarget: 'Mengajak Siti jalan pagi santai 20 menit sebelum berangkat kantor.',
    privacy: 'family_only',
    createdAt: '2026-07-31'
  }
];

export const INITIAL_TEEN_DATA: TeenSupport = {
  reflectionJournals: INITIAL_REFLECTIONS,
  goalSetting: [
    'Meningkatkan nilai ujian Matematika semester ini',
    'Belajar mengatur waktu latihan basket dan tugas sekolah'
  ],
  stressTips: [
    'Metode 4-7-8 Breathing saat merasa kewalahan menjelang kuis.',
    'Dengarkan musik lo-fi tenang selama 15 menit saat istirahat.'
  ],
  studyBalanceScore: 85,
  motivationQuote: '"Setiap usaha kecil hari ini adalah investasi untuk masa depan yang gemilang."'
};

export const INITIAL_SENIOR_CARE: SeniorCare = {
  moodSummary: 'Oma Nani merasa gembira dan diperhatikan minggu ini. Interaksi dengan cucu meningkatkan semangat hidup.',
  activityReminders: [
    { id: 'act_1', title: 'Jalan Santai Taman Pagi', time: '06:30 WIB', done: true },
    { id: 'act_2', title: 'Senam Lansia Ringan', time: '16:00 WIB', done: false }
  ],
  medicineReminders: [
    { id: 'med_1', name: 'Vitamin D3 & Kalsium', dosage: '1 Tablet', time: '08:00 WIB', taken: true },
    { id: 'med_2', name: 'Suplemen Sendi', dosage: '1 Kapsul', time: '19:00 WIB', taken: false }
  ],
  familyVisitReminder: 'Sesi kumpul hangat keluarga hari Minggu pukul 11:00 WIB di ruang tengah.',
  memoryActivities: ['Menebak foto album keluarga lama', 'Menyusun puzzle 50 potong bersama cucu']
};

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'chal_1',
    title: '7 Hari Quality Time Tanpa Gadget',
    description: 'Luangkan waktu 30 menit setiap malam untuk berbincang atau bermain game board bersama tanpa layar gadget.',
    durationDays: 7,
    category: 'Family Bonding',
    rewardPoints: 250,
    badgeName: 'Family Hero',
    completedDays: 5,
    status: 'active'
  },
  {
    id: 'chal_2',
    title: 'Makan Malam Bebas HP (No Gadget Dinner)',
    description: 'Seluruh anggota keluarga meletakkan HP di kotak khusus selama jam makan malam.',
    durationDays: 5,
    category: 'Communication',
    rewardPoints: 150,
    badgeName: 'Healthy Communication',
    completedDays: 5,
    status: 'completed'
  },
  {
    id: 'chal_3',
    title: 'Pekan Saling Apresiasi (Gratitude Week)',
    description: 'Ucapkan 1 kalimat apresiasi tulus kepada pasangan atau anak setiap hari.',
    durationDays: 7,
    category: 'Relationship',
    rewardPoints: 200,
    badgeName: 'Supportive Partner',
    completedDays: 2,
    status: 'active'
  },
  {
    id: 'chal_4',
    title: 'Olahraga Pagi Keluarga (Outdoor Activity)',
    description: 'Jalan sehat atau bersepeda bersama di hari Sabtu/Minggu pagi selama 45 menit.',
    durationDays: 2,
    category: 'Health & Joy',
    rewardPoints: 180,
    badgeName: 'Weekly Champion',
    completedDays: 0,
    status: 'available'
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach_1',
    title: 'Healthy Communication',
    badgeIcon: 'MessageCircle',
    description: 'Menyelesaikan tantangan 5 hari komunikasi terbuka dan saling mendengarkan tanpa interupsi.',
    category: 'Komunikasi',
    unlocked: true,
    unlockedDate: '2026-07-28'
  },
  {
    id: 'ach_2',
    title: 'Family Hero',
    badgeIcon: 'ShieldCheck',
    description: 'Aktif menjaga iklim kebahagiaan dan kehangatan keluarga selama 30 hari berturut-turut.',
    category: 'Kesejahteraan',
    unlocked: true,
    unlockedDate: '2026-07-30'
  },
  {
    id: 'ach_3',
    title: 'Positive Parent',
    badgeIcon: 'Heart',
    description: 'Menerapkan gaya pengasuhan suportif dan menyelesaikan 3 asesmen pengasuhan anak.',
    category: 'Parenting',
    unlocked: true,
    unlockedDate: '2026-07-25'
  },
  {
    id: 'ach_4',
    title: 'Good Listener',
    badgeIcon: 'Smile',
    description: 'Menggunakan fitur Communication Coach untuk memperbaiki pola tutur kata dalam diskusi keluarga.',
    category: 'Empati',
    unlocked: true,
    unlockedDate: '2026-07-29'
  },
  {
    id: 'ach_5',
    title: 'Supportive Partner',
    badgeIcon: 'Sparkles',
    description: 'Melakukan kencan berkualitas dan menjaga keharmonisan pasangan suami istri.',
    category: 'Relationship',
    unlocked: false
  },
  {
    id: 'ach_6',
    title: 'Weekly Champion',
    badgeIcon: 'Trophy',
    description: 'Menyelesaikan seluruh tantangan mingguan keluarga dengan nilai sempurna.',
    category: 'Gamifikasi',
    unlocked: false
  }
];

export const INITIAL_WELLNESS_REPORTS: WellnessReport[] = [
  {
    period: 'weekly',
    dateRange: '24 Juli - 30 Juli 2026',
    familyWellnessSummary: 'Indeks kesejahteraan keluarga berada di tingkat Sangat Sehat (86/100). Terjadi peningkatan kehangatan komunikasi dan penurunan tingkat stress sebesar 12%.',
    communicationSummary: 'Sesi mendengarkan aktif meningkat 25%. Penggunaan nada lembut dan empati berhasil meredakan potensi konflik remaja.',
    relationshipSummary: 'Harmonisasi pasangan suami istri tetap tinggi dengan penguatan momen kencan dan kesepakatan bersama.',
    qualityTimeSummary: 'Total waktu bebas gadget bersama keluarga mencapai 5.5 jam dalam seminggu.',
    highlights: [
      'Menyelesaikan Tantangan No Gadget Dinner 5 hari berturut-turut',
      'Peningkatan rasa syukur harian dalam jurnal refleksi emosional',
      'Resolusi terbuka mengenai batas jam malam anak remaja'
    ]
  },
  {
    period: 'monthly',
    dateRange: 'Juli 2026',
    familyWellnessSummary: 'Secara bulanan, kestabilan emosi keluarga mengalami tren positif berlanjut (+8.5%).',
    communicationSummary: 'Tidak ada sengketa emosi berkepanjangan. Semua gesekan terselesaikan dalam waktu kurang dari 24 jam.',
    relationshipSummary: 'Pasangan berhasil merealisasikan 2 target komunikasi dan menjaga momen apresiasi harian.',
    qualityTimeSummary: 'Rata-rata waktu berkualitas keluarga: 45 menit/hari.',
    highlights: [
      'Pencapaian Badge Healthy Communication & Family Hero',
      'Pelaksanaan kuis kognitif dan memori lansia secara konsisten'
    ]
  }
];
