export type DeviceCategoryType = 
  | 'Lampu' 
  | 'AC' 
  | 'TV' 
  | 'Kulkas' 
  | 'Mesin Cuci' 
  | 'Dispenser' 
  | 'Kipas' 
  | 'Stop Kontak Pintar' 
  | 'Smart Lock' 
  | 'Kamera CCTV' 
  | 'Sensor Gerak' 
  | 'Sensor Pintu' 
  | 'Sensor Asap' 
  | 'Sensor Gas' 
  | 'Sensor Air' 
  | 'Robot Vacuum' 
  | 'Smart Speaker' 
  | 'Custom Device';

export type RoomCategoryType = 
  | 'Ruang Tamu' 
  | 'Kamar Tidur' 
  | 'Kamar Anak' 
  | 'Dapur' 
  | 'Kamar Mandi' 
  | 'Garasi' 
  | 'Taman' 
  | 'Gudang' 
  | 'Custom Room';

export type ScenePresetType = 
  | 'Good Morning' 
  | 'Good Night' 
  | 'Movie Time' 
  | 'Dinner Time' 
  | 'Away Mode' 
  | 'Vacation Mode' 
  | 'Study Mode' 
  | 'Sleep Mode' 
  | 'Emergency Mode' 
  | 'Custom Scene';

export interface Device {
  id: string;
  name: string;
  category: DeviceCategoryType;
  room: string;
  brand: string;
  model: string;
  serialNumber: string;
  status: boolean; // Power state ON/OFF
  firmwareVersion: string;
  onlineStatus: 'Online' | 'Offline';
  batteryLevel: number; // Percentage 0-100 or -1 if AC powered
  signalStrength: number; // dBm or percentage 0-100
  lastActive: string;
  value?: number | string; // Temperature, brightness %, lock status, etc.
  unit?: string;
  powerConsumptionWatts: number;
}

export interface DeviceCategory {
  id: string;
  name: DeviceCategoryType;
  iconName: string;
  defaultPowerWatts: number;
  count: number;
}

export interface Room {
  id: string;
  name: string;
  category: RoomCategoryType;
  temperature: number;
  humidity: number;
  deviceIds: string[];
  isOccupied: boolean;
  photoUrl?: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  triggerType: 'Waktu' | 'Tanggal' | 'Lokasi' | 'Sensor' | 'Status Perangkat' | 'Kehadiran Anggota';
  triggerDetail: string;
  actionType: 'Nyalakan Perangkat' | 'Matikan Perangkat' | 'Kirim Notifikasi' | 'Jalankan Skenario' | 'Delay';
  actionDetail: string;
  targetDeviceId?: string;
  isEnabled: boolean;
  lastTriggered?: string;
}

export interface AutomationHistory {
  id: string;
  ruleId: string;
  ruleName: string;
  timestamp: string;
  status: 'Success' | 'Failed' | 'Simulated';
  resultDetail: string;
}

export interface Scene {
  id: string;
  name: ScenePresetType | string;
  icon: string;
  description: string;
  isActive: boolean;
  targetDeviceIds: string[];
  actionDescription: string;
}

export interface EnergyUsage {
  id: string;
  date: string;
  todayKwh: number;
  weeklyKwh: number;
  monthlyKwh: number;
  estimatedCostIdr: number;
  mostConsumingDevice: string;
  energySavingPercentage: number;
}

export interface SecurityEvent {
  id: string;
  timestamp: string;
  type: 'Door/Window' | 'CCTV' | 'Motion' | 'Smoke' | 'Gas' | 'Water Leak';
  location: string;
  severity: 'Normal' | 'Warning' | 'Critical';
  description: string;
  status: 'Resolved' | 'Active' | 'Investigating';
}

export interface FamilyPresence {
  id: string;
  memberName: string;
  role: 'Ayah' | 'Ibu' | 'Anak' | 'Lansia' | 'Guest';
  status: 'Di Rumah' | 'Keluar' | 'Tidur' | 'Di Sekolah/Kantor';
  lastSeen: string;
  locationTag: string;
}

export interface Maintenance {
  id: string;
  deviceName: string;
  serviceType: 'Servis AC' | 'Ganti Filter Air' | 'Pengecekan Elektronik' | 'Perbaikan Pintu/Kunci' | 'Pengecatan' | 'Custom';
  dueDate: string;
  lastServiceDate: string;
  warrantyExpiryDate: string;
  status: 'Terjadwal' | 'Mendesak' | 'Selesai';
  estimatedCostIdr: number;
  assignedTechnician?: string;
}

export interface DeviceHealth {
  id: string;
  deviceId: string;
  deviceName: string;
  online: boolean;
  battery: number;
  firmwareUpdateAvailable: boolean;
  maintenanceDue: boolean;
}

export interface IoTProvider {
  id: string;
  name: 'Google Home' | 'Apple HomeKit' | 'Amazon Alexa' | 'Samsung SmartThings' | 'Tuya' | 'Home Assistant' | 'Matter' | 'MQTT';
  connected: boolean;
  deviceCount: number;
  status: 'Connected' | 'Ready to Sync' | 'Offline';
}

export interface SmartHomeReport {
  id: string;
  reportType: 'Device Usage' | 'Automation History' | 'Energy Usage' | 'Maintenance' | 'Security Events';
  generatedAt: string;
  summaryText: string;
  totalEnergyKwh: number;
  securityIncidentCount: number;
}

export interface SmartHomeNotification {
  id: string;
  title: string;
  message: string;
  type: 'Maintenance' | 'Offline Device' | 'Low Battery' | 'Security Alert' | 'Automation Failed';
  timestamp: string;
  isRead: boolean;
}
