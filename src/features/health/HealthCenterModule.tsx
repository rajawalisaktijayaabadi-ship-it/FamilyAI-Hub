import React, { useState } from 'react';
import { 
  HeartPulse, Activity, Users, User, Pill, Stethoscope, 
  Dumbbell, Moon, Droplets, Apple, BookOpen, FileCheck, 
  ShieldAlert, Sparkles, Watch, QrCode
} from 'lucide-react';
import { FamilyMember } from '../../types';
import { useHealthStore } from '../../store/useHealthStore';
import { HealthHeader } from './components/HealthHeader';
import { HealthDashboardTab } from './components/HealthDashboardTab';
import { FamilyHealthOverviewTab } from './components/FamilyHealthOverviewTab';
import { HealthProfileTab } from './components/HealthProfileTab';
import { VitalRecordTab } from './components/VitalRecordTab';
import { MedicationCenterTab } from './components/MedicationCenterTab';
import { MedicalAppointmentTab } from './components/MedicalAppointmentTab';
import { FitnessExerciseTab } from './components/FitnessExerciseTab';
import { SleepTrackerTab } from './components/SleepTrackerTab';
import { WaterTrackerTab } from './components/WaterTrackerTab';
import { NutritionSummaryTab } from './components/NutritionSummaryTab';
import { HealthJournalTab } from './components/HealthJournalTab';
import { HealthReportTab } from './components/HealthReportTab';
import { EmergencyInfoTab } from './components/EmergencyInfoTab';
import { AIHealthCoachModal } from './components/AIHealthCoachModal';
import { EmergencyCardModal } from './components/EmergencyCardModal';
import { WearableIntegrationModal } from './components/WearableIntegrationModal';

interface HealthCenterModuleProps {
  familyMembers: FamilyMember[];
}

export type HealthTabKey = 
  | 'dashboard' 
  | 'family_overview' 
  | 'profile' 
  | 'vitals' 
  | 'medication' 
  | 'appointments' 
  | 'exercise' 
  | 'sleep' 
  | 'water' 
  | 'nutrition' 
  | 'journal' 
  | 'report' 
  | 'emergency';

export const HealthCenterModule: React.FC<HealthCenterModuleProps> = ({ familyMembers }) => {
  const [activeTab, setActiveTab] = useState<HealthTabKey>('dashboard');
  const { activeMemberId, setActiveMemberId } = useHealthStore();

  // Modals state
  const [isAICoachOpen, setIsAICoachOpen] = useState(false);
  const [isEmergencyQROpen, setIsEmergencyQROpen] = useState(false);
  const [isWearablesOpen, setIsWearablesOpen] = useState(false);

  const tabs = [
    { key: 'dashboard', label: 'Health Dashboard', icon: HeartPulse },
    { key: 'family_overview', label: 'Family Overview', icon: Users },
    { key: 'profile', label: 'Health Profile', icon: User },
    { key: 'vitals', label: 'Vital Records', icon: Activity },
    { key: 'medication', label: 'Medication Center', icon: Pill },
    { key: 'appointments', label: 'Janji Dokter', icon: Stethoscope },
    { key: 'exercise', label: 'Exercise & Fitness', icon: Dumbbell },
    { key: 'sleep', label: 'Sleep Tracker', icon: Moon },
    { key: 'water', label: 'Water & Hydration', icon: Droplets },
    { key: 'nutrition', label: 'Nutrition Summary', icon: Apple },
    { key: 'journal', label: 'Health Journal', icon: BookOpen },
    { key: 'report', label: 'Health Report', icon: FileCheck },
    { key: 'emergency', label: 'Emergency Info', icon: ShieldAlert },
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner & Member Selector */}
      <HealthHeader
        familyMembers={familyMembers}
        activeMemberId={activeMemberId}
        onSelectMember={setActiveMemberId}
        onOpenAICoach={() => setIsAICoachOpen(true)}
        onOpenEmergencyQR={() => setIsEmergencyQROpen(true)}
        onOpenWearables={() => setIsWearablesOpen(true)}
      />

      {/* Navigation Sub-Tabs Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none shadow-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as HealthTabKey)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Content Display */}
      <div className="transition-all duration-300">
        {activeTab === 'dashboard' && (
          <HealthDashboardTab
            familyMembers={familyMembers}
            activeMemberId={activeMemberId}
            onNavigateToTab={(key) => setActiveTab(key as HealthTabKey)}
          />
        )}

        {activeTab === 'family_overview' && (
          <FamilyHealthOverviewTab
            familyMembers={familyMembers}
            onSelectMember={(id) => setActiveMemberId(id)}
            onNavigateToTab={(key) => setActiveTab(key as HealthTabKey)}
          />
        )}

        {activeTab === 'profile' && (
          <HealthProfileTab
            familyMembers={familyMembers}
            activeMemberId={activeMemberId}
          />
        )}

        {activeTab === 'vitals' && (
          <VitalRecordTab
            familyMembers={familyMembers}
            activeMemberId={activeMemberId}
          />
        )}

        {activeTab === 'medication' && (
          <MedicationCenterTab
            familyMembers={familyMembers}
            activeMemberId={activeMemberId}
          />
        )}

        {activeTab === 'appointments' && (
          <MedicalAppointmentTab
            familyMembers={familyMembers}
            activeMemberId={activeMemberId}
          />
        )}

        {activeTab === 'exercise' && (
          <FitnessExerciseTab
            familyMembers={familyMembers}
            activeMemberId={activeMemberId}
          />
        )}

        {activeTab === 'sleep' && (
          <SleepTrackerTab
            familyMembers={familyMembers}
            activeMemberId={activeMemberId}
          />
        )}

        {activeTab === 'water' && (
          <WaterTrackerTab
            familyMembers={familyMembers}
            activeMemberId={activeMemberId}
          />
        )}

        {activeTab === 'nutrition' && (
          <NutritionSummaryTab
            familyMembers={familyMembers}
            activeMemberId={activeMemberId}
          />
        )}

        {activeTab === 'journal' && (
          <HealthJournalTab
            familyMembers={familyMembers}
            activeMemberId={activeMemberId}
          />
        )}

        {activeTab === 'report' && (
          <HealthReportTab
            familyMembers={familyMembers}
            activeMemberId={activeMemberId}
          />
        )}

        {activeTab === 'emergency' && (
          <EmergencyInfoTab
            familyMembers={familyMembers}
            activeMemberId={activeMemberId}
            onOpenEmergencyQR={() => setIsEmergencyQROpen(true)}
          />
        )}
      </div>

      {/* Modals */}
      <AIHealthCoachModal
        isOpen={isAICoachOpen}
        onClose={() => setIsAICoachOpen(false)}
      />

      <EmergencyCardModal
        isOpen={isEmergencyQROpen}
        onClose={() => setIsEmergencyQROpen(false)}
        familyMembers={familyMembers}
        activeMemberId={activeMemberId}
      />

      <WearableIntegrationModal
        isOpen={isWearablesOpen}
        onClose={() => setIsWearablesOpen(false)}
      />

    </div>
  );
};
