import React from 'react';
import { Baby, Plus, Sparkles, AlertCircle } from 'lucide-react';
import { Child } from '../types';

interface ChildSelectorProps {
  childrenList: Child[];
  selectedChildId: string;
  onSelectChild: (id: string) => void;
  onOpenAddModal: () => void;
}

export const ChildSelector: React.FC<ChildSelectorProps> = ({
  childrenList,
  selectedChildId,
  onSelectChild,
  onOpenAddModal
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-pink-500/10 border border-pink-500/20 rounded-xl text-pink-400">
          <Baby className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">Pilih Profil Anak</h2>
          <p className="text-xs text-slate-400">Pantau perkembangan & kebiasaan buah hati Anda</p>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
        {childrenList.map((child) => {
          const isSelected = child.id === selectedChildId;
          return (
            <button
              key={child.id}
              onClick={() => onSelectChild(child.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                isSelected
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white border-pink-400/50 shadow-lg shadow-pink-500/20'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              <img
                src={child.photo}
                alt={child.name}
                className="w-6 h-6 rounded-full object-cover border border-white/20"
              />
              <span>{child.name.split(' ')[0]}</span>
              <span className="text-[10px] opacity-80">({child.age} th)</span>
            </button>
          );
        })}

        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-pink-300 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Anak</span>
        </button>
      </div>
    </div>
  );
};

export const ParentingHeader: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-pink-950/60 via-purple-950/40 to-slate-900 border border-pink-500/20 rounded-3xl p-5 text-white space-y-3 relative overflow-hidden shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>AI Parenting & Child Development Hub</span>
            </span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white via-pink-100 to-purple-200 bg-clip-text text-transparent">
            Pusat Pengasuhan & Tumbuh Tumbuh Anak
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl">
            Dampingi perkembangan fisik, kognitif, emosional, serta bangun habit positif dan motivasi anak dengan pendekatan parenting modern berbasis psikologi positif.
          </p>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3 flex items-start gap-2.5 max-w-xs text-xs text-amber-200 shrink-0">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-tight">
            <strong>Catatan Etika AI:</strong> AI hanya memberikan edukasi, rekomendasi, insight & reminder. <em>AI TIDAK memberikan diagnosis medis/psikologis.</em>
          </p>
        </div>
      </div>
    </div>
  );
};
