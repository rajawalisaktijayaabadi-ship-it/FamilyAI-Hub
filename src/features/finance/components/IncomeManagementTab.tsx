import React, { useState } from 'react';
import { TrendingUp, Plus, Trash2, Filter, DollarSign, Calendar, User, FileText } from 'lucide-react';
import { useFinanceStore } from '../../../store/useFinanceStore';
import { FamilyMember } from '../../../types';

interface IncomeManagementTabProps {
  familyMembers: FamilyMember[];
}

export const IncomeManagementTab: React.FC<IncomeManagementTabProps> = ({ familyMembers }) => {
  const { incomes, addIncome, deleteIncome, selectedMemberId } = useFinanceStore();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState<number>(5000000);
  const [category, setCategory] = useState<'Gaji' | 'Bonus' | 'Usaha' | 'Investasi' | 'Hadiah' | 'Pendapatan Lain'>('Gaji');
  const [memberId, setMemberId] = useState(familyMembers[0]?.id || 'm-1');
  const [sourceAccount, setSourceAccount] = useState('Bank Mandiri');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const handleAddIncome = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || amount <= 0) return;

    const selectedMember = familyMembers.find((m) => m.id === memberId);

    addIncome({
      memberId,
      memberName: selectedMember ? selectedMember.name : 'Anggota Keluarga',
      title,
      amount,
      category,
      date,
      sourceAccount,
      notes
    });

    setTitle('');
    setShowAddModal(false);
  };

  const filteredIncomes = incomes.filter((inc) => {
    const matchesMember = selectedMemberId === 'all' || inc.memberId === selectedMemberId;
    const matchesCategory = categoryFilter === 'all' || inc.category === categoryFilter;
    return matchesMember && matchesCategory;
  });

  const totalFilteredAmount = filteredIncomes.reduce((sum, inc) => sum + inc.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header & Filter Row */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span>Manajemen Pemasukan Keluarga</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Catat gaji, dividen, omset usaha, dan hadiah secara transparan.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>Kategori:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent text-emerald-300 font-bold outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900 text-slate-200">Semua Kategori</option>
              <option value="Gaji" className="bg-slate-900 text-slate-200">Gaji</option>
              <option value="Bonus" className="bg-slate-900 text-slate-200">Bonus</option>
              <option value="Usaha" className="bg-slate-900 text-slate-200">Usaha</option>
              <option value="Investasi" className="bg-slate-900 text-slate-200">Investasi</option>
              <option value="Hadiah" className="bg-slate-900 text-slate-200">Hadiah</option>
              <option value="Pendapatan Lain" className="bg-slate-900 text-slate-200">Pendapatan Lain</option>
            </select>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-2xl shadow hover:scale-105 transition-all flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Pemasukan</span>
          </button>
        </div>
      </div>

      {/* Income Summary Banner */}
      <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between">
        <div className="text-xs text-emerald-300 font-medium">
          Total Pemasukan Tercatat ({filteredIncomes.length} Transaksi)
        </div>
        <div className="text-xl font-black text-emerald-400">
          Rp {totalFilteredAmount.toLocaleString('id-ID')}
        </div>
      </div>

      {/* Income List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
        <h4 className="font-bold text-slate-200 text-sm">Riwayat Catatan Pemasukan</h4>

        {filteredIncomes.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">
            Belum ada catatan pemasukan yang sesuai dengan filter.
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredIncomes.map((inc) => (
              <div
                key={inc.id}
                className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-slate-700 transition-all"
              >
                <div className="space-y-1">
                  <div className="font-bold text-slate-200 text-sm flex items-center gap-2">
                    <span>{inc.title}</span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      {inc.category}
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px] flex flex-wrap items-center gap-3">
                    <span>Penerima: <strong className="text-slate-300">{inc.memberName}</strong></span>
                    <span>Rekening: <strong className="text-slate-300">{inc.sourceAccount}</strong></span>
                    <span>Tanggal: <strong className="text-slate-300">{inc.date}</strong></span>
                  </div>
                  {inc.notes && <div className="text-slate-500 text-[11px] italic">"{inc.notes}"</div>}
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="font-mono font-black text-emerald-400 text-base">
                    + Rp {inc.amount.toLocaleString('id-ID')}
                  </div>
                  <button
                    onClick={() => deleteIncome(inc.id)}
                    className="p-2 text-slate-500 hover:text-rose-400 rounded-xl hover:bg-slate-900 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Income Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Tambah Pemasukan Baru</span>
            </h3>

            <form onSubmit={handleAddIncome} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Judul / Keterangan Pemasukan:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="misal: Gaji Bulanan / Dividen / Bonus Katering..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-2.5 text-slate-200 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Nominal (Rp):</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-2.5 text-slate-200 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Kategori:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-2.5 text-slate-200 outline-none"
                  >
                    <option value="Gaji">Gaji</option>
                    <option value="Bonus">Bonus</option>
                    <option value="Usaha">Usaha</option>
                    <option value="Investasi">Investasi</option>
                    <option value="Hadiah">Hadiah</option>
                    <option value="Pendapatan Lain">Pendapatan Lain</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Anggota Keluarga Penerima:</label>
                  <select
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-2.5 text-slate-200 outline-none"
                  >
                    {familyMembers.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.detailedRole || m.roleTitle})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Rekening Masuk:</label>
                  <input
                    type="text"
                    value={sourceAccount}
                    onChange={(e) => setSourceAccount(e.target.value)}
                    placeholder="Bank Mandiri / BCA / Cash"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Tanggal Transaksi:</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-2.5 text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Catatan Tambahan:</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Catatan opsional..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-2.5 text-slate-200 outline-none"
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
                  Simpan Pemasukan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
