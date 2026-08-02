import React, { useState } from 'react';
import {
  UserCheck,
  CreditCard,
  Building2,
  Smartphone,
  Shield,
  Plus,
  Trash2,
  Save,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { useFinanceStore } from '../../../store/useFinanceStore';
import { BankAccountInfo, EWalletInfo, CreditCardInfo } from '../../../types';

export const FinancialProfileTab: React.FC = () => {
  const { financialProfile, updateFinancialProfile } = useFinanceStore();

  const [currency, setCurrency] = useState(financialProfile.currency);
  const [primaryIncomeSource, setPrimaryIncomeSource] = useState(financialProfile.primaryIncomeSource);
  const [primaryIncomeAmount, setPrimaryIncomeAmount] = useState(financialProfile.primaryIncomeAmount);
  const [additionalIncomeSource, setAdditionalIncomeSource] = useState(financialProfile.additionalIncomeSource || '');
  const [additionalIncomeAmount, setAdditionalIncomeAmount] = useState(financialProfile.additionalIncomeAmount || 0);
  const [favoritePaymentMethod, setFavoritePaymentMethod] = useState(financialProfile.favoritePaymentMethod);

  // Bank Form Modal State
  const [showAddBank, setShowAddBank] = useState(false);
  const [newBank, setNewBank] = useState<Omit<BankAccountInfo, 'id'>>({
    bankName: 'Bank Mandiri',
    accountNumber: '',
    accountHolder: '',
    type: 'Tabungan Utama',
    balance: 0
  });

  // EWallet Form Modal State
  const [showAddWallet, setShowAddWallet] = useState(false);
  const [newWallet, setNewWallet] = useState<Omit<EWalletInfo, 'id'>>({
    provider: 'Gopay',
    phoneNumber: '',
    balance: 0
  });

  // Credit Card Form Modal State
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState<Omit<CreditCardInfo, 'id'>>({
    cardName: '',
    bankName: 'BCA',
    creditLimit: 10000000,
    currentStatement: 0,
    dueDate: '2026-08-25'
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateFinancialProfile({
      currency,
      primaryIncomeSource,
      primaryIncomeAmount,
      additionalIncomeSource,
      additionalIncomeAmount,
      favoritePaymentMethod
    });
    alert('Profil Keuangan Keluarga berhasil diperbarui!');
  };

  const handleAddBank = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBank.accountNumber) return;
    const addedBank: BankAccountInfo = { ...newBank, id: `b-${Date.now()}` };
    updateFinancialProfile({
      bankAccounts: [...financialProfile.bankAccounts, addedBank]
    });
    setShowAddBank(false);
    setNewBank({ bankName: 'Bank Mandiri', accountNumber: '', accountHolder: '', type: 'Tabungan Utama', balance: 0 });
  };

  const handleDeleteBank = (id: string) => {
    updateFinancialProfile({
      bankAccounts: financialProfile.bankAccounts.filter((b) => b.id !== id)
    });
  };

  const handleAddWallet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWallet.phoneNumber) return;
    const addedWallet: EWalletInfo = { ...newWallet, id: `ew-${Date.now()}` };
    updateFinancialProfile({
      eWallets: [...financialProfile.eWallets, addedWallet]
    });
    setShowAddWallet(false);
    setNewWallet({ provider: 'Gopay', phoneNumber: '', balance: 0 });
  };

  const handleDeleteWallet = (id: string) => {
    updateFinancialProfile({
      eWallets: financialProfile.eWallets.filter((e) => e.id !== id)
    });
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCard.cardName) return;
    const addedCard: CreditCardInfo = { ...newCard, id: `cc-${Date.now()}` };
    updateFinancialProfile({
      creditCards: [...financialProfile.creditCards, addedCard]
    });
    setShowAddCard(false);
    setNewCard({ cardName: '', bankName: 'BCA', creditLimit: 10000000, currentStatement: 0, dueDate: '2026-08-25' });
  };

  const handleDeleteCard = (id: string) => {
    updateFinancialProfile({
      creditCards: financialProfile.creditCards.filter((c) => c.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      {/* Primary Income & Preferences Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-400" />
              <span>Profil Keuangan Utama & Preferensi</span>
            </h3>
            <p className="text-xs text-slate-400">Atur mata uang, sumber pendapatan keluarga, dan metode transaksi standar.</p>
          </div>
          <button
            onClick={handleSaveProfile}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-2xl shadow hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Profil</span>
          </button>
        </div>

        <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Mata Uang Acuan:</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-2xl p-3 text-xs text-slate-200 outline-none"
            >
              <option value="IDR">Rupiah Indonesia (IDR - Rp)</option>
              <option value="USD">US Dollar (USD - $)</option>
              <option value="SGD">Singapore Dollar (SGD - S$)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Metode Pembayaran Favorit:</label>
            <select
              value={favoritePaymentMethod}
              onChange={(e) => setFavoritePaymentMethod(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-2xl p-3 text-xs text-slate-200 outline-none"
            >
              <option value="Transfer Bank">Transfer Bank</option>
              <option value="E-Wallet">E-Wallet (Gopay/OVO/Dana)</option>
              <option value="Kartu Kredit">Kartu Kredit</option>
              <option value="Tunai">Tunai / Cash</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Sumber Pendapatan Utama:</label>
            <input
              type="text"
              value={primaryIncomeSource}
              onChange={(e) => setPrimaryIncomeSource(e.target.value)}
              placeholder="misal: Gaji Bulanan Ayah"
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-2xl p-3 text-xs text-slate-200 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Nominal Pendapatan Utama (Rp):</label>
            <input
              type="number"
              value={primaryIncomeAmount}
              onChange={(e) => setPrimaryIncomeAmount(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-2xl p-3 text-xs text-slate-200 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Sumber Pendapatan Sampingan / Tambahan:</label>
            <input
              type="text"
              value={additionalIncomeSource}
              onChange={(e) => setAdditionalIncomeSource(e.target.value)}
              placeholder="misal: Toko Online / Freelance Ibu"
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-2xl p-3 text-xs text-slate-200 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Nominal Pendapatan Tambahan (Rp):</label>
            <input
              type="number"
              value={additionalIncomeAmount}
              onChange={(e) => setAdditionalIncomeAmount(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-2xl p-3 text-xs text-slate-200 outline-none"
            />
          </div>
        </form>
      </div>

      {/* Bank Accounts Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base">Rekening Bank Terhubung</h3>
          </div>
          <button
            onClick={() => setShowAddBank(true)}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Rekening</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(financialProfile.bankAccounts || []).map((b) => (
            <div key={b.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 relative group">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-emerald-400">{b.bankName}</span>
                <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-400">{b.type}</span>
              </div>
              <div className="font-mono text-xs text-slate-300 font-semibold">{b.accountNumber}</div>
              <div className="text-[11px] text-slate-400">{b.accountHolder}</div>
              <div className="text-sm font-black text-white pt-1">
                Rp {b.balance.toLocaleString('id-ID')}
              </div>
              <button
                onClick={() => handleDeleteBank(b.id)}
                className="absolute top-2 right-2 p-1 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* E-Wallets Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-base">Dompet Digital (E-Wallet)</h3>
          </div>
          <button
            onClick={() => setShowAddWallet(true)}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah E-Wallet</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(financialProfile.eWallets || []).map((ew) => (
            <div key={ew.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 relative group">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-amber-400">{ew.provider}</span>
                <span className="text-[10px] text-slate-400 font-mono">{ew.phoneNumber}</span>
              </div>
              <div className="text-sm font-black text-white pt-1">
                Rp {ew.balance.toLocaleString('id-ID')}
              </div>
              <button
                onClick={() => handleDeleteWallet(ew.id)}
                className="absolute top-2 right-2 p-1 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Credit Cards Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base">Kartu Kredit Family</h3>
          </div>
          <button
            onClick={() => setShowAddCard(true)}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-400 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Kartu Kredit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(financialProfile.creditCards || []).map((cc) => (
            <div key={cc.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 relative group">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-indigo-400">{cc.cardName} ({cc.bankName})</span>
                <span className="text-[10px] text-amber-300 font-bold">Jatuh Tempo: {cc.dueDate}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Tagihan Saat Ini:</span>
                <span className="font-mono font-bold text-rose-400">Rp {cc.currentStatement.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Limit Kartu:</span>
                <span className="font-mono font-bold text-slate-200">Rp {cc.creditLimit.toLocaleString('id-ID')}</span>
              </div>
              <button
                onClick={() => handleDeleteCard(cc.id)}
                className="absolute top-2 right-2 p-1 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Add Bank */}
      {showAddBank && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4">
            <h3 className="font-bold text-white text-base">Tambah Rekening Bank Baru</h3>
            <form onSubmit={handleAddBank} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Nama Bank:</label>
                <input
                  type="text"
                  value={newBank.bankName}
                  onChange={(e) => setNewBank({ ...newBank, bankName: e.target.value })}
                  placeholder="misal: Bank Mandiri / BCA / BSI"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Nomor Rekening:</label>
                <input
                  type="text"
                  value={newBank.accountNumber}
                  onChange={(e) => setNewBank({ ...newBank, accountNumber: e.target.value })}
                  placeholder="1234567890"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Atas Nama Pemilik:</label>
                <input
                  type="text"
                  value={newBank.accountHolder}
                  onChange={(e) => setNewBank({ ...newBank, accountHolder: e.target.value })}
                  placeholder="Ayah Pratama"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Saldo Awal (Rp):</label>
                <input
                  type="number"
                  value={newBank.balance}
                  onChange={(e) => setNewBank({ ...newBank, balance: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddBank(false)}
                  className="flex-1 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl"
                >
                  Simpan Bank
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Wallet */}
      {showAddWallet && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4">
            <h3 className="font-bold text-white text-base">Tambah E-Wallet Baru</h3>
            <form onSubmit={handleAddWallet} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Provider E-Wallet:</label>
                <select
                  value={newWallet.provider}
                  onChange={(e) => setNewWallet({ ...newWallet, provider: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                >
                  <option value="Gopay">Gopay</option>
                  <option value="OVO">OVO</option>
                  <option value="Dana">Dana</option>
                  <option value="ShopeePay">ShopeePay</option>
                  <option value="LinkAja">LinkAja</option>
                </select>
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Nomor Telepon Terhubung:</label>
                <input
                  type="text"
                  value={newWallet.phoneNumber}
                  onChange={(e) => setNewWallet({ ...newWallet, phoneNumber: e.target.value })}
                  placeholder="081234567890"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Saldo Awal (Rp):</label>
                <input
                  type="number"
                  value={newWallet.balance}
                  onChange={(e) => setNewWallet({ ...newWallet, balance: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddWallet(false)}
                  className="flex-1 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl"
                >
                  Simpan E-Wallet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Credit Card */}
      {showAddCard && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4">
            <h3 className="font-bold text-white text-base">Tambah Kartu Kredit Baru</h3>
            <form onSubmit={handleAddCard} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Nama Kartu Kredit:</label>
                <input
                  type="text"
                  value={newCard.cardName}
                  onChange={(e) => setNewCard({ ...newCard, cardName: e.target.value })}
                  placeholder="misal: BCA Everyday Visa"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Bank Penerbit:</label>
                <input
                  type="text"
                  value={newCard.bankName}
                  onChange={(e) => setNewCard({ ...newCard, bankName: e.target.value })}
                  placeholder="BCA / Mandiri / CIMB"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Limit Kartu (Rp):</label>
                <input
                  type="number"
                  value={newCard.creditLimit}
                  onChange={(e) => setNewCard({ ...newCard, creditLimit: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Tagihan Saat Ini (Rp):</label>
                <input
                  type="number"
                  value={newCard.currentStatement}
                  onChange={(e) => setNewCard({ ...newCard, currentStatement: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Tanggal Jatuh Tempo Pembayaran:</label>
                <input
                  type="date"
                  value={newCard.dueDate}
                  onChange={(e) => setNewCard({ ...newCard, dueDate: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCard(false)}
                  className="flex-1 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl"
                >
                  Simpan Kartu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
