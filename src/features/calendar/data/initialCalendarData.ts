import { CalendarEvent, CategoryInfo, ReminderItem, FamilyTimePlan } from '../types/calendarTypes';

export const defaultCategories: CategoryInfo[] = [
  { id: 'cat-1', name: 'Keluarga', color: '#6366f1', bgClass: 'bg-indigo-500/20', borderClass: 'border-indigo-500/40', textClass: 'text-indigo-300', iconName: 'Users' },
  { id: 'cat-2', name: 'Sekolah', color: '#3b82f6', bgClass: 'bg-blue-500/20', borderClass: 'border-blue-500/40', textClass: 'text-blue-300', iconName: 'GraduationCap' },
  { id: 'cat-3', name: 'Kerja', color: '#0ea5e9', bgClass: 'bg-sky-500/20', borderClass: 'border-sky-500/40', textClass: 'text-sky-300', iconName: 'Briefcase' },
  { id: 'cat-4', name: 'Meeting', color: '#0284c7', bgClass: 'bg-cyan-500/20', borderClass: 'border-cyan-500/40', textClass: 'text-cyan-300', iconName: 'Video' },
  { id: 'cat-5', name: 'Olahraga', color: '#10b981', bgClass: 'bg-emerald-500/20', borderClass: 'border-emerald-500/40', textClass: 'text-emerald-300', iconName: 'Activity' },
  { id: 'cat-6', name: 'Belanja', color: '#f59e0b', bgClass: 'bg-amber-500/20', borderClass: 'border-amber-500/40', textClass: 'text-amber-300', iconName: 'ShoppingBag' },
  { id: 'cat-7', name: 'Dokter', color: '#ef4444', bgClass: 'bg-rose-500/20', borderClass: 'border-rose-500/40', textClass: 'text-rose-300', iconName: 'Stethoscope' },
  { id: 'cat-8', name: 'Liburan', color: '#ec4899', bgClass: 'bg-pink-500/20', borderClass: 'border-pink-500/40', textClass: 'text-pink-300', iconName: 'Palmtree' },
  { id: 'cat-9', name: 'Ulang Tahun', color: '#f43f5e', bgClass: 'bg-rose-600/20', borderClass: 'border-rose-600/40', textClass: 'text-rose-200', iconName: 'Gift' },
  { id: 'cat-10', name: 'Keuangan', color: '#22c55e', bgClass: 'bg-green-500/20', borderClass: 'border-green-500/40', textClass: 'text-green-300', iconName: 'Wallet' },
  { id: 'cat-11', name: 'Asuransi', color: '#06b6d4', bgClass: 'bg-teal-500/20', borderClass: 'border-teal-500/40', textClass: 'text-teal-300', iconName: 'ShieldCheck' },
  { id: 'cat-12', name: 'Kesehatan', color: '#14b8a6', bgClass: 'bg-emerald-600/20', borderClass: 'border-emerald-600/40', textClass: 'text-emerald-200', iconName: 'HeartPulse' },
  { id: 'cat-13', name: 'Parenting', color: '#a855f7', bgClass: 'bg-purple-500/20', borderClass: 'border-purple-500/40', textClass: 'text-purple-300', iconName: 'Baby' },
  { id: 'cat-14', name: 'Pendidikan', color: '#8b5cf6', bgClass: 'bg-violet-500/20', borderClass: 'border-violet-500/40', textClass: 'text-violet-300', iconName: 'BookOpen' },
  { id: 'cat-15', name: 'Lainnya', color: '#64748b', bgClass: 'bg-slate-500/20', borderClass: 'border-slate-500/40', textClass: 'text-slate-300', iconName: 'Calendar' }
];

