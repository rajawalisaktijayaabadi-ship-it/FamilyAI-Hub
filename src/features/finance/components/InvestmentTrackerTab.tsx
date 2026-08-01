import React, { useState } from 'react';
import { PieChart, Plus, Trash2, Edit3, TrendingUp, TrendingDown, Layers, ShieldCheck, AlertCircle } from 'lucide-react';
import { useFinanceStore } from '../../../store/useFinanceStore';
import { FamilyMember } from '../../../types';

interface InvestmentTrackerTabProps {
  familyMembers: FamilyMember[];
}

export const InvestmentTrackerTab: React.FC<InvestmentTrackerTabProps> = ({ familyMembers }) => {
  const { investments, addInvestment, updateInvestmentValue, deleteInvestment } = useFinanceStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedForUpdate, setSelectedForUpdate] = useState<string | null>(null);
  const [updatedValue, setUpdatedValue] = useState<number>(0);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Deposito' | 'Emas' | 'Saham' | 'Obligasi' | 'Reksa Dana' | 'Crypto' | 'Properti' | 'Usaha' | 'Custom'>('Emas');
  const [capitalAmount, setCapitalAmount] = useState<number>(10000000);
  const [currentValue, setCurrentValue] = useState<number>(10000000);
  const [purchaseDate, setPurchaseDate] = useState('2025-01-01');
  const [platform, setPlatform] = useState('Pegadaian Digital');
  const [memberId, setMemberId] = useState(familyMembers[0]?.id || 'm-1');
  const [notes, setNotes] = useState('');

  const handleAddInvestment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || capitalAmount <= 0) return;

    const selectedMember = familyMembers.find((m) => m.id === memberId);

    addInvestment({
      title,
      category,
      capitalAmount,
      currentValue: currentValue || capitalAmount,
      purchaseDate,
      platform,
      memberId,
      memberName: selectedMember ? selectedMember.name : 'Anggota Keluarga',
      notes
    });

    setTitle('');
    setShowAddModal(false);
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedForUpdate) return;
    updateInvestmentValue(selectedForUpdate, updatedValue);
    setSelectedForUpdate(null);
  };

  const totalCapital = investments.reduce((sum, inv) => sum + inv.capitalAmount, 0);
  const totalValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalProfitLoss = totalValue - totalCapital;
  const overallReturnPercent = totalCapital > 0 ? (totalProfitLoss / totalCapital) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <PieChart className="w-5 h-5 text-amber-400" />
            <span>Portofolio & Tracker Investasi Keluarga</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Pantau pertumbuhan emas, saham, deposito, reksa dana, dan obligasi.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black text-xs rounded-2xl shadow hover:scale-105 transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Aset Investasi</span>
        </button>
      </div>

      {/* Portfolio Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1">
          <div className="text-xs text-slate-400 font-medium">Total Nilai Pasar Saat Ini</div>
          <div className="text-2xl font-black text-amber-400">Rp {totalValue.toLocaleString('id-ID')}</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1">
          <div className="text-xs text-slate-400 font-medium">Total Modal Ditanam (Capital)</div>
          <div className="text-2xl font-black text-slate-300">Rp {totalCapital.toLocaleString('id-ID')}</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1">
          <div className="text-xs text-slate-400 font-medium">Total Keuntungan / Kerugian (Return)</div>
          <div className={`text-2xl font-black ${totalProfitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {totalProfitLoss >= 0 ? '+' : ''}Rp {totalProfitLoss.toLocaleString('id-ID')} ({overallReturnPercent.toFixed(2)}%)
          </div>
        </div>
      </div>

      {/* Investment Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {investments.map((inv) => {
          const isGain = inv.profitOrLossAmount >= 0;

          return (
            <div
              key={inv.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-3xl p-5 space-y-3 relative group transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-slate-950 text-amber-400 px-2.5 py-0.5 rounded-full border border-slate-800 font-bold">
                      {inv.category}
                    </span>
                    <span className="text-[10px] text-slate-400">Platform: {inv.platform}</span>
                  </div>
                  <h4 className="font-bold text-white text-base mt-1">{inv.title}</h4>
                  <div className="text-[11px] text-slate-400">
                    Pemilik: {inv.memberName} • Beli: {inv.purchaseDate}
                  </div>
                </div>

                <button
                  onClick={() => deleteInvestment(inv.id)}
                  className="p-1 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Numbers breakdown */}
              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs">
                <div>
                  <div className="text-slate-400 text-[10px]">Nilai Saat Ini:</div>
                  <div className="font-mono font-bold text-slate-200">Rp {inv.currentValue.toLocaleString('id-ID')}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px]">Modal Awal:</div>
                  <div className="font-mono text-slate-400">Rp {inv.capitalAmount.toLocaleString('id-ID')}</div>
                </div>
              </div>

              {/* Profit / Loss Bar */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-400">Profit / Loss:</span>
                <span className={`font-mono font-bold ${isGain ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isGain ? '+' : ''}Rp {inv.profitOrLossAmount.toLocaleString('id-ID')} ({inv.returnPercentage.toFixed(1)}%)
                </span>
              </div>

              {inv.notes && <div className="text-[11px] text-slate-500 italic">"{inv.notes}"</div>}

              {/* Action Update Market Value */}
              <div className="pt-2 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedForUpdate(inv.id);
                    setUpdatedValue(inv.currentValue);
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-xl flex items-center gap-1 transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Update Nilai Pasar</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Update Value */}
      {selectedForUpdate && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-sm space-y-4">
            <h3 className="font-bold text-white text-base">Update Nilai Pasar Aset</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Nilai Terbaru Sekarang (Rp):</label>
                <input
                  type="number"
                  value={updatedValue}
                  onChange={(e) => setUpdatedValue(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedForUpdate(null)}
                  className="flex-1 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Investment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4">
            <h3 className="font-bold text-white text-base">Tambah Aset Investasi Baru</h3>

            <form onSubmit={handleAddInvestment} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Nama Aset Investasi:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="misal: Emas Batangan 10 gram / Saham BBCA"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Kategori:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  >
                    <option value="Emas">Emas Batangan / Tabungan</option>
                    <option value="Saham">Saham (Bursa Efek)</option>
                    <option value="Reksa Dana">Reksa Dana</option>
                    <option value="Deposito">Deposito Bank</option>
                    <option value="Obligasi">Obligasi / SBR / ORI</option>
                    <option value="Crypto">Crypto (Placeholder)</option>
                    <option value="Properti">Properti Sewa / Tanah</option>
                    <option value="Usaha">Usaha / Modal Bisnis</option>
                    <option value="Custom">Custom Investment</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Platform / Broker:</label>
                  <input
                    type="text"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    placeholder="Stockbit / Bibit / Pegadaian"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Modal Ditanam (Rp):</label>
                  <input
                    type="number"
                    value={capitalAmount}
                    onChange={(e) => {
                      setCapitalAmount(Number(e.target.value));
                      if (currentValue === 0) setCurrentValue(Number(e.target.value));
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Nilai Sekarang (Rp):</label>
                  <input
                    type="number"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Tanggal Beli / Mulai:</label>
                  <input
                    type="date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Pemilik Aset:</label>
                  <select
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  >
                    {familyMembers.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.detailedRole || m.roleTitle})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Catatan Tambahan:</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Catatan opsional..."
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
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl"
                >
                  Simpan Aset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
