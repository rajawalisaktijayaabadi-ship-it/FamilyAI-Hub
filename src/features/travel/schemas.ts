import { z } from 'zod';

export const tripFormSchema = z.object({
  name: z.string().min(3, 'Nama perjalanan minimal 3 karakter'),
  category: z.enum([
    'Liburan',
    'Mudik',
    'Bisnis',
    'Sekolah',
    'Family Gathering',
    'Staycation',
    'Road Trip',
    'Camping',
    'Honeymoon',
    'Religi',
    'Medical Trip',
    'Custom'
  ]),
  destination: z.string().min(2, 'Destinasi harus diisi'),
  country: z.string().min(2, 'Negara harus diisi'),
  city: z.string().min(2, 'Kota harus diisi'),
  startDate: z.string().min(1, 'Tanggal berangkat harus diisi'),
  endDate: z.string().min(1, 'Tanggal pulang harus diisi'),
  durationDays: z.number().min(1, 'Durasi minimal 1 hari'),
  transportationType: z.string().min(2, 'Mode transportasi harus diisi'),
  status: z.enum(['Planned', 'Ongoing', 'Completed', 'Cancelled']),
  notes: z.string().optional(),
  coverImage: z.string().optional(),
});

export type TripFormValues = z.infer<typeof tripFormSchema>;

export const eventFormSchema = z.object({
  name: z.string().min(3, 'Nama event minimal 3 karakter'),
  type: z.enum([
    'Ulang Tahun',
    'Anniversary',
    'Family Gathering',
    'Reuni',
    'Wisuda',
    'Perayaan',
    'Arisan',
    'Syukuran',
    'Custom Event'
  ]),
  date: z.string().min(1, 'Tanggal event harus diisi'),
  location: z.string().min(2, 'Lokasi event harus diisi'),
  description: z.string().optional(),
  status: z.enum(['Planning', 'Confirmed', 'Completed']),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
