import React from 'react';
import { 
  Apple, Flame, PieChart, Sparkles, ChevronRight, 
  Utensils, CheckCircle2 
} from 'lucide-react';
import { useHealthStore } from '../../../store/useHealthStore';
import { FamilyMember } from '../../../types';

interface NutritionSummaryTabProps {
  familyMembers: FamilyMember[];
  activeMemberId: string;
}

export const NutritionSummaryTab: React.FC<NutritionSummaryTabProps> = ({
  familyMembers,
  activeMemberId,
}) => {
  const selectedMemberId = activeMemberId === 'all' ? 'm1' : activeMemberId;
  const currentMember = familyMembers.find(m => m.id === selectedMemberId) || familyMembers[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Apple className="w-5 h-5 text-emerald-400" />
            <span>Nutrition & Macro Nutrient Summary</span>
          </h3>
          <p className="text-xs text-slate-400">
            Analisis asupan kalori, protein, karbohidrat, lemak sehat, vitamin, dan mineral harian.
          </p>
        </div>

        <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold self-start md:self-center">
          Terintegrasi dengan Meal Planner
        </span>
      </div>

      {/* Main Macro Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Kalori</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-white">1,850</span>
            <span className="text-xs text-slate-400 font-semibold">/ 2,200 kcal</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-amber-400 h-full rounded-full w-[84%]" />
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Protein</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-rose-400">85</span>
            <span className="text-xs text-slate-400 font-semibold">/ 100 gram</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-rose-500 h-full rounded-full w-[85%]" />
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Karbohidrat</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-cyan-400">210</span>
            <span className="text-xs text-slate-400 font-semibold">/ 250 gram</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-cyan-500 h-full rounded-full w-[84%]" />
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Lemak Sehat</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-purple-400">55</span>
            <span className="text-xs text-slate-400 font-semibold">/ 65 gram</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-purple-500 h-full rounded-full w-[84%]" />
          </div>
        </div>

      </div>

      {/* Micro Nutrients & Vitamins List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h4 className="font-bold text-white text-sm flex items-center gap-2 border-b border-slate-800 pb-3">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Mikronutrien & Vitamin Terpenuhi Hari Ini ({currentMember.name})</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-400 uppercase tracking-wider block">Asupan Vitamin</span>
            <div className="flex flex-wrap gap-2">
              {['Vitamin C (Jeruk & Brokoli)', 'Vitamin D3 (Sinar Pagi)', 'B-Complex (Telur & Gandum)'].map((v, i) => (
                <span key={i} className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
                  ✓ {v}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <span className="font-bold text-cyan-400 uppercase tracking-wider block">Mineral Esensial</span>
            <div className="flex flex-wrap gap-2">
              {['Kalium (Pisang & Alpukat)', 'Kalsium (Susu Low Fat)', 'Magnesium (Kacang Almond)'].map((m, i) => (
                <span key={i} className="px-3 py-1 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold">
                  ✓ {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
