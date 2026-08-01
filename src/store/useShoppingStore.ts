import { create } from 'zustand';
import {
  ShoppingItem,
  ShoppingCategory,
  ShoppingBudget,
  ShoppingHistory,
  FavoriteStore,
  PriceHistory,
  ShoppingRecommendation,
  ShoppingReport,
  ShoppingNotification,
  ShoppingPriority,
  ShoppingStatus,
  RecurringFrequency
} from '../types';

interface ShoppingState {
  // Collections
  items: ShoppingItem[];
  categories: ShoppingCategory[];
  budget: ShoppingBudget;
  history: ShoppingHistory[];
  favoriteStores: FavoriteStore[];
  priceHistories: PriceHistory[];
  recommendations: ShoppingRecommendation[];
  reports: ShoppingReport[];
  notifications: ShoppingNotification[];

  // Actions - Shopping List
  addItem: (item: Omit<ShoppingItem, 'id' | 'createdAt'>) => void;
  updateItem: (id: string, data: Partial<ShoppingItem>) => void;
  deleteItem: (id: string) => void;
  toggleItemBought: (id: string) => void;
  clearCompletedItems: () => void;

  // Actions - Categories
  addCategory: (category: Omit<ShoppingCategory, 'id'>) => void;

  // Actions - Budget
  updateBudget: (budgetData: Partial<ShoppingBudget>) => void;

  // Actions - History
  addHistory: (record: Omit<ShoppingHistory, 'id'>) => void;

  // Actions - Stores
  addFavoriteStore: (store: Omit<FavoriteStore, 'id'>) => void;
  updateFavoriteStore: (id: string, store: Partial<FavoriteStore>) => void;
  deleteFavoriteStore: (id: string) => void;

  // Actions - Price History
  addPriceHistory: (priceRecord: Omit<PriceHistory, 'id'>) => void;

  // Actions - Notifications
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;

  // Helpers
  getAIShoppingInsights: () => string[];
  getPendingItemsCount: () => number;
  getCompletedItemsCount: () => number;
  getTotalEstimatedPrice: () => number;
}

export const defaultCategoriesList = [
  'Makanan',
  'Minuman',
  'Sayur',
  'Buah',
  'Daging',
  'Ikan',
  'Bumbu',
  'Snack',
  'Susu',
  'Peralatan Rumah',
  'Peralatan Dapur',
  'Elektronik',
  'Obat',
  'Perlengkapan Bayi',
  'Perlengkapan Hewan',
  'Kebersihan',
  'Laundry',
  'ATK',
  'Lainnya'
];

