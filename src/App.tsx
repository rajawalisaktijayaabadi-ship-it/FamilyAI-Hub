import React, { useState, useEffect } from 'react';
import { 
  initialFamilyMembers, 
  initialMoodEntries,
  initialTasks, 
  initialBudget, 
  initialShoppingItems, 
  initialStickyNotes, 
  initialMemories, 
  initialSmartDevices,
  initialMealPlans
} from './data/mockData';
import { 
  FamilyMember, 
  MoodEntry,
  TaskItem, 
  BudgetItem, 
  ShoppingItem, 
  StickyNote, 
  MemoryPhoto, 
  SmartDevice, 
  MealPlanDay,
  ActiveTab,
  ViewMode 
} from './types';

import { HeaderNavbar } from './components/HeaderNavbar';
import { NavigationTabs, tabItems } from './components/NavigationTabs';
import { getRoleAllowedTabs } from './utils/rolePermissions';
import { SmartTVDashboard } from './components/SmartTVDashboard';

import { DashboardView } from './components/views/DashboardView';
import { FamilyView } from './components/views/FamilyView';
import { CalendarView } from './components/views/CalendarView';
import { ReminderCenterView } from './components/views/ReminderCenterView';
import { AIAssistantView } from './components/views/AIAssistantView';
import { MoodDetectionView } from './components/views/MoodDetectionView';
import { PsychologyView } from './components/views/PsychologyView';
import { ParentingView } from './components/views/ParentingView';
import { EducationView } from './components/views/EducationView';
import { HealthView } from './components/views/HealthView';
import { InsuranceView } from './components/views/InsuranceView';
import { FinanceView } from './components/views/FinanceView';
import { MealPlannerView } from './components/views/MealPlannerView';
import { ShoppingView } from './components/views/ShoppingView';
import { SmartHomeView } from './components/views/SmartHomeView';
import { TravelCenterModule } from './features/travel/TravelCenterModule';
import { SafetyView } from './components/views/SafetyView';
import { CommunicationView } from './components/views/CommunicationView';
import { MemoriesView } from './components/views/MemoriesView';
import { MemoriesCenterModule } from './features/memories/MemoriesCenterModule';
import { AnalyticsView } from './components/views/AnalyticsView';
import { AdminView } from './components/views/AdminView';

import { LandingPageView } from './components/LandingPageView';
import { LoginView } from './components/LoginView';

import { ShieldAlert, X, PhoneCall, Radio, Heart } from 'lucide-react';
import { useDummyDataStore, isDummyId } from './store/useDummyDataStore';
import { useFamilyStore } from './store/useFamilyStore';

