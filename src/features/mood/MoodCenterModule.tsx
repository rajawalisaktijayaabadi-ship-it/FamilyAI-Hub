import React from 'react';
import { useMoodStore, MoodSubTab } from './stores/useMoodStore';
import { useFamilyStore } from '../../store/useFamilyStore';
import { MoodHeaderBar } from './components/MoodHeaderBar';
import { MoodOverviewSubTab } from './components/MoodOverviewSubTab';
import { MoodJournalSubTab } from './components/MoodJournalSubTab';
import { MoodCalendarSubTab } from './components/MoodCalendarSubTab';
import { MoodTimelineSubTab } from './components/MoodTimelineSubTab';
import { ParentDashboardSubTab } from './components/ParentDashboardSubTab';
import { MoodRemindersSubTab } from './components/MoodRemindersSubTab';
import { BiometricPlaceholdersCard } from './components/BiometricPlaceholdersCard';
import { MoodIntegrationHub } from './components/MoodIntegrationHub';
import { DailyCheckInModal } from './components/DailyCheckInModal';
import { FamilyMember } from '../../types';

interface MoodCenterModuleProps {
  initialSubTab?: MoodSubTab;
  currentMember?: FamilyMember;
}

export const MoodCenterModule: React.FC<MoodCenterModuleProps> = ({ initialSubTab, currentMember }) => {
  const { activeSubTab, setActiveSubTab, syncFamilyMembersWithMoods } = useMoodStore();
  const { familyMembers } = useFamilyStore();

  React.useEffect(() => {
    if (familyMembers && familyMembers.length > 0) {
      syncFamilyMembersWithMoods(familyMembers);
    }
  }, [familyMembers, syncFamilyMembersWithMoods]);

  React.useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab, setActiveSubTab]);

  return (
    <div className="space-y-6">
      {/* Top Header & Sub-Nav Bar */}
      <MoodHeaderBar />

      {/* Sub Tab Contents */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          <MoodOverviewSubTab />
          <MoodIntegrationHub />
        </div>
      )}

      {activeSubTab === 'checkin' && (
        <div className="space-y-6">
          <MoodOverviewSubTab />
        </div>
      )}

      {activeSubTab === 'journal' && <MoodJournalSubTab currentMember={currentMember} />}

      {activeSubTab === 'calendar' && <MoodCalendarSubTab />}

      {activeSubTab === 'timeline' && <MoodTimelineSubTab />}

      {activeSubTab === 'parent_view' && <ParentDashboardSubTab />}

      {activeSubTab === 'reminders' && <MoodRemindersSubTab />}

      {activeSubTab === 'biometrics' && <BiometricPlaceholdersCard />}

      {/* Shared Modals */}
      <DailyCheckInModal currentMember={currentMember} />
    </div>
  );
};
