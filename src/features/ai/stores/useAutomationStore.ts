import { create } from 'zustand';
import { AIAutomation, AutomationTrigger, AutomationAction, PrivacyLevel } from '../../../types/aiSuperAssistant';

interface AutomationState {
  automations: AIAutomation[];
  
  // Actions
  toggleAutomation: (id: string) => void;
  addAutomation: (newAuto: Omit<AIAutomation, 'id' | 'executionCount'>) => void;
  deleteAutomation: (id: string) => void;
  runAutomationNow: (id: string) => void;
}

export const useAutomationStore = create<AutomationState>((set, get) => ({
  automations: [
    {
      id: 'auto-1',
      title: 'Otomatis Buat Daftar Belanja Jika Stok Susu < 2',
      trigger: 'Inventory',
      triggerCondition: 'Stok Susu/Sembako di bawah ambang batas minimal',
      action: 'Suggest Shopping',
      actionPayload: 'Tambahkan 2 kotak susu kalsium ke daftar belanjaan utama',
      isActive: true,
      lastExecuted: 'Hari ini, 07:30 WIB',
      executionCount: 14,
      privacyLevel: 'Family'
    },
    {
      id: 'auto-2',
      title: 'Pengingat H-1 Ujian Sekolah Anak',
      trigger: 'Calendar',
      triggerCondition: 'Event bertipe "Ujian Sekolah" pada kalender besok',
      action: 'Create Task',
      actionPayload: 'Buat task latihan soal & persiapkan perlengkapan sekolah',
      isActive: true,
      lastExecuted: 'Kemarin, 18:00 WIB',
      executionCount: 8,
      privacyLevel: 'Family'
    },
    {
      id: 'auto-3',
      title: 'Notifikasi Tagihan Asuransi & Rutin',
      trigger: 'Jam',
      triggerCondition: 'Pukul 08:00 WIB setiap tanggal 25',
      action: 'Send Notification',
      actionPayload: 'Kirim notifikasi prioritas tinggi ke ponsel Orang Tua',
      isActive: true,
      lastExecuted: '25 Juli 2026',
      executionCount: 24,
      privacyLevel: 'Parent Only'
    },
    {
      id: 'auto-4',
      title: 'Rekomendasi Menu Sehat Jika Mood Anak "Stres/Lelah"',
      trigger: 'Mood',
      triggerCondition: 'Anggota keluarga memasukkan Mood "Lelah" atau "Sedih"',
      action: 'Suggest Meal',
      actionPayload: 'Sajikan makanan penenang seperti Sup Warm Comfort & Vitamin C',
      isActive: false,
      lastExecuted: '3 hari lalu',
      executionCount: 5,
      privacyLevel: 'Family'
    }
  ],

  toggleAutomation: (id) =>
    set((state) => ({
      automations: state.automations.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a))
    })),

  addAutomation: (newAuto) =>
    set((state) => ({
      automations: [
        {
          ...newAuto,
          id: `auto-${Date.now()}`,
          executionCount: 0
        },
        ...state.automations
      ]
    })),

  deleteAutomation: (id) =>
    set((state) => ({
      automations: state.automations.filter((a) => a.id !== id)
    })),

  runAutomationNow: (id) =>
    set((state) => ({
      automations: state.automations.map((a) =>
        a.id === id
          ? {
              ...a,
              executionCount: a.executionCount + 1,
              lastExecuted: 'Baru saja'
            }
          : a
      )
    }))
}));
