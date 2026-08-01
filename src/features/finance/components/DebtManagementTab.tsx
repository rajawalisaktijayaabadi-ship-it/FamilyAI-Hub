import React, { useState } from 'react';
import { CreditCard, Plus, Trash2, CheckCircle2, AlertCircle, DollarSign, Calendar } from 'lucide-react';
import { useFinanceStore } from '../../../store/useFinanceStore';

export const DebtManagementTab: React.FC = () => {
  const { debts, addDebt, payDebtInstallment, deleteDebt } = useFinanceStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDebtForPayment, setSelectedDebtForPayment] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(1000000);

  // Form State
  const [title, setTitle] = useState('');
  const [lender, setLender] = useState('Bank Mandiri');
  const [category, setCategory] = useState<'Pinjaman' | 'Kredit' | 'Cicilan' | 'KPR' | 'Lainnya'>('KPR');
  const [totalAmount, setTotalAmount] = useState<number>(100000000);
  const [remainingAmount, setRemainingAmount] = useState<number>(50000000);
  const [monthlyInstallment, setMonthlyInstallment] = useState<number>(2500000);
  const [interestRatePercent, setInterestRatePercent] = useState<number>(6.5);
  const [dueDate, setDueDate] = useState('Tanggal 20 Setiap Bulan');
  const [notes, setNotes] = useState('');

  const handleAddDebt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || totalAmount <= 0) return;

    addDebt({
      title,
      lender,
      category,
      totalAmount,
      remainingAmount: remainingAmount || totalAmount,
      monthlyInstallment,
      interestRatePercent,
      dueDate,
      status: 'active',
      reminderEnabled: true,
      notes
    });

    setTitle('');
    setShowAddModal(false);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDebtForPayment || paymentAmount <= 0) return;

    payDebtInstallment(selectedDebtForPayment, paymentAmount);
    setSelectedDebtForPayment(null);
  };

  const totalRemainingDebt = debts.filter((d) => d.status === 'active').reduce((sum, d) => sum + d.remainingAmount, 0);
  const totalMonthlyInstallment = debts.filter((d) => d.status === 'active').reduce((sum, d) => sum + d.monthlyInstallment, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-rose-400" />
            <span>Manajemen Utang, KPR & Cicilan (Debt Tracker)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Kelola jadwal cicilan KPR, kartu kredit, dan kewajiban pinjaman keluarga.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs rounded-2xl shadow hover:scale-105 transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Catatan Utang</span>
        </button>
      </div>

      {/* Debt Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-rose-500/30 p-5 rounded-3xl space-y-1">
          <div className="text-xs text-slate-400 font-medium">Sisa Total Pokok Utang / KPR Aktif</div>
          <div className="text-2xl font-black text-rose-400">
            Rp {totalRemainingDebt.toLocaleString('id-ID')}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1">
          <div className="text-xs text-slate-400 font-medium">Total Angsuran Bulanan Rutin</div>
          <div className="text-2xl font-black text-amber-400">
            Rp {totalMonthlyInstallment.toLocaleString('id-ID')} / bulan
          </div>
        </div>
      </div>

      {/* Debt Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {debts.map((d) => {
          const isPaidOff = d.status === 'paid_off' || d.remainingAmount <= 0;
          const paidPercent = d.totalAmount > 0 ? Math.round(((d.totalAmount - d.remainingAmount) / d.totalAmount) * 100) : 100;

          return (
            <div
              key={d.id}
              className={`bg-slate-900 border rounded-3xl p-5 space-y-3 relative group transition-all ${
                isPaidOff ? 'border-emerald-500/40 opacity-70' : 'border-rose-500/30 hover:border-rose-500/60'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-slate-950 text-rose-400 px-2.5 py-0.5 rounded-full border border-slate-800 font-bold">
                      {d.category}
                    </span>
                    <span className="text-[10px] text-slate-400">Institusi: {d.lender}</span>
                  </div>
                  <h4 className="font-bold text-white text-base mt-1.5">{d.title}</h4>
                  <div className="text-[11px] text-slate-400">Jatuh Tempo: {d.dueDate}</div>
                </div>

                <button
                  onClick={() => deleteDebt(d.id)}
                  className="p-1 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Progress & Numbers */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Terbayar: {paidPercent}%</span>
                  <span className="text-rose-400">Sisa: Rp {d.remainingAmount.toLocaleString('id-ID')}</span>
                </div>

                <div className="w-full bg-slate-950 rounded-full h-2.5 border border-slate-800 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, paidPercent)}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Angsuran Bulanan: <strong className="text-amber-300">Rp {d.monthlyInstallment.toLocaleString('id-ID')}</strong></span>
                  <span>Bunga: <strong className="text-slate-300">{d.interestRatePercent}%</strong></span>
                </div>
              </div>

              {/* Action Button */}
              {!isPaidOff && (
                <div className="pt-2 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedDebtForPayment(d.id);
                      setPaymentAmount(d.monthlyInstallment);
                    }}
                    className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Catat Pembayaran Angsuran</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pay Modal */}
      {selectedDebtForPayment && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-sm space-y-4">
            <h3 className="font-bold text-white text-base">Catat Pembayaran Cicilan</h3>
            <form onSubmit={handlePaymentSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Nominal Pembayaran (Rp):</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedDebtForPayment(null)}
                  className="flex-1 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl"
                >
                  Konfirmasi Pembayaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Debt Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4">
            <h3 className="font-bold text-white text-base">Tambah Catatan Utang / Cicilan</h3>

            <form onSubmit={handleAddDebt} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Nama Kewajiban / Pinjaman:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="misal: KPR Mandiri / Cicilan Laptop"
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
                    <option value="KPR">KPR Rumah</option>
                    <option value="Kredit">Kartu Kredit</option>
                    <option value="Cicilan">Cicilan Barang</option>
                    <option value="Pinjaman">Pinjaman Bank / Personal</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Bank / Institusi:</label>
                  <input
                    type="text"
                    value={lender}
                    onChange={(e) => setLender(e.target.value)}
                    placeholder="Bank Mandiri / BCA"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Total Pokok Pinjaman (Rp):</label>
                  <input
                    type="number"
                    value={totalAmount}
                    onChange={(e) => {
                      setTotalAmount(Number(e.target.value));
                      if (remainingAmount === 0) setRemainingAmount(Number(e.target.value));
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Sisa Utama Utang (Rp):</label>
                  <input
                    type="number"
                    value={remainingAmount}
                    onChange={(e) => setRemainingAmount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Angsuran Bulanan (Rp):</label>
                  <input
                    type="number"
                    value={monthlyInstallment}
                    onChange={(e) => setMonthlyInstallment(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Suku Bunga (%):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRatePercent}
                    onChange={(e) => setInterestRatePercent(Number(e.target.value))}
                    placeholder="6.5"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Jatuh Tempo Pembayaran:</label>
                <input
                  type="text"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  placeholder="Tanggal 20 Setiap Bulan"
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
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl"
                >
                  Simpan Kewajiban
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
