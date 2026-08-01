import React from 'react';
import {
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Sparkles,
  TrendingUp,
  Plus,
  ArrowRight,
  PackageCheck,
  Tag
} from 'lucide-react';

import { FamilyMember } from '../../../types';
import { useShoppingStore } from '../../../store/useShoppingStore';
import { useInventoryStore } from '../../../store/useInventoryStore';

interface ShoppingDashboardProps {
  familyMembers?: FamilyMember[];
  onNavigateList?: () => void;
}

export const ShoppingDashboard: React.FC<ShoppingDashboardProps> = ({
  familyMembers = [],
  onNavigateList
}) => {
  const { items, budget, getAIShoppingInsights } = useShoppingStore();
  const { getLowStockItems, getNearExpirationItems } = useInventoryStore();

  const pendingItems = items.filter((i) => !i.bought);
  const completedItems = items.filter((i) => i.bought);
  const todayItems = items.filter((i) => i.date === '2026-08-01');

  const lowStockList = getLowStockItems();
  const nearExpList = getNearExpirationItems();

  const totalEstPending = pendingItems.reduce((acc, curr) => acc + curr.estimatedPrice, 0);
  const totalCompleted = completedItems.reduce((acc, curr) => acc + (curr.actualPrice || curr.estimatedPrice), 0);

  const insights = getAIShoppingInsights();

  return (
    <div className="space-y-6">
      
      {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Today's Shopping */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium">Belanja Hari Ini</span>
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-black text-white">{todayItems.length} Item</div>
            <span className="text-[10px] text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
              1 Agustus
            </span>
          </div>
          <p className="text-[11px] text-slate-400 truncate">
            {todayItems.length > 0 ? todayItems.map(i => i.name).join(', ') : 'Tidak ada jadwal belanja hari ini'}
          </p>
        </div>

        {/* Shopping Budget Progress */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium">Anggaran Belanja Bulanan</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-xl font-black text-emerald-400">
              Rp {budget.remainingBudget.toLocaleString('id-ID')}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Sisa dari Rp {budget.monthlyBudget.toLocaleString('id-ID')}
            </div>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (budget.realizedExpense / budget.monthlyBudget) * 100)}%` }}
            />
          </div>
        </div>

        {/* Pending Shopping */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium">Daftar Pending</span>
            <Clock className="w-4 h-4 text-orange-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-amber-400">{pendingItems.length} Item</div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Est. Rp {totalEstPending.toLocaleString('id-ID')}
            </div>
          </div>
          <div className="text-[10px] text-slate-400 flex items-center justify-between">
            <span>Prioritas Mendesak:</span>
            <span className="font-bold text-rose-400">
              {pendingItems.filter(i => i.priority === 'Mendesak').length} Item
            </span>
          </div>
        </div>

        {/* Completed Shopping */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium">Selesai Dibeli</span>
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-cyan-400">{completedItems.length} Item</div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Total Rp {totalCompleted.toLocaleString('id-ID')}
            </div>
          </div>
          <div className="text-[10px] text-slate-400">
            Terakhir update hari ini
          </div>
        </div>

      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: AI Shopping Insight & Urgent Pending Items */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Shopping Insight Card */}
          <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/20 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">AI Shopping Insight</h3>
                  <p className="text-xs text-slate-400">Analisis kebutuhan & estimasi penghematan keluarga</p>
                </div>
              </div>

              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                AI Engine Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {insights.map((insight, idx) => (
                <div key={idx} className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-xs text-slate-200 space-y-1.5 flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold mt-0.5">•</span>
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Shopping Quick Actions */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-amber-400" />
                  <span>Kebutuhan Belanja Aktif (Pending)</span>
                </h3>
                <p className="text-xs text-slate-400">Segera dibeli untuk kebutuhan dapur & rumah</p>
              </div>

              {onNavigateList && (
                <button
                  onClick={onNavigateList}
                  className="flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition-all"
                >
                  <span>Lihat Semua ({pendingItems.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="space-y-2">
              {pendingItems.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs hover:border-amber-500/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-900 text-amber-400 border border-slate-800 font-bold">
                      {item.quantity} {item.unit}
                    </div>
                    <div>
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{item.name}</span>
                        {item.priority === 'Mendesak' && (
                          <span className="px-2 py-0.5 text-[9px] font-black rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            Mendesak
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2">
                        <span>{item.category}</span>
                        <span>• Tgl: {item.date}</span>
                        {item.assignedMemberName && <span>• Ditugaskan: {item.assignedMemberName}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-bold text-amber-400">
                      Rp {item.estimatedPrice.toLocaleString('id-ID')}
                    </div>
                    <div className="text-[10px] text-slate-500">{item.storeName || 'Toko Bebas'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Low Stock Alerts & Shopping Calendar */}
        <div className="space-y-6">
          
          {/* Low Stock Items Warning Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Peringatan Stok Menipis</span>
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold">
                {lowStockList.length} Item
              </span>
            </div>

            <div className="space-y-2">
              {lowStockList.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">Seluruh stok bahan & dapur aman.</p>
              ) : (
                lowStockList.slice(0, 3).map((item) => (
                  <div key={item.id} className="p-3 bg-slate-950 rounded-xl border border-rose-500/20 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{item.name}</div>
                      <div className="text-[10px] text-slate-400">{item.locationName}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-rose-400">{item.quantity} {item.unit}</div>
                      <div className="text-[9px] text-slate-500">Min: {item.minStock}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Near Expiration Alert Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>Segera Kedaluwarsa</span>
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-bold">
                {nearExpList.length} Item
              </span>
            </div>

            <div className="space-y-2">
              {nearExpList.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">Tidak ada barang mendekati kedaluwarsa.</p>
              ) : (
                nearExpList.slice(0, 3).map((exp) => (
                  <div key={exp.id} className="p-3 bg-slate-950 rounded-xl border border-orange-500/20 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{exp.name}</div>
                      <div className="text-[10px] text-slate-400">{exp.locationName}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-orange-400">{exp.daysRemaining} Hari Lagi</div>
                      <div className="text-[9px] text-slate-500">{exp.expirationDate}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Monthly Shopping Budget Quick Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Ringkasan Anggaran Belanja</span>
            </h3>
            <div className="space-y-2 text-xs">
              {budget.categoryBudgets.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>{cat.categoryName}</span>
                    <span className="font-mono text-slate-400">
                      Rp {cat.spent.toLocaleString('id-ID')} / Rp {cat.allocated.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-1 overflow-hidden">
                    <div
                      className="bg-amber-500 h-1 rounded-full"
                      style={{ width: `${Math.min(100, (cat.spent / cat.allocated) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
