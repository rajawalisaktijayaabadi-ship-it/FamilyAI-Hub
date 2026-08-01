import React, { useState } from 'react';
import { Target, Plus, Trash2, AlertTriangle, CheckCircle2, Sliders } from 'lucide-react';
import { useFinanceStore } from '../../../store/useFinanceStore';

export const BudgetPlannerTab: React.FC = () => {
  const { budgets, addBudget, updateBudget, deleteBudget } = useFinanceStore();

  const [periodFilter, setPeriodFilter] = useState<'Bulanan' | 'Mingguan' | 'Harian' | 'Tahunan'>('Bulanan');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Makanan');
  const [targetAmount, setTargetAmount] = useState<number>(3000000);
  const [period, setPeriod] = useState<'Bulanan' | 'Mingguan' | 'Harian' | 'Tahunan'>('Bulanan');
  const [alertsThresholdPercent, setAlertsThresholdPercent] = useState<number>(80);

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || targetAmount <= 0) return;

    addBudget({
      title,
      period,
      category,
      targetAmount,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-08-31',
      alertsThresholdPercent
    });

    setTitle('');
    setShowAddModal(false);
  };

  const filteredBudgets = budgets.filter((b) => b.period === periodFilter);

  const totalTarget = filteredBudgets.reduce((sum, b) => sum + b.targetAmount, 0);
  const totalRealized = filteredBudgets.reduce((sum, b) => sum + b.realizedAmount, 0);
  const totalRemaining = totalTarget - totalRealized;

  return (
    <div className="space-y-6">
      {/* Header & Period Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-400" />
            <span>Anggaran Keuangan (Budget Planner)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Alokasikan batas pengeluaran per pos untuk menjaga disiplin finansial.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-bold">
            {(['Bulanan', 'Mingguan', 'Harian', 'Tahunan'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriodFilter(p)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  periodFilter === p ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-2xl shadow hover:scale-105 transition-all flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Pos Anggaran</span>
          </button>
        </div>
      </div>

      {/* Budget Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1">
          <div className="text-xs text-slate-400 font-medium">Total Batas Anggaran ({periodFilter})</div>
          <div className="text-2xl font-black text-emerald-400">Rp {totalTarget.toLocaleString('id-ID')}</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1">
          <div className="text-xs text-slate-400 font-medium">Realisasi Terpakai Saat Ini</div>
          <div className="text-2xl font-black text-amber-400">Rp {totalRealized.toLocaleString('id-ID')}</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1">
          <div className="text-xs text-slate-400 font-medium">Sisa Sisa Anggaran Aman</div>
          <div className={`text-2xl font-black ${totalRemaining >= 0 ? 'text-teal-400' : 'text-rose-400'}`}>
            Rp {totalRemaining.toLocaleString('id-ID')}
          </div>
        </div>
      </div>

      {/* Budget Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBudgets.map((b) => {
          const percent = b.targetAmount > 0 ? Math.round((b.realizedAmount / b.targetAmount) * 100) : 0;
          const remaining = b.targetAmount - b.realizedAmount;
          const isWarning = percent >= b.alertsThresholdPercent;
          const isExceeded = percent >= 100;

          return (
            <div
              key={b.id}
              className={`bg-slate-900 border rounded-3xl p-5 space-y-3 relative group transition-all ${
                isExceeded
                  ? 'border-rose-500/60 shadow-rose-950/30'
                  : isWarning
                  ? 'border-amber-500/60 shadow-amber-950/30'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">{b.title}</h4>
                  <div className="text-[11px] text-slate-400">{b.category} • {b.period}</div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono font-black text-xs px-2.5 py-1 rounded-full ${
                      isExceeded
                        ? 'bg-rose-950 text-rose-400 border border-rose-500/30'
                        : isWarning
                        ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {percent}%
                  </span>
                  <button
                    onClick={() => deleteBudget(b.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isExceeded
                        ? 'bg-rose-500'
                        : isWarning
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, percent)}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-400 pt-0.5">
                  <span>Terpakai: <strong className="text-slate-200">Rp {b.realizedAmount.toLocaleString('id-ID')}</strong></span>
                  <span>Target: <strong className="text-slate-200">Rp {b.targetAmount.toLocaleString('id-ID')}</strong></span>
                </div>
              </div>

              {/* Warning Alert Banner */}
              {isWarning && (
                <div
                  className={`p-2.5 rounded-2xl text-[11px] flex items-center gap-2 ${
                    isExceeded
                      ? 'bg-rose-950/60 text-rose-300 border border-rose-500/40'
                      : 'bg-amber-950/60 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>
                    {isExceeded
                      ? 'Peringatan: Anggaran ini telah MELEBIHI batas yang ditentukan!'
                      : `Perhatian: Penggunaan telah mencapai ${percent}% (Batas Alert: ${b.alertsThresholdPercent}%).`}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Budget Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4">
            <h3 className="font-bold text-white text-base">Tambah Pos Anggaran Baru</h3>

            <form onSubmit={handleAddBudget} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Nama Pos Anggaran:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="misal: Anggaran Belanja Dapur Bulanan"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Kategori:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  >
                    <option value="Makanan">Makanan</option>
                    <option value="Transportasi">Transportasi</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="Kesehatan">Kesehatan</option>
                    <option value="Belanja">Belanja</option>
                    <option value="Hiburan">Hiburan</option>
                    <option value="Tagihan">Tagihan</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Periode:</label>
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  >
                    <option value="Bulanan">Bulanan</option>
                    <option value="Mingguan">Mingguan</option>
                    <option value="Harian">Harian</option>
                    <option value="Tahunan">Tahunan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Batas Maksimal Anggaran (Rp):</label>
                <input
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Batas Alert Peringatan (%):</label>
                <input
                  type="number"
                  value={alertsThresholdPercent}
                  onChange={(e) => setAlertsThresholdPercent(Number(e.target.value))}
                  placeholder="80"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl"
                >
                  Simpan Anggaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
