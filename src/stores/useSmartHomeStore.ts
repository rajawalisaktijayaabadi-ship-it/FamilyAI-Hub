import { create } from 'zustand';

interface SmartHomeHubState {
  hubStatus: 'Online' | 'Connecting' | 'Offline';
  hubName: 'FamilyAI Core Smart Gateway v3';
  firmwareVersion: 'v4.18.0-LTS';
  ipAddress: '192.168.1.100';
  activeMeshNodes: number;
  totalDevicesConnected: number;
  aiSmartHomeInsights: {
    id: string;
    type: 'Energy' | 'Security' | 'Maintenance' | 'Automation';
    title: string;
    message: string;
    actionLabel: string;
    createdAt: string;
  }[];

  // Actions
  updateHubStatus: (status: 'Online' | 'Connecting' | 'Offline') => void;
  dismissInsight: (id: string) => void;
}

const initialInsights = [
  {
    id: 'in-1',
    type: 'Energy' as const,
    title: 'Lampu & AC Ruang Tamu Masih Menyala',
    message: 'Ruang tamu tidak terdeteksi presensi anggota keluarga sejak pukul 08:00 WIB. Disarankan mematikan AC & lampu untuk menghemat hingga Rp 45.000/minggu.',
    actionLabel: 'Matikan Perangkat Sekarang',
    createdAt: 'Baru saja'
  },
  {
    id: 'in-2',
    type: 'Maintenance' as const,
    title: 'Servis Filter Water Dispenser Dapur',
    message: 'Filter air Dapur mendekati batas waktu penggantian (5 hari lagi). Air minum tetap segar dan higienis.',
    actionLabel: 'Lihat Jadwal Perawatan',
    createdAt: '2 jam lalu'
  },
  {
    id: 'in-3',
    type: 'Security' as const,
    title: 'Sistem Keamanan Aktif Siaga',
    message: 'Seluruh Smart Lock terkunci sempurna dan CCTV 4K terhubung tanpa kendala.',
    actionLabel: 'Periksa Status Keamanan',
    createdAt: '1 hari lalu'
  }
];

export const useSmartHomeStore = create<SmartHomeHubState>((set) => ({
  hubStatus: 'Online',
  hubName: 'FamilyAI Core Smart Gateway v3',
  firmwareVersion: 'v4.18.0-LTS',
  ipAddress: '192.168.1.100',
  activeMeshNodes: 4,
  totalDevicesConnected: 12,
  aiSmartHomeInsights: initialInsights,

  updateHubStatus: (status) => set({ hubStatus: status }),
  dismissInsight: (id) => set((state) => ({
    aiSmartHomeInsights: state.aiSmartHomeInsights.filter(i => i.id !== id)
  }))
}));
