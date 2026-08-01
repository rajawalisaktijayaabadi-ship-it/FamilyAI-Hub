import React, { useState } from 'react';
import { PiggyBank, Plus, Trash2, ArrowUpRight, ShieldCheck, Plane, Home, Car, GraduationCap, Smartphone, Heart, Sparkles } from 'lucide-react';
import { useFinanceStore } from '../../../store/useFinanceStore';
import { FamilyMember } from '../../../types';

interface SavingGoalTabProps {
  familyMembers: FamilyMember[];
}

export const SavingGoalTab: React.FC<SavingGoalTabProps> = ({ familyMembers }) => {
  const { savingGoals, addSavingGoal, addGoalContribution, deleteSavingGoal } = useFinanceStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedGoalForContribute, setSelectedGoalForContribute] = useState<string | null>(null);
  const [contributionAmount, setContributionAmount] = useState<number>(1000000);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Dana Darurat' | 'Liburan' | 'Rumah' | 'Mobil' | 'Pendidikan' | 'Gadget' | 'Pernikahan' | 'Custom Goal'>('Dana Darurat');
  const [targetAmount, setTargetAmount] = useState<number>(20000000);
  const [deadline, setDeadline] = useState('2026-12-31');
  const [memberId, setMemberId] = useState(familyMembers[0]?.id || 'm-1');
  const [priority, setPriority] = useState<'Rendah' | 'Sedang' | 'Tinggi' | 'Mendesak'>('Tinggi');
  const [notes, setNotes] = useState('');

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || targetAmount <= 0) return;

    const selectedMember = familyMembers.find((m) => m.id === memberId);

    addSavingGoal({
      title,
      category,
      targetAmount,
      deadline,
      memberId,
      memberName: selectedMember ? selectedMember.name : 'Anggota Keluarga',
      priority,
      icon: category === 'Dana Darurat' ? 'ShieldCheck' : category === 'Liburan' ? 'Plane' : 'PiggyBank',
      notes
    });

    setTitle('');
    setShowAddModal(false);
  };

  const handleContributeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGoalForContribute || contributionAmount <= 0) return;

    addGoalContribution(selectedGoalForContribute, contributionAmount);
    setSelectedGoalForContribute(null);
  };

  const totalTarget = savingGoals.reduce((sum, sg) => sum + sg.targetAmount, 0);
  const totalCurrent = savingGoals.reduce((sum, sg) => sum + sg.currentAmount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-amber-400" />
            <span>Target Tabungan & Dana Darurat Keluarga</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Wujudkan impian keluarga, rumah, mobil, liburan & dana darurat aman.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs rounded-2xl shadow hover:scale-105 transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Target Baru</span>
        </button>
      </div>

      {/* Progress Overall Banner */}
      <div className="bg-gradient-to-r from-amber-950/60 to-slate-900 border border-amber-500/30 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-amber-300">Total Akumulasi Tabungan Keluarga</div>
          <div className="text-2xl font-black text-amber-400 mt-1">
            Rp {totalCurrent.toLocaleString('id-ID')} <span className="text-xs text-slate-400 font-normal">/ Rp {totalTarget.toLocaleString('id-ID')}</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-400">Pencapaian Keseluruhan</div>
          <div className="text-2xl font-black text-white">
            {totalTarget > 0 ? Math.round((totalCurrent / totalTarget) * 100) : 0}%
          </div>
        </div>
      </div>

      {/* Saving Goal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savingGoals.map((sg) => {
          const percent = sg.targetAmount > 0 ? Math.round((sg.currentAmount / sg.targetAmount) * 100) : 0;
          const isCompleted = sg.status === 'completed' || percent >= 100;

          return (
            <div
              key={sg.id}
              className={`bg-slate-900 border rounded-3xl p-5 space-y-4 relative group hover:border-amber-500/50 transition-all ${
                isCompleted ? 'border-emerald-500/60 shadow-emerald-950/20' : 'border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] bg-slate-950 text-amber-400 px-2.5 py-0.5 rounded-full border border-slate-800 font-bold">
                    {sg.category}
                  </span>
                  <h4 className="font-bold text-white text-base mt-2">{sg.title}</h4>
                  <div className="text-[11px] text-slate-400">
                    Oleh: {sg.memberName} • Batas: <strong className="text-amber-300">{sg.deadline}</strong>
                  </div>
                </div>

                <button
                  onClick={() => deleteSavingGoal(sg.id)}
                  className="p-1 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-amber-400">Rp {sg.currentAmount.toLocaleString('id-ID')}</span>
                  <span className="text-slate-400">{percent}%</span>
                </div>

                <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCompleted ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-yellow-400'
                    }`}
                    style={{ width: `${Math.min(100, percent)}%` }}
                  />
                </div>

                <div className="text-[11px] text-slate-400 text-right">
                  Target: Rp {sg.targetAmount.toLocaleString('id-ID')}
                </div>
              </div>

              {/* Contribute Action */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  sg.priority === 'Mendesak' ? 'bg-rose-950 text-rose-400' : 'bg-slate-950 text-slate-300'
                }`}>
                  Prioritas: {sg.priority}
                </span>

                <button
                  onClick={() => setSelectedGoalForContribute(sg.id)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow transition-all flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Setor Tabungan</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contribute Modal */}
      {selectedGoalForContribute && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-sm space-y-4">
            <h3 className="font-bold text-white text-base">Setor / Tambah Tabungan</h3>
            <form onSubmit={handleContributeSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Nominal Setoran (Rp):</label>
                <input
                  type="number"
                  value={contributionAmount}
                  onChange={(e) => setContributionAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedGoalForContribute(null)}
                  className="flex-1 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl"
                >
                  Konfirmasi Setoran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4">
            <h3 className="font-bold text-white text-base">Buat Target Tabungan Baru</h3>

            <form onSubmit={handleAddGoal} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Nama Target Tabungan:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="misal: Renovasi Dapur / Mobil Baru / Umrah"
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
                    <option value="Dana Darurat">Dana Darurat</option>
                    <option value="Liburan">Liburan</option>
                    <option value="Rumah">Rumah</option>
                    <option value="Mobil">Mobil</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="Gadget">Gadget</option>
                    <option value="Pernikahan">Pernikahan</option>
                    <option value="Custom Goal">Custom Goal</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Prioritas:</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  >
                    <option value="Mendesak">Mendesak</option>
                    <option value="Tinggi">Tinggi</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Rendah">Rendah</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Target Nominal (Rp):</label>
                <input
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Target Tanggal Selesai:</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Penanggung Jawab:</label>
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
                  Simpan Target
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
