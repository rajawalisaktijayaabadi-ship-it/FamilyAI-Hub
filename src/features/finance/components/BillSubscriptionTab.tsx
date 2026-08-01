import React, { useState } from 'react';
import { Calendar, Plus, Trash2, CheckCircle2, RefreshCw, Tv, Wifi, Zap, Droplet, CreditCard } from 'lucide-react';
import { useFinanceStore } from '../../../store/useFinanceStore';

export const BillSubscriptionTab: React.FC = () => {
  const {
    bills,
    subscriptions,
    addBill,
    toggleBillPaid,
    deleteBill,
    addSubscription,
    toggleSubscriptionStatus,
    deleteSubscription
  } = useFinanceStore();

  const [activeSubTab, setActiveSubTab] = useState<'bills' | 'subscriptions'>('bills');
  const [showAddBillModal, setShowAddBillModal] = useState(false);
  const [showAddSubModal, setShowAddSubModal] = useState(false);

  // Bill Form State
  const [billTitle, setBillTitle] = useState('');
  const [billCategory, setBillCategory] = useState<string>('Listrik');
  const [billAmount, setBillAmount] = useState<number>(500000);
  const [billDueDate, setBillDueDate] = useState('2026-08-20');
  const [billProvider, setBillProvider] = useState('PLN Persero');
  const [isAutoPay, setIsAutoPay] = useState(false);

  // Subscription Form State
  const [subTitle, setSubTitle] = useState('');
  const [subProvider, setSubProvider] = useState('Netflix');
  const [subCost, setSubCost] = useState<number>(186000);
  const [subCycle, setSubCycle] = useState<'Monthly' | 'Yearly'>('Monthly');
  const [subNextBillingDate, setSubNextBillingDate] = useState('2026-08-25');

  const handleAddBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!billTitle.trim() || billAmount <= 0) return;

    addBill({
      title: billTitle,
      category: billCategory as any,
      amount: billAmount,
      dueDate: billDueDate,
      isPaid: false,
      isAutoPay,
      provider: billProvider,
      reminderDaysBefore: 3
    });

    setBillTitle('');
    setShowAddBillModal(false);
  };

  const handleAddSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subTitle.trim() || subCost <= 0) return;

    addSubscription({
      title: subTitle,
      provider: subProvider,
      billingCycle: subCycle,
      cost: subCost,
      nextBillingDate: subNextBillingDate,
      status: 'Active',
      category: 'Streaming',
      sharedWithMembers: ['Seluruh Keluarga'],
      autoRenew: true
    });

    setSubTitle('');
    setShowAddSubModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & SubTab Switcher */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-rose-400" />
            <span>Pusat Tagihan & Langganan (Bills & Subscriptions)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Kelola jadwal bayar listrik, air, internet, KPR, dan layanan streaming digital.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveSubTab('bills')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeSubTab === 'bills' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tagihan Rutin ({bills.length})
            </button>
            <button
              onClick={() => setActiveSubTab('subscriptions')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeSubTab === 'subscriptions' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Langganan Digital ({subscriptions.length})
            </button>
          </div>

          {activeSubTab === 'bills' ? (
            <button
              onClick={() => setShowAddBillModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs rounded-2xl shadow hover:scale-105 transition-all flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Tagihan</span>
            </button>
          ) : (
            <button
              onClick={() => setShowAddSubModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs rounded-2xl shadow hover:scale-105 transition-all flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Langganan</span>
            </button>
          )}
        </div>
      </div>

      {/* BILLS SECTION */}
      {activeSubTab === 'bills' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bills.map((b) => (
              <div
                key={b.id}
                className={`bg-slate-900 border rounded-3xl p-5 space-y-3 relative group transition-all ${
                  b.isPaid ? 'border-slate-800 opacity-80' : 'border-rose-500/40 shadow-rose-950/20'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-slate-950 text-rose-400 px-2.5 py-0.5 rounded-full border border-slate-800 font-bold">
                        {b.category}
                      </span>
                      {b.isAutoPay && (
                        <span className="text-[10px] bg-indigo-950 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/30 font-bold">
                          Autodebet
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-white text-base mt-1">{b.title}</h4>
                    <div className="text-[11px] text-slate-400">Provider: {b.provider}</div>
                  </div>

                  <button
                    onClick={() => deleteBill(b.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <div>
                    <div className="text-slate-400 text-[10px]">Jatuh Tempo:</div>
                    <div className="font-bold text-amber-300">{b.dueDate}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-slate-400 text-[10px]">Jumlah Nominal:</div>
                    <div className="font-mono font-black text-white text-base">
                      Rp {b.amount.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => toggleBillPaid(b.id)}
                    className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                      b.isPaid
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{b.isPaid ? 'Lunas (Klik untuk Batal)' : 'Tandai Sudah Dibayar'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBSCRIPTIONS SECTION */}
      {activeSubTab === 'subscriptions' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subscriptions.map((s) => (
              <div
                key={s.id}
                className="bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-3xl p-5 space-y-3 relative group transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] bg-indigo-950 text-indigo-400 px-2.5 py-0.5 rounded-full border border-indigo-500/30 font-bold">
                      {s.category} • {s.billingCycle}
                    </span>
                    <h4 className="font-bold text-white text-base mt-1.5">{s.title}</h4>
                    <div className="text-[11px] text-slate-400">{s.provider}</div>
                  </div>

                  <button
                    onClick={() => deleteSubscription(s.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="font-mono font-black text-lg text-indigo-400">
                  Rp {s.cost.toLocaleString('id-ID')} <span className="text-xs font-normal text-slate-400">/{s.billingCycle.toLowerCase()}</span>
                </div>

                <div className="text-[11px] text-slate-400">
                  Tagihan Berikutnya: <strong className="text-slate-200">{s.nextBillingDate}</strong>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    s.status === 'Active' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                  }`}>
                    Status: {s.status}
                  </span>

                  <button
                    onClick={() => toggleSubscriptionStatus(s.id)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all"
                  >
                    {s.status === 'Active' ? 'Jeda Langganan' : 'Aktifkan Kembali'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Bill Modal */}
      {showAddBillModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4">
            <h3 className="font-bold text-white text-base">Tambah Tagihan Rutin Baru</h3>

            <form onSubmit={handleAddBill} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Nama Tagihan:</label>
                <input
                  type="text"
                  value={billTitle}
                  onChange={(e) => setBillTitle(e.target.value)}
                  placeholder="misal: Listrik PLN Rumah Utama / Indihome"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Kategori Tagihan:</label>
                  <select
                    value={billCategory}
                    onChange={(e) => setBillCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                  >
                    <option value="Listrik">Listrik PLN</option>
                    <option value="Air">Air PDAM</option>
                    <option value="Internet">Internet & Wi-Fi</option>
                    <option value="Telepon">Telepon & Pulsa</option>
                    <option value="Sekolah">Sekolah / SPP</option>
                    <option value="Asuransi">Asuransi</option>
                    <option value="Cicilan">Cicilan KPR / Oto</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Provider / Penyedia:</label>
                  <input
                    type="text"
                    value={billProvider}
                    onChange={(e) => setBillProvider(e.target.value)}
                    placeholder="PLN / Indihome / Bank"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Nominal Tagihan (Rp):</label>
                  <input
                    type="number"
                    value={billAmount}
                    onChange={(e) => setBillAmount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Tanggal Jatuh Tempo:</label>
                  <input
                    type="date"
                    value={billDueDate}
                    onChange={(e) => setBillDueDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="autoPayCheck"
                  checked={isAutoPay}
                  onChange={(e) => setIsAutoPay(e.target.checked)}
                  className="w-4 h-4 text-rose-500 rounded"
                />
                <label htmlFor="autoPayCheck" className="text-slate-300 cursor-pointer">
                  Tagihan Otomatis (Autodebet Rekening)
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddBillModal(false)}
                  className="flex-1 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl"
                >
                  Simpan Tagihan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Subscription Modal */}
      {showAddSubModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4">
            <h3 className="font-bold text-white text-base">Tambah Langganan Digital Baru</h3>

            <form onSubmit={handleAddSub} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Nama Layanan Langganan:</label>
                <input
                  type="text"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  placeholder="misal: Netflix Premium / Spotify / Disney+"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Penyedia / Provider:</label>
                  <input
                    type="text"
                    value={subProvider}
                    onChange={(e) => setSubProvider(e.target.value)}
                    placeholder="Netflix / Spotify"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Siklus Pembayaran:</label>
                  <select
                    value={subCycle}
                    onChange={(e) => setSubCycle(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                  >
                    <option value="Monthly">Bulanan (Monthly)</option>
                    <option value="Yearly">Tahunan (Yearly)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Biaya (Rp):</label>
                  <input
                    type="number"
                    value={subCost}
                    onChange={(e) => setSubCost(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Tagihan Berikutnya:</label>
                  <input
                    type="date"
                    value={subNextBillingDate}
                    onChange={(e) => setSubNextBillingDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddSubModal(false)}
                  className="flex-1 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl"
                >
                  Simpan Langganan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
