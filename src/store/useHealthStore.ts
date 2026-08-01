import { create } from 'zustand';
import { 
  HealthProfile, VitalRecord, Medication, MedicationHistory, 
  MedicalAppointment, ExerciseLog, SleepLog, WaterTracker, 
  NutritionSummary, HealthJournal, HealthReport, HealthInsight, 
  EmergencyInfo, WearableDevice, VitalType, ExerciseType 
} from '../features/health/types';

interface HealthStoreState {
  // Data State
  healthProfiles: Record<string, HealthProfile>;
  vitalRecords: VitalRecord[];
  medications: Medication[];
  medicationHistories: MedicationHistory[];
  medicalAppointments: MedicalAppointment[];
  exerciseLogs: ExerciseLog[];
  sleepLogs: SleepLog[];
  waterTrackers: Record<string, WaterTracker>; // key: `${memberId}_${date}`
  nutritionSummaries: Record<string, NutritionSummary>;
  healthJournals: HealthJournal[];
  healthReports: HealthReport[];
  healthInsights: HealthInsight[];
  emergencyInfos: Record<string, EmergencyInfo>;
  wearableDevices: WearableDevice[];

  // Selected state
  activeMemberId: string; // 'm1', 'm2', etc. or 'all'
  setActiveMemberId: (id: string) => void;

  // Actions - Vital Records
  addVitalRecord: (record: Omit<VitalRecord, 'id'>) => void;
  deleteVitalRecord: (id: string) => void;

  // Actions - Medication
  addMedication: (med: Omit<Medication, 'id'>) => void;
  toggleMedicationTaken: (medicationId: string, memberId: string, status?: 'taken' | 'skipped') => void;
  deleteMedication: (id: string) => void;

  // Actions - Medical Appointment
  addAppointment: (appt: Omit<MedicalAppointment, 'id'>) => void;
  updateAppointmentStatus: (id: string, status: 'scheduled' | 'completed' | 'cancelled') => void;
  deleteAppointment: (id: string) => void;

  // Actions - Exercise
  addExerciseLog: (exercise: Omit<ExerciseLog, 'id'>) => void;
  deleteExerciseLog: (id: string) => void;

  // Actions - Sleep
  addSleepLog: (sleep: Omit<SleepLog, 'id'>) => void;

  // Actions - Water
  logWaterIntake: (memberId: string, amountMl: number) => void;
  updateWaterTarget: (memberId: string, targetMl: number) => void;

  // Actions - Journal
  addHealthJournal: (journal: Omit<HealthJournal, 'id'>) => void;
  deleteHealthJournal: (id: string) => void;

  // Actions - Profile & Emergency
  updateHealthProfile: (memberId: string, data: Partial<HealthProfile>) => void;
  updateEmergencyInfo: (memberId: string, data: Partial<EmergencyInfo>) => void;

  // Actions - Wearables
  toggleWearableConnection: (id: string) => void;
  syncWearableData: (id: string) => void;

  // Helpers / Generators
  generateHealthReport: (memberId: string, period: 'daily' | 'weekly' | 'monthly') => HealthReport;
}

const todayStr = new Date().toISOString().split('T')[0];

