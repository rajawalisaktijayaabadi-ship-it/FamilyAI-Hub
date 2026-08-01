import { create } from 'zustand';
import {
  InventoryItem,
  InventoryLocation,
  ExpirationItem
} from '../types';

interface InventoryState {
  items: InventoryItem[];
  locations: InventoryLocation[];

  // Actions - Inventory Items
  addInventoryItem: (item: Omit<InventoryItem, 'id' | 'updatedAt'>) => void;
  updateInventoryItem: (id: string, data: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;

  // Actions - Locations
  addLocation: (location: Omit<InventoryLocation, 'id'>) => void;
  updateLocation: (id: string, data: Partial<InventoryLocation>) => void;
  deleteLocation: (id: string) => void;

  // Helpers / Monitors
  getLowStockItems: () => InventoryItem[];
  getOutOfStockItems: () => InventoryItem[];
  getExpirationTrackerList: () => ExpirationItem[];
  getExpiredItems: () => ExpirationItem[];
  getNearExpirationItems: () => ExpirationItem[];
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  locations: [
    { id: 'loc-1', name: 'Kulkas - Chiller', description: 'Kulkas utama bagian pendingin biasa', icon: 'Refrigerator' },
    { id: 'loc-2', name: 'Kulkas - Freezer', description: 'Pembeku untuk daging, ikan, dan es', icon: 'Snowflake' },
    { id: 'loc-3', name: 'Pantry Dapur Utama', description: 'Kabinet tempat sembako, bumbu, dan makanan kering', icon: 'Archive' },
    { id: 'loc-4', name: 'Lemari Obat & P3K', description: 'Kotak obat keluarga, vitamin, dan antiseptik', icon: 'Cross' },
    { id: 'loc-5', name: 'Kabinet Kebersihan & Laundry', description: 'Rak sabun, deterjen, dan cairan pembersih', icon: 'Package' }
  ],

  items: [
    {
      id: 'inv-1',
      name: 'Beras Pandan Wangi',
      category: 'Makanan',
      locationId: 'loc-3',
      locationName: 'Pantry Dapur Utama',
      quantity: 1,
      unit: 'Karung 5kg',
      minStock: 2,
      purchaseDate: '2026-07-31',
      expirationDate: '2027-01-31',
      barcode: '8991001002231',
      qrCode: 'QR-INV-BERAS-01',
      photoUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80',
      pricePerUnit: 78000,
      notes: 'Stok beras hampir habis (tinggal 1 karung dari min stock 2 karung)',
      updatedAt: '2026-08-01'
    },
    {
      id: 'inv-2',
      name: 'Minyak Goreng Bimoli',
      category: 'Bumbu',
      locationId: 'loc-3',
      locationName: 'Pantry Dapur Utama',
      quantity: 0,
      unit: 'Pouch 2L',
      minStock: 2,
      purchaseDate: '2026-07-10',
      expirationDate: '2027-06-30',
      barcode: '8992002003342',
      qrCode: 'QR-INV-MINYAK-02',
      photoUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=80',
      pricePerUnit: 38000,
      notes: 'Stok habis total!',
      updatedAt: '2026-08-01'
    },
    {
      id: 'inv-3',
      name: 'Susu UHT Plain Ultra Milk',
      category: 'Susu',
      locationId: 'loc-1',
      locationName: 'Kulkas - Chiller',
      quantity: 3,
      unit: 'Karton 1L',
      minStock: 4,
      purchaseDate: '2026-07-20',
      expirationDate: '2026-08-05', // near expiration!
      barcode: '8993003004453',
      qrCode: 'QR-INV-SUSU-03',
      photoUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&auto=format&fit=crop&q=80',
      pricePerUnit: 18000,
      notes: 'Kedaluwarsa dalam 4 hari!',
      updatedAt: '2026-08-01'
    },
    {
      id: 'inv-4',
      name: 'Sirup Parasetamol Anak',
      category: 'Obat',
      locationId: 'loc-4',
      locationName: 'Lemari Obat & P3K',
      quantity: 1,
      unit: 'Botol',
      minStock: 1,
      purchaseDate: '2025-08-10',
      expirationDate: '2026-07-25', // expired!
      barcode: '8994004005564',
      qrCode: 'QR-INV-OBAT-04',
      photoUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80',
      pricePerUnit: 28000,
      notes: 'Obat sudah kedaluwarsa minggu lalu. Jangan diminum!',
      updatedAt: '2026-08-01'
    },
    {
      id: 'inv-5',
      name: 'Daging Sapi Slice',
      category: 'Daging',
      locationId: 'loc-2',
      locationName: 'Kulkas - Freezer',
      quantity: 2,
      unit: 'Pack 500g',
      minStock: 1,
      purchaseDate: '2026-07-28',
      expirationDate: '2026-09-30',
      barcode: '8995005006675',
      qrCode: 'QR-INV-DAGING-05',
      photoUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&auto=format&fit=crop&q=80',
      pricePerUnit: 65000,
      notes: 'Di freezer suhu -18C',
      updatedAt: '2026-08-01'
    },
    {
      id: 'inv-6',
      name: 'Sabun Mandi Cair Refill',
      category: 'Kebersihan',
      locationId: 'loc-5',
      locationName: 'Kabinet Kebersihan & Laundry',
      quantity: 4,
      unit: 'Pouch 450ml',
      minStock: 2,
      purchaseDate: '2026-07-01',
      expirationDate: '2028-07-01',
      barcode: '8996006007786',
      qrCode: 'QR-INV-SABUN-06',
      photoUrl: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400&auto=format&fit=crop&q=80',
      pricePerUnit: 24000,
      notes: 'Stok aman',
      updatedAt: '2026-08-01'
    }
  ],

  // ACTIONS
  addInventoryItem: (itemData) =>
    set((state) => {
      const newItem: InventoryItem = {
        ...itemData,
        id: `inv-${Date.now()}`,
        barcode: itemData.barcode || `899${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        qrCode: itemData.qrCode || `QR-INV-${Date.now().toString().slice(-6)}`,
        updatedAt: new Date().toISOString().split('T')[0]
      };
      return { items: [newItem, ...state.items] };
    }),

  updateInventoryItem: (id, data) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...data, updatedAt: new Date().toISOString().split('T')[0] } : item
      )
    })),

  deleteInventoryItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id)
    })),

  updateQuantity: (id, delta) =>
    set((state) => ({
      items: state.items.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty, updatedAt: new Date().toISOString().split('T')[0] };
        }
        return item;
      })
    })),

  addLocation: (locData) =>
    set((state) => ({
      locations: [...state.locations, { ...locData, id: `loc-${Date.now()}` }]
    })),

  updateLocation: (id, data) =>
    set((state) => ({
      locations: state.locations.map((loc) => (loc.id === id ? { ...loc, ...data } : loc))
    })),

  deleteLocation: (id) =>
    set((state) => ({
      locations: state.locations.filter((loc) => loc.id !== id)
    })),

  // HELPERS
  getLowStockItems: () => {
    return get().items.filter((i) => i.quantity > 0 && i.quantity <= i.minStock);
  },

  getOutOfStockItems: () => {
    return get().items.filter((i) => i.quantity <= 0);
  },

  getExpirationTrackerList: () => {
    const today = new Date('2026-08-01'); // reference today's date
    return get().items.map((i) => {
      const exp = new Date(i.expirationDate);
      const diffTime = exp.getTime() - today.getTime();
      const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let status: ExpirationItem['status'] = 'Aman';
      if (daysRemaining < 0) {
        status = 'Kedaluwarsa';
      } else if (daysRemaining <= 7) {
        status = 'Mendekati Kedaluwarsa';
      }

      return {
        id: `exp-${i.id}`,
        inventoryItemId: i.id,
        name: i.name,
        category: i.category,
        expirationDate: i.expirationDate,
        daysRemaining,
        status,
        locationName: i.locationName,
        quantity: `${i.quantity} ${i.unit}`
      };
    });
  },

  getExpiredItems: () => {
    return get().getExpirationTrackerList().filter((e) => e.status === 'Kedaluwarsa');
  },

  getNearExpirationItems: () => {
    return get().getExpirationTrackerList().filter((e) => e.status === 'Mendekati Kedaluwarsa');
  }
}));
