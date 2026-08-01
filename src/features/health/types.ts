export type AgeGroup = 'Balita (1-5 Thn)' | 'Anak-anak (6-12 Thn)' | 'Remaja (13-18 Thn)' | 'Dewasa (19-59 Thn)' | 'Lansia (60+ Thn)';

export type VitalType = 
  | 'blood_pressure' 
  | 'heart_rate' 
  | 'temperature' 
  | 'blood_sugar' 
  | 'weight' 
  | 'height' 
  | 'waist' 
  | 'spo2';

export interface VitalRecord {
  id: string;
  memberId: string;
  type: VitalType;
  value: string; // e.g., "120/80", "72", "36.6", "95"
  numericValue?: number;
  unit: string; // e.g., "mmHg", "bpm", "°C", "mg/dL", "kg", "%"
  timestamp: string; // ISO date string or formatted time
  note?: string;
  isNormal?: boolean;
}

export interface HealthProfile {
  memberId: string;
  name: string;
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'Belum Dites';
  heightCm: number;
  weightKg: number;
  bmi: number; // auto-calculated
  allergies: string[];
  medicalHistory: string[];
  surgeryHistory: string[];
  routineMedications: string[];
  familyDoctor: {
    name: string;
    specialty: string;
    phone: string;
  };
  favoriteHospital: {
    name: string;
    address: string;
    phone: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  healthNotes?: string;
  isPrivateRecord?: boolean;
}

export interface Medication {
  id: string;
  memberId: string;
  name: string;
  dosage: string; // e.g., "500 mg", "1 Tablet"
  frequency: string; // e.g., "3x Sehari setelah makan"
  timesOfDay: string[]; // e.g., ["07:00", "13:00", "19:00"]
  scheduleDays: string; // e.g., "Setiap Hari", "Senin, Rabu, Jumat"
  reminderEnabled: boolean;
  notes?: string;
  remainingPills?: number;
  prescriptionUrl?: string;
  prescribedBy?: string;
}

export interface MedicationHistory {
  id: string;
  medicationId: string;
  memberId: string;
  medicationName: string;
  takenAt: string; // ISO or human string
  status: 'taken' | 'skipped' | 'snoozed';
  note?: string;
}

export interface MedicalAppointment {
  id: string;
  memberId: string;
  doctorName: string;
  specialty: string;
  hospitalClinic: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  location: string;
  notes?: string;
  reminderBeforeMinutes: number; // e.g. 60
  status: 'scheduled' | 'completed' | 'cancelled';
}

export type ExerciseType = 'walking' | 'running' | 'cycling' | 'yoga' | 'gym' | 'swimming' | 'aerobics' | 'custom';

export interface ExerciseLog {
  id: string;
  memberId: string;
  type: ExerciseType;
  customTypeName?: string;
  durationMinutes: number;
  caloriesBurned: number;
  targetCalories?: number;
  date: string; // YYYY-MM-DD or readable
  notes?: string;
}

export interface SleepLog {
  id: string;
  memberId: string;
  date: string;
  bedtime: string; // e.g., "22:30"
  waketime: string; // e.g., "06:00"
  durationHours: number;
  sleepQuality: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Buruk';
  wearableSynced: boolean;
  notes?: string;
}

export interface WaterLogItem {
  id: string;
  amountMl: number;
  timestamp: string;
}

export interface WaterTracker {
  id: string;
  memberId: string;
  date: string;
  targetMl: number;
  currentMl: number;
  logs: WaterLogItem[];
}

export interface NutritionSummary {
  id: string;
  memberId: string;
  date: string;
  calories: number;
  targetCalories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  vitamins: string[];
  minerals: string[];
  waterMl: number;
}

export interface HealthJournal {
  id: string;
  memberId: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
  moodRating: number; // 1 to 5
  symptoms?: string[];
}

export interface HealthReport {
  id: string;
  memberId: string;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  title: string;
  dateRange: string;
  summaryText: string;
  healthScore: number;
  vitalAverageBP: string;
  vitalAverageHR: number;
  exerciseMinutesTotal: number;
  waterIntakeAvgMl: number;
  sleepAvgHours: number;
  recommendations: string[];
  generatedAt: string;
}

export interface HealthInsight {
  id: string;
  memberId?: string;
  category: 'hydration' | 'sleep' | 'exercise' | 'vitals' | 'medication' | 'general';
  severity: 'info' | 'warning' | 'success';
  title: string;
  text: string;
  timestamp: string;
}

export interface EmergencyInfo {
  memberId: string;
  primaryContact: {
    name: string;
    relation: string;
    phone: string;
  };
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  routineMeds: string[];
  insuranceProvider?: string;
  insuranceNumber?: string;
  qrCodeUrl?: string;
}

export interface WearableDevice {
  id: string;
  name: string;
  brand: 'Google Fit' | 'Apple Health' | 'Fitbit' | 'Garmin' | 'Samsung Health' | 'Huawei Health';
  isConnected: boolean;
  lastSynced: string;
  dataTypesSynced: string[];
}