// Initial Mock Data
const initialProfiles: Record<string, HealthProfile> = {
  m1: {
    memberId: 'm1',
    name: 'Budi Santoso',
    bloodType: 'O+',
    heightCm: 175,
    weightKg: 72,
    bmi: 23.5,
    allergies: ['Debu', 'Seafood / Udang'],
    medicalHistory: ['Hipertensi ringan'],
    surgeryHistory: ['Apendektomi (2018)'],
    routineMedications: ['Amlodipine 5mg (1x Sehari)'],
    familyDoctor: { name: 'dr. Hendra Wijaya, Sp.PD', specialty: 'Spesialis Penyakit Dalam', phone: '0812-3456-7890' },
    favoriteHospital: { name: 'RS Medika Permata', address: 'Jl. Permata Hijau No. 12', phone: '021-555-1234' },
    emergencyContact: { name: 'Siti Rahma', relationship: 'Istri', phone: '0811-9876-5432' },
    healthNotes: 'Rutin cek tekanan darah setiap awal minggu.',
    isPrivateRecord: false,
  },
  m2: {
    memberId: 'm2',
    name: 'Siti Rahma',
    bloodType: 'A+',
    heightCm: 162,
    weightKg: 58,
    bmi: 22.1,
    allergies: ['Penisilin'],
    medicalHistory: ['Anemia ringan pasca melahirkan'],
    surgeryHistory: [],
    routineMedications: ['Suplemen Zat Besi & Vit D3'],
    familyDoctor: { name: 'dr. Maya Kartika, Sp.OG', specialty: 'Spesialis Kebidanan & Kandungan', phone: '0813-2233-4455' },
    favoriteHospital: { name: 'RSIA Bunda Jakarta', address: 'Jl. Teuku Cik Ditiro No. 28', phone: '021-3192-2000' },
    emergencyContact: { name: 'Budi Santoso', relationship: 'Suami', phone: '0812-3456-7890' },
    healthNotes: 'Melakukan yoga rutin 3x seminggu.',
    isPrivateRecord: false,
  },
  m3: {
    memberId: 'm3',
    name: 'Rizky Santoso',
    bloodType: 'O+',
    heightCm: 160,
    weightKg: 48,
    bmi: 18.8,
    allergies: ['Kacang Tanah'],
    medicalHistory: ['Asma ringan saat dingin'],
    surgeryHistory: [],
    routineMedications: ['Inhaler Ventolin (Bila Sesak)'],
    familyDoctor: { name: 'dr. Andi Pratama, Sp.A', specialty: 'Spesialis Anak', phone: '0815-6677-8899' },
    favoriteHospital: { name: 'RS Pondok Indah', address: 'Jl. Metro Pondok Indah', phone: '021-765-7525' },
    emergencyContact: { name: 'Siti Rahma', relationship: 'Ibu', phone: '0811-9876-5432' },
    healthNotes: 'Membawa inhaler di tas sekolah.',
    isPrivateRecord: false,
  },
  m4: {
    memberId: 'm4',
    name: 'Aisyah Santoso',
    bloodType: 'A+',
    heightCm: 132,
    weightKg: 28,
    bmi: 16.1,
    allergies: ['Tungau Debu'],
    medicalHistory: ['Flu & Demam Musiman'],
    surgeryHistory: [],
    routineMedications: ['Vitamin C Anak & Minyak Ikan'],
    familyDoctor: { name: 'dr. Andi Pratama, Sp.A', specialty: 'Spesialis Anak', phone: '0815-6677-8899' },
    favoriteHospital: { name: 'RS Pondok Indah', address: 'Jl. Metro Pondok Indah', phone: '021-765-7525' },
    emergencyContact: { name: 'Siti Rahma', relationship: 'Ibu', phone: '0811-9876-5432' },
    healthNotes: 'Jadwal vaksinasi anak lengkap.',
    isPrivateRecord: false,
  },
  m5: {
    memberId: 'm5',
    name: 'Kakek Subagyo',
    bloodType: 'B+',
    heightCm: 168,
    weightKg: 65,
    bmi: 23.0,
    allergies: ['Dingin Ekstrem'],
    medicalHistory: ['Hipertensi', 'Kolesterol Tinggi', 'Asam Urat'],
    surgeryHistory: ['Katarak Mata Kiri (2021)'],
    routineMedications: ['Candozet 16mg', 'Simvastatin 20mg', 'Allopurinol 100mg'],
    familyDoctor: { name: 'dr. Rina Hartati, Sp.PD-KGer', specialty: 'Spesialis Geriatri', phone: '0817-1122-3344' },
    favoriteHospital: { name: 'RS Cipto Mangunkusumo (RSCM)', address: 'Jl. Diponegoro No. 71', phone: '021-1500-135' },
    emergencyContact: { name: 'Budi Santoso', relationship: 'Anak Kandung', phone: '0812-3456-7890' },
    healthNotes: 'Dilarang makan jeroan dan emping. Kontrol rutin tiap bulan.',
    isPrivateRecord: false,
  }
};

