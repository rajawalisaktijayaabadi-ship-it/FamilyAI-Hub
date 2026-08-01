import React from 'react';
import { 
  Baby, 
  Sparkles, 
  Activity, 
  Clock, 
  Smile, 
  BookOpen, 
  Heart, 
  CheckCircle2 
} from 'lucide-react';
import { usePsychologyStore } from '../stores/usePsychologyStore';

export const ParentingWellnessSubTab: React.FC = () => {
  const { parentingData } = usePsychologyStore();

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/90 border border-indigo-500/30 rounded-3xl p-6 text-white space-y-3 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded-2xl">
            <Baby className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Pengasuhan Positif & Kesejahteraan Orang Tua (Parenting Wellness)</h2>
            <p className="text-xs text-slate-300">
              Menjaga keseimbangan amunisi emosi orang tua dan interaksi berkualitas dengan anak
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        
        {/* Parent Stress Meter */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-2 shadow-xl">
          <div className="text-xs text-slate-400 font-bold uppercase flex items-center justify-between">
            <span>Tingkat Stress Orang Tua</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">{parentingData.parentStressLevel} / 10</div>
          <p className="text-[11px] text-slate-400 font-sans">Kondisi tenang & stabil</p>
        </div>

        {/* Child Interaction Score */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-2 shadow-xl">
          <div className="text-xs text-slate-400 font-bold uppercase flex items-center justify-between">
            <span>Skor Interaksi Anak</span>
            <Heart className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-3xl font-extrabold text-pink-300">{parentingData.childInteractionScore} / 100</div>
          <p className="text-[11px] text-slate-400 font-sans">Koneksi emosional erat</p>
        </div>

        {/* Play Time */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-2 shadow-xl">
          <div className="text-xs text-slate-400 font-bold uppercase flex items-center justify-between">
            <span>Waktu Bermain</span>
            <Smile className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-300">{parentingData.playTimeMinutes} Menit</div>
          <p className="text-[11px] text-slate-400 font-sans">Hari ini bersama anak</p>
        </div>

        {/* Learning Time */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-2 shadow-xl">
          <div className="text-xs text-slate-400 font-bold uppercase flex items-center justify-between">
            <span>Waktu Belajar</span>
            <BookOpen className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-3xl font-extrabold text-sky-300">{parentingData.learningTimeMinutes} Menit</div>
          <p className="text-[11px] text-slate-400 font-sans">Pendampingan efektif</p>
        </div>

      </div>

      {/* Positive Parenting Tips */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>Tips Pengasuhan Positif (Positive Parenting Tips)</span>
        </h3>

        <div className="space-y-3 text-xs">
          {parentingData.tips.map((tip, i) => (
            <div key={i} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-start gap-3 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{tip}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
