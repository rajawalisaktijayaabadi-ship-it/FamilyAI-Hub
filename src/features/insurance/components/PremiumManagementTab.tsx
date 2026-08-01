import React, { useState } from 'react';
import {
  CreditCard,
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  DollarSign,
  AlertCircle,
  FileCheck,
  X,
  Building
} from 'lucide-react';
import { useInsuranceStore } from '../../../store/useInsuranceStore';

export const PremiumManagementTab: React.FC = () => {
  const { premiums, payments, markPremiumPaid, addPremium, policies } = useInsuranceStore();

  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedPremiumId, setSelectedPremiumId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('Transfer Bank BCA');

  const unpaidPremiums = premiums.filter((p) => p.status === 'unpaid' || p.status === 'overdue');
  const paidPremiums = premiums.filter((p) => p.status === 'paid');

  const totalUnpaidAmount = unpaidPremiums.reduce((acc, p) => acc + p.amount, 0);

  const handleOpenPayModal = (id: string) => {
    setSelectedPremiumId(id);
    setShowPayModal(true);
  };

  const handleConfirmPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPremiumId) {
      markPremiumPaid(selectedPremiumId, paymentMethod);
    }
    setShowPayModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner KPI */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-bold text-white">Manajemen Tagihan & Premi Asuransi</h2>
          </div>
          <p className="text-xs text-slate-300">
            Pantau jadwal jatuh tempo premi bulanan/tahunan dan catat bukti pembayaran resmi.
          </p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-right min-w-[240px]">
          <div className="text-xs text-slate-400 font-medium">Tagihan Belum Dibayar</div>
          <div className="text-2xl font-black text-amber-400">
            Rp {totalUnpaidAmount.toLocaleString('id-ID')}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">{unpaidPremiums.length} Tagihan Menunggu</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Unpaid Premiums List */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-base">Jadwal Tagihan Premi Mandiri</h3>
            </div>
            <span className="text-xs text-amber-300 font-bold bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              {unpaidPremiums.length} Perlu Dibayar
            </span>
          </div>

          <div className="space-y-3">
            {unpaidPremiums.map((prem) => (
              <div
                key={prem.id}
                className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all"
              >
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold">
                    {prem.frequency}
                  </span>
                  <h4 className="font-bold text-white text-sm">{prem.policyTitle}</h4>
                  <div className="text-xs text-slate-400 flex items-center gap-3">
                    <span>Provider: {prem.providerName}</span>
                    <span>Jatuh Tempo: <strong className="text-amber-400">{prem.dueDate}</strong></span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-slate-900 pt-3 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <div className="text-xs text-slate-400">Nominal</div>
                    <div className="text-base font-black text-amber-300">
                      Rp {prem.amount.toLocaleString('id-ID')}
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenPayModal(prem.id)}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Bayar / Konfirmasi</span>
                  </button>
                </div>
              </div>
            ))}

            {unpaidPremiums.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-xs space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p>Seluruh tagihan premi keluarga telah lunas!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Payment History */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-white text-base">Riwayat Pembayaran</h3>
            </div>
            <span className="text-xs text-slate-400">{payments.length} Transaksi</span>
          </div>

          <div className="space-y-3">
            {payments.map((pay) => (
              <div key={pay.id} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 truncate max-w-[170px]">{pay.policyTitle}</span>
                  <span className="text-emerald-400 font-bold text-[10px] bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    LUNAS
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>{pay.paymentDate} • {pay.paymentMethod}</span>
                  <span className="font-mono text-emerald-300 font-bold">
                    Rp {pay.amountPaid.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            ))}

            {payments.length === 0 && (
              <p className="text-xs text-slate-500 text-center py-6">Belum ada riwayat pembayaran terbaru.</p>
            )}
          </div>
        </div>

      </div>

      {/* Pay Confirm Modal */}
      {showPayModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Konfirmasi Pembayaran Premi</span>
              </h3>
              <button
                onClick={() => setShowPayModal(false)}
                className="p-1.5 bg-slate-800 text-slate-300 rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmPay} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Metode Pembayaran:</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                >
                  <option value="Transfer Bank BCA">Transfer Bank BCA</option>
                  <option value="Transfer Bank Mandiri">Transfer Bank Mandiri</option>
                  <option value="Autodebet Kartu Kredit">Autodebet Kartu Kredit</option>
                  <option value="E-Wallet (GoPay/OVO)">E-Wallet (GoPay/OVO)</option>
                  <option value="Virtual Account">Virtual Account</option>
                  <option value="Tunai / Kasir">Tunai / Kasir</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-2xl shadow-lg transition-all"
              >
                Tandai Lunas Pembayaran
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
