import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, PieChart, ShieldCheck, Activity, Brain } from 'lucide-react';
import { useFinanceStore } from '../../../store/useFinanceStore';

export const FinancialAnalyticsTab: React.FC = () => {
  const { calculateFinancialHealthScore, incomes, expenses, assets, debts, savingGoals } = useFinanceStore();

  const healthScore = calculateFinancialHealthScore();

  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalAssets = assets.reduce((sum, a) => sum + a.estimatedValue, 0);
  const totalDebts = debts.filter((d) => d.status === 'active').reduce((sum, d) => sum + d.remainingAmount, 0);

  const netWorth = totalAssets - totalDebts;
  const savingsRatio = totalIncome > 0 ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100) : 0;
  const debtToIncomeRatio = totalIncome > 0 ? Math.round((totalDebts / (totalIncome * 12)) * 100) : 0;

  // Group Expenses by Category
  const expenseCategoryMap: Record<string, number> = {};
  expenses.forEach((e) => {
    expenseCategoryMap[e.category] = (expenseCategoryMap[e.category] || 0) + e.amount;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            <span>Analisis Keuangan & Kesehatan Finansial AI</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Metrik rasio kecukupan dana, rasio utang, rasio tabungan, dan perhitungan kekayaan bersih.</p>
        </div>

        <div className="flex items-center gap-2 bg-indigo-950 border border-indigo-500/30 px-4 py-2 rounded-2xl">
          <Brain className="w-5 h-5 text-indigo-400" />
          <div className="text-xs">
            <div className="text-indigo-300 font-bold">Skor Kesehatan Finansial AI</div>
            <div className="text-xl font-black text-white">{healthScore} / 100</div>
          </div>
        </div>
      </div>

      {/* Main Ratio Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1">
          <div className="text-xs text-slate-400 font-medium">Kekayaan Bersih (Net Worth)</div>
          <div className="text-2xl font-black text-emerald-400">Rp {netWorth.toLocaleString('id-ID')}</div>
          <div className="text-[10px] text-slate-500">Aset Dikurangi Sisa Utang</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1">
          <div className="text-xs text-slate-400 font-medium">Rasio Tabungan (Savings Ratio)</div>
          <div className="text-2xl font-black text-indigo-400">{savingsRatio}%</div>
          <div className="text-[10px] text-slate-500">Target Ideal Minimum: 20%</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1">
          <div className="text-xs text-slate-400 font-medium">Rasio Utang / Pendapatan Setahun</div>
          <div className={`text-2xl font-black ${debtToIncomeRatio < 30 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {debtToIncomeRatio}%
          </div>
          <div className="text-[10px] text-slate-500">Batas Aman Maksimal: 35%</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1">
          <div className="text-xs text-slate-400 font-medium">Cash Flow Bersih Bulanan</div>
          <div className="text-2xl font-black text-teal-400">
            Rp {(totalIncome - totalExpense).toLocaleString('id-ID')}
          </div>
          <div className="text-[10px] text-slate-500">Surplus Kas Terbuka</div>
        </div>
      </div>

      {/* Expense Distribution Visual Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h4 className="font-bold text-white text-base flex items-center gap-2">
          <PieChart className="w-5 h-5 text-indigo-400" />
          <span>Distribusi Pos Pengeluaran Keluarga</span>
        </h4>

        <div className="space-y-3">
          {Object.entries(expenseCategoryMap).map(([cat, amt]) => {
            const percent = totalExpense > 0 ? Math.round((amt / totalExpense) * 100) : 0;
            return (
              <div key={cat} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-200">{cat}</span>
                  <span className="font-mono font-bold text-slate-300">
                    Rp {amt.toLocaleString('id-ID')} ({percent}%)
                  </span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2.5 border border-slate-800 overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
