import React, { useState } from 'react';
import { Wallet, Plus, ArrowUpRight, ArrowDownRight, Users, ShieldCheck } from 'lucide-react';
import { useFinanceStore } from '../../../store/useFinanceStore';
import { FamilyMember } from '../../../types';

interface FamilySharedWalletTabProps {
  familyMembers: FamilyMember[];
}

export const FamilySharedWalletTab: React.FC<FamilySharedWalletTabProps> = ({ familyMembers }) => {
  const { sharedWallets, updateSharedWalletBalance } = useFinanceStore();

  const [selectedWalletId, setSelectedWalletId] = useState<string>(sharedWallets[0]?.id || 'sw-1');
  const [actionType, setActionType] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState<number>(500000);
  const [showModal, setShowModal] = useState(false);

  const currentWallet = sharedWallets.find((w) => w.id === selectedWalletId) || sharedWallets[0];

  const handleActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWallet || amount <= 0) return;

    const delta = actionType === 'deposit' ? amount : -amount;
    updateSharedWalletBalance(
      currentWallet.id,
      delta,
      actionType === 'deposit' ? 'Setoran Kas Bersama' : 'Pengeluaran Kas Bersama',
      familyMembers[0]?.name || 'Anggota Keluarga'
    );
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <Wallet className="w-5 h-5 text-indigo-400" />
            <span>Dompet Bersama Keluarga (Shared Wallet)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Kas bersama untuk belanja dapur bulanan, keperluan anak, dan dana darurat bersama.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs rounded-2xl shadow hover:scale-105 transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Setor / Tarik Dana Kas</span>
        </button>
      </div>

      {/* Shared Wallets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sharedWallets.map((sw) => (
          <div
            key={sw.id}
            onClick={() => setSelectedWalletId(sw.id)}
            className={`bg-slate-900 border rounded-3xl p-6 space-y-4 cursor-pointer transition-all ${
              selectedWalletId === sw.id ? 'border-indigo-500 shadow-indigo-950/30' : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white text-base">{sw.walletName}</h4>
                <div className="text-xs text-slate-400 mt-0.5">Pengelola: {sw.managedByName}</div>
              </div>

              <span className="text-xs font-bold text-indigo-400 bg-indigo-950 px-3 py-1 rounded-full border border-indigo-500/30">
                Bersama
              </span>
            </div>

            <div className="text-3xl font-black text-indigo-400">
              Rp {sw.balance.toLocaleString('id-ID')}
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Akses Anggota: {sw.allowedMembers.join(', ')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Modal */}
      {showModal && currentWallet && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-sm space-y-4">
            <h3 className="font-bold text-white text-base">Setor / Tarik Kas Bersama</h3>

            <form onSubmit={handleActionSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Jenis Transaksi Kas:</label>
                <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActionType('deposit')}
                    className={`py-2 rounded-lg font-bold text-xs ${
                      actionType === 'deposit' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    + Setor Kas
                  </button>
                  <button
                    type="button"
                    onClick={() => setActionType('withdraw')}
                    className={`py-2 rounded-lg font-bold text-xs ${
                      actionType === 'withdraw' ? 'bg-rose-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    - Tarik Kas
                  </button>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Nominal (Rp):</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl"
                >
                  Konfirmasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
