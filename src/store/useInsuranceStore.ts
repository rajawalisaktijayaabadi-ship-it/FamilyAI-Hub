import { create } from 'zustand';
import {
  InsurancePolicy,
  InsuranceProvider,
  InsuranceMember,
  InsurancePremium,
  InsurancePayment,
  InsuranceClaim,
  InsuranceDocument,
  CoverageSummary,
  ProtectionScore,
  InsuranceReminder,
  PolicyAnalysis,
  InsuranceCategoryType,
  ClaimStatusType
} from '../types';

interface InsuranceState {
  // Collections
  policies: InsurancePolicy[];
  providers: InsuranceProvider[];
  insuranceMembers: InsuranceMember[];
  premiums: InsurancePremium[];
  payments: InsurancePayment[];
  claims: InsuranceClaim[];
  insuranceDocuments: InsuranceDocument[];
  reminders: InsuranceReminder[];
  
  // Actions - Policies
  addPolicy: (policy: Omit<InsurancePolicy, 'id' | 'createdAt'>) => void;
  updatePolicy: (id: string, data: Partial<InsurancePolicy>) => void;
  deletePolicy: (id: string) => void;

  // Actions - Providers
  addProvider: (provider: Omit<InsuranceProvider, 'id'>) => void;
  updateProvider: (id: string, data: Partial<InsuranceProvider>) => void;
  deleteProvider: (id: string) => void;

  // Actions - Members / Emergency Card Info
  updateMemberInsuranceInfo: (memberId: string, data: Partial<InsuranceMember>) => void;

  // Actions - Premiums & Payments
  addPremium: (premium: Omit<InsurancePremium, 'id'>) => void;
  markPremiumPaid: (premiumId: string, paymentMethod: string) => void;

  // Actions - Claims
  addClaim: (claim: Omit<InsuranceClaim, 'id' | 'claimNumber' | 'timeline'>) => void;
  updateClaimStatus: (claimId: string, newStatus: ClaimStatusType, note: string) => void;

  // Actions - Documents
  addDocument: (doc: Omit<InsuranceDocument, 'id' | 'uploadDate'>) => void;
  deleteDocument: (docId: string) => void;

  // Actions - Reminders
  addReminder: (reminder: Omit<InsuranceReminder, 'id' | 'isCompleted'>) => void;
  toggleReminder: (id: string) => void;

  // AI & Analysis Helpers
  getProtectionScore: () => ProtectionScore;
  getCoverageSummary: () => CoverageSummary[];
  getPolicyAnalysis: (policyId: string) => PolicyAnalysis;
}

