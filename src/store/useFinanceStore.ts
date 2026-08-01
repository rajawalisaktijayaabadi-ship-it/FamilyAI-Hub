import { create } from 'zustand';
import {
  FinancialProfile,
  IncomeRecord,
  ExpenseRecord,
  BudgetPlannerItem,
  SavingGoalItem,
  InvestmentItem,
  BillItem,
  SubscriptionItem,
  AssetItem,
  DebtItem,
  FinancialInsightItem,
  SharedWalletItem,
  FinancialDocumentItem,
  FinanceNotificationItem
} from '../types';

interface FinanceState {
  // Selected Member Filter
  selectedMemberId: string; // 'all' or specific memberId
  setSelectedMemberId: (id: string) => void;

  // Selected Active Tab
  activeFinanceTab: string;
  setActiveFinanceTab: (tab: string) => void;

  // Financial Profile
  financialProfile: FinancialProfile;
  updateFinancialProfile: (updated: Partial<FinancialProfile>) => void;

  // Incomes
  incomes: IncomeRecord[];
  addIncome: (income: Omit<IncomeRecord, 'id' | 'createdAt'>) => void;
  deleteIncome: (id: string) => void;

  // Expenses
  expenses: ExpenseRecord[];
  addExpense: (expense: Omit<ExpenseRecord, 'id' | 'createdAt'>) => void;
  deleteExpense: (id: string) => void;

  // Budgets
  budgets: BudgetPlannerItem[];
  addBudget: (budget: Omit<BudgetPlannerItem, 'id' | 'createdAt' | 'realizedAmount'>) => void;
  updateBudget: (id: string, updated: Partial<BudgetPlannerItem>) => void;
  deleteBudget: (id: string) => void;

  // Saving Goals
  savingGoals: SavingGoalItem[];
  addSavingGoal: (goal: Omit<SavingGoalItem, 'id' | 'createdAt' | 'currentAmount' | 'status'>) => void;
  addGoalContribution: (id: string, amount: number) => void;
  deleteSavingGoal: (id: string) => void;

  // Investments
  investments: InvestmentItem[];
  addInvestment: (investment: Omit<InvestmentItem, 'id' | 'createdAt' | 'returnPercentage' | 'profitOrLossAmount'>) => void;
  updateInvestmentValue: (id: string, newValue: number) => void;
  deleteInvestment: (id: string) => void;

  // Bills & Subscriptions
  bills: BillItem[];
  addBill: (bill: Omit<BillItem, 'id'>) => void;
  toggleBillPaid: (id: string) => void;
  deleteBill: (id: string) => void;

  subscriptions: SubscriptionItem[];
  addSubscription: (sub: Omit<SubscriptionItem, 'id'>) => void;
  toggleSubscriptionStatus: (id: string) => void;
  deleteSubscription: (id: string) => void;

  // Assets
  assets: AssetItem[];
  addAsset: (asset: Omit<AssetItem, 'id'>) => void;
  updateAsset: (id: string, updated: Partial<AssetItem>) => void;
  deleteAsset: (id: string) => void;

  // Debts
  debts: DebtItem[];
  addDebt: (debt: Omit<DebtItem, 'id'>) => void;
  payDebtInstallment: (id: string, amountPaid: number) => void;
  deleteDebt: (id: string) => void;

  // Insights
  financialInsights: FinancialInsightItem[];
  markInsightRead: (id: string) => void;

  // Shared Wallets
  sharedWallets: SharedWalletItem[];
  transferBetweenWallets: (fromId: string, toId: string, amount: number, note: string, actorName: string) => void;
  updateSharedWalletBalance: (id: string, amountChange: number, note: string, actorName: string) => void;
  calculateFinancialHealthScore: () => number;

  // Documents
  financialDocuments: FinancialDocumentItem[];
  addFinancialDocument: (doc: Omit<FinancialDocumentItem, 'id' | 'uploadDate'>) => void;
  deleteFinancialDocument: (id: string) => void;

  // Notifications
  notifications: FinanceNotificationItem[];
  markNotificationRead: (id: string) => void;
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  selectedMemberId: 'all',
  setSelectedMemberId: (id) => set({ selectedMemberId: id }),

  activeFinanceTab: 'dashboard',
  setActiveFinanceTab: (tab) => set({ activeFinanceTab: tab }),