export const useShoppingStore = create<ShoppingState>((set, get) => ({
  categories: defaultCategoriesList.map((cat, idx) => ({
    id: `cat-${idx + 1}`,
    name: cat,
    icon: 'Tag',
    color: 'amber'
  })),

  items: [
    {
      id: 'shop-1',
      name: 'Minyak Goreng 2L',
      category: 'Bumbu',
      quantity: 2,
      unit: 'Pouch',
      estimatedPrice: 38000,
      actualPrice: 37500,
      priority: 'Tinggi',
      notes: 'Merek Bimoli atau Tropical',
      status: 'pending',
      bought: false,
      assignedMemberId: 'mem-1',
      assignedMemberName: 'Budi Santoso (Ayah)',
      addedBy: 'Siti Rahma (Ibu)',
      date: '2026-08-01',
      isRecurring: true,
      recurringFrequency: 'Bulanan',
      storeName: 'Superindo Kebon Jeruk',
      createdAt: '2026-08-01'
    },
    {
      id: 'shop-2',
      name: 'Susu UHT Full Cream 1L',
      category: 'Susu',
      quantity: 4,
      unit: 'Karton',
      estimatedPrice: 72000,
      priority: 'Tinggi',
      notes: 'Untuk konsumsi anak-anak',
      status: 'pending',
      bought: false,
      assignedMemberId: 'mem-2',
      assignedMemberName: 'Siti Rahma (Ibu)',
      addedBy: 'Siti Rahma (Ibu)',
      date: '2026-08-01',
      isRecurring: true,
      recurringFrequency: 'Mingguan',
      storeName: 'Indomaret Point',
      createdAt: '2026-08-01'
    },
    {
      id: 'shop-3',
      name: 'Beras Pandan Wangi 5kg',
      category: 'Makanan',
      quantity: 1,
      unit: 'Karung',
      estimatedPrice: 78000,
      actualPrice: 78000,
      priority: 'Mendesak',
      notes: 'Stok di pantry tinggal 1 hari lagi',
      status: 'completed',
      bought: true,
      assignedMemberId: 'mem-1',
      assignedMemberName: 'Budi Santoso (Ayah)',
      addedBy: 'Siti Rahma (Ibu)',
      date: '2026-07-31',
      isRecurring: true,
      recurringFrequency: 'Bulanan',
      storeName: 'Toko Sembako Berkah',
      createdAt: '2026-07-31'
    },
    {
      id: 'shop-4',
      name: 'Daging Sapi Segar 1kg',
      category: 'Daging',
      quantity: 1,
      unit: 'Kg',
      estimatedPrice: 135000,
      priority: 'Sedang',
      notes: 'Untuk menu rendang akhir pekan',
      status: 'pending',
      bought: false,
      assignedMemberId: 'mem-2',
      assignedMemberName: 'Siti Rahma (Ibu)',
      addedBy: 'Siti Rahma (Ibu)',
      date: '2026-08-02',
      storeName: 'Pasar Tradisional Modern',
      createdAt: '2026-08-01'
    },
    {
      id: 'shop-5',
      name: 'Deterjen Laundry Liquid 1.8L',
      category: 'Laundry',
      quantity: 1,
      unit: 'Botol',
      estimatedPrice: 42000,
      priority: 'Biasa',
      notes: 'Varian Lavender / Ocean Fresh',
      status: 'pending',
      bought: false,
      assignedMemberId: 'mem-1',
      assignedMemberName: 'Budi Santoso (Ayah)',
      addedBy: 'Budi Santoso (Ayah)',
      date: '2026-08-03',
      storeName: 'Superindo Kebon Jeruk',
      createdAt: '2026-08-01'
    }
  ],

  budget: {
    id: 'budget-1',
    period: 'Agustus 2026',
    monthlyBudget: 3500000,
    realizedExpense: 1420000,
    remainingBudget: 2080000,
    categoryBudgets: [
      { categoryName: 'Makanan & Sembako', allocated: 1800000, spent: 780000 },
      { categoryName: 'Sayur, Buah & Daging', allocated: 800000, spent: 320000 },
      { categoryName: 'Kebersihan & Laundry', allocated: 400000, spent: 180000 },
      { categoryName: 'Peralatan & Lainnya', allocated: 500000, spent: 140000 }
    ],
    updatedAt: '2026-08-01'
  },

  history: [
    {
      id: 'hist-1',
      shoppingDate: '2026-07-31',
      storeName: 'Superindo Kebon Jeruk',
      totalAmount: 385000,
      itemCount: 6,
      items: [
        { name: 'Beras 5kg', quantity: '1 Bag', price: 78000, category: 'Makanan' },
        { name: 'Minyak Goreng', quantity: '2L', price: 37500, category: 'Bumbu' },
        { name: 'Telur Ayam 1kg', quantity: '1 Tray', price: 28500, category: 'Makanan' },
        { name: 'Sabun Mandi Pack', quantity: '1 Pack', price: 24000, category: 'Kebersihan' }
      ],
      paidByMemberName: 'Budi Santoso (Ayah)',
      notes: 'Belanja mingguan keluarga'
    }
  ],

  favoriteStores: [
    {
      id: 'store-1',
      name: 'Superindo Kebon Jeruk',
      address: 'Jl. Raya Kebon Jeruk No. 88, Jakarta Barat',
      contact: '021-5321122',
      category: 'Supermarket',
      rating: 4.8,
      operatingHours: '08:00 - 22:00 WIB',
      notes: 'Lengkap untuk sembako, daging segar, dan diskon promo Jumat-Minggu',
      favoriteItems: ['Daging Segar', 'Susu UHT', 'Buah Import']
    },
    {
      id: 'store-2',
      name: 'Pasar Modern BSD',
      address: 'Kawasan BSD City, Tangerang Selatan',
      contact: '0812-9988-7766',
      category: 'Pasar Tradisional Modern',
      rating: 4.9,
      operatingHours: '05:00 - 15:00 WIB',
      notes: 'Tempat langganan beli sayuran segar, ikan laut, dan bumbu dapur',
      favoriteItems: ['Ikan Gurame', 'Sayur Organik', 'Bumbu Halal']
    },
    {
      id: 'store-3',
      name: 'Indomaret Point Resident',
      address: 'Komplek Perumahan Mediterania Block C',
      contact: '0813-1122-3344',
      category: 'Minimarket',
      rating: 4.5,
      operatingHours: '24 Jam',
      notes: 'Untuk belanja darurat susu, roti, galon air, dan pulsa',
      favoriteItems: ['Galon Aqua', 'Susu UHT', 'Roti Tawar']
    }
  ],

  priceHistories: [
    { id: 'ph-1', itemName: 'Minyak Goreng 2L', price: 36000, date: '2026-06-15', storeName: 'Superindo' },
    { id: 'ph-2', itemName: 'Minyak Goreng 2L', price: 37500, date: '2026-07-15', storeName: 'Superindo' },
    { id: 'ph-3', itemName: 'Beras Pandan Wangi 5kg', price: 75000, date: '2026-05-10', storeName: 'Toko Sembako' },
    { id: 'ph-4', itemName: 'Beras Pandan Wangi 5kg', price: 78000, date: '2026-07-31', storeName: 'Toko Sembako' }
  ],

  recommendations: [
    {
      id: 'rec-1',
      title: 'Rekomendasi Belanja Mingguan Hemat',
      category: 'Belanja Mingguan',
      description: 'Daftar kebutuhan pokok pekan ini disesuaikan dengan pola konsumsi dan sisa stok keluarga.',
      potentialSavings: 65000,
      suggestedItems: [
        { name: 'Minyak Goreng 2L', qty: '1 Pouch', estPrice: 37500, reason: 'Harga di Superindo promo potongan Rp 3.000' },
        { name: 'Daging Ayam Broiler 1kg', qty: '2 Ekor', estPrice: 68000, reason: 'Pengganti daging sapi untuk menghemat budget minggu ini' },
        { name: 'Telur Ayam Negeri', qty: '1 Kg', estPrice: 28000, reason: 'Sumber protein utama siap olah cepat' }
      ]
    },
    {
      id: 'rec-2',
      title: 'Rekomendasi Belanja Sehat Keluarga',
      category: 'Belanja Sehat',
      description: 'Bahan pangan nutrisi tinggi untuk menjaga immunitas anak dan kakek.',
      potentialSavings: 30000,
      suggestedItems: [
        { name: 'Brokoli & Wortel Organik', qty: '500g', estPrice: 22000, reason: 'Serat & vitamin A tinggi untuk kesehatan mata' },
        { name: 'Buah Naga & Pisang Cavendish', qty: '2 Kg', estPrice: 35000, reason: 'Camilan sehat rendah gula' }
      ]
    }
  ],

  reports: [
    {
      id: 'rep-1',
      period: 'Agustus 2026',
      totalSpent: 1420000,
      budgetAllocated: 3500000,
      savings: 2080000,
      topCategories: [
        { category: 'Makanan', amount: 780000, percentage: 55 },
        { category: 'Sayur & Daging', amount: 320000, percentage: 22 },
        { category: 'Kebersihan', amount: 180000, percentage: 13 },
        { category: 'Lainnya', amount: 140000, percentage: 10 }
      ],
      expiredItemsCount: 1,
      usedItemsCount: 18,
      lowStockItemsCount: 3,
      insightsSummary: [
        'Pengeluaran belanja makanan menempati 55% total anggaran belanja.',
        'Sisa anggaran belanja bulan ini masih aman sebesar Rp 2.080.000 (59%).',
        'Terdapat 3 barang di stok pantry yang perlu dibeli ulang pekan ini.'
      ]
    }
  ],

  notifications: [
    {
      id: 'notif-1',
      title: 'Barang Hampir Habis: Beras & Minyak',
      message: 'Stok beras diperkirakan habis dalam 2 hari. Segera masukkan ke daftar belanja.',
      type: 'Barang Habis',
      date: '2026-08-01',
      isRead: false,
      priority: 'Urgent'
    },
    {
      id: 'notif-2',
      title: 'Produk Mendekati Kedaluwarsa',
      message: 'Susu UHT di kulkas akan kedaluwarsa pada 2026-08-05.',
      type: 'Barang Kedaluwarsa',
      date: '2026-08-01',
      isRead: false,
      priority: 'Warning'
    }
  ],

  // ACTIONS IMPLEMENTATION
  addItem: (itemData) =>
    set((state) => {
      const newItem: ShoppingItem = {
        ...itemData,
        id: `shop-${Date.now()}`,
        status: itemData.status || 'pending',
        bought: itemData.bought || false,
        createdAt: new Date().toISOString().split('T')[0]
      };
      return { items: [newItem, ...state.items] };
    }),

  updateItem: (id, data) =>
    set((state) => ({
      items: state.items.map((it) => (it.id === id ? { ...it, ...data } : it))
    })),

  deleteItem: (id) =>
    set((state) => ({
      items: state.items.filter((it) => it.id !== id)
    })),

  toggleItemBought: (id) =>
    set((state) => ({
      items: state.items.map((it) => {
        if (it.id === id) {
          const isBoughtNow = !it.bought;
          return {
            ...it,
            bought: isBoughtNow,
            status: isBoughtNow ? 'completed' : 'pending'
          };
        }
        return it;
      })
    })),

  clearCompletedItems: () =>
    set((state) => ({
      items: state.items.filter((it) => !it.bought && it.status !== 'completed')
    })),

  addCategory: (catData) =>
    set((state) => ({
      categories: [...state.categories, { ...catData, id: `cat-${Date.now()}` }]
    })),

  updateBudget: (budgetData) =>
    set((state) => ({
      budget: { ...state.budget, ...budgetData, updatedAt: new Date().toISOString().split('T')[0] }
    })),

  addHistory: (record) =>
    set((state) => ({
      history: [{ ...record, id: `hist-${Date.now()}` }, ...state.history]
    })),

  addFavoriteStore: (storeData) =>
    set((state) => ({
      favoriteStores: [...state.favoriteStores, { ...storeData, id: `store-${Date.now()}` }]
    })),

  updateFavoriteStore: (id, storeData) =>
    set((state) => ({
      favoriteStores: state.favoriteStores.map((s) => (s.id === id ? { ...s, ...storeData } : s))
    })),

  deleteFavoriteStore: (id) =>
    set((state) => ({
      favoriteStores: state.favoriteStores.filter((s) => s.id !== id)
    })),

  addPriceHistory: (priceData) =>
    set((state) => ({
      priceHistories: [{ ...priceData, id: `ph-${Date.now()}` }, ...state.priceHistories]
    })),

  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    })),

  clearNotifications: () => set({ notifications: [] }),

  // HELPERS
  getAIShoppingInsights: () => {
    const { items, budget } = get();
    const pendingItems = items.filter((i) => !i.bought);
    const totalEst = pendingItems.reduce((sum, i) => sum + i.estimatedPrice, 0);

    const insights = [
      `Daftar belanja aktif saat ini berjumlah ${pendingItems.length} item dengan estimasi Rp ${totalEst.toLocaleString('id-ID')}.`,
      `Sisa anggaran belanja bulanan yaitu Rp ${budget.remainingBudget.toLocaleString('id-ID')} dari total Rp ${budget.monthlyBudget.toLocaleString('id-ID')}.`,
      'Stok beras & minyak goreng disarankan dibeli secara bersamaan di Superindo untuk mendapatkan promo diskon bundel paket hemat.',
      'Beberapa obat flu & vitamin di lemari obat mendekati kedaluwarsa bulan depan.'
    ];

    return insights;
  },

  getPendingItemsCount: () => get().items.filter((i) => !i.bought).length,
  getCompletedItemsCount: () => get().items.filter((i) => i.bought).length,
  getTotalEstimatedPrice: () => get().items.reduce((acc, curr) => acc + curr.estimatedPrice, 0)
}));