// Helper to get today's date in YYYY-MM-DD
const getFormattedDate = (offsetDays: number = 0): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const initialCalendarEvents: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'Meeting Strategi Kantor Ayah',
    description: 'Evaluasi kuartal dan perencanaan anggaran tim produksi.',
    category: 'Meeting',
    location: 'Kantor Utama / Zoom',
    startDate: getFormattedDate(0),
    endDate: getFormattedDate(0),
    startTime: '10:00',
    endTime: '12:00',
    color: '#0284c7',
    priority: 'high',
    reminder: '30m',
    repeat: 'Weekly',
    attachments: [
      { id: 'att-1', name: 'Laporan_Kuartal.pdf', url: '#', type: 'application/pdf', size: '1.2 MB' }
    ],
    createdBy: 'u-1',
    assignedMemberIds: ['u-1'], // Ayah Rudi
    assignedRoleCategory: 'personal',
    status: 'scheduled',
    sourceModule: 'Manual',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'evt-2',
    title: 'Pentas Seni Anak (Budi)',
    description: 'Pertunjukan teater sekolah dan paduan suara anak-anak.',
    category: 'Sekolah',
    location: 'Aula Sekolah Nusantara',
    startDate: getFormattedDate(0),
    endDate: getFormattedDate(0),
    startTime: '10:30',
    endTime: '12:30',
    color: '#3b82f6',
    priority: 'high',
    reminder: '1h',
    repeat: 'Never',
    attachments: [],
    createdBy: 'u-3',
    assignedMemberIds: ['u-3', 'u-1', 'u-2'], // Budi, Ayah, Ibu
    assignedRoleCategory: 'kids',
    status: 'scheduled',
    sourceModule: 'Education',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'evt-3',
    title: 'Movie Night & Family Dinner',
    description: 'Nonton film favorit bersama dan makan malam masakan Mama.',
    category: 'Keluarga',
    location: 'Ruang Keluarga Kediaman',
    startDate: getFormattedDate(0),
    endDate: getFormattedDate(0),
    startTime: '19:00',
    endTime: '21:30',
    color: '#6366f1',
    priority: 'medium',
    reminder: '1h',
    repeat: 'Weekly',
    attachments: [],
    createdBy: 'u-2',
    assignedMemberIds: ['u-1', 'u-2', 'u-3', 'u-4'],
    assignedRoleCategory: 'family',
    status: 'scheduled',
    sourceModule: 'Manual',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'evt-4',
    title: 'Cek Kesehatan Rutin Kakek',
    description: 'Pemeriksaan tekanan darah & laboratorium berkala.',
    category: 'Dokter',
    location: 'RS Medika Sehat',
    startDate: getFormattedDate(1),
    endDate: getFormattedDate(1),
    startTime: '09:00',
    endTime: '11:00',
    color: '#ef4444',
    priority: 'high',
    reminder: '1d',
    repeat: 'Monthly',
    attachments: [],
    createdBy: 'u-2',
    assignedMemberIds: ['u-4', 'u-2'], // Kakek & Ibu
    assignedRoleCategory: 'seniors',
    status: 'scheduled',
    sourceModule: 'Health',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'evt-5',
    title: 'Ulang Tahun Ayah Rudi 🎂',
    description: 'Hari ulang tahun Ayah Rudi! Makan malam spesial dan kado dari keluarga.',
    category: 'Ulang Tahun',
    location: 'Restoran Bunga Melati',
    startDate: getFormattedDate(2),
    endDate: getFormattedDate(2),
    startTime: '18:30',
    endTime: '21:00',
    color: '#f43f5e',
    priority: 'high',
    reminder: '1d',
    repeat: 'Yearly',
    attachments: [],
    createdBy: 'u-2',
    assignedMemberIds: ['u-1', 'u-2', 'u-3', 'u-4'],
    assignedRoleCategory: 'family',
    status: 'scheduled',
    sourceModule: 'Manual',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'evt-6',
    title: 'Pembayaran Premi Asuransi Kesehatan',
    description: 'Jatuh tempo pembayaran premi bulanan keluarga.',
    category: 'Asuransi',
    location: 'Aplikasi Mobile Banking',
    startDate: getFormattedDate(3),
    endDate: getFormattedDate(3),
    startTime: '08:00',
    endTime: '09:00',
    color: '#06b6d4',
    priority: 'medium',
    reminder: '1d',
    repeat: 'Monthly',
    attachments: [],
    createdBy: 'u-1',
    assignedMemberIds: ['u-1', 'u-2'],
    assignedRoleCategory: 'spouse',
    status: 'scheduled',
    sourceModule: 'Insurance',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'evt-7',
    title: 'Sesi Konseling Parenting & Tumbuh Tumbuh Anak',
    description: 'Diskusi ringan bersama konselor keluarga.',
    category: 'Parenting',
    location: 'Online Webinar',
    startDate: getFormattedDate(4),
    endDate: getFormattedDate(4),
    startTime: '14:00',
    endTime: '15:30',
    color: '#a855f7',
    priority: 'low',
    reminder: '30m',
    repeat: 'Never',
    attachments: [],
    createdBy: 'u-2',
    assignedMemberIds: ['u-2'],
    assignedRoleCategory: 'spouse',
    status: 'scheduled',
    sourceModule: 'Parenting',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'evt-8',
    title: 'Belanja Bulanan Kebutuhan Dapur',
    description: 'Membeli stok beras, minyak, sayuran segar, dan susu anak.',
    category: 'Belanja',
    location: 'Supermarket Superindo',
    startDate: getFormattedDate(5),
    endDate: getFormattedDate(5),
    startTime: '10:00',
    endTime: '12:00',
    color: '#f59e0b',
    priority: 'medium',
    reminder: '2h',
    repeat: 'Weekly',
    attachments: [],
    createdBy: 'u-2',
    assignedMemberIds: ['u-1', 'u-2'],
    assignedRoleCategory: 'family',
    status: 'scheduled',
    sourceModule: 'Shopping',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const initialReminders: ReminderItem[] = [
  {
    id: 'rem-1',
    title: 'Ambil obat vitamin Kakek pukul 19:00',
    description: 'Dosis harian sesuai petunjuk dokter.',
    category: 'Kesehatan',
    type: 'reminder',
    dueDate: getFormattedDate(0),
    dueTime: '19:00',
    assignedMemberId: 'u-4',
    assignedMemberName: 'Kakek Surya',
    isCompleted: false,
    priority: 'high',
    reminderOption: '15m',
    createdAt: new Date().toISOString()
  },
  {
    id: 'rem-2',
    title: 'Siapkan seragam dan kostum pentas Budi',
    description: 'Untuk dipakai besok pagi di sekolah.',
    category: 'Sekolah',
    type: 'task',
    dueDate: getFormattedDate(0),
    dueTime: '20:00',
    assignedMemberId: 'u-3',
    assignedMemberName: 'Budi Santoso',
    isCompleted: false,
    priority: 'medium',
    reminderOption: '30m',
    createdAt: new Date().toISOString()
  },
  {
    id: 'rem-3',
    title: 'Ulang Tahun Ayah Rudi 🎂 Lusa!',
    description: 'Pesanan kue dan dekorasi di rumah.',
    category: 'Ulang Tahun',
    type: 'birthday',
    dueDate: getFormattedDate(2),
    dueTime: '08:00',
    assignedMemberId: 'u-2',
    assignedMemberName: 'Ibu Siti',
    isCompleted: false,
    priority: 'high',
    reminderOption: '1d',
    createdAt: new Date().toISOString()
  }
];

