export type FamilyRole = 'parents' | 'kids' | 'seniors' | 'couple';

export type DetailedFamilyRole = 
  | 'Ayah' 
  | 'Ibu' 
  | 'Anak' 
  | 'Kakek' 
  | 'Nenek' 
  | 'Saudara' 
  | 'Pengasuh' 
  | 'Lainnya';

export interface LocationHistoryLog {
  id: string;
  placeName: string;
  timestamp: string;
  addressDetails?: string;
  category?: 'Rumah' | 'Sekolah' | 'Kantor' | 'Les/Kursus' | 'Publik/Olahraga' | 'Lainnya';
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface FamilyMember {
  id: string;
  name: string;
  role: FamilyRole;
  detailedRole?: DetailedFamilyRole;
  relationship: string;
  age: number;
  birthDate?: string;
  gender?: 'Laki-laki' | 'Perempuan';
  phone?: string;
  email?: string;
  avatar: string;
  mood: 'happy' | 'calm' | 'stressed' | 'sad' | 'energetic' | 'anxious';
  statusText: string;
  status?: 'aktif' | 'sekolah' | 'kerja' | 'istirahat' | 'offline';
  location: {
    lat: number;
    lng: number;
    placeName: string;
    lastUpdated: string;
    batteryPercent: number;
  };
  locationHistory?: LocationHistoryLog[];
  healthSummary?: string;
  roleTitle: string;
  isOnline: boolean;
}

export interface FamilyProfile {
  id: string;
  familyName: string;
  address: string;
  motto: string;
  familyPhoto: string;
  createdAt: string;
  homeCount: number;
  familyScore: number;
}

export interface FamilyInvitation {
  id: string;
  familyId: string;
  email: string;
  role: DetailedFamilyRole;
  inviteLink: string;
  status: 'pending' | 'accepted' | 'expired';
  createdAt: string;
}

export interface FamilyActivityItem {
  id: string;
  actorName: string;
  actorAvatar: string;
  action: string;
  category: string;
  timeAgo: string;
  timestamp: string;
}

export interface RolePermissionItem {
  role: 'super_admin' | 'parent' | 'child' | 'grandparent' | 'guest';
  label: string;
  canManageMembers: boolean;
  canManageFinance: boolean;
  canControlSmartHome: boolean;
  canAccessAI: boolean;
  canSendSOS: boolean;
}

export interface MoodEntry {
  id: string;
  memberId: string;
  memberName: string;
  memberAvatar: string;
  mood: 'happy' | 'calm' | 'stressed' | 'sad' | 'energetic' | 'anxious';
  rating: number; // 1-5
  note: string;
  date: string;
  aiAdvice?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'family';
  senderName: string;
  avatar: string;
  text: string;
  timestamp: string;
  persona?: string;
  category?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  category: 'chores' | 'homework' | 'bills' | 'health' | 'shopping' | 'general';
  assignedToMemberId: string;
  dueDate: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface BudgetItem {
  id: string;
  title: string;
  amount: number;
  category: 'Groceries' | 'Utilities' | 'Education' | 'Health' | 'Entertainment' | 'Savings' | 'Income';
  type: 'income' | 'expense';
  date: string;
  paidByMemberId: string;
}

export interface MealPlanDay {
  id: string;
  dayName: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  snack: string;
  prepTime: string;
  calories: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  bought: boolean;
  estimatedPrice: number;
  addedBy: string;
}

export interface SmartDevice {
  id: string;
  name: string;
  type: 'light' | 'thermostat' | 'lock' | 'camera' | 'speaker' | 'air_purifier' | 'tv';
  room: 'Ruang Tamu' | 'Kamar Utama' | 'Kamar Anak' | 'Dapur' | 'Halaman';
  status: boolean; // on/off or locked/unlocked
  value?: number; // e.g. temp, brightness
  unit?: string;
}

export interface MemoryPhoto {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  tags: string[];
  uploadedBy: string;
  likes: number;
}

export interface StickyNote {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  color: 'yellow' | 'pink' | 'blue' | 'green' | 'purple';
  createdAt: string;
}

export type ActiveTab = 
  | 'dashboard'
  | 'family'
  | 'calendar'
  | 'reminders'
  | 'assistant'
  | 'mood'
  | 'psychology'
  | 'parenting'
  | 'education'
  | 'health'
  | 'insurance'
  | 'finance'
  | 'meals'
  | 'shopping'
  | 'smarthome'
  | 'travel'
  | 'safety'
  | 'communication'
  | 'memories'
  | 'analytics'
  | 'admin';

export * from './types/travel';

export type DeviceViewMode = 'desktop' | 'tablet' | 'mobile' | 'smart_tv';
export type ViewMode = 'pc' | 'tablet' | 'mobile' | 'tv';

// ==========================================
// 💰 AI FINANCE & FINANCIAL CENTER TYPES
// ==========================================

export interface BankAccountInfo {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  type: 'Tabungan Utama' | 'Gaji' | 'Bisnis' | 'Dana Darurat';
  balance: number;
}

export interface EWalletInfo {
  id: string;
  provider: 'Gopay' | 'OVO' | 'Dana' | 'ShopeePay' | 'LinkAja' | 'Other';
  phoneNumber: string;
  balance: number;
}

export interface CreditCardInfo {
  id: string;
  cardName: string;
  bankName: string;
  creditLimit: number;
  currentStatement: number;
  dueDate: string;
}

export interface FinancialProfile {
  id: string;
  familyId: string;
  currency: 'IDR' | 'USD' | 'EUR' | 'SGD';
  primaryIncomeSource: string;
  primaryIncomeAmount: number;
  additionalIncomeSource?: string;
  additionalIncomeAmount?: number;
  favoritePaymentMethod: 'Transfer Bank' | 'E-Wallet' | 'Kartu Kredit' | 'Tunai';
  bankAccounts: BankAccountInfo[];
  eWallets: EWalletInfo[];
  creditCards: CreditCardInfo[];
  financialPreferences: {
    riskTolerance: 'Konservatif' | 'Moderat' | 'Agresif';
    targetSavingsRatioPercent: number; // e.g. 20
    emergencyFundMonthsTarget: number; // e.g. 6
    autoBillReminder: boolean;
    budgetExceededAlert: boolean;
  };
  updatedAt: string;
}

export interface IncomeRecord {
  id: string;
  memberId: string;
  memberName: string;
  title: string;
  amount: number;
  category: 'Gaji' | 'Bonus' | 'Usaha' | 'Investasi' | 'Hadiah' | 'Pendapatan Lain';
  date: string;
  sourceAccount: string;
  attachmentUrl?: string;
  notes?: string;
  createdAt: string;
}

export interface ExpenseRecord {
  id: string;
  memberId: string;
  memberName: string;
  title: string;
  amount: number;
  category: 'Makanan' | 'Transportasi' | 'Pendidikan' | 'Kesehatan' | 'Belanja' | 'Hiburan' | 'Asuransi' | 'Tagihan' | 'Pajak' | 'Investasi' | 'Donasi' | 'Kategori Custom';
  date: string;
  paymentMethod: string;
  walletId?: string;
  receiptUrl?: string;
  isRecurring: boolean;
  notes?: string;
  createdAt: string;
}

export interface BudgetPlannerItem {
  id: string;
  title: string;
  period: 'Harian' | 'Mingguan' | 'Bulanan' | 'Tahunan';
  category: string;
  targetAmount: number;
  realizedAmount: number;
  startDate: string;
  endDate: string;
  alertsThresholdPercent: number; // e.g. 80
  createdAt: string;
}

export interface SavingGoalItem {
  id: string;
  title: string;
  category: 'Dana Darurat' | 'Liburan' | 'Rumah' | 'Mobil' | 'Pendidikan' | 'Gadget' | 'Pernikahan' | 'Custom Goal';
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  memberId: string;
  memberName: string;
  status: 'in_progress' | 'completed';
  priority: 'Rendah' | 'Sedang' | 'Tinggi' | 'Mendesak';
  icon: string;
  notes?: string;
  createdAt: string;
}

export interface InvestmentItem {
  id: string;
  title: string;
  category: 'Deposito' | 'Emas' | 'Saham' | 'Obligasi' | 'Reksa Dana' | 'Crypto' | 'Properti' | 'Usaha' | 'Custom';
  capitalAmount: number; // Modal Awal
  currentValue: number;  // Nilai Saat Ini
  returnPercentage: number; // % Profit/Loss
  profitOrLossAmount: number;
  purchaseDate: string;
  platform: string; // e.g. Bibit, Stockbit, Pegadaian, Bank Mandiri
  memberId: string;
  memberName: string;
  notes?: string;
  createdAt: string;
}

export interface BillItem {
  id: string;
  title: string;
  category: 'Listrik' | 'Air' | 'Internet' | 'Telepon' | 'Streaming' | 'Sekolah' | 'Asuransi' | 'Cicilan' | 'Langganan' | 'Lainnya';
  amount: number;
  dueDate: string; // YYYY-MM-DD or Day of month
  isPaid: boolean;
  paidDate?: string;
  isAutoPay: boolean;
  provider: string;
  reminderDaysBefore: number;
  notes?: string;
}

export interface SubscriptionItem {
  id: string;
  title: string;
  provider: string;
  billingCycle: 'Monthly' | 'Yearly';
  cost: number;
  nextBillingDate: string;
  status: 'Active' | 'Paused' | 'Cancelled';
  category: string;
  sharedWithMembers: string[];
  autoRenew: boolean;
}

export interface AssetItem {
  id: string;
  title: string;
  category: 'Rumah' | 'Tanah' | 'Mobil' | 'Motor' | 'Perhiasan' | 'Elektronik' | 'Aset Digital' | 'Investasi' | 'Lainnya';
  estimatedValue: number;
  purchasePrice: number;
  purchaseDate: string;
  ownerMemberId: string;
  ownerName: string;
  locationOrRef?: string;
  documentUrl?: string;
  notes?: string;
}

export interface DebtItem {
  id: string;
  title: string;
  lender: string; // Bank / Institusi / Perorangan
  category: 'Pinjaman' | 'Kredit' | 'Cicilan' | 'KPR' | 'Lainnya';
  totalAmount: number;
  remainingAmount: number;
  monthlyInstallment: number;
  interestRatePercent: number;
  dueDate: string;
  status: 'active' | 'paid_off';
  reminderEnabled: boolean;
  notes?: string;
}

export interface FinancialInsightItem {
  id: string;
  category: 'Saving' | 'Budget' | 'Expense' | 'Investment' | 'Emergency Fund' | 'Bill Reminder' | 'Financial Habit';
  title: string;
  summary: string;
  actionItems: string[];
  impact: 'Sangat Penting' | 'Penting' | 'Informasi';
  date: string;
  isRead: boolean;
}

export interface SharedWalletItem {
  id: string;
  name: string;
  walletName?: string;
  managedByName?: string;
  allowedMembers?: string[];
  type: 'Utama Keluarga' | 'Dana Darurat' | 'Belanja Bulanan' | 'Pendidikan Anak' | 'Tabungan Liburan';
  balance: number;
  membersWithAccess: string[];
  icon: string;
  color: string;
  currency: string;
  lastTransactions: {
    id: string;
    type: 'deposit' | 'withdraw' | 'transfer';
    amount: number;
    note: string;
    date: string;
    actorName: string;
  }[];
}

export interface FinancialDocumentItem {
  id: string;
  title: string;
  category: 'Sertifikat' | 'Polis Asuransi' | 'BPKB' | 'Pajak' | 'Kontrak KPR' | 'Invoice' | 'Struk' | 'Kontrak' | 'Garansi' | 'Dokumen Pajak' | 'Laporan Keuangan' | 'Lainnya';
  documentNumber?: string;
  issueDate?: string;
  expiryDate?: string;
  fileUrl?: string;
  uploadDate: string;
  memberId?: string;
  memberName?: string;
  amountRef?: number;
  tags?: string[];
  notes?: string;
}

export interface FinanceNotificationItem {
  id: string;
  type: 'bill_due' | 'budget_limit' | 'saving_goal' | 'investment_update' | 'debt_due' | 'tax_reminder';
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  priority: 'urgent' | 'info' | 'warning';
}

// ==========================================
// AI INSURANCE & FAMILY PROTECTION TYPES
// ==========================================

export type InsuranceCategoryType =
  | 'Kesehatan'
  | 'Jiwa'
  | 'Kecelakaan'
  | 'Rumah'
  | 'Kendaraan'
  | 'Pendidikan'
  | 'Perjalanan'
  | 'Usaha'
  | 'Pet Insurance'
  | 'Custom';

export type PolicyStatusType = 'active' | 'grace_period' | 'expired' | 'cancelled' | 'pending';

export type PaymentFrequencyType = 'Bulanan' | 'Triwulan' | 'Semesteran' | 'Tahunan';

export type ClaimStatusType = 'Draft' | 'Submitted' | 'Review' | 'Approved' | 'Rejected' | 'Closed';

export type DocumentCategoryType =
  | 'Polis'
  | 'Kartu Peserta'
  | 'Invoice'
  | 'Bukti Pembayaran'
  | 'Dokumen Klaim'
  | 'Surat Pendukung';

export interface InsurancePolicy {
  id: string;
  policyNumber: string;
  title: string;
  category: InsuranceCategoryType;
  providerId: string;
  providerName: string;
  participantNumber: string;
  policyHolderId: string;
  policyHolderName: string;
  insuredMemberIds: string[];
  insuredMemberNames: string[];
  startDate: string;
  endDate: string;
  status: PolicyStatusType;
  premiumAmount: number;
  paymentFrequency: PaymentFrequencyType;
  coverageLimit: number;
  benefits: string[];
  attachmentUrl?: string;
  notes?: string;
  createdAt: string;
}

export interface InsuranceProvider {
  id: string;
  name: string;
  contactPerson: string;
  callCenter: string;
  email: string;
  website: string;
  notes?: string;
  logo?: string;
}

export interface InsuranceMember {
  id: string;
  memberId: string;
  memberName: string;
  relationship: string;
  bloodType?: string;
  emergencyContact: string;
  favoriteHospital?: string;
  specialMedicalNotes?: string;
  activePolicyCount: number;
}

export interface InsurancePremium {
  id: string;
  policyId: string;
  policyTitle: string;
  providerName: string;
  amount: number;
  frequency: PaymentFrequencyType;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'overdue';
  paymentMethod?: string;
  notes?: string;
}

export interface InsurancePayment {
  id: string;
  premiumId: string;
  policyId: string;
  policyTitle: string;
  amountPaid: number;
  paymentDate: string;
  paymentMethod: string;
  receiptUrl?: string;
  status: 'success' | 'processing' | 'failed';
}

export interface InsuranceClaim {
  id: string;
  claimNumber: string;
  policyId: string;
  policyTitle: string;
  category: InsuranceCategoryType;
  claimDate: string;
  incidentDate: string;
  insuredMemberName: string;
  claimedAmount: number;
  approvedAmount?: number;
  status: ClaimStatusType;
  timeline: {
    status: ClaimStatusType;
    date: string;
    notes: string;
  }[];
  documents: {
    id: string;
    name: string;
    url: string;
    type: string;
  }[];
  notes?: string;
}

export interface InsuranceDocument {
  id: string;
  policyId?: string;
  policyTitle?: string;
  title: string;
  category: DocumentCategoryType;
  fileUrl?: string;
  fileType?: string;
  uploadDate: string;
  memberName: string;
  notes?: string;
}

export interface CoverageSummary {
  id: string;
  category: InsuranceCategoryType;
  totalLimit: number;
  usedLimit: number;
  remainingLimit: number;
  protectedMembersCount: number;
  activePoliciesCount: number;
  status: 'Optimal' | 'Cukup' | 'Kurang' | 'Kritis';
}

export interface ProtectionScore {
  overallScore: number;
  healthScore: number;
  lifeScore: number;
  propertyScore: number;
  educationScore: number;
  emergencyReadinessScore: number;
  level: 'Sangat Terlindungi' | 'Cukup Terlindungi' | 'Memerlukan Perhatian' | 'Beresiko Tinggi';
  lastEvaluated: string;
  recommendations: string[];
}

export interface InsuranceReport {
  id: string;
  period: string;
  totalAnnualPremium: number;
  totalMonthlyPremium: number;
  activePolicyCount: number;
  totalClaimsSubmitted: number;
  totalClaimsApprovedAmount: number;
  protectionScore: number;
  generatedAt: string;
}

export interface InsuranceReminder {
  id: string;
  title: string;
  type: 'Premi' | 'Perpanjangan Polis' | 'Dokumen' | 'Review Tahunan' | 'Medical Check-up';
  dueDate: string;
  priority: 'Tinggi' | 'Sedang' | 'Biasa';
  isCompleted: boolean;
  policyTitle?: string;
  notes?: string;
}

export interface PolicyAnalysis {
  policyId: string;
  policyTitle: string;
  explanation: string;
  coverageGaps: string[];
  actionableRecommendations: string[];
  disclaimer: string;
}

// ==========================================
// 🛒 AI SHOPPING, INVENTORY & SMART HOUSEHOLD TYPES
// ==========================================

export type ShoppingPriority = 'Tinggi' | 'Sedang' | 'Biasa' | 'Mendesak';
export type ShoppingStatus = 'pending' | 'completed' | 'cancelled';
export type RecurringFrequency = 'Harian' | 'Mingguan' | 'Bulanan' | 'Tahunan';

export interface ShoppingCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description?: string;
  isCustom?: boolean;
}

export interface ShoppingBudget {
  id: string;
  period: string;
  monthlyBudget: number;
  realizedExpense: number;
  remainingBudget: number;
  categoryBudgets: {
    categoryName: string;
    allocated: number;
    spent: number;
  }[];
  updatedAt: string;
}

export interface ShoppingHistory {
  id: string;
  shoppingDate: string;
  storeName: string;
  totalAmount: number;
  itemCount: number;
  items: {
    name: string;
    quantity: string;
    price: number;
    category: string;
  }[];
  paidByMemberName: string;
  receiptPhotoUrl?: string;
  notes?: string;
}

export interface InventoryLocation {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  itemCount?: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  locationId: string;
  locationName: string;
  quantity: number;
  unit: string;
  minStock: number;
  purchaseDate: string;
  expirationDate: string;
  barcode: string;
  qrCode: string;
  photoUrl?: string;
  pricePerUnit?: number;
  notes?: string;
  updatedAt: string;
}

export interface ExpirationItem {
  id: string;
  inventoryItemId: string;
  name: string;
  category: 'Makanan' | 'Minuman' | 'Obat' | 'Kosmetik' | 'Produk Bayi' | string;
  expirationDate: string;
  daysRemaining: number;
  status: 'Aman' | 'Mendekati Kedaluwarsa' | 'Kedaluwarsa';
  locationName: string;
  quantity: string;
}

export interface HouseholdRoom {
  id: string;
  name: string;
  floorLevel?: string;
  assetCount?: number;
  icon?: string;
}

export interface HouseholdAsset {
  id: string;
  name: string;
  category: 'TV' | 'AC' | 'Kulkas' | 'Mesin Cuci' | 'Komputer' | 'Laptop' | 'Furniture' | 'Peralatan Dapur' | 'Peralatan' | 'Elektronik' | string;
  roomId: string;
  roomName: string;
  brandModel: string;
  serialNumber?: string;
  purchaseDate: string;
  purchasePrice: number;
  warrantyExpiryDate?: string;
  manualBookUrl?: string;
  receiptPhotoUrl?: string;
  status: 'Baik' | 'Perlu Service' | 'Rusak' | 'Garansi Klaim';
  notes?: string;
}

export interface HouseholdTask {
  id: string;
  title: string;
  category: string;
  assignedMemberId: string;
  assignedMemberName: string;
  assignedMemberAvatar?: string;
  frequency: 'Harian' | 'Mingguan' | 'Bulanan' | 'Insidental';
  dueDate: string;
  completed: boolean;
  priority: 'Tinggi' | 'Sedang' | 'Rendah';
  notes?: string;
  checklist?: { id: string; text: string; done: boolean }[];
}

export interface FavoriteStore {
  id: string;
  name: string;
  address: string;
  contact: string;
  category: string;
  rating?: number;
  notes?: string;
  operatingHours?: string;
  favoriteItems?: string[];
}

export interface PriceHistory {
  id: string;
  itemName: string;
  price: number;
  date: string;
  storeName: string;
  notes?: string;
}

export interface ShoppingRecommendation {
  id: string;
  title: string;
  category: 'Belanja Mingguan' | 'Belanja Bulanan' | 'Belanja Hemat' | 'Belanja Sehat' | 'Belanja Berdasarkan Riwayat';
  suggestedItems: {
    name: string;
    qty: string;
    estPrice: number;
    reason: string;
  }[];
  description: string;
  potentialSavings?: number;
}

export interface ShoppingReport {
  id: string;
  period: string;
  totalSpent: number;
  budgetAllocated: number;
  savings: number;
  topCategories: { category: string; amount: number; percentage: number }[];
  expiredItemsCount: number;
  usedItemsCount: number;
  lowStockItemsCount: number;
  insightsSummary: string[];
}

export interface ShoppingNotification {
  id: string;
  title: string;
  message: string;
  type: 'Belanja' | 'Barang Habis' | 'Barang Kedaluwarsa' | 'Garansi Berakhir';
  date: string;
  isRead: boolean;
  priority: 'Urgent' | 'Info' | 'Warning';
}

export * from './types/meal';
export * from './types/smarthome';
export * from './types/memories';



