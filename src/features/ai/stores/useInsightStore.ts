import { create } from 'zustand';
import { AIInsight, AIGoal, AIHabit, AIReport } from '../../../types/aiSuperAssistant';

interface InsightState {
  insights: AIInsight[];
  goals: AIGoal[];
  habits: AIHabit[];
  reports: AIReport[];
  
  // Actions
  addGoal: (goal: Omit<AIGoal, 'id' | 'currentValue' | 'status'>) => void;
  updateGoalProgress: (id: string, newValue: number) => void;
  incrementHabitStreak: (id: string) => void;
  generateReportNow: (reportType: AIReport['reportType']) => void;
}

export const useInsightStore = create<InsightState>((set, get) => ({
  insights: [
    {
      id: 'ins-1',
      title: 'Optimalisasi Anggaran Dapur & Konsumsi Protein',
      category: 'Finance',
      type: 'positive_pattern',
      description: 'Hemat 14% biaya belanja makanan dibanding bulan lalu dengan tingkat kepuasan menu 92%.',
      dataMetric: 'Surplus Rp 650.000',
      recommendation: 'Pertahankan belanja mingguan berbasis inventaris kulkas AI.',
      date: '2026-08-01'
    },
    {
      id: 'ins-2',
      title: 'Pola Tidur & Kesejahteraan Remaja',
      category: 'Health',
      type: 'risk_warning',
      description: 'Durasi tidur anak remaja terpantau di bawah 7 jam pada malam hari menjelang ujian.',
      dataMetric: 'Rata-rata 6.3 jam',
      recommendation: 'Terapkan mode kurangi layar gawai jam 21:00 WIB.',
      date: '2026-08-01'
    },
    {
      id: 'ins-3',
      title: 'Ketepatan Pembayaran & Perlindungan Asuransi',
      category: 'Insurance',
      type: 'trend',
      description: 'Seluruh 4 polis asuransi keluarga aktif tanpa tunggakan.',
      dataMetric: 'Skor Perlindungan 82/100',
      recommendation: 'Lakukan review berkala polis asuransi jiwa penopang nafkah.',
      date: '2026-07-29'
    }
  ],

  goals: [
    {
      id: 'goal-1',
      title: 'Dana Darurat 6 Kali Pengeluaran Bulanan',
      category: 'Keuangan',
      targetValue: 60000000,
      currentValue: 48000000,
      unit: 'Rp',
      targetDate: '2026-12-31',
      status: 'On Track'
    },
    {
      id: 'goal-2',
      title: 'Rata-Rata Langkah Kaki 8.000 / Hari Seluruh Keluarga',
      category: 'Kesehatan',
      targetValue: 8000,
      currentValue: 7200,
      unit: 'langkah',
      targetDate: '2026-08-31',
      status: 'On Track'
    },
    {
      id: 'goal-3',
      title: 'Nilai Matematika Anak di Atas 85',
      category: 'Pendidikan',
      targetValue: 85,
      currentValue: 82,
      unit: 'nilai',
      targetDate: '2026-10-15',
      status: 'On Track'
    },
    {
      id: 'goal-4',
      title: 'Tabungan Liburan Semester Bali',
      category: 'Travel',
      targetValue: 15000000,
      currentValue: 12500000,
      unit: 'Rp',
      targetDate: '2026-11-20',
      status: 'On Track'
    }
  ],

  habits: [
    {
      id: 'hab-1',
      habitName: 'Minum Air Putih 2 Liter / Hari',
      memberId: 'm-1',
      memberName: 'Ayah',
      streakCount: 18,
      frequency: 'Harian',
      aiScore: 95,
      lastCompletedDate: 'Hari Ini'
    },
    {
      id: 'hab-2',
      habitName: 'Jalan Santai Pagi 20 Menit',
      memberId: 'm-2',
      memberName: 'Ibu',
      streakCount: 12,
      frequency: 'Harian',
      aiScore: 90,
      lastCompletedDate: 'Hari Ini'
    },
    {
      id: 'hab-3',
      habitName: 'Membaca Buku 15 Halaman Sebelum Tidur',
      memberId: 'm-3',
      memberName: 'Anak',
      streakCount: 7,
      frequency: 'Harian',
      aiScore: 84,
      lastCompletedDate: 'Kemarin'
    }
  ],

  reports: [
    {
      id: 'rep-1',
      reportType: 'Weekly Summary',
      generatedDate: '2026-08-01',
      periodText: 'Minggu ke-4 Juli 2026',
      keyHighlights: [
        'Total pengeluaran hemat 12% dari batas anggaran.',
        'Kesejahteraan fisik & mood harian berada pada rata-rata 88%.',
        '3 tugas edukasi anak selesai tepat waktu.'
      ],
      dataMetrics: { totalExpenses: 3450000, avgSleep: '7.5 Jam', tasksCompleted: 18 }
    }
  ],

  addGoal: (goal) =>
    set((state) => ({
      goals: [
        {
          ...goal,
          id: `goal-${Date.now()}`,
          currentValue: 0,
          status: 'On Track'
        },
        ...state.goals
      ]
    })),

  updateGoalProgress: (id, newValue) =>
    set((state) => ({
      goals: state.goals.map((g) => {
        if (g.id !== id) return g;
        const progress = (newValue / g.targetValue) * 100;
        return {
          ...g,
          currentValue: newValue,
          status: progress >= 100 ? 'Achieved' : progress >= 60 ? 'On Track' : 'At Risk'
        };
      })
    })),

  incrementHabitStreak: (id) =>
    set((state) => ({
      habits: state.habits.map((h) =>
        h.id === id
          ? {
              ...h,
              streakCount: h.streakCount + 1,
              lastCompletedDate: 'Hari Ini',
              aiScore: Math.min(100, h.aiScore + 2)
            }
          : h
      )
    })),

  generateReportNow: (reportType) =>
    set((state) => ({
      reports: [
        {
          id: `rep-${Date.now()}`,
          reportType,
          generatedDate: new Date().toISOString().split('T')[0],
          periodText: 'Periode Terkini',
          keyHighlights: [
            `Laporan ${reportType} berhasil dibuat oleh AI Intelligence Engine.`,
            'Analisis komprehensif seluruh 16 modul terintegrasi secara otomatis.',
            'Indeks keamanan data & efisiensi operasional keluarga terjaga.'
          ],
          dataMetrics: { status: 'Generated Successfully', timestamp: new Date().toLocaleTimeString() }
        },
        ...state.reports
      ]
    }))
}));
