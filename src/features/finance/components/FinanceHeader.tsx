import React from 'react';
import {
  Wallet,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Scale,
  ShieldCheck,
  CreditCard,
  UserCheck,
  Filter,
  PieChart
} from 'lucide-react';
import { useFinanceStore } from '../../../store/useFinanceStore';
import { FamilyMember } from '../../../types';

interface FinanceHeaderProps {
  familyMembers: FamilyMember[];
  onOpenAIModal: () => void;
}

export const FinanceHeader: React.FC<FinanceHeaderProps> = ({
  familyMembers,
  onOpenAIModal
}) => {
  const {
    financialProfile,
    incomes,
    expenses,
    savingGoals,
    investments,
    selectedMemberId,
    setSelectedMemberId,
    updateFinancialProfile
  } = useFinanceStore();

  // Filter calculations based on member
  const filteredIncomes = selectedMemberId === 'all' 
    ? incomes 
    : incomes.filter(i => i.memberId === selectedMemberId);

  const filteredExpenses = selectedMemberId === 'all'
    ? expenses
    : expenses.filter(e => e.memberId === selectedMemberId);

  const totalIncome = filteredIncomes.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const netCashFlow = totalIncome - totalExpense;

  // Calculate liquid cash + investments total
  const bankTotal = financialProfile.bankAccounts.reduce((sum, b) => sum + b.balance, 0);
  const ewalletTotal = financialProfile.eWallets.reduce((sum, e) => sum + e.balance, 0);
  const totalInvestmentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalLiquidAssets = bankTotal + ewalletTotal;
  const totalNetWorth = totalLiquidAssets + totalInvestmentValue;

  return (
    <div className="space-y-4">
      {/* Disclaimer Banner */}
      <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-3 text-xs text-amber-300/90 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-amber-200">Disclaimer AI Keuangan:</strong> AI FamilyAI Hub memberikan simulasi, analisis, dan edukasi keuangan otomatis berdasarkan input data keluarga, bukan rekomendasi finansial atau investasi legal tersertifikasi.
          </span>
        </div>
        <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono px-2 py-0.5 rounded-full border border-amber-500/30 shrink-0">
          Edu-Only AI
        </span>
      </div>

      {/* Main Hero Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-900/40 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -top-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg text-slate-950">
                <Wallet className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  AI Finance & Family Financial Center
                </h1>
                <p className="text-xs text-slate-300">
                  Pusat manajemen kekayaan, perencanaan anggaran, dana darurat, investasi & penasihat keuangan keluarga pintar.
                </p>
              </div>
            </div>

            {/* Member Filter & Currency Switcher */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
                <Filter className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold text-slate-400">Filter Anggota:</span>
                <select
                  value={selectedMemberId}
                  onChange={(e) => setSelectedMemberId(e.target.value)}
                  className="bg-transparent text-emerald-300 font-bold outline-none cursor-pointer"
                >
                  <option value="all" className="bg-slate-900 text-slate-200">Seluruh Anggota Keluarga</option>
                  {familyMembers.map((m) => (
                    <option key={m.id} value={m.id} className="bg-slate-900 text-slate-200">
                      {m.name} ({m.detailedRole || m.roleTitle})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
                <span className="font-semibold text-slate-400">Mata Uang:</span>
                <select
                  value={financialProfile.currency}
                  onChange={(e) => updateFinancialProfile({ currency: e.target.value as any })}
                  className="bg-transparent text-amber-400 font-bold outline-none cursor-pointer"
                >
                  <option value="IDR" className="bg-slate-900 text-slate-200">Rupiah (IDR - Rp)</option>
                  <option value="USD" className="bg-slate-900 text-slate-200">US Dollar (USD - $)</option>
                  <option value="SGD" className="bg-slate-900 text-slate-200">SG Dollar (SGD - S$)</option>
                </select>
              </div>

              <div className="text-[11px] bg-emerald-950/80 text-emerald-400 px-3 py-1.5 rounded-xl border border-emerald-500/30 font-medium">
                Profil Risiko: <strong className="text-white">{financialProfile.financialPreferences.riskTolerance}</strong>
              </div>
            </div>
          </div>

          {/* AI Financial Advisor Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAIModal}
              className="px-5 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-2.5 border border-amber-300/50"
            >
              <Sparkles className="w-5 h-5 text-slate-950 animate-pulse" />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider text-amber-950 font-extrabold">Gemini AI Core</div>
                <div className="text-xs font-black">Konsultasi Financial Planner AI</div>
              </div>
            </button>
          </div>
        </div>

        {/* Quick Numbers Header Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800/80">
          <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-2xl">
            <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Total Kas & Likuid</span>
            </div>
            <div className="text-base sm:text-lg font-black text-emerald-400 mt-1">
              Rp {totalLiquidAssets.toLocaleString('id-ID')}
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-2xl">
            <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
              <span>Total Pemasukan</span>
            </div>
            <div className="text-base sm:text-lg font-black text-teal-400 mt-1">
              Rp {totalIncome.toLocaleString('id-ID')}
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-2xl">
            <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
              <span>Total Pengeluaran</span>
            </div>
            <div className="text-base sm:text-lg font-black text-rose-400 mt-1">
              Rp {totalExpense.toLocaleString('id-ID')}
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-2xl">
            <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>Sisa Arus Kas (Net)</span>
            </div>
            <div className={`text-base sm:text-lg font-black mt-1 ${netCashFlow >= 0 ? 'text-amber-400' : 'text-rose-500'}`}>
              Rp {netCashFlow.toLocaleString('id-ID')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
