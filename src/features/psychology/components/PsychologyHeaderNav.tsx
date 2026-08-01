import React from 'react';
import { 
  Brain, 
  LayoutDashboard, 
  ClipboardCheck, 
  MessageSquareHeart, 
  Scale, 
  HeartHandshake, 
  Baby, 
  GraduationCap, 
  HeartPulse, 
  Trophy, 
  BookOpen, 
  FileText,
  Database
} from 'lucide-react';
import { usePsychologyStore } from '../stores/usePsychologyStore';
import { PsychologySubTab } from '../types/psychologyTypes';

export const PsychologyHeaderNav: React.FC = () => {
  const { activeSubTab, setActiveSubTab } = usePsychologyStore();

  const navItems: { id: PsychologySubTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'assessment', label: 'Asesmen Psikologi', icon: <ClipboardCheck className="w-4 h-4" /> },
    { id: 'communication', label: 'Coach Komunikasi', icon: <MessageSquareHeart className="w-4 h-4" /> },
    { id: 'conflict', label: 'Resolusi Konflik', icon: <Scale className="w-4 h-4" /> },
    { id: 'couple', label: 'Keharmonisan Pasangan', icon: <HeartHandshake className="w-4 h-4" /> },
    { id: 'parenting', label: 'Parenting Wellness', icon: <Baby className="w-4 h-4" /> },
    { id: 'teen', label: 'Dukungan Remaja', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'senior', label: 'Lansia (Senior Care)', icon: <HeartPulse className="w-4 h-4" /> },
    { id: 'challenge', label: 'Tantangan & Achievement', icon: <Trophy className="w-4 h-4" /> },
    { id: 'reflection', label: 'Refleksi Harian', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'report', label: 'Laporan Lanjutan', icon: <FileText className="w-4 h-4" /> },
    { id: 'database', label: 'Schema DB', icon: <Database className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl backdrop-blur-xl">
      {/* Title & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 rounded-2xl text-purple-400 shadow-lg shadow-purple-500/10">
            <Brain className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <span>AI Family Psychology Center</span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Well-being Intelligence
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Pusat kecerdasan psikologi keluarga untuk meningkatkan komunikasi, keharmonisan, pengasuhan, dan kesejahteraan emosional.
            </p>
          </div>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {navItems.map((item) => {
          const isActive = activeSubTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSubTab(item.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/25 font-bold scale-[1.02]'
                  : 'bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800/80'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