const initialEmergencyInfos: Record<string, EmergencyInfo> = {
  m1: {
    memberId: 'm1',
    primaryContact: { name: 'Siti Rahma', relation: 'Istri', phone: '0811-9876-5432' },
    bloodType: 'O+',
    allergies: ['Debu', 'Seafood'],
    chronicConditions: ['Hipertensi'],
    routineMeds: ['Amlodipine 5mg'],
    insuranceProvider: 'BPJS Kesehatan / Prudential',
    insuranceNumber: '0001234567891',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=FAMILY_AI_EMERGENCY_M1_BUDI'
  },
  m2: {
    memberId: 'm2',
    primaryContact: { name: 'Budi Santoso', relation: 'Suami', phone: '0812-3456-7890' },
    bloodType: 'A+',
    allergies: ['Penisilin'],
    chronicConditions: [],
    routineMeds: ['Suplemen Zat Besi'],
    insuranceProvider: 'Manulife Health Care',
    insuranceNumber: '888777666555',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=FAMILY_AI_EMERGENCY_M2_SITI'
  },
  m3: {
    memberId: 'm3',
    primaryContact: { name: 'Siti Rahma', relation: 'Ibu', phone: '0811-9876-5432' },
    bloodType: 'O+',
    allergies: ['Kacang Tanah'],
    chronicConditions: ['Asma Bronkial'],
    routineMeds: ['Inhaler Ventolin'],
    insuranceProvider: 'BPJS Kesehatan',
    insuranceNumber: '0001234567893',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=FAMILY_AI_EMERGENCY_M3_RIZKY'
  },
  m5: {
    memberId: 'm5',
    primaryContact: { name: 'Budi Santoso', relation: 'Anak', phone: '0812-3456-7890' },
    bloodType: 'B+',
    allergies: [],
    chronicConditions: ['Hipertensi', 'Kolesterol', 'Asam Urat'],
    routineMeds: ['Candozet', 'Simvastatin', 'Allopurinol'],
    insuranceProvider: 'BPJS Kesehatan VIP Lansia',
    insuranceNumber: '0001234567895',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=FAMILY_AI_EMERGENCY_M5_KAKEK'
  }
};

const initialVitals: VitalRecord[] = [
  { id: 'v1', memberId: 'm1', type: 'blood_pressure', value: '122/82', unit: 'mmHg', timestamp: 'Hari ini, 07:15 WIB', isNormal: true },
  { id: 'v2', memberId: 'm1', type: 'heart_rate', value: '72', numericValue: 72, unit: 'bpm', timestamp: 'Hari ini, 07:15 WIB', isNormal: true },
  { id: 'v3', memberId: 'm1', type: 'spo2', value: '98', numericValue: 98, unit: '%', timestamp: 'Hari ini, 07:15 WIB', isNormal: true },
  { id: 'v4', memberId: 'm1', type: 'blood_sugar', value: '105', numericValue: 105, unit: 'mg/dL', timestamp: 'Kemarin, 21:00 WIB', isNormal: true },
  
  { id: 'v5', memberId: 'm5', type: 'blood_pressure', value: '138/88', unit: 'mmHg', timestamp: 'Hari ini, 08:00 WIB', isNormal: false, note: 'Sedikit tinggi setelah bangun' },
  { id: 'v6', memberId: 'm5', type: 'heart_rate', value: '68', numericValue: 68, unit: 'bpm', timestamp: 'Hari ini, 08:00 WIB', isNormal: true },
  { id: 'v7', memberId: 'm5', type: 'blood_sugar', value: '118', numericValue: 118, unit: 'mg/dL', timestamp: 'Hari ini, 06:30 WIB', isNormal: true },
  { id: 'v8', memberId: 'm5', type: 'temperature', value: '36.5', numericValue: 36.5, unit: '°C', timestamp: 'Hari ini, 08:00 WIB', isNormal: true },

  { id: 'v9', memberId: 'm3', type: 'temperature', value: '37.8', numericValue: 37.8, unit: '°C', timestamp: 'Kemarin, 19:30 WIB', isNormal: false, note: 'Anak agak hangat pasca latihan' },
  { id: 'v10', memberId: 'm3', type: 'spo2', value: '99', numericValue: 99, unit: '%', timestamp: 'Kemarin, 19:30 WIB', isNormal: true },
];

