import React from 'react';
import { 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  ShieldCheck, 
  Award, 
  Star,
  MessageCircle,
  Heart,
  Smile,
  Zap
} from 'lucide-react';
import { usePsychologyStore } from '../stores/usePsychologyStore';

export const FamilyChallengeSubTab: React.FC = () => {
  const { challenges, achievements, toggleChallengeStatus } = usePsychologyStore();

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageCircle': return <MessageCircle className="w-5 h-5 text-amber-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Heart': return <Heart className="w-5 h-5 text-rose-400" />;
      case 'Smile': return <Smile className="w-5 h-5 text-sky-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-purple-400" />;
      default: return <Trophy className="w-5 h-5 text-amber-300" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-purple-950/90 border border-amber-500/30 rounded-3xl p-6 text-white space-y-3 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded-2xl">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Tantangan Keluarga & Sistem Lencana (Family Challenge & Achievements)</h2>
            <p className="text-xs text-slate-300">
              Gamifikasi kebiasaan positif untuk mempererat bonding, disiplin emosi, dan merayakan pencapaian keluarga
            </p>
          </div>
        </div>
      </div>

      {/* Active Challenges List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-400" />
          <span>Tantangan Aktif Keluarga (Family Challenges)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((c) => {
            const progressPercent = Math.round((c.completedDays / c.durationDays) * 100);
            const isDone = c.status === 'completed';

            return (
              <div key={c.id} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                      {c.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> +{c.rewardPoints} Poin
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-white">{c.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{c.description}</p>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Progress Aktivitas</span>
                    <span className="font-bold text-purple-300">{c.completedDays} / {c.durationDays} Hari</span>
                  </div>

                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-purple-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <button
                    onClick={() => toggleChallengeStatus(c.id)}
                    disabled={isDone}
                    className={`w-full py-2.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      isDone
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isDone ? '✓ Tantangan Selesai!' : 'Check-in Progress Hari Ini'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges & Achievements Grid */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-400" />
          <span>Koleksi Lencana Pencapaian (Achievements Badges)</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                ach.unlocked
                  ? 'bg-slate-950 border-purple-500/40 shadow-lg shadow-purple-500/10'
                  : 'bg-slate-950/40 border-slate-800/80 opacity-50 grayscale'
              }`}
            >
              <div className="w-12 h-12 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center mx-auto">
                {getBadgeIcon(ach.badgeIcon)}
              </div>
              <div>
                <div className="font-bold text-xs text-white leading-tight">{ach.title}</div>
                <div className="text-[9px] text-slate-400 mt-0.5">{ach.category}</div>
              </div>
              <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full ${
                ach.unlocked ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
              }`}>
                {ach.unlocked ? 'Tercapai' : 'Terkunci'}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
