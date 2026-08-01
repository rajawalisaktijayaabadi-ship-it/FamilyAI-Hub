import React from 'react';
import {
  BrainCircuit,
  Sparkles,
  TrendingUp,
  Clock,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  Zap,
  Target
} from 'lucide-react';
import { useEducationStore } from '../../../store/useEducationStore';

interface AILearningCoachTabProps {
  childName: string;
  onOpenAiAssistant: () => void;
}

export const AILearningCoachTab: React.FC<AILearningCoachTabProps> = ({ childName, onOpenAiAssistant }) => {
  const { selectedChildId, insights, profiles } = useEducationStore();

  const profile = profiles[selectedChildId];
  const childInsights = insights.filter((i) => i.childId === selectedChildId);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2.5 bg-indigo-500/20 text-amber-300 rounded-2xl border border-indigo-500/30">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">AI Learning Coach ({childName})</h2>
                <p className="text-xs text-indigo-200">
                  Analisis pintar kebiasaan belajar, kecepatan pemahaman, dan waktu fokus terbaik anak.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg transition-all shrink-0"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>Konsultasi AI Coach</span>
          </button>
        </div>
      </div>

      {/* Primary Insight Highlight */}
      {childInsights.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-2">
          <BrainCircuit className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm font-bold text-white">Belum Ada Analisis Baru</p>
          <p className="text-xs text-slate-400">
            Sistem AI akan secara otomatis menghasilkan insight setelah beberapa aktivitas PR & kuis dikerjakan.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {childInsights.map((insight) => (
            <div
              key={insight.id}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-3xl p-6 shadow-xl space-y-4 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                    {insight.category}
                  </span>
                  {insight.scoreImprovement && (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{insight.scoreImprovement}</span>
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400 font-medium">Tanggal: {insight.date}</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-white">{insight.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{insight.summary}</p>
              </div>

              {/* Recommendations Box */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Rekomendasi Langkah Aksi Orangtua & Siswa:</span>
                </span>
                <div className="space-y-2 text-xs text-slate-300 pt-1">
                  {insight.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
