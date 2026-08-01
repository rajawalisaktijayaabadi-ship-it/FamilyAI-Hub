import { 
  FamilyMember, 
  MoodEntry, 
  TaskItem, 
  BudgetItem, 
  MealPlanDay, 
  ShoppingItem, 
  SmartDevice, 
  MemoryPhoto, 
  StickyNote,
  FamilyProfile,
  FamilyActivityItem,
  FamilyInvitation,
  RolePermissionItem
} from '../types';

export const initialFamilyMembers: FamilyMember[] = [
  {
    id: 'm1',
    name: 'Budi Santoso',
    role: 'parents',
    roleTitle: 'Ayah (Pencari Nafkah Utama)',
    relationship: 'Ayah',
    age: 42,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    mood: 'calm',
    statusText: 'Di kantor (Meeting Proyek Baru)',
    location: {
      lat: -6.2088,
      lng: 106.8456,
      placeName: 'Sudirman Central Business District, Jakarta',
      lastUpdated: '10 menit lalu',
      batteryPercent: 88,
    },
    locationHistory: [
      {
        id: 'lh_1_1',
        placeName: 'Sudirman Central Business District, Jakarta',
        timestamp: 'Hari ini, 10:15 WIB',
        category: 'Kantor',
        addressDetails: 'Gedung Menara Mandiri Lt. 18, Jl. Jend. Sudirman'
      },
      {
        id: 'lh_1_2',
        placeName: 'Lotte Shopping Avenue, Kuningan',
        timestamp: 'Hari ini, 08:30 WIB',
        category: 'Publik/Olahraga',
        addressDetails: 'Drop Off Utama Mall Lotte, Jl. Prof. DR. Satrio'
      },
      {
        id: 'lh_1_3',
        placeName: 'Kediaman Utama, Kebayoran Baru',
        timestamp: 'Hari ini, 07:15 WIB',
        category: 'Rumah',
        addressDetails: 'Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan'
      }
    ],
    healthSummary: 'Tekanan darah normal (120/80), Langkah hari ini: 6.420',
    isOnline: true,
  },
  {
    id: 'm2',
    name: 'Siti Rahmawati',
    role: 'parents',
    roleTitle: 'Ibu (Manajer Rumah Tangga)',
    relationship: 'Ibu',
    age: 39,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    mood: 'happy',
    statusText: 'Di Rumah (Persiapan Makan Malam)',
    location: {
      lat: -6.2250,
      lng: 106.8000,
      placeName: 'Kediaman Utama, Kebayoran Baru',
      lastUpdated: 'Baru saja',
      batteryPercent: 95,
    },
    locationHistory: [
      {
        id: 'lh_2_1',
        placeName: 'Kediaman Utama, Kebayoran Baru',
        timestamp: 'Hari ini, 11:00 WIB',
        category: 'Rumah',
        addressDetails: 'Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan'
      },
      {
        id: 'lh_2_2',
        placeName: 'Pasar Modern Mayestik',
        timestamp: 'Hari ini, 09:30 WIB',
        category: 'Publik/Olahraga',
        addressDetails: 'Area Sayur Segar Lt. Dasar, Jl. Tebah III, Kebayoran Baru'
      },
      {
        id: 'lh_2_3',
        placeName: 'Supermarket Grand Lucky, SCBD',
        timestamp: 'Kemarin, 16:45 WIB',
        category: 'Publik/Olahraga',
        addressDetails: 'Jl. Jend. Sudirman Lot 12, Senayan, Jakarta Pusat'
      }
    ],
    healthSummary: 'Tidur pulas 7.5 jam, Minum air: 2.1 Liter',
    isOnline: true,
  },
  {
    id: 'm3',
    name: 'Ahmad Santoso',
    role: 'kids',
    roleTitle: 'Anak Pertama (SMA Kelas 2)',
    relationship: 'Anak Laki-laki',
    age: 16,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    mood: 'energetic',
    statusText: 'Di Sekolah (Klub Basket)',
    location: {
      lat: -6.2150,
      lng: 106.8120,
      placeName: 'SMA Negeri 8 Jakarta',
      lastUpdated: '15 menit lalu',
      batteryPercent: 62,
    },
    locationHistory: [
      {
        id: 'lh_3_1',
        placeName: 'SMA Negeri 8 Jakarta',
        timestamp: 'Hari ini, 10:30 WIB',
        category: 'Sekolah',
        addressDetails: 'Lapangan Basket SMAN 8, Jl. Taman Bukit Duri, Tebet'
      },
      {
        id: 'lh_3_2',
        placeName: 'Kantin Sekolah SMAN 8',
        timestamp: 'Hari ini, 09:15 WIB',
        category: 'Sekolah',
        addressDetails: 'Gedung Pujasera Sekolah, Lantai 1'
      },
      {
        id: 'lh_3_3',
        placeName: 'Kediaman Utama, Kebayoran Baru',
        timestamp: 'Hari ini, 06:45 WIB',
        category: 'Rumah',
        addressDetails: 'Jl. Senopati No. 45, Kebayoran Baru'
      }
    ],
    healthSummary: 'Latihan fisik basket 1.5 jam, Konsumsi kalori cukup',
    isOnline: true,
  },
  {
    id: 'm4',
    name: 'Nayla Santoso',
    role: 'kids',
    roleTitle: 'Anak Kedua (SD Kelas 5)',
    relationship: 'Anak Perempuan',
    age: 10,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    mood: 'happy',
    statusText: 'Di Les Musik Piano',
    location: {
      lat: -6.2210,
      lng: 106.8050,
      placeName: 'Sekolah Musik Harmoni',
      lastUpdated: '5 menit lalu',
      batteryPercent: 79,
    },
    locationHistory: [
      {
        id: 'lh_4_1',
        placeName: 'Sekolah Musik Harmoni',
        timestamp: 'Hari ini, 10:45 WIB',
        category: 'Les/Kursus',
        addressDetails: 'Studio Piano 2B, Jl. Gunawarman No. 12'
      },
      {
        id: 'lh_4_2',
        placeName: 'SDN Menteng 01 Jakarta',
        timestamp: 'Hari ini, 08:00 WIB',
        category: 'Sekolah',
        addressDetails: 'Gedung SD Utama, Jl. Besuki No. 1, Menteng'
      },
      {
        id: 'lh_4_3',
        placeName: 'Kediaman Utama, Kebayoran Baru',
        timestamp: 'Hari ini, 07:00 WIB',
        category: 'Rumah',
        addressDetails: 'Jl. Senopati No. 45, Kebayoran Baru'
      }
    ],
    healthSummary: 'Kesehatan gigi prima, Jadwal imunisasi lengkap',
    isOnline: true,
  },
  {
    id: 'm5',
    name: 'Kakek Hadi',
    role: 'seniors',
    roleTitle: 'Kakek (Pensiunan)',
    relationship: 'Kakek',
    age: 68,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    mood: 'calm',
    statusText: 'Bersantai di Taman Belakang',
    location: {
      lat: -6.2250,
      lng: 106.8000,
      placeName: 'Kediaman Utama, Kebayoran Baru',
      lastUpdated: '1 jam lalu',
      batteryPercent: 100,
    },
    locationHistory: [
      {
        id: 'lh_5_1',
        placeName: 'Kediaman Utama, Kebayoran Baru',
        timestamp: 'Hari ini, 09:30 WIB',
        category: 'Rumah',
        addressDetails: 'Taman Belakang Rumah, Jl. Senopati No. 45'
      },
      {
        id: 'lh_5_2',
        placeName: 'Klinik Dokter Keluarga Kebayoran',
        timestamp: 'Kemarin, 10:00 WIB',
        category: 'Lainnya',
        addressDetails: 'Poli Lansia, Jl. Wolter Monginsidi No. 88'
      },
      {
        id: 'lh_5_3',
        placeName: 'Taman Langsat Kebayoran Baru',
        timestamp: '2 Hari lalu, 07:15 WIB',
        category: 'Publik/Olahraga',
        addressDetails: 'Area Jogging Track, Jl. Barito, Kebayoran Baru'
      }
    ],
    healthSummary: 'Obat hipertensi sudah diminum pukul 08:00, Gula darah acak: 110 mg/dL',
    isOnline: false,
  }
];

