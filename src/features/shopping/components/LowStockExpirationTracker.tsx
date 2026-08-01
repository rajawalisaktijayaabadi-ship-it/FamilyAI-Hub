import React, { useState } from 'react';
import {
  AlertTriangle,
  Clock,
  Plus,
  ShoppingCart,
  CheckCircle2,
  Package,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';

import { useInventoryStore } from '../../../store/useInventoryStore';
import { useShoppingStore } from '../../../store/useShoppingStore';

interface LowStockExpirationTrackerProps {
  defaultTab?: 'low_stock' | 'expiration';
}

export const LowStockExpirationTracker: React.FC<LowStockExpirationTrackerProps> = ({
  defaultTab = 'low_stock'
}) => {
  const [activeTab, setActiveTab] = useState<'low_stock' | 'expiration'>(defaultTab);

  const {
    getLowStockItems,
    getOutOfStockItems,
    getExpirationTrackerList,
    getExpiredItems,
    getNearExpirationItems
  } = useInventoryStore();

  const { addItem } = useShoppingStore();

  const lowStockItems = getLowStockItems();
  const outOfStockItems = getOutOfStockItems();
  const expirationList = getExpirationTrackerList();
  const expiredItems = getExpiredItems();
  const nearExpItems = getNearExpirationItems();

  const handleAddStockToShoppingList = (name: string, category: string, unit: string) => {
    addItem({
      name,
      category,
      quantity: 1,
      unit,
      estimatedPrice: 35000,
      priority: 'Tinggi',
      notes: 'Otomatis ditambahkan dari Peringatan Low Stock',
      status: 'pending',
      bought: false,
      addedBy: 'Sistem AI Stok',
      date: new Date().toISOString().split('T')[0],
      storeName: 'Superindo Kebon Jeruk'
    });
    alert(`"${name}" berhasil ditambahkan ke Daftar Belanja!`);
  };

  return (
    <div className="space-y-6">
      
      {/* Tab Selector Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('low_stock')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'low_stock'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-lg'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>1. Low Stock Monitor ({outOfStockItems.length + lowStockItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('expiration')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'expiration'
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-lg'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4 text-orange-400" />
            <span>2. Expiration Tracker ({expiredItems.length + nearExpItems.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: LOW STOCK MONITOR */}
      {activeTab === 'low_stock' && (
        <div className="space-y-6">
          
          {/* Out of stock section */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-500" />
                <h3 className="font-bold text-white text-base">Barang Habis Total (0 Stok)</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
                {outOfStockItems.length} Item
              </span>
            </div>

            {outOfStockItems.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">Tidak ada stok barang yang habis total.</p>
            ) : (
              <div className="space-y-3">
                {outOfStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-slate-950 rounded-2xl border border-rose-500/30 flex items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-white text-sm flex items-center gap-2">
                        <span>{item.name}</span>
                        <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full font-bold">
                          Habis
                        </span>
                      </div>
                      <div className="text-slate-400 text-[11px] flex items-center gap-3">
                        <span>Kategori: {item.category}</span>
                        <span>• Lokasi: {item.locationName}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddStockToShoppingList(item.name, item.category, item.unit)}
                      className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all flex-shrink-0"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>+ Ke Belanja</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Low stock section */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Barang Hampir Habis (Di Bawah Min Stock)</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                {lowStockItems.length} Item
              </span>
            </div>

            {lowStockItems.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">Tidak ada barang yang berada di bawah minimum stock.</p>
            ) : (
              <div className="space-y-3">
                {lowStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-slate-950 rounded-2xl border border-amber-500/30 flex items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-white text-sm flex items-center gap-2">
                        <span>{item.name}</span>
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                          Sisa: {item.quantity} {item.unit}
                        </span>
                      </div>
                      <div className="text-slate-400 text-[11px] flex items-center gap-3">
                        <span>Min Stock: {item.minStock} {item.unit}</span>
                        <span>• Lokasi: {item.locationName}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddStockToShoppingList(item.name, item.category, item.unit)}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl border border-amber-500/30 flex items-center gap-1.5 transition-all flex-shrink-0"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>+ Ke Belanja</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 2: EXPIRATION TRACKER */}
      {activeTab === 'expiration' && (
        <div className="space-y-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-400" />
                  <span>Monitoring Tanggal Kedaluwarsa (Expiration Tracker)</span>
                </h3>
                <p className="text-xs text-slate-400">Pengawasan otomatis untuk Makanan, Minuman, Obat, Kosmetik, & Produk Bayi</p>
              </div>
            </div>

            <div className="space-y-3">
              {expirationList.map((exp) => {
                const isExp = exp.status === 'Kedaluwarsa';
                const isNear = exp.status === 'Mendekati Kedaluwarsa';

                return (
                  <div
                    key={exp.id}
                    className={`p-4 rounded-2xl border flex items-center justify-between gap-4 text-xs transition-all ${
                      isExp
                        ? 'bg-rose-950/20 border-rose-500/40 text-slate-200'
                        : isNear
                        ? 'bg-orange-950/20 border-orange-500/40 text-slate-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-white text-sm flex items-center gap-2">
                        <span>{exp.name}</span>
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                          isExp
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : isNear
                            ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {exp.status}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-400 flex items-center gap-3">
                        <span>Kategori: {exp.category}</span>
                        <span>• Lokasi: {exp.locationName}</span>
                        <span>• Stok: {exp.quantity}</span>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="font-mono font-bold text-sm text-orange-400">
                        {exp.expirationDate}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {exp.daysRemaining < 0
                          ? `Lewat ${Math.abs(exp.daysRemaining)} hari`
                          : `${exp.daysRemaining} Hari Lagi`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
