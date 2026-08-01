import { z } from 'zod';

export const deviceSchema = z.object({
  name: z.string().min(2, 'Nama perangkat minimal 2 karakter'),
  category: z.string().min(1, 'Pilih kategori perangkat'),
  room: z.string().min(1, 'Pilih ruangan'),
  brand: z.string().min(1, 'Merek wajib diisi'),
  model: z.string().min(1, 'Model wajib diisi'),
  serialNumber: z.string().min(1, 'Nomor seri wajib diisi'),
  powerConsumptionWatts: z.number().min(0, 'Daya konsumsi harus positif'),
  value: z.union([z.string(), z.number()]).optional(),
  unit: z.string().optional()
});

export type DeviceFormValues = z.infer<typeof deviceSchema>;

export const roomSchema = z.object({
  name: z.string().min(2, 'Nama ruangan minimal 2 karakter'),
  category: z.string().min(1, 'Pilih kategori ruangan'),
  temperature: z.number().min(10).max(40),
  humidity: z.number().min(0).max(100),
  photoUrl: z.string().url('URL foto tidak valid').optional()
});

export type RoomFormValues = z.infer<typeof roomSchema>;

export const automationRuleSchema = z.object({
  name: z.string().min(3, 'Nama aturan otomasi minimal 3 karakter'),
  triggerType: z.enum(['Waktu', 'Tanggal', 'Lokasi', 'Sensor', 'Status Perangkat', 'Kehadiran Anggota']),
  triggerDetail: z.string().min(3, 'Detail pemicu wajib diisi'),
  actionType: z.enum(['Nyalakan Perangkat', 'Matikan Perangkat', 'Kirim Notifikasi', 'Jalankan Skenario', 'Delay']),
  actionDetail: z.string().min(3, 'Detail aksi wajib diisi')
});

export type AutomationRuleFormValues = z.infer<typeof automationRuleSchema>;

export const sceneSchema = z.object({
  name: z.string().min(3, 'Nama skenario minimal 3 karakter'),
  description: z.string().min(5, 'Deskripsi skenario minimal 5 karakter'),
  actionDescription: z.string().min(3, 'Deskripsi aksi wajib diisi')
});

export type SceneFormValues = z.infer<typeof sceneSchema>;

export const maintenanceSchema = z.object({
  deviceName: z.string().min(2, 'Nama perangkat wajib diisi'),
  serviceType: z.enum(['Servis AC', 'Ganti Filter Air', 'Pengecekan Elektronik', 'Perbaikan Pintu/Kunci', 'Pengecatan', 'Custom']),
  dueDate: z.string().min(1, 'Pilih tanggal servis'),
  estimatedCostIdr: z.number().min(0, 'Estimasi biaya tidak valid'),
  assignedTechnician: z.string().optional()
});

export type MaintenanceFormValues = z.infer<typeof maintenanceSchema>;