  // Initial Profile
  financialProfile: {
    id: 'fp-1',
    familyId: 'fam-1',
    currency: 'IDR',
    primaryIncomeSource: 'Gaji Bulanan Ayah (Corporate Manager)',
    primaryIncomeAmount: 25000000,
    additionalIncomeSource: 'Bisnis Online Ibu & Freelance',
    additionalIncomeAmount: 12000000,
    favoritePaymentMethod: 'Transfer Bank',
    bankAccounts: [
      { id: 'b-1', bankName: 'Bank Mandiri', accountNumber: '123-00-9821-112', accountHolder: 'Ayah Pratama', type: 'Tabungan Utama', balance: 42500000 },
      { id: 'b-2', bankName: 'BCA', accountNumber: '882-0192-334', accountHolder: 'Ibu Ratna', type: 'Gaji', balance: 18200000 },
      { id: 'b-3', bankName: 'Bank BSI', accountNumber: '711-2093-441', accountHolder: 'Ayah Pratama', type: 'Dana Darurat', balance: 50000000 }
    ],
    eWallets: [
      { id: 'ew-1', provider: 'Gopay', phoneNumber: '0812-3456-7890', balance: 1450000 },
      { id: 'ew-2', provider: 'OVO', phoneNumber: '0812-3456-7890', balance: 850000 },
      { id: 'ew-3', provider: 'ShopeePay', phoneNumber: '0813-9876-5432', balance: 620000 }
    ],
    creditCards: [
      { id: 'cc-1', cardName: 'Mandiri Everyday Visa', bankName: 'Mandiri', creditLimit: 25000000, currentStatement: 3200000, dueDate: '2026-08-20' },
      { id: 'cc-2', cardName: 'BCA Everyday Card', bankName: 'BCA', creditLimit: 20000000, currentStatement: 1800000, dueDate: '2026-08-25' }
    ],
    financialPreferences: {
      riskTolerance: 'Moderat',
      targetSavingsRatioPercent: 25,
      emergencyFundMonthsTarget: 6,
      autoBillReminder: true,
      budgetExceededAlert: true
    },
    updatedAt: new Date().toISOString()
  },

  updateFinancialProfile: (updated) =>
    set((state) => ({
      financialProfile: { ...state.financialProfile, ...updated, updatedAt: new Date().toISOString() }
    })),

  // Initial Incomes
  incomes: [
    {
      id: 'inc-1',
      memberId: 'm-1',
      memberName: 'Ayah Pratama',
      title: 'Gaji Bulanan Utama - Agustus',
      amount: 25000000,
      category: 'Gaji',
      date: '2026-08-01',
      sourceAccount: 'Bank Mandiri (Tabungan Utama)',
      notes: 'Transfer rutin payroll kantor.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'inc-2',
      memberId: 'm-2',
      memberName: 'Ibu Ratna',
      title: 'Hasil Penjualan Toko Online',
      amount: 8500000,
      category: 'Usaha',
      date: '2026-08-02',
      sourceAccount: 'BCA (Ibu Ratna)',
      notes: 'Omset katering & kue kering mingguan.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'inc-3',
      memberId: 'm-1',
      memberName: 'Ayah Pratama',
      title: 'Dividen Saham BBCA & Reksa Dana',
      amount: 3500000,
      category: 'Investasi',
      date: '2026-07-28',
      sourceAccount: 'Bank Mandiri',
      notes: 'Pembagian dividen interim.',
      createdAt: new Date().toISOString()
    }
  ],

