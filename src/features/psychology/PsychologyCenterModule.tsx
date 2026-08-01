import React from 'react';
import { usePsychologyStore } from './stores/usePsychologyStore';
import { PsychologyDisclaimer } from './components/PsychologyDisclaimer';
import { PsychologyHeaderNav } from './components/PsychologyHeaderNav';
import { PsychologyDashboardSubTab } from './components/PsychologyDashboardSubTab';
import { PsychologyAssessmentSubTab } from './components/PsychologyAssessmentSubTab';
import { CommunicationCoachSubTab } from './components/CommunicationCoachSubTab';
import { ConflictResolutionSubTab } from './components/ConflictResolutionSubTab';
import { CoupleRelationshipSubTab } from './components/CoupleRelationshipSubTab';
import { ParentingWellnessSubTab } from './components/ParentingWellnessSubTab';
import { TeenSupportSubTab } from './components/TeenSupportSubTab';
import { SeniorCareSubTab } from './components/SeniorCareSubTab';
import { FamilyChallengeSubTab } from './components/FamilyChallengeSubTab';
import { DailyReflectionSubTab } from './components/DailyReflectionSubTab';
import { WellnessReportSubTab } from './components/WellnessReportSubTab';
import { PsychologyFirestoreSchemaCard } from './components/PsychologyFirestoreSchemaCard';

export const PsychologyCenterModule: React.FC = () => {
  const { activeSubTab } = usePsychologyStore();

  return (
    <div className="space-y-6 pb-12">
      {/* Non-Medical Disclaimer */}
      <PsychologyDisclaimer />

      {/* Main Header & Sub Navigation */}
      <PsychologyHeaderNav />

      {/* Sub Tab Content Routing */}
      {activeSubTab === 'dashboard' && <PsychologyDashboardSubTab />}
      {activeSubTab === 'assessment' && <PsychologyAssessmentSubTab />}
      {activeSubTab === 'communication' && <CommunicationCoachSubTab />}
      {activeSubTab === 'conflict' && <ConflictResolutionSubTab />}
      {activeSubTab === 'couple' && <CoupleRelationshipSubTab />}
      {activeSubTab === 'parenting' && <ParentingWellnessSubTab />}
      {activeSubTab === 'teen' && <TeenSupportSubTab />}
      {activeSubTab === 'senior' && <SeniorCareSubTab />}
      {activeSubTab === 'challenge' && <FamilyChallengeSubTab />}
      {activeSubTab === 'reflection' && <DailyReflectionSubTab />}
      {activeSubTab === 'report' && <WellnessReportSubTab />}
      {activeSubTab === 'database' && <PsychologyFirestoreSchemaCard />}
    </div>
  );
};

export default PsychologyCenterModule;