const initialMedications: Medication[] = [
  {
    id: 'med1',
    memberId: 'm1',
    name: 'Amlodipine Besylate',
    dosage: '5 mg - 1 Tablet',
    frequency: '1x Sehari (Pagi setelah sarapan)',
    timesOfDay: ['07:30'],
    scheduleDays: 'Setiap Hari',
    reminderEnabled: true,
    remainingPills: 18,
    notes: 'Diminum teratur pencegah hipertensi',
    prescribedBy: 'dr. Hendra Wijaya, Sp.PD'
  },
  {
    id: 'med2',
    memberId: 'm5',
    name: 'Candozet (Candesartan)',
    dosage: '16 mg - 1 Tablet',
    frequency: '1x Sehari (Pagi hari)',
    timesOfDay: ['08:00'],
    scheduleDays: 'Setiap Hari',
    reminderEnabled: true,
    remainingPills: 12,
    notes: 'Pengontrol tekanan darah kakek',
    prescribedBy: 'dr. Rina Hartati, Sp.PD'
  },
  {
    id: 'med3',
    memberId: 'm5',
    name: 'Simvastatin',
    dosage: '20 mg - 1 Tablet',
    frequency: '1x Sehari (Malam sebelum tidur)',
    timesOfDay: ['21:00'],
    scheduleDays: 'Setiap Hari',
    reminderEnabled: true,
    remainingPills: 22,
    notes: 'Penurun kolesterol',
    prescribedBy: 'dr. Rina Hartati, Sp.PD'
  },
  {
    id: 'med4',
    memberId: 'm3',
    name: 'Inhaler Ventolin Evohaler',
    dosage: '2 Semprotan',
    frequency: 'Bila Asma/Sesak Kambuh',
    timesOfDay: [],
    scheduleDays: 'Sesuai Kebutuhan',
    reminderEnabled: false,
    remainingPills: 120,
    notes: 'Membawa di tas sekolah',
    prescribedBy: 'dr. Andi Pratama, Sp.A'
  }
];

const initialMedHistories: MedicationHistory[] = [
  {
    id: 'mh1',
    medicationId: 'med1',
    memberId: 'm1',
    medicationName: 'Amlodipine Besylate 5mg',
    takenAt: 'Hari ini, 07:35 WIB',
    status: 'taken',
    note: 'Sudah diminum bersama sarapan gandum'
  },
  {
    id: 'mh2',
    medicationId: 'med2',
    memberId: 'm5',
    medicationName: 'Candozet 16mg',
    takenAt: 'Hari ini, 08:05 WIB',
    status: 'taken',
    note: 'Didampingi Ibu Siti'
  }
];

const initialAppointments: MedicalAppointment[] = [
  {
    id: 'app1',
    memberId: 'm5',
    doctorName: 'dr. Rina Hartati, Sp.PD-KGer',
    specialty: 'Spesialis Geriatri & Penyakit Dalam',
    hospitalClinic: 'RS Cipto Mangunkusumo (Poli VIP)',
    date: '2026-08-08',
    time: '09:30',
    location: 'Gedung Kencana RSCM, Lantai 3',
    notes: 'Rutin kontrol tensi & cek laboratorium darah lengkap (puasa 10 jam sebelumnya).',
    reminderBeforeMinutes: 120,
    status: 'scheduled'
  },
  {
    id: 'app2',
    memberId: 'm2',
    doctorName: 'dr. Maya Kartika, Sp.OG',
    specialty: 'Dokter Spesialis Kebidanan',
    hospitalClinic: 'RSIA Bunda Menteng',
    date: '2026-08-15',
    time: '14:00',
    location: 'Klinik Bunda Women Health Centre',
    notes: 'Check-up tahunan dan pemeriksaan USG rutin.',
    reminderBeforeMinutes: 60,
    status: 'scheduled'
  }
];

