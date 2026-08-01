import React from 'react';
import {
  BarChart3,
  DollarSign,
  TrendingUp,
  PieChart,
  ShoppingBag,
  CheckCircle2,
  Calendar
} from 'lucide-react';

import { useShoppingStore } from '../../../store/useShoppingStore';

export const ShoppingReportsView: React.FC = () => {
  const { budget, items } = useShoppingStore();

  const totalSpent = budget.realizedExpense;
  const remaining = budget.remainingBudget;

  return (
    <div className="space-y-6">
      
      {/* Top Banner Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Laporan Belanja & Analisis Anggaran</h2>
              <p className="text-xs text-slate-400">Periode Agustus 2026 • Integrasi dengan Modul AI Finance</p>
            </div>
          </div>

          <span className="px-3 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-full text-xs font-bold">
            Status: Sesuai Proyeksi
          </span>
        </div>

        {/* Big Numbers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400">Total Anggaran Bulanan</div>
            <div className="text-2xl font-black text-white">
              Rp {budget.monthlyBudget.toLocaleString('id-ID')}
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400">Total Realisasi Belanja</div>
            <div className="text-2xl font-black text-emerald-400">
              Rp {totalSpent.toLocaleString('id-ID')}
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <div className="text-[10px] text-slate-400">Sisa Kuota Anggaran</div>
            <div className="text-2xl font-black text-amber-400">
              Rp {remaining.toLocaleString('id-ID')}
            </div>
          </div>

        </div>
      </div>

      {/* Category Breakdown Progress Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <PieChart className="w-5 h-5 text-amber-400" />
          <span>Breakdown Pengeluaran per Kategori</span>
        </h3>

        <div className="space-y-4">
          {budget.categoryBudgets.map((cat, idx) => {
            const pct = Math.min(100, Math.round((cat.spent / cat.allocated) * 100));

            return (
              <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-200">
                  <span className="font-bold text-sm">{cat.categoryName}</span>
                  <div className="font-mono text-slate-300">
                    <span className="font-bold text-emerald-400">Rp {cat.spent.toLocaleString('id-ID')}</span>
                    <span className="text-slate-500"> / Rp {cat.allocated.toLocaleString('id-ID')} ({pct}%)</span>
                  </div>
                </div>

                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
