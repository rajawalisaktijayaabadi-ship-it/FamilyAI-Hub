import { SupportedMoodType, MoodMeta, FamilyMemberMood, MoodJournal, MoodInsight, MoodRecommendation, MoodReminder, WellbeingScore, DailyCheckIn } from '../types/moodTypes';

export const MOOD_META_MAP: Record<SupportedMoodType, MoodMeta> = {
  very_happy: {
    type: 'very_happy',
    label: 'Sangat Bahagia',
    emoji: '😀',
    color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
    bgGlow: 'from-emerald-500/20 to-teal-600/10',
    category: 'positive'
  },
  happy: {
    type: 'happy',
    label: 'Bahagia',
    emoji: '😊',
    color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
    bgGlow: 'from-emerald-500/20 to-green-600/10',
    category: 'positive'
  },
  calm: {
    type: 'calm',
    label: 'Tenang',
    emoji: '🙂',
    color: 'text-sky-400 border-sky-500/40 bg-sky-500/10',
    bgGlow: 'from-sky-500/20 to-indigo-600/10',
    category: 'positive'
  },
  neutral: {
    type: 'neutral',
    label: 'Netral',
    emoji: '😐',
    color: 'text-slate-300 border-slate-700 bg-slate-800/50',
    bgGlow: 'from-slate-700/20 to-slate-800/10',
    category: 'neutral'
  },
  sad: {
    type: 'sad',
    label: 'Sedih',
    emoji: '😔',
    color: 'text-indigo-400 border-indigo-500/40 bg-indigo-500/10',
    bgGlow: 'from-indigo-500/20 to-purple-600/10',
    category: 'negative'
  },
  very_sad: {
    type: 'very_sad',
    label: 'Sangat Sedih',
    emoji: '😢',
    color: 'text-blue-400 border-blue-500/40 bg-blue-500/10',
    bgGlow: 'from-blue-600/20 to-indigo-700/10',
    category: 'negative'
  },
  anxious: {
    type: 'anxious',
    label: 'Cemas',
    emoji: '😰',
    color: 'text-purple-400 border-purple-500/40 bg-purple-500/10',
    bgGlow: 'from-purple-500/20 to-pink-600/10',
    category: 'negative'
  },
  worried: {
    type: 'worried',
    label: 'Khawatir',
    emoji: '😟',
    color: 'text-amber-400 border-amber-500/40 bg-amber-500/10',
    bgGlow: 'from-amber-500/20 to-orange-600/10',
    category: 'negative'
  },
  angry: {
    type: 'angry',
    label: 'Marah',
    emoji: '😡',
    color: 'text-rose-400 border-rose-500/40 bg-rose-500/10',
    bgGlow: 'from-rose-500/20 to-red-600/10',
    category: 'negative'
  },
  tired: {
    type: 'tired',
    label: 'Lelah',
    emoji: '😴',
    color: 'text-slate-400 border-slate-600 bg-slate-800/60',
    bgGlow: 'from-slate-800/40 to-slate-900/20',
    category: 'energy'
  },
  unwell: {
    type: 'unwell',
    label: 'Kurang Fit',
    emoji: '🤒',
    color: 'text-orange-400 border-orange-500/40 bg-orange-500/10',
    bgGlow: 'from-orange-500/20 to-amber-600/10',
    category: 'energy'
  },
  grateful: {
    type: 'grateful',
    label: 'Bersyukur',
    emoji: '😍',
    color: 'text-pink-400 border-pink-500/40 bg-pink-500/10',
    bgGlow: 'from-pink-500/20 to-rose-600/10',
    category: 'positive'
  },
  excited: {
    type: 'excited',
    label: 'Semangat',
    emoji: '🥳',
    color: 'text-yellow-400 border-yellow-500/40 bg-yellow-500/10',
    bgGlow: 'from-yellow-500/20 to-amber-600/10',
    category: 'energy'
  },
  custom: {
    type: 'custom',
    label: 'Custom Mood',
    emoji: '✨',
    color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10',
    bgGlow: 'from-cyan-500/20 to-blue-600/10',
    category: 'neutral'
  }
};

export const INITIAL_WELLBEING_SCORE: WellbeingScore = {
  happinessScore: 88,
  stabilityIndex: 94,
  familyHarmonyScore: 92,
  stressLevelAvg: 2.8,
  energyAvg: 8.2,
  sleepAvg: 4.5,
  statusLabel: 'Sangat Stabil',
  lastUpdated: 'Hari ini, 19:30'
};