const initialExerciseLogs: ExerciseLog[] = [
  {
    id: 'e1',
    memberId: 'm1',
    type: 'running',
    durationMinutes: 35,
    caloriesBurned: 320,
    targetCalories: 300,
    date: todayStr,
    notes: 'Jogging pagi di Kompleks Senopati 4 km'
  },
  {
    id: 'e2',
    memberId: 'm2',
    type: 'yoga',
    durationMinutes: 45,
    caloriesBurned: 180,
    targetCalories: 200,
    date: todayStr,
    notes: 'Sesi Vinyasa Flow Pagi bersama Komunitas'
  },
  {
    id: 'e3',
    memberId: 'm3',
    type: 'gym',
    customTypeName: 'Basket Sekolah',
    durationMinutes: 60,
    caloriesBurned: 450,
    targetCalories: 400,
    date: todayStr,
    notes: 'Latihan tim basket SMAN 8'
  },
  {
    id: 'e4',
    memberId: 'm5',
    type: 'walking',
    durationMinutes: 20,
    caloriesBurned: 85,
    targetCalories: 100,
    date: todayStr,
    notes: 'Jalan santai Kakek di Taman Langsat'
  }
];

const initialSleepLogs: SleepLog[] = [
  {
    id: 'sl1',
    memberId: 'm1',
    date: todayStr,
    bedtime: '23:00',
    waketime: '06:15',
    durationHours: 7.25,
    sleepQuality: 'Sangat Baik',
    wearableSynced: true,
    notes: 'Terbangun segar, tidak ada gangguan terbangun tengah malam.'
  },
  {
    id: 'sl2',
    memberId: 'm2',
    date: todayStr,
    bedtime: '22:30',
    waketime: '06:00',
    durationHours: 7.5,
    sleepQuality: 'Baik',
    wearableSynced: true,
    notes: 'Tidur lumayan lelap.'
  },
  {
    id: 'sl3',
    memberId: 'm5',
    date: todayStr,
    bedtime: '21:30',
    waketime: '05:00',
    durationHours: 7.5,
    sleepQuality: 'Baik',
    wearableSynced: false,
    notes: 'Kakek terbangun jam 03.00 untuk shalat malam.'
  }
];

const initialWaterTrackers: Record<string, WaterTracker> = {
  [`m1_${todayStr}`]: {
    id: `wt_m1_${todayStr}`,
    memberId: 'm1',
    date: todayStr,
    targetMl: 2500,
    currentMl: 1750,
    logs: [
      { id: 'wl1', amountMl: 500, timestamp: '07:00' },
      { id: 'wl2', amountMl: 500, timestamp: '10:30' },
      { id: 'wl3', amountMl: 250, timestamp: '12:45' },
      { id: 'wl4', amountMl: 500, timestamp: '15:15' }
    ]
  },
  [`m2_${todayStr}`]: {
    id: `wt_m2_${todayStr}`,
    memberId: 'm2',
    date: todayStr,
    targetMl: 2200,
    currentMl: 1500,
    logs: [
      { id: 'wl2_1', amountMl: 500, timestamp: '06:30' },
      { id: 'wl2_2', amountMl: 500, timestamp: '09:00' },
      { id: 'wl2_3', amountMl: 500, timestamp: '13:00' }
    ]
  },
  [`m5_${todayStr}`]: {
    id: `wt_m5_${todayStr}`,
    memberId: 'm5',
    date: todayStr,
    targetMl: 2000,
    currentMl: 1250,
    logs: [
      { id: 'wl5_1', amountMl: 250, timestamp: '06:00' },
      { id: 'wl5_2', amountMl: 500, timestamp: '08:30' },
      { id: 'wl5_3', amountMl: 500, timestamp: '11:45' }
    ]
  }
};

