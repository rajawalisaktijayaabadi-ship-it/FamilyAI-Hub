import React from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  Calendar as CalendarIcon, 
  Heart, 
  CheckCircle2, 
  Users, 
  Clock, 
  Smile,
  Plus
} from 'lucide-react';
import { usePsychologyStore } from '../stores/usePsychologyStore';

export const CoupleRelationshipSubTab: React.FC = () => {
  const { coupleData } = usePsychologyStore();

  return (
    <div className="space-y-6">
      
      {/* Couple Header Banner */}
      <div className="bg-gradient-to-r from-pink-950/80 via-slate-900 to-purple-950/90 border border-pink-500/30 rounded-3xl p-6 text-white space-y-3 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-pink-500/20 border border-pink-500/30 text-pink-300 rounded-2xl">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                Keharmonisan Pasangan Suami Istri (Couple Relationship)
              </h2>
              <p className="text-xs text-slate-300">
                Merawat keintiman emosional, komunikasi harian, dan pencapaian impian bersama
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/70 px-4 py-2 rounded-2xl border border-slate-800 text-xs font-mono">
            <CalendarIcon className="w-4 h-4 text-pink-400" />
            <span className="text-slate-300">Ulang Tahun Pernikahan:</span>
            <span className="font-bold text-pink-300">{coupleData.daysToAnniversary} Hari Lagi</span>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Relationship Insight & Scores */}
        <div className="space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>AI Relationship Insight</span>
            </h3>
            <p className="text-xs text-slate-200 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
              "{coupleData.relationshipInsight}"
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Skor Komunikasi</div>
                <div className="text-2xl font-extrabold text-pink-300">{coupleData.communicationScore}/100</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Skor Quality Time</div>
                <div className="text-2xl font-extrabold text-purple-300">{coupleData.qualityTimeScore}/100</div>
              </div>
            </div>
          </div>

          {/* Anniversary Special Card */}
          <div className="bg-slate-900/90 border border-pink-500/30 rounded-3xl p-6 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-pink-300 uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-pink-400" /> Reminder Ulang Tahun Pernikahan
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-bold border border-pink-500/30">
                15 Oktober
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Ide Hadiah & Kejutan AI: Sesi makan malam romantis outdoor & album kenangan foto perjalanan bersama.
            </p>
          </div>
        </div>

        {/* Right Column: Shared Activities & Goals */}
        <div className="space-y-4">
          
          {/* Shared Activities */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" />
                <span>Aktivitas Bersama Pasangan (Shared Activities)</span>
              </h3>
            </div>
            <div className="space-y-2">
              {coupleData.sharedActivities.map((act, i) => (
                <div key={i} className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-200 font-semibold">{act}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                    Rutin Mingguan
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Target Keharmonisan Pasangan (Couple Goals)</span>
            </h3>
            <div className="space-y-2">
              {coupleData.goals.map((goal, i) => (
                <div key={i} className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{goal}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
