import React from 'react';
import {
  TrendingUp,
  BarChart2,
  Clock,
  CheckCircle2,
  BookOpen,
  Award,
  Sparkles,
  Calendar
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import { useEducationStore } from '../../../store/useEducationStore';

interface LearningAnalyticsTabProps {
  childName: string;
}

export const LearningAnalyticsTab: React.FC<LearningAnalyticsTabProps> = ({ childName }) => {
  const { selectedChildId, getAnalyticsForChild } = useEducationStore();
  const analytics = getAnalyticsForChild(selectedChildId);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/20 text-indigo-300 rounded-2xl border border-indigo-500/30">
              <BarChart2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Analisis & Statistik Pembelajaran ({childName})</h2>
              <p className="text-xs text-slate-400">
                Visualisasi tren waktu belajar harian, sebaran nilai mata pelajaran, dan tingkat penyelesaian tugas.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Summary Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
            <p className="text-[11px] text-slate-400">Total Waktu Belajar</p>
            <p className="text-xl font-bold text-white mt-1">
              {(analytics.totalStudyMinutesThisWeek / 60).toFixed(1)} <span className="text-xs text-slate-400 font-normal">Jam / Minggu</span>
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
            <p className="text-[11px] text-slate-400">% Penyelesaian PR</p>
            <p className="text-xl font-bold text-emerald-400 mt-1">{analytics.homeworkCompletionRate}%</p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
            <p className="text-[11px] text-slate-400">Rata-Rata Nilai Rapor</p>
            <p className="text-xl font-bold text-indigo-300 mt-1">{analytics.averageGrade} / 100</p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
            <p className="text-[11px] text-slate-400">Rata-Rata Kuis AI</p>
            <p className="text-xl font-bold text-amber-300 mt-1">{analytics.quizAverageScore} %</p>
          </div>
        </div>
      </div>

      {/* Recharts Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Study Trend */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>Durasi Belajar Harian (Menit)</span>
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
              Minggu Ini
            </span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.weeklyStudyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="minutes" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Durasi (Menit)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Grade Distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <span>Sebaran Nilai Per Mata Pelajaran</span>
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
              Rapor
            </span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.subjectGradeDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="subject" type="category" stroke="#94a3b8" fontSize={11} width={100} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="score" fill="#6366f1" radius={[0, 6, 6, 0]} name="Nilai Rapor" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Grade Progress Trend */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Progres Peningkatan Rata-Rata Nilai Bulanan</span>
            </h3>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.monthlyGradeTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[70, 100]} stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} name="Nilai Rata-rata" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