const initialNutritionSummaries: Record<string, NutritionSummary> = {
  [`m1_${todayStr}`]: {
    id: `nut_m1_${todayStr}`,
    memberId: 'm1',
    date: todayStr,
    calories: 1850,
    targetCalories: 2200,
    proteinG: 85,
    carbsG: 210,
    fatG: 55,
    vitamins: ['Vitamin C', 'Vitamin D3', 'B Complex'],
    minerals: ['Kalium', 'Kalsium', 'Magnesium'],
    waterMl: 1750
  }
};

const initialJournals: HealthJournal[] = [
  {
    id: 'hj1',
    memberId: 'm1',
    date: todayStr,
    title: 'Perasaan Tubuh Segar Pasca Jogging & Sarapan Gandum',
    content: 'Pagi ini tensi stabil 122/82. Jogging 35 menit di komplek terasa ringan. Tubuh terasa lebih bertenaga dan fokus bekerja.',
    tags: ['Olahraga', 'Tensi Normal', 'Semangat'],
    moodRating: 5,
    symptoms: []
  },
  {
    id: 'hj2',
    memberId: 'm5',
    date: '2026-07-31',
    title: 'Kaki Kakek Sedikit Pegal Usai Berjalan di Taman',
    content: 'Sore kemarin Kakek mengeluh sendi lutut agak ngilu. Sudah dikompres air hangat dan diberi minyak kayu putih. Tensi tetap terkontrol.',
    tags: ['Sendi', 'Lansia', 'Kebutuhan Kompres'],
    moodRating: 3,
    symptoms: ['Nyeri Lutut Ringan']
  }
];

const initialInsights: HealthInsight[] = [
  {
    id: 'hi1',
    memberId: 'm1',
    category: 'hydration',
    severity: 'success',
    title: 'Target Hidrasi Hampir Tercapai',
    text: 'Budi sudah meminum 1.750 ml (70% dari target 2.500 ml). Minum 2 gelas air lagi sebelum pukul 20:00 untuk pemulihan ginjal optimal.',
    timestamp: 'Hari ini, 15:30 WIB'
  },
  {
    id: 'hi2',
    memberId: 'm5',
    category: 'vitals',
    severity: 'warning',
    title: 'Tekanan Darah Kakek Subagyo Perlu Dipantau',
    text: 'Sistolik Kakek tercatat 138 mmHg pagi ini. Pastikan Candozet 16mg diminum teratur dan kurangi konsumsi garam pada menu makan malam.',
    timestamp: 'Hari ini, 08:30 WIB'
  },
  {
    id: 'hi3',
    memberId: 'm2',
    category: 'sleep',
    severity: 'success',
    title: 'Kualitas Tidur Keluarga Optimal',
    text: 'Rata-rata durasi tidur keluarga minggu ini adalah 7.4 jam/hari. Hal ini mendukung imunitas dan kesehatan mental seluruh keluarga.',
    timestamp: 'Hari ini, 07:00 WIB'
  }
];

const initialWearables: WearableDevice[] = [
  {
    id: 'w1',
    name: 'Apple Watch Series 9 (Budi)',
    brand: 'Apple Health',
    isConnected: true,
    lastSynced: 'Baru saja',
    dataTypesSynced: ['Detak Jantung', 'Langkah', 'Kalori', 'Tidur', 'SpO2']
  },
  {
    id: 'w2',
    name: 'Google Pixel Watch (Siti)',
    brand: 'Google Fit',
    isConnected: true,
    lastSynced: '10 menit lalu',
    dataTypesSynced: ['Langkah', 'Kalori', 'Yoga Session']
  },
  {
    id: 'w3',
    name: 'Fitbit Charge 6 (Kakek)',
    brand: 'Fitbit',
    isConnected: false,
    lastSynced: 'Kemarin, 18:00',
    dataTypesSynced: ['Detak Jantung', 'Langkah Sehari-hari']
  },
  {
    id: 'w4',
    name: 'Garmin Forerunner 265',
    brand: 'Garmin',
    isConnected: false,
    lastSynced: 'Belum terhubung',
    dataTypesSynced: []
  },
  {
    id: 'w5',
    name: 'Samsung Galaxy Watch 6',
    brand: 'Samsung Health',
    isConnected: false,
    lastSynced: 'Belum terhubung',
    dataTypesSynced: []
  }
];

