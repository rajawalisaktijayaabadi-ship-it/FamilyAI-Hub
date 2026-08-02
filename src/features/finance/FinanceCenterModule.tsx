import React, { useState } from 'react';
import {
  LayoutDashboard,
  UserCheck,
  TrendingUp,
  TrendingDown,
  Target,
  PiggyBank,
  PieChart,
  Calendar,
  Home,
  CreditCard,
  BarChart3,
  Wallet,
  FileText
} from 'lucide-react';
import { FinanceHeader } from './components/FinanceHeader';
import { ScrollableTabNav } from '../../components/common/ScrollableTabNav';
import { FinanceDashboardTab } from './components/FinanceDashboardTab';
import { FinancialProfileTab } from './components/FinancialProfileTab';
import { IncomeManagementTab } from './components/IncomeManagementTab';
import { ExpenseManagementTab } from './components/ExpenseManagementTab';
import { BudgetPlannerTab } from './components/BudgetPlannerTab';
import { SavingGoalTab } from './components/SavingGoalTab';
import { InvestmentTrackerTab } from './components/InvestmentTrackerTab';
import { BillSubscriptionTab } from './components/BillSubscriptionTab';
import { AssetManagementTab } from './components/AssetManagementTab';
import { DebtManagementTab } from './components/DebtManagementTab';
import { FinancialAnalyticsTab } from './components/FinancialAnalyticsTab';
import { FamilySharedWalletTab } from './components/FamilySharedWalletTab';
import { FinancialDocumentTab } from './components/FinancialDocumentTab';
import { AIFinanceAdvisorModal } from './components/AIFinanceAdvisorModal';
import { FamilyMember } from '../../types';

interface FinanceCenterModuleProps {
  familyMembers: FamilyMember[];
}

export type FinanceTabType =
  | 'dashboard'
  | 'profile'
  | 'income'
  | 'expense'
  | 'budget'
  | 'saving'
  | 'investment'
  | 'bills'
  | 'assets'
  | 'debts'
  | 'analytics'
  | 'shared_wallet'
  | 'documents';

export const FinanceCenterModule: React.FC<FinanceCenterModuleProps> = ({ familyMembers }) => {
  const [activeTab, setActiveTab] = useState<FinanceTabType>('dashboard');
  const [showAIAdvisor, setShowAIAdvisor] = useState(false);

  const tabs = [
    { id: 'dashboard' as const, label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'profile' as const, label: 'Profil Keuangan', icon: UserCheck },
    { id: 'income' as const, label: 'Pemasukan', icon: TrendingUp },
    { id: 'expense' as const, label: 'Pengeluaran', icon: TrendingDown },
    { id: 'budget' as const, label: 'Anggaran (Budget)', icon: Target },
    { id: 'saving' as const, label: 'Tabungan & Goal', icon: PiggyBank },
    { id: 'investment' as const, label: 'Investasi', icon: PieChart },
    { id: 'bills' as const, label: 'Tagihan & Langganan', icon: Calendar },
    { id: 'assets' as const, label: 'Aset Kekayaan', icon: Home },
    { id: 'debts' as const, label: 'Utang & KPR', icon: CreditCard },
    { id: 'analytics' as const, label: 'Analisis AI', icon: BarChart3 },
    { id: 'shared_wallet' as const, label: 'Kas Bersama', icon: Wallet },
    { id: 'documents' as const, label: 'Vault Dokumen', icon: FileText }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Reusable Header */}
      <FinanceHeader
        familyMembers={familyMembers}
        onOpenAIModal={() => setShowAIAdvisor(true)}
      />

      {/* Navigation Sub-Tabs Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-2.5">
        <ScrollableTabNav>
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md scale-105'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <IconComponent className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </ScrollableTabNav>
      </div>

      {/* Main Tab Content Render */}
      <div className="space-y-6">
        {activeTab === 'dashboard' && (
          <FinanceDashboardTab
            onNavigateTab={(tab) => setActiveTab(tab as any)}
            onOpenAIModal={() => setShowAIAdvisor(true)}
          />
        )}
        {activeTab === 'profile' && <FinancialProfileTab />}
        {activeTab === 'income' && <IncomeManagementTab familyMembers={familyMembers} />}
        {activeTab === 'expense' && <ExpenseManagementTab familyMembers={familyMembers} />}
        {activeTab === 'budget' && <BudgetPlannerTab />}
        {activeTab === 'saving' && <SavingGoalTab familyMembers={familyMembers} />}
        {activeTab === 'investment' && <InvestmentTrackerTab familyMembers={familyMembers} />}
        {activeTab === 'bills' && <BillSubscriptionTab />}
        {activeTab === 'assets' && <AssetManagementTab familyMembers={familyMembers} />}
        {activeTab === 'debts' && <DebtManagementTab />}
        {activeTab === 'analytics' && <FinancialAnalyticsTab />}
        {activeTab === 'shared_wallet' && <FamilySharedWalletTab familyMembers={familyMembers} />}
        {activeTab === 'documents' && <FinancialDocumentTab />}
      </div>

      {/* AI Advisor Modal */}
      <AIFinanceAdvisorModal
        isOpen={showAIAdvisor}
        onClose={() => setShowAIAdvisor(false)}
        familyMembers={familyMembers}
      />
    </div>
  );
};
