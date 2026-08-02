import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  MessageSquare, 
  History, 
  Brain, 
  Sparkles, 
  Settings, 
  LayoutDashboard, 
  Zap, 
  GitMerge, 
  TrendingUp, 
  Layers, 
  Target, 
  Search, 
  FileText 
} from 'lucide-react';

import { AISuperDashboard } from '../components/AISuperDashboard';
import { AIChatAssistantView } from '../components/AIChatAssistantView';
import { AIAutomationCenter } from '../components/AIAutomationCenter';
import { VisualWorkflowBuilder } from '../components/VisualWorkflowBuilder';
import { AIInsightCenter } from '../components/AIInsightCenter';
import { AIRecommendationView } from '../recommendation/AIRecommendationView';
import { AIMemoryEngineView } from '../components/AIMemoryEngineView';
import { AIContextEngineView } from '../components/AIContextEngineView';
import { AIGoalsHabitsRoutinesView } from '../components/AIGoalsHabitsRoutinesView';
import { AIKnowledgeAndSearchView } from '../components/AIKnowledgeAndSearchView';
import { AIReportAndNotificationView } from '../components/AIReportAndNotificationView';
import { AIHistoryView } from '../history/AIHistoryView';
import { AISettingsModal } from '../components/AISettingsModal';
import { useContextStore } from '../stores/useContextStore';

type AISubTab = 
  | 'dashboard' 
  | 'chat' 
  | 'automation' 
  | 'workflow' 
  | 'insights' 
  | 'recommendation' 
  | 'memory' 
  | 'context' 
  | 'goals' 
  | 'search' 
  | 'reports' 
  | 'history';

interface AIAssistantModuleProps {
  currentMember?: any;
  familyMembers?: any[];
  familyProfile?: any;
  initialSubTab?: AISubTab;
}

export const AIAssistantModule: React.FC<AIAssistantModuleProps> = ({
  currentMember,
  familyMembers = [],
  familyProfile,
  initialSubTab = 'dashboard'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<AISubTab>(initialSubTab);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { initContext } = useContextStore();

  useEffect(() => {
    initContext(currentMember, familyProfile, familyMembers);
  }, [currentMember, familyProfile, familyMembers, initContext]);

  return (
    <div className="space-y-6">
      
      {/* Module Header Bar */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-gradient-to-tr from-indigo-500 via-purple-600 to-amber-400 rounded-2xl shadow-xl text-white">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <span>AI Family Super Assistant Platform</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                Enterprise AI Core
              </span>
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">
              Pusat Otomasi, Memori Lintas Modul, Visual Workflow Builder, & Executive Briefing Keluarga.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsSettingsOpen(true)}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <Settings className="w-4 h-4 text-indigo-400" />
          <span>Pengaturan AI Core</span>
        </button>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveSubTab('dashboard')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'dashboard'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 text-amber-300" />
          <span>Super AI Dashboard</span>
        </button>

        <button
          onClick={() => setActiveSubTab('chat')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'chat'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>Gemini Chat Assistant</span>
        </button>

        <button
          onClick={() => setActiveSubTab('automation')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'automation'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Aturan Otomasi</span>
        </button>

        <button
          onClick={() => setActiveSubTab('workflow')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'workflow'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <GitMerge className="w-4 h-4 text-purple-400" />
          <span>Visual Workflow Builder</span>
        </button>

        <button
          onClick={() => setActiveSubTab('insights')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'insights'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-sky-400" />
          <span>AI Insight Center</span>
        </button>

        <button
          onClick={() => setActiveSubTab('recommendation')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'recommendation'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Rekomendasi Cerdas</span>
        </button>

        <button
          onClick={() => setActiveSubTab('memory')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'memory'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Brain className="w-4 h-4 text-purple-300" />
          <span>Sistem Memory AI</span>
        </button>

        <button
          onClick={() => setActiveSubTab('context')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'context'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-4 h-4 text-indigo-300" />
          <span>Context Matrix (16 Modul)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('goals')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'goals'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Target className="w-4 h-4 text-rose-400" />
          <span>Target & Kebiasaan</span>
        </button>

        <button
          onClick={() => setActiveSubTab('search')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'search'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Search className="w-4 h-4 text-teal-300" />
          <span>Pencarian Global & FAQ</span>
        </button>

        <button
          onClick={() => setActiveSubTab('reports')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'reports'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <FileText className="w-4 h-4 text-amber-400" />
          <span>Laporan & Notifikasi</span>
        </button>

        <button
          onClick={() => setActiveSubTab('history')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'history'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <History className="w-4 h-4 text-sky-400" />
          <span>Histori</span>
        </button>
      </div>

      {/* Sub Tab Views */}
      {activeSubTab === 'dashboard' && <AISuperDashboard />}
      {activeSubTab === 'chat' && <AIChatAssistantView currentMember={currentMember} />}
      {activeSubTab === 'automation' && <AIAutomationCenter />}
      {activeSubTab === 'workflow' && <VisualWorkflowBuilder />}
      {activeSubTab === 'insights' && <AIInsightCenter />}
      {activeSubTab === 'recommendation' && <AIRecommendationView />}
      {activeSubTab === 'memory' && <AIMemoryEngineView />}
      {activeSubTab === 'context' && <AIContextEngineView />}
      {activeSubTab === 'goals' && <AIGoalsHabitsRoutinesView />}
      {activeSubTab === 'search' && <AIKnowledgeAndSearchView />}
      {activeSubTab === 'reports' && <AIReportAndNotificationView />}
      {activeSubTab === 'history' && <AIHistoryView />}

      <AISettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

    </div>
  );
};
