import { create } from 'zustand';
import { 
  AIBriefing, 
  AIRecommendation, 
  AIInsight, 
  AITask, 
  AINotification,
  PrivacyLevel 
} from '../../../types/aiSuperAssistant';

interface AIState {
  todayBriefing: AIBriefing;
  recommendations: AIRecommendation[];
  priorities: { id: string; title: string; category: string; priority: 'Tinggi' | 'Sedang' | 'Biasa'; isDone: boolean }[];
  notifications: AINotification[];
  aiConfidenceScore: number;
  familyWellnessScore: number;
  isGeneratingAI: boolean;
  
  // Actions
  togglePriority: (id: string) => void;
  markRecommendationApplied: (id: string) => void;
  markNotificationRead: (id: string) => void;
  refreshSuperAIDashboard: () => Promise<void>;
}

export const useAIStore = create<AIState>((set, get) => ({
  familyWellnessScore: 88,
  aiConfidenceScore: 96,
  isGeneratingAI: false,

  todayBriefing: {
    id: 'briefing-1',
    date: new Date().toISOString().split('T')[0],
    greetingText: 'Selamat Pagi Keluarga Sastro! Hari ini kondisi energi keluarga sangat optimal.',
    bulletBriefings: [
      'Hari ini anak memiliki ujian Matematika di sekolah (09:00 WIB).',
      'Persediaan susu kalsium dan beras di pantry tinggal sedikit (3 hari tersisa).',
      'Besok premi asuransi kesehatan keluarga jatuh tempo pembayaran (Rp 1.250.000).',
      'Target aktivitas jalan santai keluarga tercapai 85% minggu ini.'
    ],
    decisionSupportNotes: [
      { topic: 'Liburan Keluarga Semester', recommendation: 'Kondisi keuangan mendukung target liburan ke Bali tetap berjalan sesuai anggaran.', status: 'Aman' },
      { topic: 'Anggaran Kuliner Bulan Ini', recommendation: 'Pengeluaran makan luar mencapai 78% dari batas maksimal. Disarankan menambah menu masakan rumah.', status: 'Perhatian' },
      { topic: 'Jadwal Istirahat Anak', recommendation: 'Jam tidur anak rata-rata 7.2 jam dalam 3 hari terakhir. Disarankan batasi gawai jam 20:00.', status: 'Perhatian' }
    ],
    wellnessScore: 88,
    aiConfidenceScore: 96
  },

  recommendations: [
    {
      id: 'rec-1',
      category: 'Health',
      title: 'Tingkatkan Asupan Serat & Buah Segar Anak',
      description: 'Data konsumsi minggu ini menunjukkan kurangnya variasi buah segar pada menu makan malam.',
      actionableSteps: ['Beli pisang, apel, dan naga pada belanja besok', 'Sajikan smoothie buah pada sarapan pagi'],
      impactLevel: 'Tinggi',
      suggestedBy: 'AI Core',
      createdAt: new Date().toISOString(),
      isApplied: false,
      relatedModule: 'Meal Planner & Health'
    },
    {
      id: 'rec-2',
      category: 'Finance',
      title: 'Alokasi Tabungan Otomatis 15% dari Sisa Anggaran',
      description: 'Ada surplus anggaran belanja sebesar Rp 650.000 dari minggu lalu.',
      actionableSteps: ['Pindahkan Rp 500.000 ke dana darurat', 'Simpan Rp 150.000 untuk cadangan kas'],
      impactLevel: 'Tinggi',
      suggestedBy: 'Gemini Engine',
      createdAt: new Date().toISOString(),
      isApplied: false,
      relatedModule: 'Finance'
    },
    {
      id: 'rec-3',
      category: 'Shopping',
      title: 'Beli Susu & Bahan Pokok Sebelum Harga Naik',
      description: 'Stok susu kalsium tersisa 1 kotak. Supermarket pilihan sedang promo diskon 15% hingga besok.',
      actionableSteps: ['Tambahkan susu kalsium ke daftar belanjaan', 'Manfaatkan voucher diskon toko'],
      impactLevel: 'Sedang',
      suggestedBy: 'AI Core',
      createdAt: new Date().toISOString(),
      isApplied: false,
      relatedModule: 'Shopping & Inventory'
    },
    {
      id: 'rec-4',
      category: 'Education',
      title: 'Review Simulasi Soal Matematika Anak 30 Menit',
      description: 'Ujian sekolah besok membutuhkan latihan logika aljabar dasar.',
      actionableSteps: ['Buka modul Kuis Matematika AI', 'Lakukan sesi review jam 19:00 WIB'],
      impactLevel: 'Tinggi',
      suggestedBy: 'AI Core',
      createdAt: new Date().toISOString(),
      isApplied: false,
      relatedModule: 'Education'
    }
  ],

  priorities: [
    { id: 'prio-1', title: 'Persiapkan perlengkapan ujian Matematika anak', category: 'Edukasi', priority: 'Tinggi', isDone: false },
    { id: 'prio-2', title: 'Bayar premi asuransi kesehatan sebelum besok', category: 'Asuransi', priority: 'Tinggi', isDone: false },
    { id: 'prio-3', title: 'Beli stok susu dan sayuran segar di minimarket', category: 'Belanja', priority: 'Sedang', isDone: false },
    { id: 'prio-4', title: 'Konfirmasi reservasi penginapan liburan keluarga', category: 'Travel', priority: 'Biasa', isDone: true }
  ],

  notifications: [
    { id: 'notif-1', title: 'Jadwal Ujian Anak Hari Ini', message: 'Ujian Matematika anak dimulai pukul 09:00 WIB. Jangan lupa bawa pensil 2B.', priority: 'Critical', timestamp: '10 menit lalu', isRead: false },
    { id: 'notif-2', title: 'Pengingat Premi Asuransi', message: 'Premi asuransi kesehatan senilai Rp 1.250.000 jatuh tempo besok.', priority: 'Important', timestamp: '1 jam lalu', isRead: false },
    { id: 'notif-3', title: 'Saran Menu Makan Malam', message: 'AI menyarankan Sup Ayam Brokoli hangat untuk stamina keluarga.', priority: 'Suggestion', timestamp: '3 jam lalu', isRead: true }
  ],

  togglePriority: (id) =>
    set((state) => ({
      priorities: state.priorities.map((p) => (p.id === id ? { ...p, isDone: !p.isDone } : p))
    })),

  markRecommendationApplied: (id) =>
    set((state) => ({
      recommendations: state.recommendations.map((r) => (r.id === id ? { ...r, isApplied: true } : r))
    })),

  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    })),

  refreshSuperAIDashboard: async () => {
    set({ isGeneratingAI: true });
    try {
      const response = await fetch('/api/ai/super-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ familyData: { status: 'refresh' } })
      });
      if (response.ok) {
        const data = await response.json();
        set((state) => ({
          todayBriefing: {
            ...state.todayBriefing,
            greetingText: data.todaysSummary || state.todayBriefing.greetingText,
            bulletBriefings: data.briefingNotes || state.todayBriefing.bulletBriefings,
            wellnessScore: data.wellnessScore || 88,
            aiConfidenceScore: data.confidenceScore || 96
          },
          familyWellnessScore: data.wellnessScore || 88,
          aiConfidenceScore: data.confidenceScore || 96
        }));
      }
    } catch (e) {
      console.warn('AI API fallback to local core', e);
    } finally {
      set({ isGeneratingAI: false });
    }
  }
}));