export const initialMoodEntries: MoodEntry[] = [
  {
    id: 'mo1',
    memberId: 'm2',
    memberName: 'Siti Rahmawati',
    memberAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    mood: 'happy',
    rating: 5,
    note: 'Senang sekali anak-anak menyelesaikan tugas sekolah tepat waktu dan rumah rapi!',
    date: 'Hari ini, 14:20',
    aiAdvice: 'Pertahankan kebiasaan apresiasi positif keluarga saat makan malam nanti.',
  },
  {
    id: 'mo2',
    memberId: 'm1',
    memberName: 'Budi Santoso',
    memberAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    mood: 'stressed',
    rating: 2,
    note: 'Lalu lintas macet dan beban tenggat waktu kerjaan cukup padat.',
    date: 'Hari ini, 11:00',
    aiAdvice: 'Lakukan pernapasan relaksasi 4-7-8 selama 3 menit dan minum air hangat.',
  },
  {
    id: 'mo3',
    memberId: 'm3',
    memberName: 'Ahmad Santoso',
    memberAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    mood: 'energetic',
    rating: 5,
    note: 'Menang tanding basket antarkelas di sekolah!',
    date: 'Kemarin, 16:30',
    aiAdvice: 'Bagus sekali! Jangan lupa pendinginan otot dan minum cairan elektrolit.',
  }
];