export const useHealthStore = create<HealthStoreState>((set, get) => ({
  healthProfiles: initialProfiles,
  vitalRecords: initialVitals,
  medications: initialMedications,
  medicationHistories: initialMedHistories,
  medicalAppointments: initialAppointments,
  exerciseLogs: initialExerciseLogs,
  sleepLogs: initialSleepLogs,
  waterTrackers: initialWaterTrackers,
  nutritionSummaries: initialNutritionSummaries,
  healthJournals: initialJournals,
  healthReports: [],
  healthInsights: initialInsights,
  emergencyInfos: initialEmergencyInfos,
  wearableDevices: initialWearables,

  activeMemberId: 'all',
  setActiveMemberId: (id) => set({ activeMemberId: id }),

  addVitalRecord: (recordData) => {
    const newRecord: VitalRecord = {
      ...recordData,
      id: `v_${Date.now()}`
    };
    set((state) => ({
      vitalRecords: [newRecord, ...state.vitalRecords]
    }));
  },

  deleteVitalRecord: (id) => {
    set((state) => ({
      vitalRecords: state.vitalRecords.filter((v) => v.id !== id)
    }));
  },

  addMedication: (medData) => {
    const newMed: Medication = {
      ...medData,
      id: `med_${Date.now()}`
    };
    set((state) => ({
      medications: [...state.medications, newMed]
    }));
  },

  toggleMedicationTaken: (medicationId, memberId, status = 'taken') => {
    const med = get().medications.find((m) => m.id === medicationId);
    if (!med) return;

    const newHistory: MedicationHistory = {
      id: `mh_${Date.now()}`,
      medicationId,
      memberId,
      medicationName: `${med.name} (${med.dosage})`,
      takenAt: `Hari ini, ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
      status,
      note: status === 'taken' ? 'Diminum tepat waktu' : 'Dilewati/snoozed'
    };

    set((state) => ({
      medicationHistories: [newHistory, ...state.medicationHistories],
      medications: state.medications.map((m) => {
        if (m.id === medicationId && m.remainingPills !== undefined && m.remainingPills > 0) {
          return { ...m, remainingPills: m.remainingPills - 1 };
        }
        return m;
      })
    }));
  },

  deleteMedication: (id) => {
    set((state) => ({
      medications: state.medications.filter((m) => m.id !== id)
    }));
  },

  addAppointment: (apptData) => {
    const newAppt: MedicalAppointment = {
      ...apptData,
      id: `app_${Date.now()}`
    };
    set((state) => ({
      medicalAppointments: [...state.medicalAppointments, newAppt]
    }));
  },

  updateAppointmentStatus: (id, status) => {
    set((state) => ({
      medicalAppointments: state.medicalAppointments.map((a) =>
        a.id === id ? { ...a, status } : a
      )
    }));
  },

  deleteAppointment: (id) => {
    set((state) => ({
      medicalAppointments: state.medicalAppointments.filter((a) => a.id !== id)
    }));
  },

  addExerciseLog: (exerciseData) => {
    const newEx: ExerciseLog = {
      ...exerciseData,
      id: `e_${Date.now()}`
    };
    set((state) => ({
      exerciseLogs: [newEx, ...state.exerciseLogs]
    }));
  },

  deleteExerciseLog: (id) => {
    set((state) => ({
      exerciseLogs: state.exerciseLogs.filter((e) => e.id !== id)
    }));
  },

  addSleepLog: (sleepData) => {
    const newSleep: SleepLog = {
      ...sleepData,
      id: `sl_${Date.now()}`
    };
    set((state) => ({
      sleepLogs: [newSleep, ...state.sleepLogs]
    }));
  },

  logWaterIntake: (memberId, amountMl) => {
    const key = `${memberId}_${todayStr}`;
    const currentTracker = get().waterTrackers[key] || {
      id: `wt_${key}`,
      memberId,
      date: todayStr,
      targetMl: 2500,
      currentMl: 0,
      logs: []
    };

    const newLogItem = {
      id: `wl_${Date.now()}`,
      amountMl,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    const updatedTracker: WaterTracker = {
      ...currentTracker,
      currentMl: currentTracker.currentMl + amountMl,
      logs: [...currentTracker.logs, newLogItem]
    };

    set((state) => ({
      waterTrackers: {
        ...state.waterTrackers,
        [key]: updatedTracker
      }
    }));
  },

  updateWaterTarget: (memberId, targetMl) => {
    const key = `${memberId}_${todayStr}`;
    const currentTracker = get().waterTrackers[key] || {
      id: `wt_${key}`,
      memberId,
      date: todayStr,
      targetMl: 2500,
      currentMl: 0,
      logs: []
    };

    set((state) => ({
      waterTrackers: {
        ...state.waterTrackers,
        [key]: { ...currentTracker, targetMl }
      }
    }));
  },

  addHealthJournal: (journalData) => {
    const newJournal: HealthJournal = {
      ...journalData,
      id: `hj_${Date.now()}`
    };
    set((state) => ({
      healthJournals: [newJournal, ...state.healthJournals]
    }));
  },

  deleteHealthJournal: (id) => {
    set((state) => ({
      healthJournals: state.healthJournals.filter((j) => j.id !== id)
    }));
  },

  updateHealthProfile: (memberId, data) => {
    set((state) => {
      const current = state.healthProfiles[memberId];
      if (!current) return state;

      const updated = { ...current, ...data };
      if (updated.heightCm && updated.weightKg) {
        const heightM = updated.heightCm / 100;
        updated.bmi = Number((updated.weightKg / (heightM * heightM)).toFixed(1));
      }

      return {
        healthProfiles: {
          ...state.healthProfiles,
          [memberId]: updated
        }
      };
    });
  },

  updateEmergencyInfo: (memberId, data) => {
    set((state) => ({
      emergencyInfos: {
        ...state.emergencyInfos,
        [memberId]: {
          ...(state.emergencyInfos[memberId] || {
            memberId,
            primaryContact: { name: '-', relation: '-', phone: '-' },
            bloodType: 'O+',
            allergies: [],
            chronicConditions: [],
            routineMeds: []
          }),
          ...data
        }
      }
    }));
  },

  toggleWearableConnection: (id) => {
    set((state) => ({
      wearableDevices: state.wearableDevices.map((w) =>
        w.id === id ? { ...w, isConnected: !w.isConnected, lastSynced: w.isConnected ? 'Terputus' : 'Baru saja' } : w
      )
    }));
  },

  syncWearableData: (id) => {
    set((state) => ({
      wearableDevices: state.wearableDevices.map((w) =>
        w.id === id ? { ...w, lastSynced: 'Baru saja' } : w
      )
    }));
  },

  generateHealthReport: (memberId, period) => {
    const profile = get().healthProfiles[memberId] || { name: 'Anggota Keluarga' };
    const report: HealthReport = {
      id: `hr_${Date.now()}`,
      memberId,
      period,
      title: `Laporan Kesehatan ${period.toUpperCase()} - ${profile.name}`,
      dateRange: `1 - ${new Date().getDate()} ${new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}`,
      summaryText: `Status kesehatan ${profile.name} berada pada kategori SANGAT BAIK. Tekanan darah dan pola tidur stabil. Konsumsi air harian mencapai rata-rata 88% dari target.`,
      healthScore: 92,
      vitalAverageBP: '122/82',
      vitalAverageHR: 72,
      exerciseMinutesTotal: 180,
      waterIntakeAvgMl: 2100,
      sleepAvgHours: 7.4,
      recommendations: [
        'Pertahankan kebiasaan minum air putih minimal 2 liter per hari.',
        'Lanjutkan latihan jalan kaki / yoga 3-4 kali dalam seminggu.',
        'Disarankan kontrol rutin tekanan darah setiap bulan sekali.'
      ],
      generatedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    };
    return report;
  }
}));
