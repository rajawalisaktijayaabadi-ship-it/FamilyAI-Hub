import React from 'react';
import { GraduationCap, Sparkles, User, School, BookOpen } from 'lucide-react';

export const EducationHeader: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
      <div className="absolute -right-8 -top-8 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-indigo-500/20 text-indigo-300 rounded-2xl border border-indigo-500/30">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight">AI Education & Learning Center</h1>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30 uppercase tracking-wider">
                  AI Learning Assistant
                </span>
              </div>
              <p className="text-xs text-indigo-200/90 mt-0.5">
                Pendamping belajar pintar anak, manajemen PR, kurikulum sekolah, jadwal ujian, skill koding, & analisis progres akademik keluarga.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/80 p-2.5 rounded-2xl border border-indigo-500/20 text-xs shrink-0">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-slate-300 font-semibold">Prinsip AI: Penjelasan Konsep & Anti-Kecurangan</span>
        </div>
      </div>
    </div>
  );
};

interface ChildEducationSelectorProps {
  childrenList: { id: string; name: string; age: number; grade: string; avatar?: string }[];
  selectedChildId: string;
  onSelectChild: (childId: string) => void;
  onOpenProfileTab: () => void;
}

export const ChildEducationSelector: React.FC<ChildEducationSelectorProps> = ({
  childrenList,
  selectedChildId,
  onSelectChild,
  onOpenProfileTab
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
          <User className="w-4 h-4 text-indigo-400" />
          <span>Pilih Siswa:</span>
        </span>

        {childrenList.map((child) => {
          const isSelected = child.id === selectedChildId;
          return (
            <button
              key={child.id}
              onClick={() => onSelectChild(child.id)}
              className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                isSelected
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400/50 shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center gap-1 justify-center text-[11px] font-bold text-indigo-300">
                {child.name.charAt(0)}
              </div>
              <span>{child.name}</span>
              <span className="text-[10px] opacity-80 font-normal">({child.grade})</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={onOpenProfileTab}
        className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-950 hover:bg-indigo-500/10 border border-slate-800 hover:border-indigo-500/30 text-indigo-300 rounded-xl text-xs font-bold transition-all shrink-0"
      >
        <School className="w-3.5 h-3.5 text-indigo-400" />
        <span>Edit Profil Sekolah</span>
      </button>
    </div>
  );
};