export const INITIAL_FAMILY_MOODS: FamilyMemberMood[] = [
  {
    memberId: 'mem_1',
    memberName: 'Budi Santoso',
    detailedRole: 'Ayah',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    currentMood: 'grateful',
    moodLabel: 'Bersyukur & Tenang',
    emoji: '😍',
    energyLevel: 9,
    stressLevel: 2,
    statusBadge: 'Happy',
    lastCheckIn: '10 menit yang lalu',
    todayNote: 'Project kantor selesai lancar dan sempat jogging pagi.',
    privacySetting: 'family_only'
  },
  {
    memberId: 'mem_2',
    memberName: 'Siti Rahma',
    detailedRole: 'Ibu',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    currentMood: 'excited',
    moodLabel: 'Semangat & Bahagia',
    emoji: '🥳',
    energyLevel: 8,
    stressLevel: 3,
    statusBadge: 'Energetic',
    lastCheckIn: '1 jam yang lalu',
    todayNote: 'Masakan makan siang keluarga disukai anak-anak.',
    privacySetting: 'family_only'
  },
  {
    memberId: 'mem_3',
    memberName: 'Rizky Santoso',
    detailedRole: 'Anak (Sulung)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    currentMood: 'anxious',
    moodLabel: 'Cemas Ujian Matematika',
    emoji: '😰',
    energyLevel: 6,
    stressLevel: 7,
    statusBadge: 'Need Support',
    lastCheckIn: '2 jam yang lalu',
    todayNote: 'Besok ada ujian Matematika semester, butuh bimbingan Ayah.',
    privacySetting: 'parent_only'
  },
  {
    memberId: 'mem_4',
    memberName: 'Nenek Aminah',
    detailedRole: 'Nenek',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150',
    currentMood: 'calm',
    moodLabel: 'Tenang & Nyaman',
    emoji: '🙂',
    energyLevel: 7,
    stressLevel: 1,
    statusBadge: 'Calm',
    lastCheckIn: '3 jam yang lalu',
    todayNote: 'Jalan santai di taman depan rumah terasa menyegarkan.',
    privacySetting: 'family_only'
  }
];

export const INITIAL_INSIGHTS: MoodInsight[] = [
  {
    id: 'ins_1',
    type: 'productivity',
    title: 'Lonjakan Energi Positif Minggu Ini',
    description: 'Kamu terlihat 35% lebih produktif dan gembira dibanding minggu lalu berkat olahraga pagi teratur.',
    suggestion: 'Pertahankan rutinitas jalan pagi 15 menit bersama keluarga.',
    confidence: 96,
    date: 'Hari ini',
    iconType: 'sparkles'
  },
  {
    id: 'ins_2',
    type: 'fatigue',
    title: 'Indikasi Kelelahan Ringan di Malam Hari',
    description: 'Dua hari terakhir skor energi malam hari turun ke skala 4/10.',
    suggestion: 'Luangkan waktu istirahat tanpa layar HP 30 menit sebelum tidur.',
    confidence: 91,
    date: 'Kemarin',
    iconType: 'moon'
  },
  {
    id: 'ins_3',
    type: 'stress',
    title: 'Lampu Kuning Emosional Anak (Rizky)',
    description: 'Tingkat cemas Rizky meningkat menjelang jadwal ujian esok hari.',
    suggestion: 'Berikan semangat dan ajak diskusi santai malam ini tanpa memberi tekanan hasil.',
    confidence: 94,
    date: 'Hari ini',
    iconType: 'heart'
  }
];

export const INITIAL_RECOMMENDATIONS: MoodRecommendation[] = [
  {
    id: 'rec_1',
    category: 'meditation',
    title: 'Sesi Pernapasan 4-7-8 Rileksasi',
    description: 'Latihan pernapasan dalam 5 menit untuk menurunkan detak jantung dan meredakan rasa cemas.',
    estimatedMinutes: 5,
    actionText: 'Mulai Meditasi',
    tag: 'Rileksasi Cepat',
    icon: 'wind'
  },
  {
    id: 'rec_2',
    category: 'family_time',
    title: 'Quality Time Teh Hangat Keluarga',
    description: 'Duduk bersama 15 menit tanpa gadget sambil berbagi momen terbaik hari ini.',
    estimatedMinutes: 15,
    actionText: 'Jadwalkan di Kalender',
    tag: 'Koneksi Emosional',
    icon: 'users'
  },
  {
    id: 'rec_3',
    category: 'exercise',
    title: 'Peregangan Bahu & Punggung 10 Menit',
    description: 'Atasi ketegangan otot akibat bekerja di depan laptop seharian.',
    estimatedMinutes: 10,
    actionText: 'Lihat Panduan',
    tag: 'Kesehatan Fisik',
    icon: 'activity'
  },
  {
    id: 'rec_4',
    category: 'sleep',
    title: 'Mode Tiga Jam Bebas Layar Digital',
    description: 'Matikan notifikasi pekerjaan agar kualitas tidur REM meningkat malam ini.',
    estimatedMinutes: 180,
    actionText: 'Aktifkan Reminder',
    tag: 'Kualitas Tidur',
    icon: 'moon'
  }
];