export const initialTasks: TaskItem[] = [
  {
    id: 't1',
    title: 'Beli Sayuran & Bumbu Dapur Seminggu',
    category: 'shopping',
    assignedToMemberId: 'm2',
    dueDate: 'Besok',
    completed: false,
    priority: 'high',
  },
  {
    id: 't2',
    title: 'Kerjakan PR Matematika Trigonometri',
    category: 'homework',
    assignedToMemberId: 'm3',
    dueDate: 'Hari ini, 20:00',
    completed: false,
    priority: 'high',
  },
  {
    id: 't3',
    title: 'Minum Obat Hipertensi Kakek (Malam)',
    category: 'health',
    assignedToMemberId: 'm5',
    dueDate: 'Hari ini, 20:30',
    completed: false,
    priority: 'high',
  },
  {
    id: 't4',
    title: 'Bayar Tagihan Listrik & Internet Rumah',
    category: 'bills',
    assignedToMemberId: 'm1',
    dueDate: '2 hari lagi',
    completed: true,
    priority: 'medium',
  },
  {
    id: 't5',
    title: 'Rapikan Kamar Tidur & Meja Belajar',
    category: 'chores',
    assignedToMemberId: 'm4',
    dueDate: 'Setiap Hari',
    completed: true,
    priority: 'low',
  }
];

export const initialBudget: BudgetItem[] = [
  { id: 'b1', title: 'Gaji Bulanan Ayah', amount: 25000000, category: 'Income', type: 'income', date: '01 Juli', paidByMemberId: 'm1' },
  { id: 'b2', title: 'Belanja Bulanan & Dapur', amount: 6500000, category: 'Groceries', type: 'expense', date: '03 Juli', paidByMemberId: 'm2' },
  { id: 'b3', title: 'SPP Sekolah Ahmad & Nayla', amount: 3200000, category: 'Education', type: 'expense', date: '05 Juli', paidByMemberId: 'm1' },
  { id: 'b4', title: 'Listrik, Air & Wi-Fi Fiber', amount: 1450000, category: 'Utilities', type: 'expense', date: '10 Juli', paidByMemberId: 'm1' },
  { id: 'b5', title: 'Checkup & Obat Kakek', amount: 850000, category: 'Health', type: 'expense', date: '12 Juli', paidByMemberId: 'm2' },
  { id: 'b6', title: 'Tabungan Pendidikan & Investasi', amount: 5000000, category: 'Savings', type: 'expense', date: '01 Juli', paidByMemberId: 'm1' },
];

export const initialMealPlans: MealPlanDay[] = [
  {
    id: 'mp1',
    dayName: 'Senin',
    breakfast: 'Nasi Goreng Telur Sayur & Jus Jeruk Segar',
    lunch: 'Ayam Fillet Mentega, Tumis Buncis & Sup Bening',
    dinner: 'Ikan Gurame Bakar Kecap & Lalapan Segar',
    snack: 'Pisang Bakar Keju & Susu Warm',
    prepTime: '30 Menit',
    calories: '1.850 kcal/hari',
  },
  {
    id: 'mp2',
    dayName: 'Selasa',
    breakfast: 'Oatmeal Buah Naga & Madu Murni',
    lunch: 'Soto Ayam Kampung & Perkedel Kentang',
    dinner: 'Capcay Kuah Seafood & Tahu Tempe Crispy',
    snack: 'Puding Cokelat Varian Buah',
    prepTime: '25 Menit',
    calories: '1.780 kcal/hari',
  },
  {
    id: 'mp3',
    dayName: 'Rabu',
    breakfast: 'Roti Panggang Alpukat & Egg Omelette',
    lunch: 'Rendang Daging Sapi Lembut & Sayur Nangka',
    dinner: 'Sup Ayam Jagung Manis & Tempe Bacem',
    snack: 'Smoothie Berry & Kacang Almond',
    prepTime: '35 Menit',
    calories: '1.920 kcal/hari',
  }
];

