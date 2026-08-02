import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Brain, 
  Lightbulb, 
  Activity, 
  Target, 
  Sparkles 
} from 'lucide-react';
import { useInsightStore } from '../stores/useInsightStore';

export const AIInsightCenter: React.FC = () => {
  const { insights } = useInsightStore();

  return (
    <div className="space-y-6">
      
      {/* Insight Center Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/20 text-indigo-300 rounded-2xl border border-indigo-500/30">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>AI Multi-Module Insight Engine</span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-500/30 font-bold">
                Cross-Domain Intelligence
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Analisis tren mendalam dari gabungan data Keuangan, Kesehatan, Edukasi, Asuransi, & Nutrisi.
            </p>
          </div>
        </div>
      </div>

      {/* Insights Stream Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((ins) => {
          const isWarning = ins.type === 'risk_warning';
          const isPositive = ins.type === 'positive_pattern';

          return (
            <div
              key={ins.id}
              className={`p-6 rounded-3xl border transition-all space-y-4 shadow-xl flex flex-col justify-between ${
                isWarning ? 'bg-rose-950/30 border-rose-800/50 hover:border-rose-500' :
                isPositive ? 'bg-emerald-950/30 border-emerald-800/50 hover:border-emerald-500' :
                'bg-slate-950 border-slate-800 hover:border-indigo-500'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                    isWarning ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
                    isPositive ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                    'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                  }`}>
                    {ins.category} • {ins.type.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className="text-[10px] text-slate-400">{ins.date}</span>
                </div>

                <h4 className="font-bold text-white text-base leading-snug">{ins.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{ins.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Metrik Data:</span>
                  <span className="font-extrabold text-amber-300">{ins.dataMetric}</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-indigo-400 block uppercase">Rekomendasi AI:</span>
                  <p>{ins.recommendation}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
