import React from 'react';
import {
  Users,
  Award,
  BookOpen,
  Clock,
  Sparkles,
  TrendingUp,
  BrainCircuit,
  GraduationCap,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useEducationStore } from '../../../store/useEducationStore';

interface ParentEducationDashboardTabProps {
  childName: string;
}

export const ParentEducationDashboardTab: React.FC<ParentEducationDashboardTabProps> = ({ childName }) => {
  const { selectedChildId, getParentSummary } = useEducationStore();
  const summary = getParentSummary(selectedChildId);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/20 text-indigo-300 rounded-2xl border border-indigo-500/30">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Ringkasan Orangtua (Parent Dashboard): {childName}</h2>
            <p className="text-xs text-slate-400">
              Ikhtisar tingkat tinggi kesehatan akademik, progres PR, pencapaian, dan rekomendasi parenting AI.
            </p>
          </div>
        </div>

        {/* 4 Overview Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
            <p className="text-[11px] text-slate-400">Rata-Rata Rapor</p>
            <p className="text-2xl font-black text-white mt-0.5">{summary.overallGPA} <span className="text-xs text-slate-400 font-normal">/ 100</span></p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
            <p className="text-[11px] text-slate-400">Jam Belajar / Minggu</p>
            <p className="text-2xl font-black text-purple-300 mt-0.5">{summary.studyHoursWeekly} Jam</p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
            <p className="text-[11px] text-slate-400">PR Belum Tuntas</p>
            <p className="text-2xl font-black text-rose-300 mt-0.5">{summary.pendingHomeworkCount} Tugas</p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
            <p className="text-[11px] text-slate-400">Ujian Mendatang</p>
            <p className="text-2xl font-black text-amber-300 mt-0.5">{summary.upcomingExamsCount} Ujian</p>
          </div>
        </div>
      </div>

      {/* AI Parenting Advice Box */}
      <div className="bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/50 border border-indigo-500/30 rounded-3xl p-6 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <BrainCircuit className="w-5 h-5" />
          <span>Saran Pendampingan AI Untuk Orangtua</span>
        </div>

        <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-indigo-500/20">
          "{summary.aiCoachAdvice}"
        </p>

        <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Tercatat aman & mendukung perkembangan psikologi positif anak.</span>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Prestasi & Sertifikat Diperoleh</span>
        </h3>

        <div className="space-y-2">
          {summary.recentAchievements.map((ach, idx) => (
            <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-200 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{ach}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