export const initialShoppingItems: ShoppingItem[] = [
  { id: 's1', name: 'Minyak Goreng Kelapa 2L', category: 'Sembako', quantity: '2 Pouch', bought: true, estimatedPrice: 38000, addedBy: 'Ibu' },
  { id: 's2', name: 'Telur Ayam Omega 3', category: 'Sembako', quantity: '1 Tray (30 butir)', bought: false, estimatedPrice: 62000, addedBy: 'Ibu' },
  { id: 's3', name: 'Susu UHT Full Cream', category: 'Minuman', quantity: '4 Kotak 1L', bought: false, estimatedPrice: 76000, addedBy: 'Ahmad' },
  { id: 's4', name: 'Wortel & Brokoli Organik', category: 'Sayuran', quantity: '1 kg', bought: false, estimatedPrice: 32000, addedBy: 'Ibu' },
  { id: 's5', name: 'Sabun Mandi & Shampoo', category: 'Toiletries', quantity: '1 Refill', bought: true, estimatedPrice: 45000, addedBy: 'Ayah' },
];

export const initialSmartDevices: SmartDevice[] = [
  { id: 'd1', name: 'Lampu Utam Ruang Tamu', type: 'light', room: 'Ruang Tamu', status: true, value: 80, unit: '%' },
  { id: 'd2', name: 'AC Inverter Smart', type: 'thermostat', room: 'Kamar Utama', status: true, value: 24, unit: '°C' },
  { id: 'd3', name: 'Kunci Pintu Utam (Smart Lock)', type: 'lock', room: 'Ruang Tamu', status: true },
  { id: 'd4', name: 'Kamera CCTV Halaman Depan', type: 'camera', room: 'Halaman', status: true },
  { id: 'd5', name: 'Air Purifier HEPA', type: 'air_purifier', room: 'Kamar Anak', status: true, value: 12, unit: 'AQI' },
  { id: 'd6', name: 'Smart TV OLED 65"', type: 'tv', room: 'Ruang Tamu', status: false },
];

export const initialMemories: MemoryPhoto[] = [
  {
    id: 'm1',
    title: 'Liburan Keluarga di Bali',
    description: 'Saat menikmati matahari terbit dan kebersamaan di Pantai Sanur.',
    date: '15 Juni 2026',
    imageUrl: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&auto=format&fit=crop&q=80',
    tags: ['Liburan', 'Bali', 'Pantai', 'Bahagia'],
    uploadedBy: 'Ayah Budi',
    likes: 5,
  },
  {
    id: 'm2',
    title: 'Ulang Tahun Nayla Ke-10',
    description: 'Pesta tiup lilin sederhana di rumah dihadiri Kakek dan sahabat sekolah.',
    date: '02 Mei 2026',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80',
    tags: ['UlangTahun', 'Keluarga', 'Rumah'],
    uploadedBy: 'Ibu Siti',
    likes: 7,
  },
  {
    id: 'm3',
    title: 'Syukuran Ahmad Lolos Seleksi Basket',
    description: 'Makan malam hangat bersama memperingati kerja keras Ahmad.',
    date: '18 April 2026',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=80',
    tags: ['Olahraga', 'Prestasi', 'Syukuran'],
    uploadedBy: 'Ahmad',
    likes: 4,
  }
];

export const initialFamilyProfile: FamilyProfile = {
  id: 'fam-1',
  familyName: 'Keluarga Besar Santoso',
  address: 'Jl. Kebayoran Baru No. 42, Jakarta Selatan',
  motto: 'Harmoni, Saling Mendukung, dan Tumbuh Bersama AI',
  familyPhoto: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1000&auto=format&fit=crop&q=80',
  createdAt: '2025-01-10',
  homeCount: 2,
  familyScore: 98
};

