import React, { useState } from 'react';
import {
  Store,
  MapPin,
  Tag,
  Plus,
  Search,
  ExternalLink,
  DollarSign,
  TrendingUp,
  X
} from 'lucide-react';

import { useShoppingStore } from '../../../store/useShoppingStore';

export const FavoriteStoresManager: React.FC = () => {
  const { favoriteStores } = useShoppingStore();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredStores = favoriteStores.filter((store) =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (store.location || store.address || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Search Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Store className="w-5 h-5 text-amber-400" />
            <span>Daftar Toko Favorit & Perbandingan Harga</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Daftar toko langganan keluarga, lokasi terdekat, promo rutin, dan riwayat harga barang.
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari toko favorit..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-200 outline-none"
          />
        </div>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStores.map((store) => (
          <div
            key={store.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 space-y-4 shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-bold text-white text-base">{store.name}</h3>
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{store.location} ({store.distance})</span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-bold">
                Toko Langganan
              </span>
            </div>

            {/* Best categories & promos */}
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 font-medium block mb-1">Kategori Terbaik:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(store.bestCategories || []).map((cat, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-800 text-[10px]">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {store.promoSchedule && (
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Jadwal Promo & Diskon:</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">{store.promoSchedule}</p>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