export const INITIAL_JOURNALS: MoodJournal[] = [
  {
    id: 'j_1',
    memberId: 'mem_1',
    memberName: 'Budi Santoso',
    memberRole: 'Ayah',
    memberAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    title: 'Rasa Syukur Pekerjaan & Kebersamaan Pagi',
    content: 'Pagi ini sempat sarapan pancake hangat buatan Ibu dan mengantar Rizky sekolah. Rasanya sangat berharga karena pekerjaan kantor minggu ini terasa lebih tertata.',
    mood: 'grateful',
    tags: ['Keluarga', 'Sarapan', 'Bersyukur', 'Kantor'],
    date: '2026-07-31',
    timestamp: '08:30',
    privacy: 'family_only',
    aiGuidance: 'Momen sarapan bersama merupakan jangkar emosional terkuat untuk menjaga kestabilan suasana hati sepanjang hari.',
    isFavorite: true
  },
  {
    id: 'j_2',
    memberId: 'mem_2',
    memberName: 'Siti Rahma',
    memberRole: 'Ibu',
    memberAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    title: 'Resep Baru & Senyuman Keluarga',
    content: 'Mencoba resep sup iga baru dan seluruh porsi habis disantap. Melihat tawa keluarga saat makan siang menghilangkan rasa lelah memasak.',
    mood: 'excited',
    tags: ['Memasak', 'Resep', 'Bahagia', 'Keluarga'],
    date: '2026-07-30',
    timestamp: '13:15',
    privacy: 'family_only',
    aiGuidance: 'Ekspresi cinta melalui masakan terbukti meningkatkan kepuasan hubungan domestik secara signifikan.',
    isFavorite: false
  }
];

export const INITIAL_CHECKINS: DailyCheckIn[] = [
  {
    id: 'chk_1',
    memberId: 'mem_1',
    memberName: 'Budi Santoso',
    memberRole: 'Ayah',
    memberAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    date: '2026-07-31',
    timestamp: '19:30',
    mood: 'grateful',
    energyLevel: 9,
    stressLevel: 2,
    sleepQuality: 5,
    sleepHours: 7.5,
    activities: ['Olahraga', 'Kerja', 'Waktu Keluarga'],
    note: 'Hari yang sangat seimbang dan produktif.',
    gratitudeItems: [
      'Kesehatan keluarga tercukupi',
      'Anak-anak riang dan santun',
      'Tim kantor sangat kooperatif'
    ],
    todayGoal: 'Selesaikan laporan bulanan dan luangkan waktu membaca buku.',
    privacy: 'family_only',
    aiReflectionNote: 'Kombinasi energi tinggi dan tidur nyenyak 7.5 jam menghasilkan kestabilan emosi puncak hari ini.'
  }
];

export const INITIAL_REMINDERS: MoodReminder[] = [
  {
    id: 'rem_1',
    title: 'Daily Check-in Mood Pagi',
    type: 'fill_mood',
    time: '08:00',
    enabled: true,
    days: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    description: 'Catat perasaan dan energi kamu untuk memulai hari dengan mindful.'
  },
  {
    id: 'rem_2',
    title: 'Istirahat Mata & Minum Air Putih',
    type: 'drink_water',
    time: '14:00',
    enabled: true,
    days: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum'],
    description: 'Istirahatkan mata dari monitor selama 5 menit & hidrasi tubuh.'
  },
  {
    id: 'rem_3',
    title: 'Sesi Meditasi & Pernapasan Malam',
    type: 'meditation',
    time: '21:00',
    enabled: true,
    days: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    description: 'Rilekskan pikiran dengan 5 menit panduan pernapasan tenang.'
  }
];
