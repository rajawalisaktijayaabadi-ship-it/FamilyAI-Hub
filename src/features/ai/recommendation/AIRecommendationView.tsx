import React from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Calendar, 
  Heart, 
  Gift, 
  ShoppingBag, 
  Activity, 
  CheckCircle2, 
  X,
  ChevronRight
} from 'lucide-react';
import { useRecommendationStore } from '../stores/useRecommendationStore';

export const AIRecommendationView: React.FC = () => {
  const { recommendations, refreshRecommendations, dismissRecommendation } = useRecommendationStore();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart': return <Heart className="w-5 h-5 text-rose-400" />;
      case 'Calendar': return <Calendar className="w-5 h-5 text-indigo-400" />;
      case 'Gift': return <Gift className="w-5 h-5 text-amber-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-emerald-400" />;
      case 'Activity': return <Activity className="w-5 h-5 text-sky-400" />;
      default: return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-xl">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-amber-500 to-indigo-600 rounded-2xl text-white shadow-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span>Smart Recommendation Engine</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold uppercase">
                {recommendations.length} Rekomendasi
              </span>
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">
              Rekomendasi kontekstual cerdas untuk aktivitas, jadwal, dan kesejahteraan keluarga.
            </p>
          </div>
        </div>

        <button
          onClick={refreshRecommendations}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4 text-amber-400" />
          <span>Perbarui Rekomendasi</span>
        </button>
      </div>

      {/* Recommendations Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec) => {
          const priorityStyle = {
            high: 'border-rose-500/40 bg-rose-950/20 text-rose-300',
            medium: 'border-amber-500/40 bg-amber-950/20 text-amber-300',
            low: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
          }[rec.priority];

          return (
            <div
              key={rec.id}
              className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-lg relative group hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                      {getIcon(rec.iconName)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{rec.title}</h4>
                      <div className="text-[10px] text-slate-400">{rec.category} • {rec.date}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => dismissRecommendation(rec.id)}
                    className="p-1 text-slate-500 hover:text-slate-300 rounded-lg"
                    title="Tutup"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800/80">
                  {rec.content}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${priorityStyle}`}>
                  Prioritas: {rec.priority}
                </span>

                <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  <span>Jalankan Tindakan</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
