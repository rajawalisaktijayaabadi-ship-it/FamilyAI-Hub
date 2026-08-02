import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Baby, 
  TrendingUp, 
  Target, 
  Clock, 
  Tv, 
  Flame, 
  Award, 
  CheckSquare, 
  Sparkles, 
  FileText, 
  Trophy 
} from 'lucide-react';

import { useParentingStore } from '../../store/useParentingStore';
import { useFamilyStore } from '../../store/useFamilyStore';
import { ParentingHeader, ChildSelector } from './components/ParentingHeader';
import { ScrollableTabNav } from '../../components/common/ScrollableTabNav';

import { DashboardTab } from './components/DashboardTab';
import { ChildProfileTab } from './components/ChildProfileTab';
import { DevelopmentGrowthTab } from './components/DevelopmentGrowthTab';
import { MilestoneTrackerTab } from './components/MilestoneTrackerTab';
import { DailyActivityTab } from './components/DailyActivityTab';
import { ScreenTimeTab } from './components/ScreenTimeTab';
import { HabitTrackerTab } from './components/HabitTrackerTab';
import { RewardGamificationTab } from './components/RewardGamificationTab';
import { TaskManagementTab } from './components/TaskManagementTab';
import { AICoachTipsTab } from './components/AICoachTipsTab';
import { GoalSettingTab } from './components/GoalSettingTab';
import { ParentNotesTab } from './components/ParentNotesTab';
import { AchievementDashboardTab } from './components/AchievementDashboardTab';

export type ParentingTabKey = 
  | 'dashboard'
  | 'child_profile'
  | 'development'
  | 'milestones'
  | 'daily_activity'
  | 'screen_time'
  | 'habits'
  | 'rewards'
  | 'tasks'
  | 'ai_coach'
  | 'goals'
  | 'parent_notes'
  | 'achievements';