export const useInsuranceStore = create<InsuranceState>((set, get) => ({
  // Mock Initial Providers
  providers: [
    {
      id: 'prov-1',
      name: 'BPJS Kesehatan',
      contactPerson: 'Layanan BPJS 24 Jam',
      callCenter: '165',
      email: 'care@bpjs-kesehatan.go.id',
      website: 'https://bpjs-kesehatan.go.id',
      notes: 'Program JKN nasional wajib bagi seluruh anggota keluarga'
    },
    {
      id: 'prov-2',
      name: 'Prudential Indonesia',
      contactPerson: 'Ahmad Agen Asuransi',
      callCenter: '1500085',
      email: 'customer.id@prudential.co.id',
      website: 'https://www.prudential.co.id',
      notes: 'Polis kesehatan rawat inap dan jiwa utama'
    },
    {
      id: 'prov-3',
      name: 'Asuransi Allianz Utama',
      contactPerson: 'Siti Support Desk',
      callCenter: '1500136',
      email: 'contactus@allianz.co.id',
      website: 'https://www.allianz.co.id',
      notes: 'Asuransi kendaraan & perlindungan rumah'
    }
  ],

  // Mock Initial Policies
  policies: [
    {
      id: 'pol-1',
      policyNumber: 'JKN-99882210',
      title: 'BPJS Kesehatan Keluarga JKN Kelas 1',
      category: 'Kesehatan',
      providerId: 'prov-1',
      providerName: 'BPJS Kesehatan',
      participantNumber: '000123987111',
      policyHolderId: 'mem-1',
      policyHolderName: 'Budi Santoso (Ayah)',
      insuredMemberIds: ['mem-1', 'mem-2', 'mem-3', 'mem-4'],
      insuredMemberNames: ['Budi Santoso (Ayah)', 'Siti Rahma (Ibu)', 'Ahmad (Anak)', 'Nabila (Anak)'],
      startDate: '2023-01-01',
      endDate: '2028-12-31',
      status: 'active',
      premiumAmount: 600000,
      paymentFrequency: 'Bulanan',
      coverageLimit: 150000000,
      benefits: [
        'Rawat inap kelas 1 RS Negeri & Swasta rujukan',
        'Rawat jalan gratis dengan rujukan Faskes 1',
        'Operasi & Pengobatan Kronis sesuai indikasi medis',
        'Ugd 24 Jam di seluruh Indonesia'
      ],
      notes: 'Autodebet setiap tanggal 10',
      createdAt: '2023-01-01'
    },
    {
      id: 'pol-2',
      policyNumber: 'PRU-HEALTH-2024-88',
      title: 'PRUPrime Healthcare Plus (VIP)',
      category: 'Kesehatan',
      providerId: 'prov-2',
      providerName: 'Prudential Indonesia',
      participantNumber: 'PRU-7731219',
      policyHolderId: 'mem-1',
      policyHolderName: 'Budi Santoso (Ayah)',
      insuredMemberIds: ['mem-1', 'mem-2'],
      insuredMemberNames: ['Budi Santoso (Ayah)', 'Siti Rahma (Ibu)'],
      startDate: '2024-02-15',
      endDate: '2025-02-14',
      status: 'active',
      premiumAmount: 1850000,
      paymentFrequency: 'Bulanan',
      coverageLimit: 1000000000,
      benefits: [
        'Kamar 1 Bed VIP Swasta Cashless',
        'Batas Manfaat Tahunan Rp 1 Miliar',
        'Perawatan Kanker & Cuci Darah Sesuai Tagihan',
        'Pengobatan Darurat Luar Negeri'
      ],
      notes: 'Fasilitas cashless dengan kartu digital PRUAccess',
      createdAt: '2024-02-15'
    },
    {
      id: 'pol-3',
      policyNumber: 'ALZ-HOME-2023-09',
      title: 'Allianz Home Care Proteksi Rumah',
      category: 'Rumah',
      providerId: 'prov-3',
      providerName: 'Asuransi Allianz Utama',
      participantNumber: 'HM-9912882',
      policyHolderId: 'mem-1',
      policyHolderName: 'Budi Santoso (Ayah)',
      insuredMemberIds: ['mem-1'],
      insuredMemberNames: ['Budi Santoso (Ayah)'],
      startDate: '2023-06-01',
      endDate: '2026-05-31',
      status: 'active',
      premiumAmount: 2400000,
      paymentFrequency: 'Tahunan',
      coverageLimit: 850000000,
      benefits: [
        'Proteksi Kebakaran & Bencana Alam',
        'Ganti Rugi Kebocoran & Kerusakan Rumah',
        'Biaya Tempat Tentu Sementara jika Rumah Rusak',
        'Tanggung Jawab Hukum Pihak Ke-3'
      ],
      notes: 'Mencakup bangunan rumah dan perabotan utama',
      createdAt: '2023-06-01'
    }
  ],

  // Initial Members Insurance Data (Emergency Card)
  insuranceMembers: [
    {
      id: 'imem-1',
      memberId: 'mem-1',
      memberName: 'Budi Santoso (Ayah)',
      relationship: 'Kepala Keluarga / Pencari Nafkah',
      bloodType: 'O+',
      emergencyContact: '0812-3456-7890 (Siti Rahma)',
      favoriteHospital: 'RS Siloam Kebon Jeruk',
      specialMedicalNotes: 'Alergi Penisilin',
      activePolicyCount: 3
    },
    {
      id: 'imem-2',
      memberId: 'mem-2',
      memberName: 'Siti Rahma (Ibu)',
      relationship: 'Istri',
      bloodType: 'A+',
      emergencyContact: '0811-9876-5432 (Budi Santoso)',
      favoriteHospital: 'RS Pondok Indah',
      specialMedicalNotes: 'Riwayat Asma Ringan',
      activePolicyCount: 2
    },
    {
      id: 'imem-3',
      memberId: 'mem-3',
      memberName: 'Ahmad Santoso (Anak)',
      relationship: 'Anak Pertama',
      bloodType: 'O+',
      emergencyContact: '0812-3456-7890 (Budi Santoso)',
      favoriteHospital: 'RS Ibu & Anak Harapan Kita',
      specialMedicalNotes: 'Tidak ada alergi obat',
      activePolicyCount: 1
    }
  ],

  // Mock Initial Premiums
  premiums: [
    {
      id: 'prem-1',
      policyId: 'pol-1',
      policyTitle: 'BPJS Kesehatan Keluarga JKN Kelas 1',
      providerName: 'BPJS Kesehatan',
      amount: 600000,
      frequency: 'Bulanan',
      dueDate: '2026-08-10',
      status: 'unpaid',
      notes: 'Tagihan Agustus 2026'
    },
    {
      id: 'prem-2',
      policyId: 'pol-2',
      policyTitle: 'PRUPrime Healthcare Plus (VIP)',
      providerName: 'Prudential Indonesia',
      amount: 1850000,
      frequency: 'Bulanan',
      dueDate: '2026-08-15',
      status: 'unpaid',
      notes: 'Premi Rutin Agustus'
    },
    {
      id: 'prem-3',
      policyId: 'pol-3',
      policyTitle: 'Allianz Home Care Proteksi Rumah',
      providerName: 'Asuransi Allianz Utama',
      amount: 2400000,
      frequency: 'Tahunan',
      dueDate: '2026-05-31',
      status: 'paid',
      paymentMethod: 'Transfer BCA',
      notes: 'Lunas untuk periode 2025-2026'
    }
  ],

  // Mock Payments
  payments: [
    {
      id: 'pay-1',
      premiumId: 'prem-3',
      policyId: 'pol-3',
      policyTitle: 'Allianz Home Care Proteksi Rumah',
      amountPaid: 2400000,
      paymentDate: '2026-05-28',
      paymentMethod: 'Transfer Bank BCA',
      status: 'success'
    },
    {
      id: 'pay-2',
      premiumId: 'prem-prev',
      policyId: 'pol-2',
      policyTitle: 'PRUPrime Healthcare Plus (VIP)',
      amountPaid: 1850000,
      paymentDate: '2026-07-12',
      paymentMethod: 'Autodebet Kartu Kredit',
      status: 'success'
    }
  ],

  // Mock Claims
  claims: [
    {
      id: 'clm-1',
      claimNumber: 'CLM-2026-0801',
      policyId: 'pol-2',
      policyTitle: 'PRUPrime Healthcare Plus (VIP)',
      category: 'Kesehatan',
      claimDate: '2026-07-05',
      incidentDate: '2026-07-02',
      insuredMemberName: 'Siti Rahma (Ibu)',
      claimedAmount: 4850000,
      approvedAmount: 4850000,
      status: 'Approved',
      timeline: [
        { status: 'Draft', date: '2026-07-03', notes: 'Dokumen rawat inap dikumpulkan' },
        { status: 'Submitted', date: '2026-07-05', notes: 'Klaim diserahkan ke Prudential' },
        { status: 'Review', date: '2026-07-08', notes: 'Verifikasi berkas kuitansi RS Siloam' },
        { status: 'Approved', date: '2026-07-12', notes: 'Klaim disetujui 100% Cashless' }
      ],
      documents: [
        { id: 'cdoc-1', name: 'Kuitansi_RS_Siloam.pdf', url: '#', type: 'application/pdf' },
        { id: 'cdoc-2', name: 'Resume_Medis_Dokter.pdf', url: '#', type: 'application/pdf' }
      ],
      notes: 'Perawatan demam berdarah 3 hari kelas VIP'
    }
  ],

  // Mock Documents
  insuranceDocuments: [
    {
      id: 'doc-1',
      policyId: 'pol-1',
      policyTitle: 'BPJS Kesehatan Keluarga JKN Kelas 1',
      title: 'Kartu BPJS Kesehatan Digital Keluarga',
      category: 'Kartu Peserta',
      uploadDate: '2026-01-10',
      memberName: 'Budi Santoso & Keluarga',
      notes: 'Format PDF dari aplikasi Mobile JKN'
    },
    {
      id: 'doc-2',
      policyId: 'pol-2',
      policyTitle: 'PRUPrime Healthcare Plus (VIP)',
      title: 'Buku Polis Prudential Lengkap PDF',
      category: 'Polis',
      uploadDate: '2024-02-16',
      memberName: 'Budi Santoso (Ayah)',
      notes: 'Termasuk tabel manfaat dan pengecualian polis'
    }
  ],

  // Mock Reminders
  reminders: [
    {
      id: 'rem-1',
      title: 'Bayar Premi BPJS Kesehatan Bulan Ini',
      type: 'Premi',
      dueDate: '2026-08-10',
      priority: 'Tinggi',
      isCompleted: false,
      policyTitle: 'BPJS Kesehatan Keluarga JKN Kelas 1'
    },
    {
      id: 'rem-2',
      title: 'Jatuh Tempo Premi Prudential VIP',
      type: 'Premi',
      dueDate: '2026-08-15',
      priority: 'Tinggi',
      isCompleted: false,
      policyTitle: 'PRUPrime Healthcare Plus (VIP)'
    },
    {
      id: 'rem-3',
      title: 'Review Tahunan Kecukupan Asuransi Jiwa',
      type: 'Review Tahunan',
      dueDate: '2026-09-01',
      priority: 'Sedang',
      isCompleted: false
    }
  ],

  // ACTIONS IMPLEMENTATION

  addPolicy: (policyData) =>
    set((state) => {
      const newPolicy: InsurancePolicy = {
        ...policyData,
        id: `pol-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      // Auto-create premium reminder
      const newPremium: InsurancePremium = {
        id: `prem-${Date.now()}`,
        policyId: newPolicy.id,
        policyTitle: newPolicy.title,
        providerName: newPolicy.providerName,
        amount: newPolicy.premiumAmount,
        frequency: newPolicy.paymentFrequency,
        dueDate: newPolicy.endDate || new Date().toISOString().split('T')[0],
        status: 'unpaid'
      };

      return {
        policies: [newPolicy, ...state.policies],
        premiums: [newPremium, ...state.premiums]
      };
    }),

  updatePolicy: (id, data) =>
    set((state) => ({
      policies: state.policies.map((p) => (p.id === id ? { ...p, ...data } : p))
    })),

  deletePolicy: (id) =>
    set((state) => ({
      policies: state.policies.filter((p) => p.id !== id),
      premiums: state.premiums.filter((p) => p.policyId !== id)
    })),

  addProvider: (providerData) =>
    set((state) => ({
      providers: [...state.providers, { ...providerData, id: `prov-${Date.now()}` }]
    })),

  updateProvider: (id, data) =>
    set((state) => ({
      providers: state.providers.map((pr) => (pr.id === id ? { ...pr, ...data } : pr))
    })),

  deleteProvider: (id) =>
    set((state) => ({
      providers: state.providers.filter((pr) => pr.id !== id)
    })),

  updateMemberInsuranceInfo: (memberId, data) =>
    set((state) => {
      const exists = state.insuranceMembers.some((m) => m.memberId === memberId);
      if (exists) {
        return {
          insuranceMembers: state.insuranceMembers.map((m) =>
            m.memberId === memberId ? { ...m, ...data } : m
          )
        };
      } else {
        const newMember: InsuranceMember = {
          id: `imem-${Date.now()}`,
          memberId,
          memberName: data.memberName || 'Anggota Keluarga',
          relationship: data.relationship || 'Keluarga',
          bloodType: data.bloodType || 'O+',
          emergencyContact: data.emergencyContact || '-',
          favoriteHospital: data.favoriteHospital || '-',
          specialMedicalNotes: data.specialMedicalNotes || '-',
          activePolicyCount: data.activePolicyCount || 0
        };
        return { insuranceMembers: [...state.insuranceMembers, newMember] };
      }
    }),

  addPremium: (premiumData) =>
    set((state) => ({
      premiums: [{ ...premiumData, id: `prem-${Date.now()}` }, ...state.premiums]
    })),

  markPremiumPaid: (premiumId, paymentMethod) =>
    set((state) => {
      const prem = state.premiums.find((p) => p.id === premiumId);
      if (!prem) return state;

      const newPayment: InsurancePayment = {
        id: `pay-${Date.now()}`,
        premiumId: prem.id,
        policyId: prem.policyId,
        policyTitle: prem.policyTitle,
        amountPaid: prem.amount,
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod,
        status: 'success'
      };

      return {
        premiums: state.premiums.map((p) =>
          p.id === premiumId ? { ...p, status: 'paid', paymentMethod } : p
        ),
        payments: [newPayment, ...state.payments]
      };
    }),

  addClaim: (claimData) =>
    set((state) => {
      const claimNumber = `CLM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newClaim: InsuranceClaim = {
        ...claimData,
        id: `clm-${Date.now()}`,
        claimNumber,
        timeline: [
          {
            status: 'Submitted',
            date: new Date().toISOString().split('T')[0],
            notes: 'Pengajuan klaim baru dibuat oleh pengguna.'
          }
        ]
      };

      return { claims: [newClaim, ...state.claims] };
    }),

  updateClaimStatus: (claimId, newStatus, note) =>
    set((state) => ({
      claims: state.claims.map((c) => {
        if (c.id === claimId) {
          return {
            ...c,
            status: newStatus,
            timeline: [
              ...c.timeline,
              {
                status: newStatus,
                date: new Date().toISOString().split('T')[0],
                notes: note || `Status diperbarui menjadi ${newStatus}`
              }
            ]
          };
        }
        return c;
      })
    })),

  addDocument: (docData) =>
    set((state) => ({
      insuranceDocuments: [
        {
          ...docData,
          id: `doc-${Date.now()}`,
          uploadDate: new Date().toISOString().split('T')[0]
        },
        ...state.insuranceDocuments
      ]
    })),

  deleteDocument: (docId) =>
    set((state) => ({
      insuranceDocuments: state.insuranceDocuments.filter((d) => d.id !== docId)
    })),

  addReminder: (reminderData) =>
    set((state) => ({
      reminders: [
        { ...reminderData, id: `rem-${Date.now()}`, isCompleted: false },
        ...state.reminders
      ]
    })),

  toggleReminder: (id) =>
    set((state) => ({
      reminders: state.reminders.map((r) =>
        r.id === id ? { ...r, isCompleted: !r.isCompleted } : r
      )
    })),

  // AI Calculators & Explanations
  getProtectionScore: () => {
    const { policies } = get();
    const hasHealth = policies.some((p) => p.category === 'Kesehatan' && p.status === 'active');
    const hasLife = policies.some((p) => p.category === 'Jiwa' && p.status === 'active');
    const hasProperty = policies.some((p) => p.category === 'Rumah' && p.status === 'active');
    const hasEducation = policies.some((p) => p.category === 'Pendidikan' && p.status === 'active');

    const healthScore = hasHealth ? 90 : 30;
    const lifeScore = hasLife ? 85 : 20;
    const propertyScore = hasProperty ? 80 : 25;
    const educationScore = hasEducation ? 75 : 35;
    const emergencyReadinessScore = 80;

    const overallScore = Math.round(
      healthScore * 0.35 +
      lifeScore * 0.25 +
      propertyScore * 0.15 +
      educationScore * 0.15 +
      emergencyReadinessScore * 0.1
    );

    let level: ProtectionScore['level'] = 'Memerlukan Perhatian';
    if (overallScore >= 85) level = 'Sangat Terlindungi';
    else if (overallScore >= 70) level = 'Cukup Terlindungi';
    else if (overallScore < 50) level = 'Beresiko Tinggi';

    const recommendations: string[] = [];
    if (!hasLife) {
      recommendations.push('Disarankan menambah Asuransi Jiwa Berjangka (Term Life) untuk pencari nafkah utama.');
    }
    if (!hasEducation) {
      recommendations.push('Pertimbangkan perlindungan dana pendidikan anak untuk jaminan masa depan.');
    }
    if (!hasHealth) {
      recommendations.push('Segera daftarkan BPJS Kesehatan / Asuransi Rawat Inap Swasta untuk seluruh keluarga.');
    }

    return {
      overallScore,
      healthScore,
      lifeScore,
      propertyScore,
      educationScore,
      emergencyReadinessScore,
      level,
      lastEvaluated: new Date().toISOString().split('T')[0],
      recommendations
    };
  },

  getCoverageSummary: () => {
    const { policies } = get();
    const categories: InsuranceCategoryType[] = [
      'Kesehatan',
      'Jiwa',
      'Kecelakaan',
      'Rumah',
      'Kendaraan',
      'Pendidikan'
    ];

    return categories.map((cat, idx) => {
      const activeForCat = policies.filter((p) => p.category === cat && p.status === 'active');
      const totalLimit = activeForCat.reduce((acc, p) => acc + p.coverageLimit, 0);
      const activePoliciesCount = activeForCat.length;
      const protectedMembersCount = activePoliciesCount > 0 ? 4 : 0; // standard family count

      let status: CoverageSummary['status'] = 'Kurang';
      if (activePoliciesCount >= 2 || totalLimit > 500000000) status = 'Optimal';
      else if (activePoliciesCount === 1) status = 'Cukup';

      return {
        id: `cov-${idx}`,
        category: cat,
        totalLimit,
        usedLimit: 0,
        remainingLimit: totalLimit,
        protectedMembersCount,
        activePoliciesCount,
        status
      };
    });
  },

  getPolicyAnalysis: (policyId: string) => {
    const { policies } = get();
    const policy = policies.find((p) => p.id === policyId);

    if (!policy) {
      return {
        policyId: '',
        policyTitle: 'Polis tidak ditemukan',
        explanation: 'Polis tidak terdaftar dalam database sistem.',
        coverageGaps: [],
        actionableRecommendations: [],
        disclaimer: 'AI bukan agen asuransi. Informasi ini murni bersifat edukasi.'
      };
    }

    return {
      policyId: policy.id,
      policyTitle: policy.title,
      explanation: `Polis ${policy.title} yang diterbitkan oleh ${policy.providerName} memberikan pertanggungan sebesar Rp ${policy.coverageLimit.toLocaleString('id-ID')} dengan status ${policy.status.toUpperCase()}.`,
      coverageGaps: [
        'Pastikan memahami batas kamar harian dan prosedur rujukan rumah sakit.',
        'Perhatikan masa tunggu (waiting period) untuk penyakit khusus yang tercantum di dokumen polis.'
      ],
      actionableRecommendations: [
        'Simpan e-Card peserta di dompet digital seluruh anggota keluarga.',
        'Atur pengingat autodebet premi agar tidak terjadi lapse polis.'
      ],
      disclaimer: 'AI bukan agen asuransi resmi. AI tidak memberikan jaminan klaim disetujui atau nasihat hukum.'
    };
  }
}));