  addIncome: (income) =>
    set((state) => {
      const newIncome: IncomeRecord = {
        ...income,
        id: `inc-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      return { incomes: [newIncome, ...state.incomes] };
    }),

  deleteIncome: (id) =>
    set((state) => ({ incomes: state.incomes.filter((i) => i.id !== id) })),

  // Initial Expenses
  expenses: [
    {
      id: 'exp-1',
      memberId: 'm-2',
      memberName: 'Ibu Ratna',
      title: 'Belanja Sembako & Sayuran Bulanan',
      amount: 4500000,
      category: 'Makanan',
      date: '2026-08-01',
      paymentMethod: 'Transfer Bank (Bank Mandiri)',
      isRecurring: true,
      notes: 'Supermarket & pasar segar.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'exp-2',
      memberId: 'm-1',
      memberName: 'Ayah Pratama',
      title: 'BBM & Servis Berkala Mobil',
      amount: 1800000,
      category: 'Transportasi',
      date: '2026-08-02',
      paymentMethod: 'Gopay',
      isRecurring: true,
      notes: 'Isi Pertamax & ganti oli.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'exp-3',
      memberId: 'm-1',
      memberName: 'Ayah Pratama',
      title: 'SPP Sekolah Anak & Les Bahasa Inggris',
      amount: 3200000,
      category: 'Pendidikan',
      date: '2026-08-03',
      paymentMethod: 'Transfer Bank (BCA)',
      isRecurring: true,
      notes: 'Pembayaran SPP Bulan Agustus.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'exp-4',
      memberId: 'm-2',
      memberName: 'Ibu Ratna',
      title: 'Tagihan PLN, Indihome, & Air PDAM',
      amount: 1450000,
      category: 'Tagihan',
      date: '2026-08-04',
      paymentMethod: 'OVO',
      isRecurring: true,
      notes: 'Tagihan rutin bulanan rumah.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'exp-5',
      memberId: 'm-1',
      memberName: 'Ayah Pratama',
      title: 'Asuransi Kesehatan BPJS & Swasta',
      amount: 2200000,
      category: 'Asuransi',
      date: '2026-08-05',
      paymentMethod: 'Transfer Bank',
      isRecurring: true,
      notes: 'Autodebet bulanan.',
      createdAt: new Date().toISOString()
    }
  ],

  addExpense: (expense) =>
    set((state) => {
      const newExpense: ExpenseRecord = {
        ...expense,
        id: `exp-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      // Auto updates corresponding budget item realizedAmount
      const updatedBudgets = state.budgets.map((b) => {
        if (b.category.toLowerCase() === expense.category.toLowerCase()) {
          return { ...b, realizedAmount: b.realizedAmount + expense.amount };
        }
        return b;
      });
      return { expenses: [newExpense, ...state.expenses], budgets: updatedBudgets };
    }),

  deleteExpense: (id) =>
    set((state) => ({ expenses: state.expenses.filter((e) => e.id !== id) })),

  // Initial Budgets
  budgets: [
    {
      id: 'bud-1',
      title: 'Anggaran Makanan & Kebutuhan Rumah',
      period: 'Bulanan',
      category: 'Makanan',
      targetAmount: 6000000,
      realizedAmount: 4500000,
      startDate: '2026-08-01',
      endDate: '2026-08-31',
      alertsThresholdPercent: 80,
      createdAt: new Date().toISOString()
    },
    {
      id: 'bud-2',
      title: 'Anggaran Transportasi & Bahan Bakar',
      period: 'Bulanan',
      category: 'Transportasi',
      targetAmount: 2500000,
      realizedAmount: 1800000,
      startDate: '2026-08-01',
      endDate: '2026-08-31',
      alertsThresholdPercent: 80,
      createdAt: new Date().toISOString()
    },
    {
      id: 'bud-3',
      title: 'Anggaran Pendidikan & Kegiatan Anak',
      period: 'Bulanan',
      category: 'Pendidikan',
      targetAmount: 4000000,
      realizedAmount: 3200000,
      startDate: '2026-08-01',
      endDate: '2026-08-31',
      alertsThresholdPercent: 85,
      createdAt: new Date().toISOString()
    },
    {
      id: 'bud-4',
      title: 'Anggaran Rekreasi & Hiburan Keluarga',
      period: 'Bulanan',
      category: 'Hiburan',
      targetAmount: 2000000,
      realizedAmount: 750000,
      startDate: '2026-08-01',
      endDate: '2026-08-31',
      alertsThresholdPercent: 75,
      createdAt: new Date().toISOString()
    }
  ],

  addBudget: (budget) =>
    set((state) => {
      const newBudget: BudgetPlannerItem = {
        ...budget,
        id: `bud-${Date.now()}`,
        realizedAmount: 0,
        createdAt: new Date().toISOString()
      };
      return { budgets: [...state.budgets, newBudget] };
    }),

  updateBudget: (id, updated) =>
    set((state) => ({
      budgets: state.budgets.map((b) => (b.id === id ? { ...b, ...updated } : b))
    })),

  deleteBudget: (id) =>
    set((state) => ({ budgets: state.budgets.filter((b) => b.id !== id) })),

  // Initial Saving Goals
  savingGoals: [
    {
      id: 'sg-1',
      title: 'Dana Darurat Keluarga (6 Bulan Pengeluaran)',
      category: 'Dana Darurat',
      targetAmount: 90000000,
      currentAmount: 50000000,
      deadline: '2026-12-31',
      memberId: 'm-1',
      memberName: 'Ayah Pratama',
      status: 'in_progress',
      priority: 'Mendesak',
      icon: 'ShieldCheck',
      notes: 'Disimpan dalam BSI & Deposito Liquid.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'sg-2',
      title: 'Tabungan Pendidikan Perguruan Tinggi Anak',
      category: 'Pendidikan',
      targetAmount: 150000000,
      currentAmount: 68000000,
      deadline: '2030-07-01',
      memberId: 'm-1',
      memberName: 'Seluruh Keluarga',
      status: 'in_progress',
      priority: 'Tinggi',
      icon: 'GraduationCap',
      notes: 'Diinvestasikan di Reksa Dana Saham & Emas.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'sg-3',
      title: 'Liburan Akhir Tahun ke Jepang',
      category: 'Liburan',
      targetAmount: 35000000,
      currentAmount: 22000000,
      deadline: '2026-11-30',
      memberId: 'm-2',
      memberName: 'Ibu Ratna',
      status: 'in_progress',
      priority: 'Sedang',
      icon: 'Plane',
      notes: 'Tiket & akomodasi keluarga 4 orang.',
      createdAt: new Date().toISOString()
    }
  ],

  addSavingGoal: (goal) =>
    set((state) => {
      const newGoal: SavingGoalItem = {
        ...goal,
        id: `sg-${Date.now()}`,
        currentAmount: 0,
        status: 'in_progress',
        createdAt: new Date().toISOString()
      };
      return { savingGoals: [...state.savingGoals, newGoal] };
    }),

  addGoalContribution: (id, amount) =>
    set((state) => ({
      savingGoals: state.savingGoals.map((sg) => {
        if (sg.id === id) {
          const newCurrent = sg.currentAmount + amount;
          const isCompleted = newCurrent >= sg.targetAmount;
          return {
            ...sg,
            currentAmount: newCurrent,
            status: isCompleted ? 'completed' : 'in_progress'
          };
        }
        return sg;
      })
    })),

  deleteSavingGoal: (id) =>
    set((state) => ({ savingGoals: state.savingGoals.filter((sg) => sg.id !== id) })),

  // Initial Investments
  investments: [
    {
      id: 'inv-1',
      title: 'Emas Batangan Antam (100 gram)',
      category: 'Emas',
      capitalAmount: 110000000,
      currentValue: 138000000,
      returnPercentage: 25.45,
      profitOrLossAmount: 28000000,
      purchaseDate: '2024-03-15',
      platform: 'Pegadaian Digital',
      memberId: 'm-1',
      memberName: 'Ayah Pratama',
      notes: 'Fokus lindung nilai inflasi.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'inv-2',
      title: 'Saham Bank Central Asia (BBCA)',
      category: 'Saham',
      capitalAmount: 45000000,
      currentValue: 56250000,
      returnPercentage: 25.0,
      profitOrLossAmount: 11250000,
      purchaseDate: '2024-06-10',
      platform: 'Stockbit',
      memberId: 'm-1',
      memberName: 'Ayah Pratama',
      notes: 'Investasi jangka panjang deviden & capital gain.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'inv-3',
      title: 'Reksa Dana Pendapatan Tetap Sucoinvest',
      category: 'Reksa Dana',
      capitalAmount: 20000000,
      currentValue: 21600000,
      returnPercentage: 8.0,
      profitOrLossAmount: 1600000,
      purchaseDate: '2025-01-20',
      platform: 'Bibit',
      memberId: 'm-2',
      memberName: 'Ibu Ratna',
      notes: 'Imbal hasil stabil menengah.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'inv-4',
      title: 'Deposito Syariah Bank BSI',
      category: 'Deposito',
      capitalAmount: 30000000,
      currentValue: 31350000,
      returnPercentage: 4.5,
      profitOrLossAmount: 1350000,
      purchaseDate: '2025-02-01',
      platform: 'BSI Mobile',
      memberId: 'm-1',
      memberName: 'Ayah Pratama',
      notes: 'Tenor 12 bulan roll-over.',
      createdAt: new Date().toISOString()
    }
  ],

  addInvestment: (inv) =>
    set((state) => {
      const returnPercentage = 0;
      const profitOrLossAmount = 0;
      const newInv: InvestmentItem = {
        ...inv,
        id: `inv-${Date.now()}`,
        returnPercentage,
        profitOrLossAmount,
        createdAt: new Date().toISOString()
      };
      return { investments: [newInv, ...state.investments] };
    }),

  updateInvestmentValue: (id, newValue) =>
    set((state) => ({
      investments: state.investments.map((inv) => {
        if (inv.id === id) {
          const profitOrLossAmount = newValue - inv.capitalAmount;
          const returnPercentage = inv.capitalAmount > 0 ? (profitOrLossAmount / inv.capitalAmount) * 100 : 0;
          return {
            ...inv,
            currentValue: newValue,
            profitOrLossAmount,
            returnPercentage
          };
        }
        return inv;
      })
    })),

  deleteInvestment: (id) =>
    set((state) => ({ investments: state.investments.filter((i) => i.id !== id) })),

  // Initial Bills
  bills: [
    {
      id: 'bill-1',
      title: 'Tagihan Listrik PLN (Token / Pascarayar)',
      category: 'Listrik',
      amount: 850000,
      dueDate: '2026-08-10',
      isPaid: false,
      isAutoPay: true,
      provider: 'PLN Persero',
      reminderDaysBefore: 3,
      notes: 'Daya 3500 VA.'
    },
    {
      id: 'bill-2',
      title: 'Internet Fiber Home & Wi-Fi',
      category: 'Internet',
      amount: 450000,
      dueDate: '2026-08-15',
      isPaid: true,
      paidDate: '2026-08-02',
      isAutoPay: false,
      provider: 'Indihome 100 Mbps',
      reminderDaysBefore: 2,
      notes: 'Selesai dibayar via OVO.'
    },
    {
      id: 'bill-3',
      title: 'Cicilan KPR Rumah Utama Mandiri',
      category: 'Cicilan',
      amount: 4800000,
      dueDate: '2026-08-20',
      isPaid: false,
      isAutoPay: true,
      provider: 'Bank Mandiri Syariah',
      reminderDaysBefore: 5,
      notes: 'Tenor tersisa 8 tahun.'
    },
    {
      id: 'bill-4',
      title: 'Iuran Air Bersih PDAM Kota',
      category: 'Air',
      amount: 180000,
      dueDate: '2026-08-12',
      isPaid: false,
      isAutoPay: false,
      provider: 'PDAM Tirta',
      reminderDaysBefore: 2
    }
  ],

  addBill: (bill) =>
    set((state) => ({
      bills: [...state.bills, { ...bill, id: `bill-${Date.now()}` }]
    })),

  toggleBillPaid: (id) =>
    set((state) => ({
      bills: state.bills.map((b) =>
        b.id === id
          ? {
              ...b,
              isPaid: !b.isPaid,
              paidDate: !b.isPaid ? new Date().toISOString().split('T')[0] : undefined
            }
          : b
      )
    })),

  deleteBill: (id) =>
    set((state) => ({ bills: state.bills.filter((b) => b.id !== id) })),

  // Initial Subscriptions
  subscriptions: [
    {
      id: 'sub-1',
      title: 'Netflix Family 4K Ultra HD',
      provider: 'Netflix Inc.',
      billingCycle: 'Monthly',
      cost: 186000,
      nextBillingDate: '2026-08-18',
      status: 'Active',
      category: 'Streaming',
      sharedWithMembers: ['Ayah Pratama', 'Ibu Ratna', 'Anak Bintang'],
      autoRenew: true
    },
    {
      id: 'sub-2',
      title: 'Spotify Family Premium Plan',
      provider: 'Spotify Ltd.',
      billingCycle: 'Monthly',
      cost: 86000,
      nextBillingDate: '2026-08-22',
      status: 'Active',
      category: 'Musik',
      sharedWithMembers: ['Seluruh Anggota Keluarga'],
      autoRenew: true
    },
    {
      id: 'sub-3',
      title: 'Google One 2TB Family Cloud Storage',
      provider: 'Google LLC',
      billingCycle: 'Yearly',
      cost: 1350000,
      nextBillingDate: '2026-11-10',
      status: 'Active',
      category: 'Cloud & AI',
      sharedWithMembers: ['Ayah Pratama', 'Ibu Ratna'],
      autoRenew: true
    }
  ],

  addSubscription: (sub) =>
    set((state) => ({
      subscriptions: [...state.subscriptions, { ...sub, id: `sub-${Date.now()}` }]
    })),

  toggleSubscriptionStatus: (id) =>
    set((state) => ({
      subscriptions: state.subscriptions.map((s) =>
        s.id === id
          ? { ...s, status: s.status === 'Active' ? 'Paused' : 'Active' }
          : s
      )
    })),

  deleteSubscription: (id) =>
    set((state) => ({ subscriptions: state.subscriptions.filter((s) => s.id !== id) })),

  // Initial Assets
  assets: [
    {
      id: 'ast-1',
      title: 'Rumah Tinggal Utama 2 Lantai (LB 180m²)',
      category: 'Rumah',
      estimatedValue: 1850000000,
      purchasePrice: 1200000000,
      purchaseDate: '2019-05-10',
      ownerMemberId: 'm-1',
      ownerName: 'Ayah Pratama & Ibu Ratna',
      locationOrRef: 'Komp. Cluster Asri Blok C-12',
      notes: 'Sertifikat SHM atas nama Ayah.'
    },
    {
      id: 'ast-2',
      title: 'Mobil Honda HR-V 1.5 Special Edition 2022',
      category: 'Mobil',
      estimatedValue: 310000000,
      purchasePrice: 385000000,
      purchaseDate: '2022-08-20',
      ownerMemberId: 'm-1',
      ownerName: 'Ayah Pratama',
      locationOrRef: 'Garasi Rumah Utama',
      notes: 'Pajak hidup, servis berkala rutin.'
    },
    {
      id: 'ast-3',
      title: 'Motor Yamaha NMAX 155 ABS',
      category: 'Motor',
      estimatedValue: 26000000,
      purchasePrice: 34000000,
      purchaseDate: '2023-02-11',
      ownerMemberId: 'm-2',
      ownerName: 'Ibu Ratna',
      locationOrRef: 'Garasi Depan',
      notes: 'STNK & BPKB lengkap.'
    },
    {
      id: 'ast-4',
      title: 'Perhiasan Emas & Berlian Keluarga',
      category: 'Perhiasan',
      estimatedValue: 65000000,
      purchasePrice: 48000000,
      purchaseDate: '2021-12-05',
      ownerMemberId: 'm-2',
      ownerName: 'Ibu Ratna',
      locationOrRef: 'Safe Deposit Box Mandiri',
      notes: 'Lengkap dengan sertifikat perhiasan.'
    }
  ],

  addAsset: (asset) =>
    set((state) => ({
      assets: [...state.assets, { ...asset, id: `ast-${Date.now()}` }]
    })),

  updateAsset: (id, updated) =>
    set((state) => ({
      assets: state.assets.map((a) => (a.id === id ? { ...a, ...updated } : a))
    })),

  deleteAsset: (id) =>
    set((state) => ({ assets: state.assets.filter((a) => a.id !== id) })),

  // Initial Debts
  debts: [
    {
      id: 'dbt-1',
      title: 'KPR Rumah Tinggal Cluster Asri',
      lender: 'Bank Mandiri Syariah',
      category: 'KPR',
      totalAmount: 950000000,
      remainingAmount: 420000000,
      monthlyInstallment: 4800000,
      interestRatePercent: 6.5,
      dueDate: 'Tanggal 20 Setiap Bulan',
      status: 'active',
      reminderEnabled: true,
      notes: 'Sisa tenor 87 bulan.'
    },
    {
      id: 'dbt-2',
      title: 'Cicilan Elektronik Smart TV 65 Inch',
      lender: 'BCA Credit Card',
      category: 'Cicilan',
      totalAmount: 12000000,
      remainingAmount: 3000000,
      monthlyInstallment: 1000000,
      interestRatePercent: 0,
      dueDate: 'Tanggal 25 Setiap Bulan',
      status: 'active',
      reminderEnabled: true,
      notes: 'Sisa 3 bulan cicilan 0%.'
    }
  ],

  addDebt: (debt) =>
    set((state) => ({
      debts: [...state.debts, { ...debt, id: `dbt-${Date.now()}` }]
    })),

  payDebtInstallment: (id, amountPaid) =>
    set((state) => ({
      debts: state.debts.map((d) => {
        if (d.id === id) {
          const newRemaining = Math.max(0, d.remainingAmount - amountPaid);
          return {
            ...d,
            remainingAmount: newRemaining,
            status: newRemaining === 0 ? 'paid_off' : 'active'
          };
        }
        return d;
      })
    })),

  deleteDebt: (id) =>
    set((state) => ({ debts: state.debts.filter((d) => d.id !== id) })),

  // Initial Insights
  financialInsights: [
    {
      id: 'fi-1',
      category: 'Emergency Fund',
      title: 'Pencapaian Dana Darurat Mencapai 55.5%',
      summary: 'Dana darurat keluarga saat ini terkumpul Rp 50.000.000 dari target Rp 90.000.000 (6 bulan pengeluaran). Pertahankan konsistensi Rp 5.000.000/bulan.',
      actionItems: [
        'Set-up autodebet bulanan Rp 5 Juta ke Rekening BSI Dana Darurat.',
        'Hindari penggunaan dana darurat untuk belanja gaya hidup.'
      ],
      impact: 'Sangat Penting',
      date: '2026-08-01',
      isRead: false
    },
    {
      id: 'fi-2',
      category: 'Investment',
      title: 'Portofolio Emas Menghasilkan Gain +25.45%',
      summary: 'Aset emas keluarga mengalami apresiasi nilai cukup tinggi. Disarankan merebalancing portofolio ke aset likuid atau reksa dana pendapatan tetap.',
      actionItems: [
        'Pertimbangkan akumulasi berkala saat terjadi koreksi harga.',
        'Diversifikasikan 10% keuntungan ke instrumen pasar uang.'
      ],
      impact: 'Penting',
      date: '2026-07-29',
      isRead: true
    },
    {
      id: 'fi-3',
      category: 'Bill Reminder',
      title: 'Tagihan PLN & Cicilan KPR Jatuh Tempo Minggu Ini',
      summary: 'Tagihan PLN Rp 850.000 dan KPR Rp 4.800.000 akan dieksekusi autodebet. Pastikan saldo Bank Mandiri mencukupi minimal Rp 6.000.000.',
      actionItems: ['Periksa kecukupan saldo di Bank Mandiri Utama.'],
      impact: 'Sangat Penting',
      date: '2026-08-03',
      isRead: false
    }
  ],

  markInsightRead: (id) =>
    set((state) => ({
      financialInsights: state.financialInsights.map((fi) =>
        fi.id === id ? { ...fi, isRead: true } : fi
      )
    })),

  // Initial Shared Wallets
  sharedWallets: [
    {
      id: 'sw-1',
      name: 'Dompet Utama Keluarga',
      type: 'Utama Keluarga',
      balance: 42500000,
      membersWithAccess: ['Ayah Pratama', 'Ibu Ratna'],
      icon: 'Wallet',
      color: 'emerald',
      currency: 'IDR',
      lastTransactions: [
        { id: 'tx-1', type: 'deposit', amount: 25000000, note: 'Gaji Bulanan Payroll', date: '2026-08-01', actorName: 'Ayah Pratama' },
        { id: 'tx-2', type: 'withdraw', amount: 4500000, note: 'Belanja Bulanan Sembako', date: '2026-08-01', actorName: 'Ibu Ratna' }
      ]
    },
    {
      id: 'sw-2',
      name: 'Dompet Belanja Dapur & Harian',
      type: 'Belanja Bulanan',
      balance: 6500000,
      membersWithAccess: ['Ibu Ratna', 'Pengasuh / ART'],
      icon: 'ShoppingCart',
      color: 'amber',
      currency: 'IDR',
      lastTransactions: [
        { id: 'tx-3', type: 'deposit', amount: 5000000, note: 'Alokasi Belanja Dapur', date: '2026-08-01', actorName: 'Ayah Pratama' }
      ]
    },
    {
      id: 'sw-3',
      name: 'Dompet Tabungan Pendidikan Anak',
      type: 'Pendidikan Anak',
      balance: 18200000,
      membersWithAccess: ['Ayah Pratama', 'Ibu Ratna'],
      icon: 'GraduationCap',
      color: 'indigo',
      currency: 'IDR',
      lastTransactions: [
        { id: 'tx-4', type: 'deposit', amount: 3000000, note: 'Setoran Bulanan Pendidikan', date: '2026-08-02', actorName: 'Ayah Pratama' }
      ]
    }
  ],

  transferBetweenWallets: (fromId, toId, amount, note, actorName) =>
    set((state) => {
      const updatedWallets = state.sharedWallets.map((w) => {
        if (w.id === fromId) {
          return {
            ...w,
            balance: Math.max(0, w.balance - amount),
            lastTransactions: [
              { id: `tx-${Date.now()}`, type: 'withdraw' as const, amount, note, date: new Date().toISOString().split('T')[0], actorName },
              ...w.lastTransactions
            ]
          };
        }
        if (w.id === toId) {
          return {
            ...w,
            balance: w.balance + amount,
            lastTransactions: [
              { id: `tx-${Date.now()}`, type: 'deposit' as const, amount, note, date: new Date().toISOString().split('T')[0], actorName },
              ...w.lastTransactions
            ]
          };
        }
        return w;
      });
      return { sharedWallets: updatedWallets };
    }),

  updateSharedWalletBalance: (id, amountChange, note, actorName) =>
    set((state) => ({
      sharedWallets: state.sharedWallets.map((w) => {
        if (w.id === id) {
          const newBalance = Math.max(0, w.balance + amountChange);
          const newTx = {
            id: `tx-${Date.now()}`,
            type: (amountChange >= 0 ? 'deposit' : 'withdraw') as 'deposit' | 'withdraw' | 'transfer',
            amount: Math.abs(amountChange),
            note,
            date: new Date().toISOString().split('T')[0],
            actorName
          };
          return {
            ...w,
            balance: newBalance,
            lastTransactions: [newTx, ...(w.lastTransactions || []).slice(0, 9)]
          };
        }
        return w;
      })
    })),

  calculateFinancialHealthScore: () => {
    const state = get();
    const totalIncome = state.incomes.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = state.expenses.reduce((acc, curr) => acc + curr.amount, 0);
    if (totalIncome === 0) return 65;
    const savingsRatio = ((totalIncome - totalExpense) / totalIncome) * 100;
    let score = 50;
    if (savingsRatio >= 20) score += 25;
    else if (savingsRatio >= 10) score += 15;
    
    const emergencyGoal = state.savingGoals.find((g) => g.category === 'Dana Darurat');
    if (emergencyGoal && emergencyGoal.currentAmount >= emergencyGoal.targetAmount * 0.5) {
      score += 25;
    } else {
      score += 15;
    }
    return Math.min(100, Math.max(0, Math.round(score)));
  },

  // Initial Documents
  financialDocuments: [
    {
      id: 'doc-1',
      title: 'Polis Asuransi Jiwa & Kesehatan Pratama',
      category: 'Kontrak',
      fileUrl: '#',
      uploadDate: '2026-01-10',
      memberId: 'm-1',
      memberName: 'Ayah Pratama',
      tags: ['Asuransi', 'Polis', 'Penting'],
      notes: 'Penting untuk klaim kesehatan & pertanggungan.'
    },
    {
      id: 'doc-2',
      title: 'Kwitansi SPP Sekolah Bintang Semester 1',
      category: 'Struk',
      fileUrl: '#',
      uploadDate: '2026-07-20',
      memberId: 'm-2',
      memberName: 'Ibu Ratna',
      amountRef: 3200000,
      tags: ['Sekolah', 'Pendidikan'],
      notes: 'Bukti pembayaran SPP resmi.'
    },
    {
      id: 'doc-3',
      title: 'Sertifikat Kepemilikan Emas Batangan Antam',
      category: 'Garansi',
      fileUrl: '#',
      uploadDate: '2024-03-15',
      memberId: 'm-1',
      memberName: 'Ayah Pratama',
      tags: ['Emas', 'Investasi'],
      notes: 'Sertifikat LBMA 100gram.'
    }
  ],

  addFinancialDocument: (doc) =>
    set((state) => ({
      financialDocuments: [
        { ...doc, id: `doc-${Date.now()}`, uploadDate: new Date().toISOString().split('T')[0] },
        ...state.financialDocuments
      ]
    })),

  deleteFinancialDocument: (id) =>
    set((state) => ({
      financialDocuments: state.financialDocuments.filter((d) => d.id !== id)
    })),

  // Initial Notifications
  notifications: [
    {
      id: 'notif-1',
      type: 'bill_due',
      title: 'Jatuh Tempo Listrik PLN',
      message: 'Tagihan PLN Rp 850.000 jatuh tempo dalam 3 hari (10 Agustus).',
      date: '2026-08-07',
      isRead: false,
      priority: 'urgent'
    },
    {
      id: 'notif-2',
      type: 'budget_limit',
      title: 'Peringatan Anggaran Makanan (75%)',
      message: 'Pengeluaran Makanan sudah mencapai Rp 4.500.000 dari target Rp 6.000.000.',
      date: '2026-08-05',
      isRead: false,
      priority: 'warning'
    },
    {
      id: 'notif-3',
      type: 'saving_goal',
      title: 'Target Tabungan Liburan Tercapai 62%',
      message: 'Selamat! Tabungan Liburan ke Jepang sudah mengumpul Rp 22.000.000.',
      date: '2026-08-02',
      isRead: true,
      priority: 'info'
    }
  ],

  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      )
    }))
}));
