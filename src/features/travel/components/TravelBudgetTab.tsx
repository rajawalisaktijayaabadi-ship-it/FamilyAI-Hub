import React, { useState } from 'react';
import { 
  DollarSign, 
  Plus, 
  Trash2, 
  PieChart, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Wallet,
  X
} from 'lucide-react';
import { useTravelStore } from '../../../stores/useTravelStore';
import { BudgetCategory } from '../../../types/travel';

export const budgetCategoryList: BudgetCategory[] = [
  'Transportasi',
  'Hotel',
  'Makan',
  'Belanja',
  'Tiket Wisata',
  'Asuransi',
  'Cadangan'
];

export const TravelBudgetTab: React.FC = () => {
  const { 
    trips, 
    activeTripId, 
    budgets, 
    addBudgetItem, 
    deleteBudgetItem 
  } = useTravelStore();

  const activeTrip = trips.find(t => t.id === activeTripId) || trips[0];
  const activeBudgets = budgets.filter(b => b.tripId === activeTrip?.id);

  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form state
  const [category, setCategory] = useState<BudgetCategory>('Transportasi');
  const [estimatedCost, setEstimatedCost] = useState<number>(1000000);
  const [actualCost, setActualCost] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');

  const totalEstimated = activeBudgets.reduce((acc, b) => acc + b.estimatedCostIdr, 0);
  const totalActual = activeBudgets.reduce((acc, b) => acc + b.actualCostIdr, 0);
  const totalRemaining = totalEstimated - totalActual;
  const isOverBudget = totalActual > totalEstimated;

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTrip) return;

    addBudgetItem({
      tripId: activeTrip.id,
      category,
      estimatedCostIdr: estimatedCost,
      actualCostIdr: actualCost,
      notes
    });

    setNotes('');
    setEstimatedCost(1000000);
    setActualCost(0);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl">
        <div>
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
            Finance Integrated Travel Budgeting
          </span>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-0.5">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <span>Anggaran Perjalanan: {activeTrip?.name || 'Pilih Trip'}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Pantau estimasi dan realisasi biaya tiket, hotel, konsumsi, tempat wisata, hingga asuransi.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-2xl transition-all shadow-lg flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pos Anggaran</span>
        </button>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Total Estimasi Anggaran</span>
          <div className="text-2xl font-black text-white">
            Rp {totalEstimated.toLocaleString('id-ID')}
          </div>
          <span className="text-[10px] text-indigo-400">Target Batas Atas Dana</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Realisasi Pengeluaran Saat Ini</span>
          <div className="text-2xl font-black text-amber-400">
            Rp {totalActual.toLocaleString('id-ID')}
          </div>
          <span className="text-[10px] text-slate-400">
            {totalEstimated > 0 ? Math.round((totalActual / totalEstimated) * 100) : 0}% terpakai
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Sisa Sisa Dana Alokasi</span>
          <div className={`text-2xl font-black ${isOverBudget ? 'text-rose-400' : 'text-emerald-400'}`}>
            Rp {totalRemaining.toLocaleString('id-ID')}
          </div>
          <span className={`text-[10px] font-bold ${isOverBudget ? 'text-rose-400' : 'text-emerald-400'}`}>
            {isOverBudget ? '⚠️ Melebihi Estimasi' : '✅ Dalam Batas Aman'}
          </span>
        </div>

      </div>

      {/* Budget Breakdown List */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
          <PieChart className="w-4 h-4 text-emerald-400" />
          <span>Rincian Per Pos Anggaran</span>
        </h3>

        <div className="space-y-4">
          {activeBudgets.map((b) => {
            const percent = b.estimatedCostIdr > 0 
              ? Math.min(100, Math.round((b.actualCostIdr / b.estimatedCostIdr) * 100))
              : 0;
            return (
              <div key={b.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase">
                      {b.category}
                    </span>
                    <span className="text-xs text-slate-400">{b.notes}</span>
                  </div>

                  <button
                    onClick={() => deleteBudgetItem(b.id)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold pt-1">
                  <span className="text-slate-400">
                    Realisasi: <strong className="text-white">Rp {b.actualCostIdr.toLocaleString('id-ID')}</strong>
                  </span>
                  <span className="text-slate-400">
                    Estimasi: <strong className="text-emerald-400">Rp {b.estimatedCostIdr.toLocaleString('id-ID')}</strong>
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      percent > 100 ? 'bg-rose-500' : 'bg-emerald-500'
                    }`} 
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}

          {activeBudgets.length === 0 && (
            <p className="text-xs text-slate-500 italic text-center py-6">Belum ada pos anggaran ditambahkan untuk trip ini.</p>
          )}
        </div>
      </div>

      {/* Add Budget Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleAddBudget} className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">Tambah Pos Anggaran</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Kategori Alokasi</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                >
                  {budgetCategoryList.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Estimasi Biaya (Rp)</label>
                  <input
                    type="number"
                    required
                    value={estimatedCost}
                    onChange={(e) => setEstimatedCost(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Realisasi Biaya (Rp)</label>
                  <input
                    type="number"
                    value={actualCost}
                    onChange={(e) => setActualCost(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Keterangan / Catatan</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="mis. Tiket penerbangan PP 4 orang"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl"
            >
              Simpan Pos Anggaran
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