export const ParentingCenterModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ParentingTabKey>('dashboard');
  const { familyMembers } = useFamilyStore();

  const {
    children,
    selectedChildId,
    setSelectedChildId,
    addChild,
    updateChild,
    deleteChild,
    growthRecords,
    addGrowthRecord,
    milestones,
    updateMilestoneStatus,
    addMilestone,
    dailyActivities,
    addDailyActivity,
    screenTimeRecords,
    addScreenTimeRecord,
    habits,
    toggleHabitCheckin,
    addHabit,
    rewards,
    tasks,
    toggleTaskCompleted,
    addTask,
    deleteTask,
    goals,
    addGoal,
    updateGoalProgress,
    parentNotes,
    addParentNote,
    updateParentNote,
    deleteParentNote,
    tips,
    insights
  } = useParentingStore();

  // Auto-sync children from useFamilyStore into useParentingStore
  useEffect(() => {
    if (!familyMembers || familyMembers.length === 0) return;

    // Filter family members who are children
    const childMembers = familyMembers.filter((m) => {
      const r = (m.role || '').toLowerCase();
      const rel = (m.relationship || '').toLowerCase();
      const rt = (m.roleTitle || '').toLowerCase();
      return r === 'kids' || r === 'child' || rel.includes('anak') || rt.includes('anak');
    });

    childMembers.forEach((m) => {
      const existing = children.find((c) => c.id === m.id || c.name.toLowerCase() === m.name.toLowerCase());
      if (!existing) {
        addChild({
          familyId: 'fam-1',
          name: m.name,
          photo: m.avatar,
          birthDate: m.age ? `${2026 - m.age}-01-01` : '2016-01-01',
          age: m.age || 10,
          gender: m.relationship?.toLowerCase().includes('perempuan') ? 'Perempuan' : 'Laki-laki',
          school: 'Sekolah Utama',
          grade: m.roleTitle || 'Siswa',
          bloodType: 'O+',
          allergies: [],
          hobbies: [],
          interests: [],
          talents: [],
          goals: [],
          parentNotes: ''
        });
      } else {
        // Sync name/photo/age if changed
        if (existing.name !== m.name || existing.photo !== m.avatar || existing.age !== m.age) {
          updateChild(existing.id, {
            name: m.name,
            photo: m.avatar,
            age: m.age || existing.age
          });
        }
      }
    });
  }, [familyMembers]);

  const selectedChild = children.find((c) => c.id === selectedChildId) || children[0];
  const childRewardSystem = rewards[selectedChildId] || Object.values(rewards)[0];
  const childInsight = insights.find((i) => i.childId === selectedChildId) || insights[0];

  const navigationTabs: { key: ParentingTabKey; label: string; icon: any }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'child_profile', label: 'Profil Anak', icon: Baby },
    { key: 'development', label: 'Perkembangan', icon: TrendingUp },
    { key: 'milestones', label: 'Milestones', icon: Target },
    { key: 'daily_activity', label: 'Aktivitas Harian', icon: Clock },
    { key: 'screen_time', label: 'Screen Time', icon: Tv },
    { key: 'habits', label: 'Habit Tracker', icon: Flame },
    { key: 'rewards', label: 'Reward & Poin', icon: Award },
    { key: 'tasks', label: 'Tugas Harian', icon: CheckSquare },
    { key: 'ai_coach', label: 'AI Coach & Tips', icon: Sparkles },
    { key: 'goals', label: 'Target / Goal', icon: Target },
    { key: 'parent_notes', label: 'Catatan Orang Tua', icon: FileText },
    { key: 'achievements', label: 'Pencapaian', icon: Trophy }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Child Selector */}
      <ParentingHeader />

      <ChildSelector
        childrenList={children}
        selectedChildId={selectedChildId}
        onSelectChild={setSelectedChildId}
        onOpenAddModal={() => setActiveTab('child_profile')}
      />

      {/* Navigation Sub-Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-lg">
        <ScrollableTabNav>
          {navigationTabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white border-pink-400/50 shadow-lg shadow-pink-500/20'
                    : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </ScrollableTabNav>
      </div>

      {/* Active Tab View Rendering */}
      {activeTab === 'dashboard' && selectedChild && (
        <DashboardTab
          child={selectedChild}
          growthRecords={growthRecords}
          milestones={milestones}
          dailyActivities={dailyActivities}
          screenTimeRecords={screenTimeRecords}
          habits={habits}
          tasks={tasks}
          rewardSystem={childRewardSystem}
          insight={childInsight}
          onNavigateTab={(tabKey) => setActiveTab(tabKey as ParentingTabKey)}
        />
      )}

      {activeTab === 'child_profile' && (
        <ChildProfileTab
          childrenList={children}
          activeChildId={selectedChildId}
          onSelectChild={setSelectedChildId}
          onAddChild={addChild}
          onUpdateChild={updateChild}
          onDeleteChild={deleteChild}
        />
      )}

      {activeTab === 'development' && selectedChild && (
        <DevelopmentGrowthTab
          child={selectedChild}
          growthRecords={growthRecords}
          onAddGrowthRecord={addGrowthRecord}
        />
      )}

      {activeTab === 'milestones' && selectedChild && (
        <MilestoneTrackerTab
          child={selectedChild}
          milestones={milestones}
          onUpdateMilestoneStatus={updateMilestoneStatus}
          onAddMilestone={addMilestone}
        />
      )}

      {activeTab === 'daily_activity' && selectedChild && (
        <DailyActivityTab
          child={selectedChild}
          dailyActivities={dailyActivities}
          onAddDailyActivity={addDailyActivity}
        />
      )}

      {activeTab === 'screen_time' && selectedChild && (
        <ScreenTimeTab
          child={selectedChild}
          screenTimeRecords={screenTimeRecords}
          onAddScreenTimeRecord={addScreenTimeRecord}
        />
      )}

      {activeTab === 'habits' && selectedChild && (
        <HabitTrackerTab
          child={selectedChild}
          habits={habits}
          onToggleHabitCheckin={toggleHabitCheckin}
          onAddHabit={addHabit}
        />
      )}

      {activeTab === 'rewards' && selectedChild && (
        <RewardGamificationTab
          child={selectedChild}
          rewardSystem={childRewardSystem}
        />
      )}

      {activeTab === 'tasks' && selectedChild && (
        <TaskManagementTab
          child={selectedChild}
          tasks={tasks}
          onToggleTaskCompleted={toggleTaskCompleted}
          onAddTask={addTask}
          onDeleteTask={deleteTask}
        />
      )}

      {activeTab === 'ai_coach' && selectedChild && (
        <AICoachTipsTab
          child={selectedChild}
          tips={tips}
        />
      )}

      {activeTab === 'goals' && selectedChild && (
        <GoalSettingTab
          child={selectedChild}
          goals={goals}
          onAddGoal={addGoal}
          onUpdateGoalProgress={updateGoalProgress}
        />
      )}

      {activeTab === 'parent_notes' && selectedChild && (
        <ParentNotesTab
          child={selectedChild}
          parentNotes={parentNotes}
          onAddParentNote={addParentNote}
          onUpdateParentNote={updateParentNote}
          onDeleteParentNote={deleteParentNote}
        />
      )}

      {activeTab === 'achievements' && selectedChild && (
        <AchievementDashboardTab
          child={selectedChild}
          rewardSystem={childRewardSystem}
          goals={goals}
        />
      )}
    </div>
  );
};

export default ParentingCenterModule;