export const initialFamilyTimePlans: FamilyTimePlan[] = [
  {
    id: 'ftp-1',
    activityType: 'Movie Night',
    title: 'Nonton Film Animasi Pilihan Anak',
    description: 'Persiapkan camilan pop corn hangat, jus buah, dan matikan lampu utama.',
    date: getFormattedDate(0),
    time: '19:30',
    location: 'Ruang Keluarga Utama',
    participants: ['Ayah Rudi', 'Ibu Siti', 'Budi', 'Siti'],
    preparedChecklist: [
      { id: 'chk-1', item: 'Siapkan Popcorn & Minuman', completed: true },
      { id: 'chk-2', item: 'Pilih Film Favorit Keluarga', completed: true },
      { id: 'chk-3', item: 'Nonaktifkan Gadget Selama Film', completed: false }
    ],
    status: 'planned'
  },
  {
    id: 'ftp-2',
    activityType: 'Picnic',
    title: 'Piknik Akhir Pekan di Taman Kota',
    description: 'Menikmati udara segar, jalan santai, dan bekal buatan sendiri.',
    date: getFormattedDate(6),
    time: '07:00',
    location: 'Taman Kota Hijau',
    participants: ['Ayah Rudi', 'Ibu Siti', 'Budi', 'Siti', 'Kakek Surya'],
    preparedChecklist: [
      { id: 'chk-4', item: 'Bawa Tikar & Bekal Sandwich', completed: false },
      { id: 'chk-5', item: 'Siapkan Air Mineral & Buah Potong', completed: false },
      { id: 'chk-6', item: 'Bawa Alat Olahraga Ringan (Bulu Tangkis)', completed: false }
    ],
    status: 'planned'
  }
];