export const initialFamilyActivities: FamilyActivityItem[] = [
  {
    id: 'a1',
    actorName: 'Ibu Siti',
    actorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    action: 'menambahkan daftar belanja mingguan (Bumbu dapur & Buah segar)',
    category: 'Belanja',
    timeAgo: '10 menit lalu',
    timestamp: '2026-07-31T18:50:00'
  },
  {
    id: 'a2',
    actorName: 'Ayah Budi',
    actorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    action: 'memperbarui jadwal rapat keluarga untuk akhir pekan ini',
    category: 'Jadwal',
    timeAgo: '45 menit lalu',
    timestamp: '2026-07-31T18:15:00'
  },
  {
    id: 'a3',
    actorName: 'Ahmad',
    actorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    action: 'menyelesaikan tugas Matematika & Latihan Basket',
    category: 'Edukasi',
    timeAgo: '2 jam lalu',
    timestamp: '2026-07-31T17:00:00'
  },
  {
    id: 'a4',
    actorName: 'Kakek Hadi',
    actorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    action: 'mencatat cek kesehatan berkala (Tekanan darah normal)',
    category: 'Kesehatan',
    timeAgo: '4 jam lalu',
    timestamp: '2026-07-31T15:00:00'
  },
  {
    id: 'a5',
    actorName: 'Nayla',
    actorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    action: 'mengunggah kenangan foto liburan di album galeri',
    category: 'Kenangan',
    timeAgo: '5 jam lalu',
    timestamp: '2026-07-31T14:00:00'
  }
];

export const initialFamilyInvitations: FamilyInvitation[] = [
  {
    id: 'inv-1',
    familyId: 'fam-1',
    email: 'paman.adi@gmail.com',
    role: 'Saudara',
    inviteLink: 'https://familyai.hub/invite/fam-1-adi-8823',
    status: 'pending',
    createdAt: '2026-07-30'
  },
  {
    id: 'inv-2',
    familyId: 'fam-1',
    email: 'bibi.ratna@gmail.com',
    role: 'Pengasuh',
    inviteLink: 'https://familyai.hub/invite/fam-1-ratna-9912',
    status: 'pending',
    createdAt: '2026-07-28'
  }
];

export const initialRolePermissions: RolePermissionItem[] = [
  {
    role: 'super_admin',
    label: 'Super Admin (Pemilik Keluarga)',
    canManageMembers: true,
    canManageFinance: true,
    canControlSmartHome: true,
    canAccessAI: true,
    canSendSOS: true
  },
  {
    role: 'parent',
    label: 'Orang Tua (Ayah / Ibu)',
    canManageMembers: true,
    canManageFinance: true,
    canControlSmartHome: true,
    canAccessAI: true,
    canSendSOS: true
  },
  {
    role: 'child',
    label: 'Anak (Siswa / Remaja)',
    canManageMembers: false,
    canManageFinance: false,
    canControlSmartHome: true,
    canAccessAI: true,
    canSendSOS: true
  },
  {
    role: 'grandparent',
    label: 'Lansia (Kakek / Nenek)',
    canManageMembers: false,
    canManageFinance: false,
    canControlSmartHome: true,
    canAccessAI: true,
    canSendSOS: true
  },
  {
    role: 'guest',
    label: 'Tamu / Kerabat',
    canManageMembers: false,
    canManageFinance: false,
    canControlSmartHome: false,
    canAccessAI: true,
    canSendSOS: false
  }
];

export const initialStickyNotes: StickyNote[] = [
  { id: 'n1', author: 'Ibu Siti', authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', content: 'Makanan hangat di meja kulkas ya! Jangan lupa kunci pintu depan kalau pergi.', color: 'yellow', createdAt: '08:30' },
  { id: 'n2', author: 'Ayah Budi', authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', content: 'Paket kiriman baru saja sampai di pos satpam. Mohon tolong diambilkan.', color: 'blue', createdAt: '10:15' },
  { id: 'n3', author: 'Kakek Hadi', authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', content: 'Terima kasih cucu-cucu sudah bantu merawat tanaman anggrek kakek.', color: 'green', createdAt: '13:00' }
];

