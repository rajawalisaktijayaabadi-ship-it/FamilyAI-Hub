import { create } from 'zustand';
import {
  HouseholdRoom,
  HouseholdAsset,
  HouseholdTask
} from '../types';

interface HouseholdState {
  rooms: HouseholdRoom[];
  assets: HouseholdAsset[];
  tasks: HouseholdTask[];

  // Actions - Rooms
  addRoom: (room: Omit<HouseholdRoom, 'id'>) => void;
  updateRoom: (id: string, data: Partial<HouseholdRoom>) => void;
  deleteRoom: (id: string) => void;

  // Actions - Assets
  addAsset: (asset: Omit<HouseholdAsset, 'id'>) => void;
  updateAsset: (id: string, data: Partial<HouseholdAsset>) => void;
  deleteAsset: (id: string) => void;

  // Actions - Tasks
  addTask: (task: Omit<HouseholdTask, 'id'>) => void;
  updateTask: (id: string, data: Partial<HouseholdTask>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompleted: (id: string) => void;
  toggleChecklistItem: (taskId: string, itemIdx: number) => void;

  // Helpers
  getExpiringWarranties: () => HouseholdAsset[];
  getTasksByMember: (memberId: string) => HouseholdTask[];
  getPendingTasksCount: () => number;
}

export const useHouseholdStore = create<HouseholdState>((set, get) => ({
  rooms: [
    { id: 'room-1', name: 'Ruang Tamu & Keluarga', floorLevel: 'Lantai 1', icon: 'Tv', assetCount: 4 },
    { id: 'room-2', name: 'Dapur & Ruang Makan', floorLevel: 'Lantai 1', icon: 'Utensils', assetCount: 5 },
    { id: 'room-3', name: 'Kamar Utama (Ayah & Ibu)', floorLevel: 'Lantai 2', icon: 'Bed', assetCount: 3 },
    { id: 'room-4', name: 'Kamar Anak', floorLevel: 'Lantai 2', icon: 'Sparkles', assetCount: 3 },
    { id: 'room-5', name: 'Garasi & Area Service', floorLevel: 'Lantai 1', icon: 'Wrench', assetCount: 2 }
  ],

  assets: [
    {
      id: 'asset-1',
      name: 'TV Samsung 55 Inch QLED 4K',
      category: 'TV',
      roomId: 'room-1',
      roomName: 'Ruang Tamu & Keluarga',
      brandModel: 'Samsung QA55Q60C',
      serialNumber: 'SN-SAMS-998811',
      purchaseDate: '2024-03-15',
      purchasePrice: 9500000,
      warrantyExpiryDate: '2026-03-15',
      manualBookUrl: 'https://www.samsung.com/user-manual-qa55.pdf',
      receiptPhotoUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&auto=format&fit=crop&q=80',
      status: 'Baik',
      notes: 'Garansi resmi Samsung 2 tahun'
    },
    {
      id: 'asset-2',
      name: 'AC Daikin Inverter 1.5 PK',
      category: 'AC',
      roomId: 'room-3',
      roomName: 'Kamar Utama (Ayah & Ibu)',
      brandModel: 'Daikin FTKM35SVM4',
      serialNumber: 'SN-DKN-887722',
      purchaseDate: '2023-11-10',
      purchasePrice: 6200000,
      warrantyExpiryDate: '2026-08-10', // Expiring this month!
      manualBookUrl: 'https://www.daikin.co.id/manual-ftkm35.pdf',
      receiptPhotoUrl: '',
      status: 'Perlu Service',
      notes: 'Terakhir cuci AC 3 bulan lalu, garansi berakhir bulan ini'
    },
    {
      id: 'asset-3',
      name: 'Kulkas LG 2 Pintu Inverter 395L',
      category: 'Kulkas',
      roomId: 'room-2',
      roomName: 'Dapur & Ruang Makan',
      brandModel: 'LG GN-B392PQGB',
      serialNumber: 'SN-LG-776655',
      purchaseDate: '2023-05-20',
      purchasePrice: 7800000,
      warrantyExpiryDate: '2028-05-20',
      manualBookUrl: 'https://www.lg.com/manual-gn-b392.pdf',
      status: 'Baik',
      notes: 'Kompresor garansi 10 tahun'
    },
    {
      id: 'asset-4',
      name: 'Mesin Cuci Sharp Front Loading 8.5kg',
      category: 'Mesin Cuci',
      roomId: 'room-5',
      roomName: 'Garasi & Area Service',
      brandModel: 'Sharp ES-FL1082G',
      serialNumber: 'SN-SHARP-665544',
      purchaseDate: '2024-01-08',
      purchasePrice: 5400000,
      warrantyExpiryDate: '2025-01-08',
      status: 'Baik',
      notes: 'Program hemat energi & air'
    },
    {
      id: 'asset-5',
      name: 'Laptop ASUS ROG Strix G15',
      category: 'Laptop',
      roomId: 'room-4',
      roomName: 'Kamar Anak',
      brandModel: 'ASUS G513RC',
      serialNumber: 'SN-ASUS-554433',
      purchaseDate: '2024-06-01',
      purchasePrice: 16500000,
      warrantyExpiryDate: '2026-06-01',
      status: 'Baik',
      notes: 'Untuk belajar komputasi dan tugas sekolah anak'
    }
  ],

  tasks: [
    {
      id: 'htask-1',
      title: 'Membersihkan Rumah & Merapikan Ruang Tamu',
      category: 'Membersihkan Rumah',
      assignedMemberId: 'mem-1',
      assignedMemberName: 'Budi Santoso (Ayah)',
      assignedMemberAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      frequency: 'Mingguan',
      dueDate: '2026-08-02',
      completed: false,
      priority: 'Sedang',
      notes: 'Lap debu meja, kaca, dan tata ulang majalah',
      checklist: [
        { id: 'c1', text: 'Sapu lantai ruang tamu', done: true },
        { id: 'c2', text: 'Lap meja dan rak TV', done: false },
        { id: 'c3', text: 'Rapikan bantal sofa', done: false }
      ]
    },
    {
      id: 'htask-2',
      title: 'Menyapu & Mengepel Dapur & Ruang Makan',
      category: 'Mengepel',
      assignedMemberId: 'mem-2',
      assignedMemberName: 'Siti Rahma (Ibu)',
      assignedMemberAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      frequency: 'Harian',
      dueDate: '2026-08-01',
      completed: true,
      priority: 'Tinggi',
      notes: 'Gunakan cairan pembersih beraroma lemon',
      checklist: [
        { id: 'c1', text: 'Sapu lantai dapur', done: true },
        { id: 'c2', text: 'Pel dengan carbol desinfektan', done: true }
      ]
    },
    {
      id: 'htask-3',
      title: 'Mencuci Baju & Linen Kasur',
      category: 'Mencuci',
      assignedMemberId: 'mem-2',
      assignedMemberName: 'Siti Rahma (Ibu)',
      assignedMemberAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      frequency: 'Mingguan',
      dueDate: '2026-08-03',
      completed: false,
      priority: 'Tinggi',
      notes: 'Pisahkan pakaian putih dan berwarna',
      checklist: [
        { id: 'c1', text: 'Mencuci seprai & sarung bantal', done: false },
        { id: 'c2', text: 'Jemur/keringkan di mesin', done: false }
      ]
    },
    {
      id: 'htask-4',
      title: 'Merawat Tanaman Hias & Menyiram Taman',
      category: 'Merawat Tanaman',
      assignedMemberId: 'mem-3',
      assignedMemberName: 'Ahmad Santoso (Anak)',
      assignedMemberAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
      frequency: 'Harian',
      dueDate: '2026-08-01',
      completed: false,
      priority: 'Sedang',
      notes: 'Siram pot tanaman teras dan beri pupuk cair',
      checklist: [
        { id: 'c1', text: 'Siram pot depan rumah', done: false },
        { id: 'c2', text: 'Gunting daun kering', done: false }
      ]
    },
    {
      id: 'htask-5',
      title: 'Buang Sampah Organik & Non-Organik',
      category: 'Buang Sampah',
      assignedMemberId: 'mem-3',
      assignedMemberName: 'Ahmad Santoso (Anak)',
      assignedMemberAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
      frequency: 'Harian',
      dueDate: '2026-08-01',
      completed: false,
      priority: 'Tinggi',
      notes: 'Keluarkan tempat sampah ke depan sebelum jam 08:00 WIB',
      checklist: [
        { id: 'c1', text: 'Ikat plastik sampah dapur', done: false },
        { id: 'c2', text: 'Taruh di tempat sampah depan pagar', done: false }
      ]
    },
    {
      id: 'htask-6',
      title: 'Memberi Makan Hewan Peliharaan',
      category: 'Memberi Makan Hewan',
      assignedMemberId: 'mem-4',
      assignedMemberName: 'Nabila Santoso (Anak)',
      assignedMemberAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      frequency: 'Harian',
      dueDate: '2026-08-01',
      completed: true,
      priority: 'Tinggi',
      notes: 'Beri makan kucing pukul 07.00 & 17.00 WIB',
      checklist: [
        { id: 'c1', text: 'Isi dry food di mangkuk', done: true },
        { id: 'c2', text: 'Ganti air minum bersih', done: true }
      ]
    }
  ],

  // ACTIONS
  addRoom: (roomData) =>
    set((state) => ({
      rooms: [...state.rooms, { ...roomData, id: `room-${Date.now()}` }]
    })),

  updateRoom: (id, data) =>
    set((state) => ({
      rooms: state.rooms.map((r) => (r.id === id ? { ...r, ...data } : r))
    })),

  deleteRoom: (id) =>
    set((state) => ({
      rooms: state.rooms.filter((r) => r.id !== id)
    })),

  addAsset: (assetData) =>
    set((state) => ({
      assets: [{ ...assetData, id: `asset-${Date.now()}` }, ...state.assets]
    })),

  updateAsset: (id, data) =>
    set((state) => ({
      assets: state.assets.map((a) => (a.id === id ? { ...a, ...data } : a))
    })),

  deleteAsset: (id) =>
    set((state) => ({
      assets: state.assets.filter((a) => a.id !== id)
    })),

  addTask: (taskData) =>
    set((state) => ({
      tasks: [{ ...taskData, id: `htask-${Date.now()}`, completed: false }, ...state.tasks]
    })),

  updateTask: (id, data) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...data } : t))
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id)
    })),

  toggleTaskCompleted: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          const updatedChecklist = t.checklist?.map((c) => ({ ...c, done: nextCompleted }));
          return { ...t, completed: nextCompleted, checklist: updatedChecklist };
        }
        return t;
      })
    })),

  toggleChecklistItem: (taskId, itemIdx) =>
    set((state) => ({
      tasks: state.tasks.map((t) => {
        if (t.id === taskId && t.checklist) {
          const updatedChecklist = (t.checklist || []).map((item, idx) =>
            idx === itemIdx ? { ...item, done: !item.done } : item
          );
          const allDone = updatedChecklist.every((item) => item.done);
          return { ...t, checklist: updatedChecklist, completed: allDone };
        }
        return t;
      })
    })),

  // HELPERS
  getExpiringWarranties: () => {
    const today = new Date('2026-08-01');
    return get().assets.filter((a) => {
      if (!a.warrantyExpiryDate) return false;
      const exp = new Date(a.warrantyExpiryDate);
      const diffDays = Math.ceil((exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 30 && diffDays >= -30; // within 30 days or recently expired
    });
  },

  getTasksByMember: (memberId) => {
    return get().tasks.filter((t) => t.assignedMemberId === memberId);
  },

  getPendingTasksCount: () => {
    return get().tasks.filter((t) => !t.completed).length;
  }
}));
