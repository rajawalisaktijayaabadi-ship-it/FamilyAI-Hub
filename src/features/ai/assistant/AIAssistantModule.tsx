import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  MessageSquare, 
  History, 
  Brain, 
  Sparkles, 
  Settings, 
  Sliders 
} from 'lucide-react';
import { AIChatWindow } from '../chat/AIChatWindow';
import { AIHistoryView } from '../history/AIHistoryView';
import { AIMemoryView } from '../memory/AIMemoryView';
import { AIRecommendationView } from '../recommendation/AIRecommendationView';
import { AISettingsModal } from '../components/AISettingsModal';
import { useContextStore } from '../stores/useContextStore';

interface AIAssistantModuleProps {
  currentMember?: any;
  familyMembers?: any[];
  familyProfile?: any;
  initialSubTab?: 'chat' | 'history' | 'memory' | 'recommendation';
}

export const AIAssistantModule: React.FC<AIAssistantModuleProps> = ({
  currentMember,
  familyMembers = [],
  familyProfile,
  initialSubTab = 'chat'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'history' | 'memory' | 'recommendation'>(initialSubTab);
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
              <span>AI Family Assistant Core</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                v3.0 Core Engine
              </span>
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">
              Pusat kecerdasan terpadu FamilyAI Hub: Chat Engine, Context Memory, Histori, dan Rekomendasi Cerdas.
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
          onClick={() => setActiveSubTab('chat')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'chat'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>AI Chat Interface</span>
        </button>

        <button
          onClick={() => setActiveSubTab('history')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'history'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <History className="w-4 h-4 text-sky-400" />
          <span>Histori Percakapan</span>
        </button>

        <button
          onClick={() => setActiveSubTab('memory')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'memory'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Brain className="w-4 h-4 text-purple-400" />
          <span>Sistem AI Memory</span>
        </button>

        <button
          onClick={() => setActiveSubTab('recommendation')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'recommendation'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Smart Recommendation Engine</span>
        </button>
      </div>

      {/* Sub Tab Views */}
      {activeSubTab === 'chat' && <AIChatWindow />}
      {activeSubTab === 'history' && <AIHistoryView />}
      {activeSubTab === 'memory' && <AIMemoryView />}
      {activeSubTab === 'recommendation' && <AIRecommendationView />}

      <AISettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

    </div>
  );
};
