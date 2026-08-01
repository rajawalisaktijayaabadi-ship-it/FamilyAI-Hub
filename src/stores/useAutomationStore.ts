import { create } from 'zustand';
import { AutomationRule, AutomationHistory, Scene } from '../types';

interface AutomationState {
  rules: AutomationRule[];
  scenes: Scene[];
  history: AutomationHistory[];

  // Actions
  toggleRule: (id: string) => void;
  addRule: (rule: AutomationRule) => void;
  deleteRule: (id: string) => void;
  
  activateScene: (sceneId: string) => void;
  addScene: (scene: Scene) => void;
  
  runSimulation: (ruleId: string) => void;
}

const initialRules: AutomationRule[] = [
  {
    id: 'rule-1',
    name: 'Malam Otomatis Hemat Listrik',
    triggerType: 'Waktu',
    triggerDetail: 'Pukul 22:00 WIB Setiap Hari',
    actionType: 'Nyalakan Perangkat',
    actionDetail: 'Kunci Smart Lock, Matikan Lampu Ruang Tamu, AC 24°C',
    isEnabled: true,
    lastTriggered: 'Kemarin, 22:00'
  },
  {
    id: 'rule-2',
    name: 'Lampu Teras Otomatis Senja',
    triggerType: 'Waktu',
    triggerDetail: 'Pukul 18:00 WIB Setiap Hari',
    actionType: 'Nyalakan Perangkat',
    actionDetail: 'Nyalakan Lampu Taman & Carport 100%',
    isEnabled: true,
    lastTriggered: 'Kemarin, 18:00'
  },
  {
    id: 'rule-3',
    name: 'Sensor Gerak Garasi Malam Hari',
    triggerType: 'Sensor',
    triggerDetail: 'Sensor Gerak Garasi terdeteksi gerakan > 23:00',
    actionType: 'Kirim Notifikasi',
    actionDetail: 'Nyalakan Sorot Garasi & Kirim Alert Darurat Ke HP Ayah',
    isEnabled: true,
    lastTriggered: '3 hari lalu'
  },
  {
    id: 'rule-4',
    name: 'Otomasi Kedatangan Anggota Keluarga',
    triggerType: 'Kehadiran Anggota',
    triggerDetail: 'Ibu/Ayah mendekati lokasi rumah (< 100m)',
    actionType: 'Jalankan Skenario',
    actionDetail: 'Nyalakan AC Kamar Utama & Buka Pagar Otomatis',
    isEnabled: false,
    lastTriggered: '1 minggu lalu'
  }
];

const initialScenes: Scene[] = [
  {
    id: 'scene-1',
    name: 'Good Morning',
    icon: 'Sun',
    description: 'Buka tirai, nyalakan lampu hangat, putar musik pagi cemerlang.',
    isActive: false,
    targetDeviceIds: ['dev-1', 'dev-9'],
    actionDescription: 'Lampu 100% warm white, Speaker play Chill Morning'
  },
  {
    id: 'scene-2',
    name: 'Movie Time',
    icon: 'Film',
    description: 'Redupkan lampu ruang tamu 20%, nyalakan OLED TV, tutup gorden.',
    isActive: false,
    targetDeviceIds: ['dev-1', 'dev-3'],
    actionDescription: 'OLED TV On (HDMI 1), Redupkan Lampu 20%'
  },
  {
    id: 'scene-3',
    name: 'Good Night',
    icon: 'Moon',
    description: 'Kunci semua pintu, matikan lampu utama, atur AC 24°C hening.',
    isActive: true,
    targetDeviceIds: ['dev-1', 'dev-2', 'dev-5'],
    actionDescription: 'Smart Lock Lock, AC 24°C, Lampu Off'
  },
  {
    id: 'scene-4',
    name: 'Away Mode',
    icon: 'ShieldAlert',
    description: 'Aktifkan sistem CCTV siaga tinggi, matikan seluruh steker & AC.',
    isActive: false,
    targetDeviceIds: ['dev-2', 'dev-6', 'dev-7'],
    actionDescription: 'CCTV Arming, All AC Off, Robot Vac Ready'
  },
  {
    id: 'scene-5',
    name: 'Dinner Time',
    icon: 'Utensils',
    description: 'Lampu ruang makan nuansa hangat, putar musik jazz santai keluarga.',
    isActive: false,
    targetDeviceIds: ['dev-1', 'dev-9'],
    actionDescription: 'Lampu Dining 80%, Jazz Lounge Speaker'
  },
  {
    id: 'scene-6',
    name: 'Emergency Mode',
    icon: 'AlertOctagon',
    description: 'Nyalakan seluruh lampu alarm merah, bunyikan sirine, unlock pintu darurat.',
    isActive: false,
    targetDeviceIds: ['dev-1', 'dev-5', 'dev-6'],
    actionDescription: 'Emergency Flashing Light, Siren On, Unlock Security Door'
  }
];

const initialHistory: AutomationHistory[] = [
  {
    id: 'hist-1',
    ruleId: 'rule-1',
    ruleName: 'Malam Otomatis Hemat Listrik',
    timestamp: '2026-08-01 22:00:00',
    status: 'Success',
    resultDetail: 'Berhasil mengunci Smart Lock Pintu Depan & menyesuaikan AC Kamar ke 24°C'
  },
  {
    id: 'hist-2',
    ruleId: 'rule-2',
    ruleName: 'Lampu Teras Otomatis Senja',
    timestamp: '2026-08-01 18:00:00',
    status: 'Success',
    resultDetail: 'Lampu Taman & Carport dinyalakan 100%'
  }
];

export const useAutomationStore = create<AutomationState>((set, get) => ({
  rules: initialRules,
  scenes: initialScenes,
  history: initialHistory,

  toggleRule: (id: string) => set((state) => ({
    rules: state.rules.map(r => r.id === id ? { ...r, isEnabled: !r.isEnabled } : r)
  })),

  addRule: (rule: AutomationRule) => set((state) => ({
    rules: [rule, ...state.rules]
  })),

  deleteRule: (id: string) => set((state) => ({
    rules: state.rules.filter(r => r.id !== id)
  })),

  activateScene: (sceneId: string) => set((state) => ({
    scenes: state.scenes.map(s => ({
      ...s,
      isActive: s.id === sceneId
    }))
  })),

  addScene: (scene: Scene) => set((state) => ({
    scenes: [...state.scenes, scene]
  })),

  runSimulation: (ruleId: string) => {
    const rule = get().rules.find(r => r.id === ruleId);
    if (!rule) return;

    const newHist: AutomationHistory = {
      id: `hist-${Date.now()}`,
      ruleId: rule.id,
      ruleName: rule.name,
      timestamp: new Date().toLocaleString('id-ID'),
      status: 'Simulated',
      resultDetail: `[Simulasi Sukses]: Trigger '${rule.triggerDetail}' dieksekusi -> Action '${rule.actionDetail}' berjalan tanpa kendala.`
    };

    set((state) => ({
      history: [newHist, ...state.history]
    }));
  }
}));