export default function App() {
  const [appFlow, setAppFlow] = useState<'landing' | 'login' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [viewMode, setViewMode] = useState<ViewMode>('pc');
  
  // Use persistent Zustand Family Store as single source of truth
  const { familyMembers, addMember, updateMember } = useFamilyStore();
  const [selectedMemberId, setSelectedMemberId] = useState<string>('m1');

  // Derive current active member dynamically so avatar changes propagate instantly everywhere
  const currentMember = familyMembers.find(m => m.id === selectedMemberId) || familyMembers[0] || initialFamilyMembers[0];

  const handleSelectMember = (member: FamilyMember) => {
    setSelectedMemberId(member.id);
  };

  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(initialMoodEntries);
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [budget, setBudget] = useState<BudgetItem[]>(initialBudget);
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>(initialShoppingItems);
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>(initialStickyNotes);
  const [memories, setMemories] = useState<MemoryPhoto[]>(initialMemories);
  const [smartDevices, setSmartDevices] = useState<SmartDevice[]>(initialSmartDevices);
  const [mealPlans, setMealPlans] = useState<MealPlanDay[]>(initialMealPlans);

  // Dummy Data filter state
  const { hideDummyData } = useDummyDataStore();
  const effectiveMembers = hideDummyData ? familyMembers.filter(m => !isDummyId(m.id)) : familyMembers;
  const effectiveTasks = hideDummyData ? tasks.filter(t => !isDummyId(t.id)) : tasks;
  const effectiveShoppingItems = hideDummyData ? shoppingItems.filter(s => !isDummyId(s.id)) : shoppingItems;
  const effectiveSmartDevices = hideDummyData ? smartDevices.filter(d => !isDummyId(d.id)) : smartDevices;

  // Modals & Overlays
  const [showSOSModal, setShowSOSModal] = useState<boolean>(false);
  const [showSmartTVOverlay, setShowSmartTVOverlay] = useState<boolean>(false);

  const [roleNotice, setRoleNotice] = useState<string | null>(null);

  // Validate active tab when selected member or active tab changes
  useEffect(() => {
    const allowed = getRoleAllowedTabs(currentMember);
    if (!allowed.includes(activeTab)) {
      const tabObj = tabItems.find(t => t.id === activeTab);
      const tabName = tabObj ? tabObj.label : activeTab;
      setActiveTab('dashboard');
      setRoleNotice(`Akses modul "${tabName}" dibatasi untuk role ${currentMember.roleTitle || currentMember.name}. Dialihkan ke Dashboard.`);
      const timer = setTimeout(() => setRoleNotice(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [selectedMemberId, activeTab, currentMember]);

  const handleTabChange = (newTab: ActiveTab) => {
    const allowed = getRoleAllowedTabs(currentMember);
    if (!allowed.includes(newTab)) {
      const tabObj = tabItems.find(t => t.id === newTab);
      const tabName = tabObj ? tabObj.label : newTab;
      setRoleNotice(`Modul "${tabName}" dibatasi untuk role ${currentMember.roleTitle || currentMember.name}. Memerlukan akses Orang Tua.`);
      const timer = setTimeout(() => setRoleNotice(null), 4000);
      return;
    }
    setActiveTab(newTab);
  };
  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleAddTask = (newTask: TaskItem) => {
    setTasks(prev => [newTask, ...prev]);
  };

  const handleAddBudgetItem = (newItem: BudgetItem) => {
    setBudget(prev => [newItem, ...prev]);
  };

  const handleToggleShoppingItem = (id: string) => {
    setShoppingItems(prev => prev.map(item => item.id === id ? { ...item, bought: !item.bought } : item));
  };

  const handleAddShoppingItem = (newItem: ShoppingItem) => {
    setShoppingItems(prev => [newItem, ...prev]);
  };

  const handleDeleteShoppingItem = (id: string) => {
    setShoppingItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddStickyNote = (newNote: StickyNote) => {
    setStickyNotes(prev => [newNote, ...prev]);
  };

  const handleAddMemory = (newMemory: MemoryPhoto) => {
    setMemories(prev => [newMemory, ...prev]);
  };

  const handleLikeMemory = (id: string) => {
    setMemories(prev => prev.map(m => m.id === id ? { ...m, likes: m.likes + 1 } : m));
  };

  const handleToggleSmartDevice = (id: string) => {
    setSmartDevices(prev => prev.map(d => d.id === id ? { ...d, status: !d.status } : d));
  };

  const handleAddMember = (newMember: FamilyMember) => {
    addMember(newMember);
  };

  const handleAddMoodEntry = (entry: MoodEntry) => {
    setMoodEntries(prev => [entry, ...prev]);
  };

  const handleMoodUpdated = (memberId: string, newMood: string) => {
    updateMember(memberId, { mood: newMood as any });
  };

  // View Container Class based on ViewMode
  const getViewContainerClass = () => {
    switch (viewMode) {
      case 'mobile':
        return 'max-w-[420px] mx-auto min-h-[800px] border-x border-slate-800 shadow-2xl rounded-3xl my-4 bg-slate-950 overflow-hidden';
      case 'tablet':
        return 'max-w-[820px] mx-auto min-h-[850px] border border-slate-800 shadow-2xl rounded-3xl my-4 bg-slate-950 overflow-hidden';
      case 'tv':
        return 'w-full min-h-screen bg-slate-950';
      default:
        return 'max-w-[1600px] mx-auto px-2 sm:px-4 py-4';
    }
  };

  if (appFlow === 'landing') {
    return (
      <LandingPageView
        onGoToLogin={() => setAppFlow('login')}
        onGoToAppDemo={() => setAppFlow('app')}
      />
    );
  }

  if (appFlow === 'login') {
    return (
      <LoginView
        familyMembers={effectiveMembers}
        onSelectMember={handleSelectMember}
        onLoginSuccess={() => setAppFlow('app')}
        onBackToLanding={() => setAppFlow('landing')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Header Navigation Bar */}
      <HeaderNavbar
        currentMember={currentMember}
        familyMembers={effectiveMembers}
        viewMode={viewMode}
        appFlow={appFlow}
        onNavigateFlow={(flow) => setAppFlow(flow)}
        onSelectMember={handleSelectMember}
        onChangeViewMode={(mode) => {
          setViewMode(mode);
          if (mode === 'tv') setShowSmartTVOverlay(true);
        }}
        onOpenSOS={() => setShowSOSModal(true)}
      />

      {/* Responsive View Frame Wrapper */}
      <div className={getViewContainerClass()}>
        
        {/* Main Content Layout with Left Sidebar */}
        <div className="flex flex-col md:flex-row rounded-3xl border border-slate-800/80 bg-slate-950/60 backdrop-blur-xl shadow-2xl overflow-hidden min-h-[calc(100vh-100px)]">
          {/* Left Sidebar Navigation */}
          <NavigationTabs
            activeTab={activeTab}
            onTabChange={handleTabChange}
            currentMember={currentMember}
          />

          {/* View Router */}
          <main className="flex-1 p-4 sm:p-6 pb-20 min-w-0 overflow-x-hidden">
            {roleNotice && (
              <div className="mb-4 p-3 bg-amber-500/15 border border-amber-500/30 rounded-2xl text-amber-300 text-xs font-semibold flex items-center justify-between gap-3 animate-fade-in shadow-lg">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{roleNotice}</span>
                </div>
                <button 
                  onClick={() => setRoleNotice(null)}
                  className="text-amber-400 hover:text-white text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20"
                >
                  Tutup
                </button>
              </div>
            )}
            {activeTab === 'dashboard' && (
              <DashboardView
                currentMember={currentMember}
                familyMembers={effectiveMembers}
                tasks={effectiveTasks}
                onToggleTask={handleToggleTask}
                smartDevices={effectiveSmartDevices}
                onToggleDevice={handleToggleSmartDevice}
                mealPlan={mealPlans[0]}
                onNavigateTab={(tab) => setActiveTab(tab)}
                onOpenSOS={() => setShowSOSModal(true)}
              />
            )}

            {activeTab === 'family' && (
              <FamilyView />
            )}

            {activeTab === 'calendar' && (
              <CalendarView />
            )}

            {activeTab === 'reminders' && (
              <ReminderCenterView />
            )}

            {activeTab === 'assistant' && (
              <AIAssistantView currentMember={currentMember} familyMembers={effectiveMembers} />
            )}

            {activeTab === 'mood' && (
              <MoodDetectionView
                currentMember={currentMember}
                moodEntries={moodEntries}
                onAddMoodEntry={handleAddMoodEntry}
              />
            )}

            {activeTab === 'psychology' && (
              <PsychologyView familyMembers={effectiveMembers} />
            )}

            {activeTab === 'parenting' && (
              <ParentingView />
            )}

            {activeTab === 'education' && (
              <EducationView />
            )}

            {activeTab === 'health' && (
              <HealthView familyMembers={effectiveMembers} />
            )}

            {activeTab === 'insurance' && (
              <InsuranceView familyMembers={effectiveMembers} />
            )}

            {activeTab === 'finance' && (
              <FinanceView
                budget={budget}
                familyMembers={effectiveMembers}
                onAddBudgetItem={handleAddBudgetItem}
              />
            )}

            {activeTab === 'meals' && (
              <MealPlannerView mealPlans={mealPlans} familyMembers={effectiveMembers} />
            )}

            {activeTab === 'shopping' && (
              <ShoppingView
                shoppingItems={effectiveShoppingItems}
                familyMembers={effectiveMembers}
                onToggleItem={handleToggleShoppingItem}
                onAddItem={handleAddShoppingItem}
                onDeleteItem={handleDeleteShoppingItem}
              />
            )}

            {activeTab === 'smarthome' && (
              <SmartHomeView
                smartDevices={smartDevices}
                onToggleDevice={handleToggleSmartDevice}
              />
            )}

            {activeTab === 'travel' && (
              <TravelCenterModule />
            )}

            {activeTab === 'safety' && (
              <SafetyView
                familyMembers={familyMembers}
                onOpenSOS={() => setShowSOSModal(true)}
              />
            )}

            {activeTab === 'communication' && (
              <CommunicationView
                stickyNotes={stickyNotes}
                currentMember={currentMember}
                onAddStickyNote={handleAddStickyNote}
              />
            )}

            {activeTab === 'memories' && (
              <MemoriesCenterModule />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsView />
            )}

            {activeTab === 'admin' && (
              <AdminView
                familyMembers={familyMembers}
                onAddMember={handleAddMember}
                onOpenSmartTV={() => setShowSmartTVOverlay(true)}
              />
            )}
          </main>
        </div>
      </div>

      {/* Smart TV Fullscreen Dashboard Mode */}
      {showSmartTVOverlay && (
        <SmartTVDashboard
          familyMembers={familyMembers}
          tasks={tasks}
          smartDevices={smartDevices}
          onClose={() => {
            setShowSmartTVOverlay(false);
            setViewMode('pc');
          }}
        />
      )}

      {/* Emergency SOS Signal Broadcast Modal */}
      {showSOSModal && (
        <div className="fixed inset-0 z-50 bg-red-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-red-500 rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl text-center relative animate-pulse">
            <button
              onClick={() => setShowSOSModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-950"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-red-600/30 text-red-500 flex items-center justify-center mx-auto ring-8 ring-red-600/20">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-black text-white">SINYAL SOS DARURAT AKTIF</h2>
              <p className="text-xs text-rose-300 font-semibold">
                Sinyal darurat dikirim ke seluruh ponsel anggota keluarga ({currentMember.name}).
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-red-500/30 text-xs text-slate-300 space-y-2 text-left">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Radio className="w-4 h-4 animate-spin" />
                <span>GPS Live Broadcast Dimulai...</span>
              </div>
              <div>• Lokasi Terkini: {currentMember.location.placeName}</div>
              <div>• Baterai HP: {currentMember.location.batteryPercent}%</div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href="tel:112"
                className="py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-2xl flex items-center justify-center gap-1.5 shadow-lg"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Panggil 112 (Panggilan Darurat)</span>
              </a>

              <button
                onClick={() => {
                  alert('Notifikasi darurat broadcast berhasil dikirim ke WhatsApp/PWA seluruh keluarga!');
                  setShowSOSModal(false);
                }}
                className="py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-2xl"
              >
                Kirim Broadcast
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
