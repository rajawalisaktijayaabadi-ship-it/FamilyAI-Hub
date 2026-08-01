import { create } from 'zustand';
import { Device, DeviceCategory, Room } from '../types';

interface DeviceState {
  devices: Device[];
  rooms: Room[];
  categories: DeviceCategory[];
  
  // Actions
  toggleDevice: (id: string) => void;
  updateDeviceValue: (id: string, value: number | string) => void;
  addDevice: (device: Device) => void;
  updateDevice: (id: string, updated: Partial<Device>) => void;
  deleteDevice: (id: string) => void;
  
  // Room Actions
  addRoom: (room: Room) => void;
  updateRoom: (id: string, updated: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
}

const initialDevices: Device[] = [
  {
    id: 'dev-1',
    name: 'Lampu Utama Ruang Tamu',
    category: 'Lampu',
    room: 'Ruang Tamu',
    brand: 'Philips Hue',
    model: 'Smart Bulb Color E27',
    serialNumber: 'PH-HUE-2026-001',
    status: true,
    firmwareVersion: 'v1.4.2',
    onlineStatus: 'Online',
    batteryLevel: -1,
    signalStrength: 95,
    lastActive: 'Baru saja',
    value: 80,
    unit: '% Redup',
    powerConsumptionWatts: 12
  },
  {
    id: 'dev-2',
    name: 'AC Split Inverter Utama',
    category: 'AC',
    room: 'Kamar Tidur',
    brand: 'Daikin',
    model: 'FTKM25SV2S Inverter',
    serialNumber: 'DK-AC-2025-889',
    status: true,
    firmwareVersion: 'v2.1.0',
    onlineStatus: 'Online',
    batteryLevel: -1,
    signalStrength: 88,
    lastActive: '5 mnt lalu',
    value: 23,
    unit: '°C',
    powerConsumptionWatts: 650
  },
  {
    id: 'dev-3',
    name: 'Smart TV OLED 65"',
    category: 'TV',
    room: 'Ruang Tamu',
    brand: 'LG',
    model: 'OLED65C3PSA',
    serialNumber: 'LG-OLED-2026-102',
    status: false,
    firmwareVersion: 'v4.0.1',
    onlineStatus: 'Online',
    batteryLevel: -1,
    signalStrength: 90,
    lastActive: '1 jam lalu',
    value: 'HDMI 1',
    powerConsumptionWatts: 140
  },
  {
    id: 'dev-4',
    name: 'Kulkas Smart Multi-Door',
    category: 'Kulkas',
    room: 'Dapur',
    brand: 'Samsung',
    model: 'Family Hub RF7000',
    serialNumber: 'SS-REF-2025-330',
    status: true,
    firmwareVersion: 'v3.2.1',
    onlineStatus: 'Online',
    batteryLevel: -1,
    signalStrength: 92,
    lastActive: 'Baru saja',
    value: 3,
    unit: '°C',
    powerConsumptionWatts: 180
  },
  {
    id: 'dev-5',
    name: 'Smart Lock Pintu Depan',
    category: 'Smart Lock',
    room: 'Ruang Tamu',
    brand: 'Yale',
    model: 'YDM 4109+ Biometric',
    serialNumber: 'YL-LOCK-2026-99',
    status: true, // Locked
    firmwareVersion: 'v1.1.8',
    onlineStatus: 'Online',
    batteryLevel: 85,
    signalStrength: 85,
    lastActive: 'Baru saja',
    value: 'Terkunci Aman',
    powerConsumptionWatts: 2
  },
  {
    id: 'dev-6',
    name: 'CCTV 4K Outdoor Halaman',
    category: 'Kamera CCTV',
    room: 'Taman',
    brand: 'Hikvision',
    model: 'ColorVu 4K IP Cam',
    serialNumber: 'HK-CCTV-2026-004',
    status: true,
    firmwareVersion: 'v2.0.5',
    onlineStatus: 'Online',
    batteryLevel: -1,
    signalStrength: 78,
    lastActive: 'Baru saja',
    value: 'Stream Live HD',
    powerConsumptionWatts: 15
  },
  {
    id: 'dev-7',
    name: 'Robot Vacuum Floor Cleaner',
    category: 'Robot Vacuum',
    room: 'Ruang Tamu',
    brand: 'Roborock',
    model: 'S8 Pro Ultra',
    serialNumber: 'RR-VAC-2026-551',
    status: false,
    firmwareVersion: 'v3.0.2',
    onlineStatus: 'Online',
    batteryLevel: 98,
    signalStrength: 88,
    lastActive: 'Docking Charging',
    value: 'Ready',
    powerConsumptionWatts: 35
  },
  {
    id: 'dev-8',
    name: 'Sensor Asap & Karbon Dapur',
    category: 'Sensor Asap',
    room: 'Dapur',
    brand: 'Nest',
    model: 'Protect Gen 3',
    serialNumber: 'NS-SMK-2025-11',
    status: true,
    firmwareVersion: 'v1.0.9',
    onlineStatus: 'Online',
    batteryLevel: 92,
    signalStrength: 90,
    lastActive: 'Baru saja',
    value: 'Aman (0 PPM)',
    powerConsumptionWatts: 1
  },
  {
    id: 'dev-9',
    name: 'Smart Speaker Living Room',
    category: 'Smart Speaker',
    room: 'Ruang Tamu',
    brand: 'Google Nest',
    model: 'Audio 2nd Gen',
    serialNumber: 'GOOG-SPK-2026-78',
    status: true,
    firmwareVersion: 'v2.5.0',
    onlineStatus: 'Online',
    batteryLevel: -1,
    signalStrength: 96,
    lastActive: 'Baru saja',
    value: 'Standby Voice',
    powerConsumptionWatts: 8
  }
];

const initialRooms: Room[] = [
  {
    id: 'rm-1',
    name: 'Ruang Tamu',
    category: 'Ruang Tamu',
    temperature: 25.5,
    humidity: 58,
    deviceIds: ['dev-1', 'dev-3', 'dev-5', 'dev-7', 'dev-9'],
    isOccupied: true,
    photoUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rm-2',
    name: 'Kamar Tidur Utama',
    category: 'Kamar Tidur',
    temperature: 23.0,
    humidity: 52,
    deviceIds: ['dev-2'],
    isOccupied: false,
    photoUrl: 'https://images.unsplash.com/photo-1540518614846-7ede433c5163?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rm-3',
    name: 'Dapur Modern',
    category: 'Dapur',
    temperature: 27.0,
    humidity: 62,
    deviceIds: ['dev-4', 'dev-8'],
    isOccupied: true,
    photoUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rm-4',
    name: 'Taman Depan & Carport',
    category: 'Taman',
    temperature: 29.0,
    humidity: 65,
    deviceIds: ['dev-6'],
    isOccupied: false,
    photoUrl: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=800&q=80'
  }
];

const initialCategories: DeviceCategory[] = [
  { id: 'cat-1', name: 'Lampu', iconName: 'Lightbulb', defaultPowerWatts: 12, count: 5 },
  { id: 'cat-2', name: 'AC', iconName: 'Thermometer', defaultPowerWatts: 650, count: 3 },
  { id: 'cat-3', name: 'TV', iconName: 'Tv', defaultPowerWatts: 140, count: 2 },
  { id: 'cat-4', name: 'Kulkas', iconName: 'Refrigerator', defaultPowerWatts: 180, count: 1 },
  { id: 'cat-5', name: 'Mesin Cuci', iconName: 'WashingMachine', defaultPowerWatts: 350, count: 1 },
  { id: 'cat-6', name: 'Smart Lock', iconName: 'Lock', defaultPowerWatts: 2, count: 2 },
  { id: 'cat-7', name: 'Kamera CCTV', iconName: 'Camera', defaultPowerWatts: 15, count: 4 },
  { id: 'cat-8', name: 'Sensor Gerak', iconName: 'Radar', defaultPowerWatts: 1, count: 3 },
  { id: 'cat-9', name: 'Robot Vacuum', iconName: 'Bot', defaultPowerWatts: 35, count: 1 },
  { id: 'cat-10', name: 'Smart Speaker', iconName: 'Volume2', defaultPowerWatts: 8, count: 2 }
];

export const useDeviceStore = create<DeviceState>((set) => ({
  devices: initialDevices,
  rooms: initialRooms,
  categories: initialCategories,

  toggleDevice: (id: string) => set((state) => ({
    devices: state.devices.map(d => d.id === id ? { ...d, status: !d.status, lastActive: 'Baru saja' } : d)
  })),

  updateDeviceValue: (id: string, value: number | string) => set((state) => ({
    devices: state.devices.map(d => d.id === id ? { ...d, value, lastActive: 'Baru saja' } : d)
  })),

  addDevice: (device: Device) => set((state) => ({
    devices: [device, ...state.devices]
  })),

  updateDevice: (id: string, updated: Partial<Device>) => set((state) => ({
    devices: state.devices.map(d => d.id === id ? { ...d, ...updated } : d)
  })),

  deleteDevice: (id: string) => set((state) => ({
    devices: state.devices.filter(d => d.id !== id)
  })),

  addRoom: (room: Room) => set((state) => ({
    rooms: [room, ...state.rooms]
  })),

  updateRoom: (id: string, updated: Partial<Room>) => set((state) => ({
    rooms: state.rooms.map(r => r.id === id ? { ...r, ...updated } : r)
  })),

  deleteRoom: (id: string) => set((state) => ({
    rooms: state.rooms.filter(r => r.id !== id)
  }))
}));
