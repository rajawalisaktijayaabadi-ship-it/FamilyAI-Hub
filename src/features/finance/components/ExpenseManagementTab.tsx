import React, { useState } from 'react';
import { TrendingDown, Plus, Trash2, Filter, CreditCard, Tag, RefreshCw } from 'lucide-react';
import { useFinanceStore } from '../../../store/useFinanceStore';
import { FamilyMember } from '../../../types';

interface ExpenseManagementTabProps {
  familyMembers: FamilyMember[];
}

export const ExpenseManagementTab: React.FC<ExpenseManagementTabProps> = ({ familyMembers }) => {
  const { expenses, addExpense, deleteExpense, selectedMemberId } = useFinanceStore();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState<number>(250000);
  const [category, setCategory] = useState<
    'Makanan' | 'Transportasi' | 'Pendidikan' | 'Kesehatan' | 'Belanja' | 'Hiburan' | 'Asuransi' | 'Tagihan' | 'Pajak' | 'Investasi' | 'Donasi' | 'Kategori Custom'
  >('Makanan');
  const [memberId, setMemberId] = useState(familyMembers[0]?.id || 'm-1');
  const [paymentMethod, setPaymentMethod] = useState('Transfer Bank');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [notes, setNotes] = useState('');

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || amount <= 0) return;

    const selectedMember = familyMembers.find((m) => m.id === memberId);

    addExpense({
      memberId,
      memberName: selectedMember ? selectedMember.name : 'Anggota Keluarga',
      title,
      amount,
      category,
      date,
      paymentMethod,
      isRecurring,
      notes
    });

    setTitle('');
    setShowAddModal(false);
  };

  const filteredExpenses = expenses.filter((exp) => {
    const matchesMember = selectedMemberId === 'all' || exp.memberId === selectedMemberId;
    const matchesCategory = categoryFilter === 'all' || exp.category === categoryFilter;
    return matchesMember && matchesCategory;
  });

  const totalFilteredAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header & Filter Row */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-rose-400" />
            <span>Manajemen Pengeluaran Keluarga</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Catat pos belanja, tagihan, transportasi, kesehatan, dan donasi.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5 text-rose-400" />
            <span>Kategori:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent text-rose-300 font-bold outline-none cursor-pointer text-xs"
            >
              <option value="all" className="bg-slate-900 text-slate-200">Semua Kategori</option>
              <option value="Makanan" className="bg-slate-900 text-slate-200">Makanan & Groceries</option>
              <option value="Transportasi" className="bg-slate-900 text-slate-200">Transportasi & BBM</option>
              <option value="Pendidikan" className="bg-slate-900 text-slate-200">Pendidikan & Sekolah</option>
              <option value="Kesehatan" className="bg-slate-900 text-slate-200">Kesehatan & Obat</option>
              <option value="Belanja" className="bg-slate-900 text-slate-200">Belanja & Fashion</option>
              <option value="Hiburan" className="bg-slate-900 text-slate-200">Hiburan & Rekreasi</option>
              <option value="Asuransi" className="bg-slate-900 text-slate-200">Asuransi</option>
              <option value="Tagihan" className="bg-slate-900 text-slate-200">Tagihan & Listrik</option>
              <option value="Pajak" className="bg-slate-900 text-slate-200">Pajak</option>
              <option value="Investasi" className="bg-slate-900 text-slate-200">Investasi / Tabungan</option>
              <option value="Donasi" className="bg-slate-900 text-slate-200">Donasi & Zakat</option>
            </select>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs rounded-2xl shadow hover:scale-105 transition-all flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Catat Pengeluaran</span>
          </button>
        </div>
      </div>

      {/* Expense Summary Banner */}
      <div className="bg-rose-950/40 border border-rose-500/30 rounded-2xl p-4 flex items-center justify-between">
        <div className="text-xs text-rose-300 font-medium">
          Total Pengeluaran Tercatat ({filteredExpenses.length} Transaksi)
        </div>
        <div className="text-xl font-black text-rose-400">
          Rp {totalFilteredAmount.toLocaleString('id-ID')}
        </div>
      </div>

      {/* Expense List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
        <h4 className="font-bold text-slate-200 text-sm">Riwayat Catatan Pengeluaran</h4>

        {filteredExpenses.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">
            Belum ada catatan pengeluaran yang sesuai dengan filter.
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredExpenses.map((exp) => (
              <div
                key={exp.id}
                className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-slate-700 transition-all"
              >
                <div className="space-y-1">
                  <div className="font-bold text-slate-200 text-sm flex items-center gap-2">
                    <span>{exp.title}</span>
                    <span className="text-[10px] bg-rose-950 text-rose-400 px-2 py-0.5 rounded-full border border-rose-500/30">
                      {exp.category}
                    </span>
                    {exp.isRecurring && (
                      <span className="text-[10px] bg-indigo-950 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/30 flex items-center gap-1">
                        <RefreshCw className="w-2.5 h-2.5" /> Rutin
                      </span>
                    )}
                  </div>
                  <div className="text-slate-400 text-[11px] flex flex-wrap items-center gap-3">
                    <span>Oleh: <strong className="text-slate-300">{exp.memberName}</strong></span>
                    <span>Metode: <strong className="text-slate-300">{exp.paymentMethod}</strong></span>
                    <span>Tanggal: <strong className="text-slate-300">{exp.date}</strong></span>
                  </div>
                  {exp.notes && <div className="text-slate-500 text-[11px] italic">"{exp.notes}"</div>}
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="font-mono font-black text-rose-400 text-base">
                    - Rp {exp.amount.toLocaleString('id-ID')}
                  </div>
                  <button
                    onClick={() => deleteExpense(exp.id)}
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

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Plus className="w-4 h-4 text-rose-400" />
              <span>Tambah Pengeluaran Baru</span>
            </h3>

            <form onSubmit={handleAddExpense} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Judul Pengeluaran / Barang:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="misal: Belanja Sayur / Bensin Pertamax / Token PLN..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl p-2.5 text-slate-200 outline-none"
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
                    className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl p-2.5 text-slate-200 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Kategori Pos:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl p-2.5 text-slate-200 outline-none"
                  >
                    <option value="Makanan">Makanan & Groceries</option>
                    <option value="Transportasi">Transportasi & BBM</option>
                    <option value="Pendidikan">Pendidikan & Sekolah</option>
                    <option value="Kesehatan">Kesehatan & Obat</option>
                    <option value="Belanja">Belanja & Fashion</option>
                    <option value="Hiburan">Hiburan & Rekreasi</option>
                    <option value="Asuransi">Asuransi</option>
                    <option value="Tagihan">Tagihan & Utilitas</option>
                    <option value="Pajak">Pajak</option>
                    <option value="Investasi">Investasi / Tabungan</option>
                    <option value="Donasi">Donasi & Zakat</option>
                    <option value="Kategori Custom">Kategori Custom</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Anggota Keluarga Pembayar:</label>
                  <select
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl p-2.5 text-slate-200 outline-none"
                  >
                    {familyMembers.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.detailedRole || m.roleTitle})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Metode Pembayaran:</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl p-2.5 text-slate-200 outline-none"
                  >
                    <option value="Transfer Bank (Bank Mandiri)">Transfer Bank (Bank Mandiri)</option>
                    <option value="Transfer Bank (BCA)">Transfer Bank (BCA)</option>
                    <option value="Gopay">Gopay</option>
                    <option value="OVO">OVO</option>
                    <option value="Kartu Kredit BCA">Kartu Kredit BCA</option>
                    <option value="Tunai / Cash">Tunai / Cash</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Tanggal Transaksi:</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="recurringCheck"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-500"
                  />
                  <label htmlFor="recurringCheck" className="text-slate-300 cursor-pointer">
                    Pengeluaran Rutin Bulanan
                  </label>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Catatan Tambahan:</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Catatan opsional..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl p-2.5 text-slate-200 outline-none"
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
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl"
                >
                  Simpan Pengeluaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
