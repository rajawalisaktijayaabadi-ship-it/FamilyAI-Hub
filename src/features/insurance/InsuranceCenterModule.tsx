import React, { useState } from 'react';
import {
  ShieldCheck,
  Building,
  CreditCard,
  FileText,
  Award,
  PhoneCall,
  FolderLock,
  Bell,
  Sparkles,
  TrendingUp,
  LayoutDashboard
} from 'lucide-react';
import { InsuranceHeader } from './components/InsuranceHeader';
import { InsuranceDashboardTab } from './components/InsuranceDashboardTab';
import { PolicyManagementTab } from './components/PolicyManagementTab';
import { ProviderManagementTab } from './components/ProviderManagementTab';
import { CoverageSummaryTab } from './components/CoverageSummaryTab';
import { PremiumManagementTab } from './components/PremiumManagementTab';
import { ClaimCenterTab } from './components/ClaimCenterTab';
import { ProtectionScoreTab } from './components/ProtectionScoreTab';
import { EmergencyCardTab } from './components/EmergencyCardTab';
import { InsuranceDocumentCenterTab } from './components/InsuranceDocumentCenterTab';
import { InsuranceReminderTab } from './components/InsuranceReminderTab';
import { AIPolicyExplainerModal } from './components/AIPolicyExplainerModal';
import { FamilyMember } from '../../types';

interface InsuranceCenterModuleProps {
  familyMembers: FamilyMember[];
}

export const InsuranceCenterModule: React.FC<InsuranceCenterModuleProps> = ({ familyMembers }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [showAIModal, setShowAIModal] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Ringkasan', icon: LayoutDashboard },
    { id: 'policies', label: 'Polis Asuransi', icon: ShieldCheck },
    { id: 'providers', label: 'Provider & Hotline', icon: Building },
    { id: 'coverage', label: 'Batas Pertanggungan', icon: TrendingUp },
    { id: 'premium', label: 'Tagihan Premi', icon: CreditCard },
    { id: 'claim', label: 'Pusat Klaim', icon: FileText },
    { id: 'protection_score', label: 'Protection Score', icon: Award },
    { id: 'emergency_card', label: 'Kartu Darurat RS', icon: PhoneCall },
    { id: 'documents', label: 'Vault Dokumen', icon: FolderLock },
    { id: 'reminders', label: 'Pengingat', icon: Bell }
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Module Header */}
      <InsuranceHeader
        familyMembers={familyMembers}
        onOpenAIModal={() => setShowAIModal(true)}
        onOpenEmergencyCard={() => setActiveTab('emergency_card')}
      />

      {/* 2. Navigation Tabs Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-2 flex items-center gap-1 overflow-x-auto scrollbar-none shadow-lg">
        {tabs.map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md scale-102'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Main Active Tab Content */}
      <div className="transition-all duration-300">
        {activeTab === 'dashboard' && (
          <InsuranceDashboardTab
            familyMembers={familyMembers}
            onNavigateTab={setActiveTab}
            onOpenAIModal={() => setShowAIModal(true)}
          />
        )}

        {activeTab === 'policies' && (
          <PolicyManagementTab familyMembers={familyMembers} />
        )}

        {activeTab === 'providers' && <ProviderManagementTab />}

        {activeTab === 'coverage' && <CoverageSummaryTab />}

        {activeTab === 'premium' && <PremiumManagementTab />}

        {activeTab === 'claim' && (
          <ClaimCenterTab familyMembers={familyMembers} />
        )}

        {activeTab === 'protection_score' && <ProtectionScoreTab />}

        {activeTab === 'emergency_card' && (
          <EmergencyCardTab familyMembers={familyMembers} />
        )}

        {activeTab === 'documents' && (
          <InsuranceDocumentCenterTab familyMembers={familyMembers} />
        )}

        {activeTab === 'reminders' && <InsuranceReminderTab />}
      </div>

      {/* 4. AI Policy Explainer Modal */}
      <AIPolicyExplainerModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
      />

    </div>
  );
};
