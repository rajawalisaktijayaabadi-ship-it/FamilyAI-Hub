import React from 'react';
import { 
  Smile, 
  PlusCircle, 
  BookOpen, 
  Calendar as CalendarIcon, 
  GitCommitHorizontal, 
  ShieldCheck, 
  Bell, 
  Activity, 
  TrendingUp, 
  Sparkles,
  Bot
} from 'lucide-react';
import { useMoodStore, MoodSubTab } from '../stores/useMoodStore';

export const MoodHeaderBar: React.FC = () => {
  const { 
    activeSubTab, 
    setActiveSubTab, 
    wellbeingScore, 
    setCheckInModalOpen 
  } = useMoodStore();

  const navTabs: { id: MoodSubTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Mood Overview', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'checkin', label: 'Daily Check-in', icon: <PlusCircle className="w-4 h-4 text-amber-400" />, badge: 'Harian' },
    { id: 'journal', label: 'Mood Journal', icon: <BookOpen className="w-4 h-4 text-emerald-400" /> },
    { id: 'calendar', label: 'Mood Calendar', icon: <CalendarIcon className="w-4 h-4 text-indigo-400" /> },
    { id: 'timeline', label: 'Timeline Emosi', icon: <GitCommitHorizontal className="w-4 h-4 text-sky-400" /> },
    { id: 'parent_view', label: 'Parent Dashboard', icon: <ShieldCheck className="w-4 h-4 text-purple-400" />, badge: 'Ortu' },
    { id: 'reminders', label: 'Reminder Center', icon: <Bell className="w-4 h-4 text-rose-400" /> },
    { id: 'biometrics', label: 'Voice & Wearables', icon: <Activity className="w-4 h-4 text-cyan-400" />, badge: 'Ready' }
  ];

  return (
    <div className="space-y-4">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
                <Smile className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  AI Mood Detection Center
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 font-mono">
                    Emotion Intelligence Engine
                  </span>
                </h1>
                <p className="text-xs text-slate-300 mt-1">
                  Sistem pemantau iklim emosional & pendamping kesejahteraan psikologis keluarga cerdas
                </p>
              </div>
            </div>
          </div>

          {/* Quick Metrics Badge & Action */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-950/70 border border-slate-800/90 p-3 rounded-2xl flex items-center gap-3 shadow-inner">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Indeks Kebahagiaan</div>
                <div className="text-base font-black text-emerald-400 font-mono">
                  {wellbeingScore.happinessScore} / 100 <span className="text-xs font-normal text-slate-300">({wellbeingScore.statusLabel})</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCheckInModalOpen(true)}
              className="px-5 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold rounded-2xl text-xs shadow-xl shadow-amber-500/20 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Isi Mood Hari Ini</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center overflow-x-auto no-scrollbar gap-2">
          {navTabs.map((tab) => {
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30 font-bold scale-[1.02]'
                    : 'bg-slate-950/50 hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-800/60'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-indigo-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
