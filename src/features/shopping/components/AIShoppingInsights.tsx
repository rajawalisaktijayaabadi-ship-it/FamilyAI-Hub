import React, { useState } from 'react';
import {
  Sparkles,
  TrendingDown,
  ShoppingCart,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  DollarSign,
  PackageCheck
} from 'lucide-react';

import { FamilyMember } from '../../../types';
import { useShoppingStore } from '../../../store/useShoppingStore';
import { useInventoryStore } from '../../../store/useInventoryStore';

interface AIShoppingInsightsProps {
  familyMembers?: FamilyMember[];
}

export const AIShoppingInsights: React.FC<AIShoppingInsightsProps> = () => {
  const { getAIShoppingInsights, budget, items } = useShoppingStore();
  const { getLowStockItems, getNearExpirationItems } = useInventoryStore();

  const [loadingAI, setLoadingAI] = useState<boolean>(false);
  const [insights, setInsights] = useState<string[]>(getAIShoppingInsights());

  const lowStockCount = getLowStockItems().length;
  const nearExpCount = getNearExpirationItems().length;

  const handleRefreshAI = () => {
    setLoadingAI(true);
    setTimeout(() => {
      setInsights([
        'Analisis AI: Rekomendasi membeli Beras Pandan Wangi & Minyak Goreng di Superindo Kebon Jeruk untuk menghemat hingga Rp 38.000 dari diskon mingguan.',
        `Ditemukan ${lowStockCount} barang stok kritis di Pantry. Disarankan otomatis menambahkan ke daftar belanja sebelum akhir pekan.`,
        `Terdapat ${nearExpCount} produk mendekati kedaluwarsa. Gunakan Susu UHT & Keju Cheddar untuk menu sarapan besok pagi.`,
        'Estimasi efisiensi anggaran belanja bulan ini mencapai 92%. Pengeluaran terkendali dalam batas aman keuangan keluarga.'
      ]);
      setLoadingAI(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      
      {/* Top AI Card Banner */}
      <div className="bg-gradient-to-br from-amber-950/80 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-6 text-white space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-2xl text-amber-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">AI Smart Shopping Assistant & Insight</h2>
              <p className="text-xs text-slate-300">
                Rekomendasi otomatis berbasis AI Core (Siap Diintegrasikan dengan Gemini API)
              </p>
            </div>
          </div>

          <button
            onClick={handleRefreshAI}
            disabled={loadingAI}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-2xl shadow-lg flex items-center gap-2 transition-all self-start sm:self-auto"
          >
            <RefreshCw className={`w-4 h-4 ${loadingAI ? 'animate-spin' : ''}`} />
            <span>{loadingAI ? 'Menganalisis...' : 'Jalankan Analisis AI'}</span>
          </button>
        </div>

        {/* AI Insight Bullet Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 relative z-10">
          {insights.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-200"
            >
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Lightbulb className="w-4 h-4" />
                <span>Rekomendasi Cerdas #{idx + 1}</span>
              </div>
              <p className="leading-relaxed text-slate-300">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Saving Potential & Budget Efficiency Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Potensi Penghematan AI</span>
            <TrendingDown className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">Rp 65.000 / Bulan</div>
          <p className="text-[11px] text-slate-400">
            Didapat dari rekomendasi toko dengan harga termurah & belanja saat periode diskon.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Efisiensi Anggaran</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">
            {Math.round(((budget.monthlyBudget - budget.realizedExpense) / budget.monthlyBudget) * 100)}%
          </div>
          <p className="text-[11px] text-slate-400">
            Sisa anggaran teralokasi dengan aman sesuai proyeksi pengeluaran bulanan.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Cegah Waste Kedaluwarsa</span>
            <PackageCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-400">100% Terawasi</div>
          <p className="text-[11px] text-slate-400">
            Pengingat stok otomatis mencegah makanan terbuang akibat lupa tanggal exp.
          </p>
        </div>

      </div>

    </div>
  );
};
