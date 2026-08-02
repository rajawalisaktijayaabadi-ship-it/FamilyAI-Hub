import { create } from 'zustand';
import { BillingSubscription } from '../../../types/enterpriseAdmin';

interface BillingState {
  subscription: BillingSubscription;
  availablePlans: {
    planName: 'Free' | 'Starter' | 'Family' | 'Family Plus' | 'Enterprise';
    priceMonthly: number;
    description: string;
    features: string[];
    maxMembers: number;
    aiTokensPerMonth: string;
  }[];
  invoices: { id: string; date: string; amount: number; status: 'Paid' | 'Pending'; pdfUrl: string }[];
}

export const useBillingStore = create<BillingState>(() => ({
  subscription: {
    id: 'sub-1001',
    workspaceId: 'ws-1',
    planName: 'Family Plus',
    billingCycle: 'Annually',
    priceAmount: 1490000,
    currency: 'IDR',
    nextBillingDate: '2027-01-15',
    status: 'Active',
    paymentMethod: 'Credit Card (Visa **** 4821) / Midtrans'
  },

  availablePlans: [
    {
      planName: 'Free',
      priceMonthly: 0,
      description: 'Fitur dasar untuk keluarga kecil',
      features: ['Hingga 3 Anggota Keluarga', 'AI Chat Engine Dasar (10.000 token/bln)', 'Kalender & Pengingat Dasar', '1 GB Penyimpanan Memori'],
      maxMembers: 3,
      aiTokensPerMonth: '10.000 Token'
    },
    {
      planName: 'Starter',
      priceMonthly: 49000,
      description: 'Untuk keluarga muda yang butuh asistensi rutin',
      features: ['Hingga 5 Anggota Keluarga', 'AI Assistant (100.000 token/bln)', 'Pelacak Kesehatan & Anggaran', '5 GB Penyimpanan Memori', 'Ekspor Laporan PDF/CSV'],
      maxMembers: 5,
      aiTokensPerMonth: '100.000 Token'
    },
    {
      planName: 'Family',
      priceMonthly: 99000,
      description: 'Pilihan populer keluarga modern',
      features: ['Hingga 8 Anggota Keluarga', 'AI Assistant Unrestricted (500.000 token/bln)', 'Semua 16 Modul Terintegrasi', 'Visual Workflow Builder', '25 GB Penyimpanan Memori'],
      maxMembers: 8,
      aiTokensPerMonth: '500.000 Token'
    },
    {
      planName: 'Family Plus',
      priceMonthly: 149000,
      description: 'Lengkap dengan Smart Home IoT & Asisten Super Ultra',
      features: ['Anggota Keluarga Tanpa Batas', 'Gemini Ultra AI Engine (2.000.000 token/bln)', 'Integrasi IoT Rumah Pintar & Smart TV', '100 GB Encrypted Storage', 'Priority 24/7 Support'],
      maxMembers: 20,
      aiTokensPerMonth: '2.000.000 Token'
    },
    {
      planName: 'Enterprise',
      priceMonthly: 499000,
      description: 'Untuk Komunitas, Yayasan, & Multi-Family Organization',
      features: ['Multi-Tenant Workspaces', 'Custom Role & Matrix Permission', 'Audit Log Lengkap & Dedicated Cloud SQL', '1 TB Storage', 'Dedicated SLA & VIP Onboarding'],
      maxMembers: 100,
      aiTokensPerMonth: '10.000.000 Token'
    }
  ],

  invoices: [
    { id: 'INV-2026-001', date: '15 Jan 2026', amount: 1490000, status: 'Paid', pdfUrl: '#' },
    { id: 'INV-2025-012', date: '15 Jan 2025', amount: 1190000, status: 'Paid', pdfUrl: '#' }
  ]
}));
