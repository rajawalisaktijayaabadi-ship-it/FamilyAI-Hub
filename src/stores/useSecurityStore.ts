import { create } from 'zustand';
import { SecurityEvent, FamilyPresence, Maintenance, IoTProvider, SmartHomeNotification } from '../types';

interface SecurityState {
  isArmSystem: boolean;
  securityEvents: SecurityEvent[];
  familyPresenceList: FamilyPresence[];
  maintenances: Maintenance[];
  providers: IoTProvider[];
  notifications: SmartHomeNotification[];

  // Actions
  toggleArmSystem: () => void;
  addSecurityEvent: (event: SecurityEvent) => void;
  resolveSecurityEvent: (id: string) => void;
  
  updatePresence: (id: string, status: FamilyPresence['status']) => void;
  
  addMaintenance: (item: Maintenance) => void;
  completeMaintenance: (id: string) => void;
  
  toggleProvider: (id: string) => void;
  markNotificationRead: (id: string) => void;
}

const initialEvents: SecurityEvent[] = [
  {
    id: 'sec-1',
    timestamp: '2026-08-01 02:15:00',
    type: 'Door/Window',
    location: 'Pintu Samping Terbuka',
    severity: 'Normal',
    description: 'Pintu samping dibuka oleh Ayah (Budi) - Terverifikasi Smart Key.',
    status: 'Resolved'
  },
  {
    id: 'sec-2',
    timestamp: '2026-07-31 23:45:00',
    type: 'CCTV',
    location: 'Kamera Carport Outdoor',
    severity: 'Warning',
    description: 'Deteksi objek manusia mendekati pagar luar pada malam hari.',
    status: 'Resolved'
  },
  {
    id: 'sec-3',
    timestamp: '2026-07-30 14:10:00',
    type: 'Smoke',
    location: 'Sensor Asap Dapur',
    severity: 'Normal',
    description: 'Peningkatan asap tipis terdeteksi saat memasak sup.',
    status: 'Resolved'
  }
];

const initialPresence: FamilyPresence[] = [
  {
    id: 'fp-1',
    memberName: 'Ayah (Budi)',
    role: 'Ayah',
    status: 'Di Rumah',
    lastSeen: 'Baru saja',
    locationTag: 'Ruang Tamu (Wi-Fi Main mesh connected)'
  },
  {
    id: 'fp-2',
    memberName: 'Ibu (Siti)',
    role: 'Ibu',
    status: 'Di Rumah',
    lastSeen: 'Baru saja',
    locationTag: 'Dapur (Smart Hub Connected)'
  },
  {
    id: 'fp-3',
    memberName: 'Anak (Kiki)',
    role: 'Anak',
    status: 'Di Sekolah/Kantor',
    lastSeen: '4 jam lalu',
    locationTag: 'Sekolah (GPS Geofence Outer)'
  },
  {
    id: 'fp-4',
    memberName: 'Kakek (Bambang)',
    role: 'Lansia',
    status: 'Di Rumah',
    lastSeen: '10 mnt lalu',
    locationTag: 'Kamar Tidur Depan'
  }
];

const initialMaintenances: Maintenance[] = [
  {
    id: 'maint-1',
    deviceName: 'AC Split Inverter Utama',
    serviceType: 'Servis AC',
    dueDate: '2026-08-15',
    lastServiceDate: '2026-05-10',
    warrantyExpiryDate: '2027-05-10',
    status: 'Terjadwal',
    estimatedCostIdr: 150000,
    assignedTechnician: 'Daikin Authorized Service Center'
  },
  {
    id: 'maint-2',
    deviceName: 'Filter Water Dispenser Dapur',
    serviceType: 'Ganti Filter Air',
    dueDate: '2026-08-05',
    lastServiceDate: '2026-02-05',
    warrantyExpiryDate: '2026-12-31',
    status: 'Mendesak',
    estimatedCostIdr: 95000,
    assignedTechnician: 'Teknisi Mandiri'
  },
  {
    id: 'maint-3',
    deviceName: 'Robot Vacuum Floor Cleaner',
    serviceType: 'Pengecekan Elektronik',
    dueDate: '2026-09-01',
    lastServiceDate: '2026-06-01',
    warrantyExpiryDate: '2028-01-15',
    status: 'Terjadwal',
    estimatedCostIdr: 0,
    assignedTechnician: 'Roborock Official'
  }
];

const initialProviders: IoTProvider[] = [
  { id: 'prov-1', name: 'Google Home', connected: true, deviceCount: 8, status: 'Connected' },
  { id: 'prov-2', name: 'Apple HomeKit', connected: true, deviceCount: 5, status: 'Connected' },
  { id: 'prov-3', name: 'Amazon Alexa', connected: false, deviceCount: 0, status: 'Ready to Sync' },
  { id: 'prov-4', name: 'Samsung SmartThings', connected: true, deviceCount: 4, status: 'Connected' },
  { id: 'prov-5', name: 'Tuya', connected: true, deviceCount: 6, status: 'Connected' },
  { id: 'prov-6', name: 'Home Assistant', connected: true, deviceCount: 9, status: 'Connected' },
  { id: 'prov-7', name: 'Matter', connected: true, deviceCount: 7, status: 'Connected' },
  { id: 'prov-8', name: 'MQTT', connected: false, deviceCount: 0, status: 'Ready to Sync' }
];

const initialNotifications: SmartHomeNotification[] = [
  {
    id: 'notif-sh-1',
    title: 'Pengingat Servis AC',
    message: 'Jadwal pembersihan filter AC Kamar Utama disarankan dalam 14 hari ke depan.',
    type: 'Maintenance',
    timestamp: 'Hari ini, 08:00',
    isRead: false
  },
  {
    id: 'notif-sh-2',
    title: 'Baterai Smart Lock 85%',
    message: 'Baterai pintu depan masih sangat baik.',
    type: 'Low Battery',
    timestamp: 'Kemarin, 14:20',
    isRead: true
  }
];

export const useSecurityStore = create<SecurityState>((set) => ({
  isArmSystem: true,
  securityEvents: initialEvents,
  familyPresenceList: initialPresence,
  maintenances: initialMaintenances,
  providers: initialProviders,
  notifications: initialNotifications,

  toggleArmSystem: () => set((state) => ({
    isArmSystem: !state.isArmSystem
  })),

  addSecurityEvent: (event: SecurityEvent) => set((state) => ({
    securityEvents: [event, ...state.securityEvents]
  })),

  resolveSecurityEvent: (id: string) => set((state) => ({
    securityEvents: state.securityEvents.map(e => e.id === id ? { ...e, status: 'Resolved' } : e)
  })),

  updatePresence: (id: string, status: FamilyPresence['status']) => set((state) => ({
    familyPresenceList: state.familyPresenceList.map(p => p.id === id ? { ...p, status, lastSeen: 'Baru saja' } : p)
  })),

  addMaintenance: (item: Maintenance) => set((state) => ({
    maintenances: [item, ...state.maintenances]
  })),

  completeMaintenance: (id: string) => set((state) => ({
    maintenances: state.maintenances.map(m => m.id === id ? { ...m, status: 'Selesai', lastServiceDate: new Date().toISOString().split('T')[0] } : m)
  })),

  toggleProvider: (id: string) => set((state) => ({
    providers: state.providers.map(p => p.id === id ? { ...p, connected: !p.connected, status: !p.connected ? 'Connected' : 'Ready to Sync' } : p)
  })),

  markNotificationRead: (id: string) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, isRead: true } : n)
  }))
}));
