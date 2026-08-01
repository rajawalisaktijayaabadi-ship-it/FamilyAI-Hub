import React from 'react';
import { 
  Award, 
  BookOpen, 
  Brain, 
  CheckCircle2, 
  Clock, 
  Heart, 
  Moon, 
  Smile, 
  Sparkles, 
  Star, 
  TrendingUp, 
  Tv, 
  Target,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { Child, GrowthRecord, Milestone, DailyActivity, ScreenTimeRecord, Habit, ChildTask, ParentingInsight, ChildRewardSystem } from '../types';

interface DashboardTabProps {
  child: Child;
  growthRecords: GrowthRecord[];
  milestones: Milestone[];
  dailyActivities: DailyActivity[];
  screenTimeRecords: ScreenTimeRecord[];
  habits: Habit[];
  tasks: ChildTask[];
  rewardSystem?: ChildRewardSystem;
  insight?: ParentingInsight;
  onNavigateTab: (tabKey: string) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  child,
  growthRecords,
  milestones,
  dailyActivities,
  screenTimeRecords,
  habits,
  tasks,
  rewardSystem,
  insight,
  onNavigateTab
}) => {
  // Calculations for dashboard
  const childGrowth = growthRecords.filter((g) => g.childId === child.id)[0];
  const childMilestones = milestones.filter((m) => m.childId === child.id);
  const completedMilestones = childMilestones.filter((m) => m.status === 'Selesai').length;
  const milestoneProgress = childMilestones.length > 0 ? Math.round((completedMilestones / childMilestones.length) * 100) : 0;

  const todayActivities = dailyActivities.filter((a) => a.childId === child.id);
  const totalLearningMins = todayActivities
    .filter((a) => a.category === 'Belajar' || a.category === 'Membaca')
    .reduce((acc, curr) => acc + curr.durationMinutes, 0);

  const todayScreenTime = screenTimeRecords
    .filter((s) => s.childId === child.id)
    .reduce((acc, curr) => acc + curr.durationMinutes, 0);

  const childHabits = habits.filter((h) => h.childId === child.id);
  const todayStr = new Date().toISOString().split('T')[0];
  const habitsDoneToday = childHabits.filter((h) => h.completedDates.includes(todayStr)).length;
  const habitRate = childHabits.length > 0 ? Math.round((habitsDoneToday / childHabits.length) * 100) : 0;

  const upcomingTasks = tasks.filter((t) => t.childId === child.id && !t.completed).slice(0, 4);

  // Calculate Parenting Score (0 - 100)
  const parentingScore = Math.min(100, Math.round(
    (milestoneProgress * 0.3) +
    (habitRate * 0.4) +
    (totalLearningMins > 30 ? 20 : totalLearningMins) +
    (todayScreenTime <= 60 ? 10 : 0)
  ));

  return (
    <div className="space-y-6">
      {/* Top Banner: Child Summary & Parenting Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Child Profile Quick Card */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xl">
          <div className="relative shrink-0">
            <img
              src={child.photo}
              alt={child.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-pink-500/40 shadow-lg"
            />
            <span className="absolute -bottom-2 -right-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20 shadow">
              {child.age} Tahun
            </span>
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold text-white">{child.name}</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-pink-300 font-semibold border border-slate-700">
                {child.school} ({child.grade})
              </span>
            </div>

            <p className="text-xs text-slate-300 line-clamp-2">{child.parentNotes}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Tinggi / Berat</span>
                <span className="font-bold text-slate-100">{childGrowth?.heightCm || 138.5} cm / {childGrowth?.weightKg || 32.4} kg</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Golongan Darah</span>
                <span className="font-bold text-pink-400">{child.bloodType}</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Alergi</span>
                <span className="font-bold text-amber-400 text-[11px] truncate block">{child.allergies.join(', ') || 'Tidak Ada'}</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Level Anak</span>
                <span className="font-bold text-purple-300">{rewardSystem?.levelTitle || 'Bintang Mandiri'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Parenting Score Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-sm">Parenting Score</h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
              Sangat Positif
            </span>
          </div>

          <div className="flex items-center justify-around py-2">
            {/* Progress Ring Simulation */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.8"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-pink-500 transition-all duration-1000 ease-out"
                  strokeDasharray={`${parentingScore}, 100`}
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-white">{parentingScore}</span>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">Poin</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Habit: {habitRate}%</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Target className="w-3.5 h-3.5 text-indigo-400" />
                <span>Milestone: {milestoneProgress}%</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                <span>Belajar: {totalLearningMins} Mnt</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 italic text-center">
            "Orang tua konsisten menjaga habit positif & keterlibatan belajar anak minggu ini."
          </p>
        </div>

      </div>

      {/* 4 Stat Cards: Learning, Screen Time, Sleep, Milestone */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Learning Time */}
        <div 
          onClick={() => onNavigateTab('daily_activity')}
          className="bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-4 space-y-2 cursor-pointer transition-all hover:bg-slate-800/40"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Waktu Belajar Hari Ini</span>
            <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-white">{totalLearningMins} <span className="text-xs font-normal text-slate-400">Menit</span></div>
          <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Target 45 menit tercapai
          </div>
        </div>

        {/* Screen Time */}
        <div 
          onClick={() => onNavigateTab('screen_time')}
          className="bg-slate-900 border border-slate-800 hover:border-pink-500/50 rounded-2xl p-4 space-y-2 cursor-pointer transition-all hover:bg-slate-800/40"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Screen Time Hari Ini</span>
            <div className="p-2 bg-pink-500/10 rounded-xl text-pink-400">
              <Tv className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-white">{todayScreenTime} <span className="text-xs font-normal text-slate-400">Menit</span></div>
          <div className="text-[10px] text-pink-400 font-semibold">
            Batas aman: 60 menit/hari
          </div>
        </div>

        {/* Sleep Summary Placeholder */}
        <div 
          onClick={() => onNavigateTab('daily_activity')}
          className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 space-y-2 cursor-pointer transition-all hover:bg-slate-800/40"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Ringkasan Tidur (Placeholder)</span>
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
              <Moon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-white">8.5 <span className="text-xs font-normal text-slate-400">Jam / Malam</span></div>
          <div className="text-[10px] text-indigo-300 font-semibold">
            Kualitas tidur sangat nyenyak
          </div>
        </div>

        {/* Milestone Progress */}
        <div 
          onClick={() => onNavigateTab('milestones')}
          className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 space-y-2 cursor-pointer transition-all hover:bg-slate-800/40"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Milestone Progress</span>
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-white">{completedMilestones} / {childMilestones.length} <span className="text-xs font-normal text-slate-400">Target</span></div>
          <div className="text-[10px] text-amber-400 font-semibold">
            {milestoneProgress}% selesai sesuai usia
          </div>
        </div>

      </div>

      {/* Main Grid: AI Insight & Activities vs Upcoming Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: AI Parenting Insight + Today's Activity */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Parenting Insight Card */}
          {insight && (
            <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-slate-900 border border-purple-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-400/20 text-amber-300 rounded-xl">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">AI Parenting Insight Hari Ini</h3>
                    <p className="text-[10px] text-purple-300">Rekomendasi pendampingan positif untuk {child.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigateTab('ai_coach')}
                  className="text-xs font-semibold text-purple-300 hover:text-purple-200 underline"
                >
                  Tanya AI Coach →
                </button>
              </div>

              <div className="space-y-2 bg-slate-950/80 p-4 rounded-2xl border border-purple-500/20">
                <h4 className="text-sm font-bold text-purple-200">{insight.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{insight.summary}</p>

                <div className="pt-2 space-y-1.5">
                  <span className="text-[11px] font-bold text-pink-400 block uppercase tracking-wider">Rekomendasi Tindakan Orang Tua:</span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {insight.actionItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-pink-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="text-xs italic text-pink-200 bg-pink-500/10 border border-pink-500/20 p-3 rounded-2xl">
                "{insight.encouragementQuote}"
              </div>
            </div>
          )}

          {/* Today's Activity Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-pink-400" />
                <h3 className="font-bold text-white text-base">Aktivitas Hari Ini</h3>
              </div>
              <button
                onClick={() => onNavigateTab('daily_activity')}
                className="text-xs font-semibold text-pink-400 hover:text-pink-300"
              >
                + Catat Aktivitas
              </button>
            </div>

            {todayActivities.length === 0 ? (
              <div className="text-center py-8 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <Clock className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">Belum ada aktivitas anak dicatat hari ini.</p>
                <button
                  onClick={() => onNavigateTab('daily_activity')}
                  className="px-3 py-1.5 bg-pink-600 text-white text-xs font-bold rounded-xl"
                >
                  Tambah Aktivitas
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {todayActivities.map((act) => (
                  <div key={act.id} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                        {act.category}
                      </span>
                      <span className="text-[10px] text-slate-400">{act.startTime} - {act.endTime || `${act.durationMinutes} mnt`}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white">{act.title}</h4>
                    {act.notes && <p className="text-[11px] text-slate-400 line-clamp-2">{act.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Upcoming Schedule, Tasks & Badges */}
        <div className="space-y-6">
          
          {/* Upcoming Schedule & Tasks */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white text-base">Jadwal & Tugas Anak</h3>
              </div>
              <button
                onClick={() => onNavigateTab('tasks')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Lihat Semua →
              </button>
            </div>

            {upcomingTasks.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">Semua tugas anak telah selesai!</p>
            ) : (
              <div className="space-y-2.5">
                {upcomingTasks.map((t) => (
                  <div key={t.id} className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-start gap-3">
                    <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <h4 className="text-xs font-semibold text-slate-200">{t.title}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span>{t.category}</span>
                        <span>•</span>
                        <span className="text-amber-400">+{t.pointReward} Poin</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Badges & Gamification Showcase */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Pencapaian & Badge</h3>
              </div>
              <button
                onClick={() => onNavigateTab('rewards')}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300"
              >
                Gamifikasi →
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Poin Anak</span>
                <span className="text-2xl font-black text-amber-400">{rewardSystem?.totalPoints || 0} Poin</span>
              </div>
              <div className="text-right space-y-1">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Level Saat Ini</span>
                <span className="text-xs font-bold text-purple-300">Lvl {rewardSystem?.level || 1} ({rewardSystem?.levelTitle})</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {(rewardSystem?.badges || []).slice(0, 4).map((b) => (
                <div key={b.id} className="bg-slate-950 border border-amber-500/30 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-semibold text-amber-200">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{b.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
