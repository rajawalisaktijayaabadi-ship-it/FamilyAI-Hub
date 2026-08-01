import React from 'react';
import { 
  Trophy, 
  Award, 
  Star, 
  Coins, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  ShieldCheck 
} from 'lucide-react';
import { Child, ChildRewardSystem, GoalSetting } from '../types';

interface AchievementDashboardTabProps {
  child: Child;
  rewardSystem?: ChildRewardSystem;
  goals: GoalSetting[];
}

export const AchievementDashboardTab: React.FC<AchievementDashboardTabProps> = ({
  child,
  rewardSystem,
  goals
}) => {
  const totalPoints = rewardSystem?.totalPoints || 480;
  const coins = rewardSystem?.coins || 120;
  const level = rewardSystem?.level || 5;
  const levelTitle = rewardSystem?.levelTitle || 'Bintang Mandiri Cilik';
  const badges = rewardSystem?.badges || [];

  const childGoals = goals.filter((g) => g.childId === child.id);
  const completedGoals = childGoals.filter((g) => g.status === 'Achieved').length;

  const challenges = [
    { title: 'Tantangan Membaca 7 Hari Berturut-turut', reward: 100, progress: '5 / 7 Hari', completed: false },
    { title: 'Bebas Layar Saat Makan Malam Selama Seminggu', reward: 80, progress: '7 / 7 Hari', completed: true },
    { title: 'Bangun Pagi & Merapikan Tempat Tidur Tepat Waktu', reward: 90, progress: '6 / 7 Hari', completed: false }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-purple-950 to-slate-900 border border-amber-500/30 rounded-3xl p-6 text-white space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Trophy className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold">Dashboard Pencapaian & Achievement {child.name}</h2>
            </div>
            <p className="text-xs text-purple-200">
              Pantau akumulasi poin, level perkembangan, lencana keberhasilan, & tantangan keluarga.
            </p>
          </div>

          <div className="px-4 py-2 bg-amber-500/20 border border-amber-500/40 rounded-2xl text-amber-300 font-bold text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{levelTitle}</span>
          </div>
        </div>
      </div>

      {/* 4 Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Total Poin Terkumpul</span>
          <div className="text-2xl font-black text-amber-400">{totalPoints} <span className="text-xs font-normal text-slate-400">Poin</span></div>
          <span className="text-[10px] text-emerald-400 font-bold">+45 Poin minggu ini</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Level Karakter</span>
          <div className="text-2xl font-black text-purple-300">Level {level}</div>
          <span className="text-[10px] text-slate-400">{levelTitle}</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Lencana (Badges)</span>
          <div className="text-2xl font-black text-pink-400">{badges.length} <span className="text-xs font-normal text-slate-400">Badge</span></div>
          <span className="text-[10px] text-emerald-400 font-bold">Terbuka semua</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Goal Selesai</span>
          <div className="text-2xl font-black text-emerald-400">{completedGoals} / {childGoals.length}</div>
          <span className="text-[10px] text-slate-400">Target perkembangan</span>
        </div>
      </div>

      {/* Active Challenges */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">Tantangan Harian & Mingguan (Active Challenges)</h3>
        </div>

        <div className="space-y-3">
          {challenges.map((ch, i) => (
            <div key={i} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{ch.title}</span>
                  {ch.completed && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Selesai
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400">Progres: {ch.progress}</span>
              </div>

              <div className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20 shrink-0">
                +{ch.reward} Poin Bonus
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
