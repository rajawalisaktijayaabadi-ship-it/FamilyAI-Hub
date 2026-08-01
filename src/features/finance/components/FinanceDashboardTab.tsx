import React from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Target,
  PiggyBank,
  PieChart,
  Calendar,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ChevronRight,
  DollarSign,
  Briefcase,
  Layers
} from 'lucide-react';
import { useFinanceStore } from '../../../store/useFinanceStore';

interface FinanceDashboardTabProps {
  onNavigateTab: (tabId: string) => void;
  onOpenAIModal: () => void;
}

export const FinanceDashboardTab: React.FC<FinanceDashboardTabProps> = ({
  onNavigateTab,
  onOpenAIModal
}) => {
  const {
    financialProfile,
    incomes,
    expenses,
    budgets,
    savingGoals,
    investments,
    bills,
    financialInsights,
    sharedWallets,
    toggleBillPaid
  } = useFinanceStore();

  const totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const netCashFlow = totalIncome - totalExpense;

  // Liquid Balance
  const bankTotal = financialProfile.bankAccounts.reduce((sum, b) => sum + b.balance, 0);
  const ewalletTotal = financialProfile.eWallets.reduce((sum, e) => sum + e.balance, 0);
  const totalLiquid = bankTotal + ewalletTotal;

  // Investments
  const totalInvestmentCapital = investments.reduce((sum, i) => sum + i.capitalAmount, 0);
  const totalInvestmentValue = investments.reduce((sum, i) => sum + i.currentValue, 0);
  const investmentProfitLoss = totalInvestmentValue - totalInvestmentCapital;
  const investmentReturnPercent = totalInvestmentCapital > 0 ? (investmentProfitLoss / totalInvestmentCapital) * 100 : 0;

  // Budget Total
  const totalTargetBudget = budgets.reduce((sum, b) => sum + b.targetAmount, 0);
  const totalRealizedBudget = budgets.reduce((sum, b) => sum + b.realizedAmount, 0);
  const budgetUtilizationPercent = totalTargetBudget > 0 ? Math.round((totalRealizedBudget / totalTargetBudget) * 100) : 0;

  // Saving Goals Summary
  const totalGoalTarget = savingGoals.reduce((sum, sg) => sum + sg.targetAmount, 0);
  const totalGoalCurrent = savingGoals.reduce((sum, sg) => sum + sg.currentAmount, 0);
  const goalProgressPercent = totalGoalTarget > 0 ? Math.round((totalGoalCurrent / totalGoalTarget) * 100) : 0;

  // Unpaid Bills
  const unpaidBills = bills.filter((b) => !b.isPaid);
  const unpaidBillsAmount = unpaidBills.reduce((sum, b) => sum + b.amount, 0);

  // Combine Recent Transactions
  const recentTransactions = [
    ...incomes.map((i) => ({ id: i.id, title: i.title, amount: i.amount, type: 'income' as const, date: i.date, category: i.category, memberName: i.memberName })),
    ...expenses.map((e) => ({ id: e.id, title: e.title, amount: e.amount, type: 'expense' as const, date: e.date, category: e.category, memberName: e.memberName }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Primary Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Liquid & Bank */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 hover:border-emerald-500/40 transition-all shadow-lg space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-emerald-400" />
              <span>Kas & Rekening Bank</span>
            </span>
            <button
              onClick={() => onNavigateTab('profile')}
              className="text-[10px] text-emerald-400 hover:underline flex items-center gap-0.5 font-bold"
            >
              Kelola <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-400">
              Rp {totalLiquid.toLocaleString('id-ID')}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
              <span>{financialProfile.bankAccounts.length} Bank</span> • 
              <span>{financialProfile.eWallets.length} E-Wallet</span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 flex justify-between">
            <span>Utama: Mandiri</span>
            <span className="font-mono font-bold text-emerald-300">Rp {financialProfile.bankAccounts[0]?.balance.toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* Card 2: Cash Flow Month */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 hover:border-teal-500/40 transition-all shadow-lg space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-teal-400" />
              <span>Arus Kas Bulan Ini</span>
            </span>
            <button
              onClick={() => onNavigateTab('income')}
              className="text-[10px] text-teal-400 hover:underline flex items-center gap-0.5 font-bold"
            >
              Detail <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div>
            <div className={`text-2xl font-black ${netCashFlow >= 0 ? 'text-teal-400' : 'text-rose-400'}`}>
              Rp {netCashFlow.toLocaleString('id-ID')}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">+Rp {(totalIncome/1000000).toFixed(1)}M In</span> • 
              <span className="text-rose-400 font-bold">-Rp {(totalExpense/1000000).toFixed(1)}M Out</span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 flex justify-between">
            <span>Rasio Tabungan:</span>
            <span className="font-mono font-bold text-amber-400">
              {totalIncome > 0 ? Math.round((netCashFlow / totalIncome) * 100) : 0}%
            </span>
          </div>
        </div>

        {/* Card 3: Investment Portfolio */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 hover:border-amber-500/40 transition-all shadow-lg space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold flex items-center gap-1.5">
              <PieChart className="w-4 h-4 text-amber-400" />
              <span>Portofolio Investasi</span>
            </span>
            <button
              onClick={() => onNavigateTab('investments')}
              className="text-[10px] text-amber-400 hover:underline flex items-center gap-0.5 font-bold"
            >
              Lihat <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div>
            <div className="text-2xl font-black text-amber-400">
              Rp {totalInvestmentValue.toLocaleString('id-ID')}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5 font-mono font-bold">
              <span className={investmentProfitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                {investmentProfitLoss >= 0 ? '+' : ''}Rp {investmentProfitLoss.toLocaleString('id-ID')} ({investmentReturnPercent.toFixed(1)}%)
              </span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 flex justify-between">
            <span>{investments.length} Instrumen Aset</span>
            <span className="font-bold text-amber-300">Emas, Saham, Deposito</span>
          </div>
        </div>

        {/* Card 4: Upcoming Bills */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 hover:border-rose-500/40 transition-all shadow-lg space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-rose-400" />
              <span>Tagihan Belum Lunas</span>
            </span>
            <button
              onClick={() => onNavigateTab('bills')}
              className="text-[10px] text-rose-400 hover:underline flex items-center gap-0.5 font-bold"
            >
              Bayar <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div>
            <div className="text-2xl font-black text-rose-400">
              Rp {unpaidBillsAmount.toLocaleString('id-ID')}
            </div>
            <div className="text-[11px] font-semibold text-slate-400 mt-1">
              {unpaidBills.length} Tagihan Menunggu Pembayaran
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 flex justify-between">
            <span>Terdekat:</span>
            <span className="font-bold text-rose-300 truncate max-w-[140px]">
              {unpaidBills[0]?.title || 'Semua Lunas'}
            </span>
          </div>
        </div>
      </div>

      {/* AI Financial Advice & Gauge Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: AI Finance Planner Recommendation Highlight */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
                <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <div>
                <h3 className="text-base font-bold text-amber-300">AI Financial Planner Insight</h3>
                <p className="text-[11px] text-slate-400">Analisis otomatis Gemini AI berdasarkan pemasukan, pengeluaran, dan target keluarga.</p>
              </div>
            </div>

            <button
              onClick={onOpenAIModal}
              className="px-3.5 py-2 bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Analisis Lanjutan</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Metode Ideal 50/30/20</div>
              <div className="text-xs font-bold text-slate-200 mt-1">
                Kebutuhan (50%): <span className="text-emerald-400">Rp {(totalIncome * 0.5).toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Keinginan & Gaya Hidup</div>
              <div className="text-xs font-bold text-slate-200 mt-1">
                Gaya Hidup (30%): <span className="text-teal-400">Rp {(totalIncome * 0.3).toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Tabungan & Dana Darurat</div>
              <div className="text-xs font-bold text-slate-200 mt-1">
                Tabungan (20%): <span className="text-amber-400">Rp {(totalIncome * 0.2).toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 space-y-2">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Rekomendasi Cerdas Pekan Ini:</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {(financialInsights[0]?.actionItems || [
                'Alokasikan tabungan pendidikan anak di awal bulan secara otomatis (Pay Yourself First).',
                'Siapkan dana darurat keluarga setara 6 kali pengeluaran rutin.',
                'Gunakan dompet bersama untuk belanja harian dapur agar transparansi pencatatan terjaga.'
              ]).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Monthly Budget Utilization & Saving Goals */}
        <div className="space-y-4">
          {/* Budget Utilization Gauge Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-400" />
                <span>Penggunaan Anggaran Bulan Ini</span>
              </span>
              <span className="font-mono font-black text-emerald-400 text-sm">
                {budgetUtilizationPercent}%
              </span>
            </div>

            <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  budgetUtilizationPercent > 90
                    ? 'bg-gradient-to-r from-rose-500 to-red-600'
                    : budgetUtilizationPercent > 75
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                }`}
                style={{ width: `${Math.min(100, budgetUtilizationPercent)}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Terpakai: Rp {totalRealizedBudget.toLocaleString('id-ID')}</span>
              <span>Batas: Rp {totalTargetBudget.toLocaleString('id-ID')}</span>
            </div>

            <button
              onClick={() => onNavigateTab('budget')}
              className="w-full py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 font-semibold rounded-xl transition-all text-center"
            >
              Atur Anggaran Kategori
            </button>
          </div>

          {/* Saving Goal Highlight */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <PiggyBank className="w-4 h-4 text-amber-400" />
                <span>Progress Dana Darurat & Target</span>
              </span>
              <span className="font-mono font-bold text-amber-400">{goalProgressPercent}%</span>
            </div>

            <div className="space-y-2 text-xs">
              {savingGoals.slice(0, 2).map((sg) => {
                const percent = Math.round((sg.currentAmount / sg.targetAmount) * 100);
                return (
                  <div key={sg.id} className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800 space-y-1">
                    <div className="flex justify-between font-medium text-slate-200">
                      <span className="truncate max-w-[150px]">{sg.title}</span>
                      <span className="font-mono text-emerald-400 text-[11px]">{percent}%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: `${Math.min(100, percent)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => onNavigateTab('saving')}
              className="w-full py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold rounded-xl transition-all text-center"
            >
              Tambah / Capai Target
            </button>
          </div>
        </div>
      </div>

      {/* Grid Row 3: Recent Transactions & Unpaid Bills Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions List */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Wallet className="w-4 h-4 text-emerald-400" />
              <span>Transaksi Terakhir</span>
            </h3>
            <button
              onClick={() => onNavigateTab('expense')}
              className="text-xs text-emerald-400 hover:underline font-semibold"
            >
              Lihat Semua
            </button>
          </div>

          <div className="space-y-2.5">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition-all text-xs"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-xl ${
                      tx.type === 'income' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-rose-950 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {tx.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-bold text-slate-200">{tx.title}</div>
                    <div className="text-[10px] text-slate-400">
                      {tx.category} • {tx.memberName} • {tx.date}
                    </div>
                  </div>
                </div>

                <div className={`font-mono font-bold text-sm ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {tx.type === 'income' ? '+' : '-'} Rp {tx.amount.toLocaleString('id-ID')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Bills & Subscriptions List */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-rose-400" />
              <span>Jatuh Tempo Tagihan & Langganan</span>
            </h3>
            <button
              onClick={() => onNavigateTab('bills')}
              className="text-xs text-rose-400 hover:underline font-semibold"
            >
              Kelola Tagihan
            </button>
          </div>

          <div className="space-y-2.5">
            {bills.map((bill) => (
              <div
                key={bill.id}
                className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-200 flex items-center gap-2">
                    <span>{bill.title}</span>
                    {bill.isAutoPay && (
                      <span className="text-[9px] bg-indigo-950 text-indigo-400 px-2 py-0.2 rounded-full border border-indigo-500/30">
                        Autodebet
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {bill.provider} • Jatuh Tempo: <span className="text-amber-300 font-bold">{bill.dueDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="font-mono font-bold text-sm text-slate-200">
                    Rp {bill.amount.toLocaleString('id-ID')}
                  </div>
                  <button
                    onClick={() => toggleBillPaid(bill.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all ${
                      bill.isPaid
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-600 hover:bg-rose-500 text-white shadow'
                    }`}
                  >
                    {bill.isPaid ? 'Lunas' : 'Tandai Lunas'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
