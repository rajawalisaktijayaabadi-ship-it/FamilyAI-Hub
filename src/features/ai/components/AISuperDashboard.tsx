import React from 'react';
import { 
  Sparkles, 
  Brain, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RefreshCw, 
  TrendingUp, 
  Heart, 
  Calendar, 
  DollarSign, 
  ShoppingBag, 
  Utensils, 
  GraduationCap, 
  Smile, 
  Activity 
} from 'lucide-react';
import { useAIStore } from '../stores/useAIStore';

export const AISuperDashboard: React.FC = () => {
  const { 
    todayBriefing, 
    recommendations, 
    priorities, 
    notifications, 
    familyWellnessScore, 
    aiConfidenceScore, 
    isGeneratingAI, 
    togglePriority, 
    markRecommendationApplied,
    refreshSuperAIDashboard 
  } = useAIStore();

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Refresh Trigger */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-indigo-800/40 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-indigo-500/20 text-indigo-300 rounded-xl border border-indigo-500/30">
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              </span>
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Super AI Executive Briefing</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {todayBriefing.greetingText}
            </h3>
            <p className="text-xs text-slate-300">
              Analisis waktu nyata dari 16 modul terintegrasi FamilyAI Hub: Kesehatan, Keuangan, Nutrisi, Kalender, & Rumah Pintar.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-2xl text-center min-w-[120px]">
              <div className="text-2xl font-black text-emerald-400">{familyWellnessScore}/100</div>
              <div className="text-[10px] text-slate-400 font-medium">Family Wellness</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-2xl text-center min-w-[120px]">
              <div className="text-2xl font-black text-amber-400">{aiConfidenceScore}%</div>
              <div className="text-[10px] text-slate-400 font-medium">AI Confidence</div>
            </div>

            <button
              onClick={() => refreshSuperAIDashboard()}
              disabled={isGeneratingAI}
              className="w-full sm:w-auto px-5 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all border border-indigo-400/30"
            >
              <RefreshCw className={`w-4 h-4 ${isGeneratingAI ? 'animate-spin' : ''}`} />
              <span>{isGeneratingAI ? 'Menganalisis...' : 'Perbarui AI Engine'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid Overview: Daily Briefings & Decision Support */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Briefing Bullet Notes */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="font-bold text-white text-base flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-400" />
              <span>Ringkasan & Sorotan Harian AI</span>
            </h4>
            <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              Hari Ini ({todayBriefing.date})
            </span>
          </div>

          <div className="space-y-3">
            {(todayBriefing?.bulletBriefings || []).map((note, idx) => (
              <div key={idx} className="p-3.5 bg-slate-950 border border-slate-800/80 rounded-2xl flex items-start gap-3 hover:border-indigo-500/40 transition-all">
                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl mt-0.5">
                  <Activity className="w-4 h-4" />
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {note}
                </p>
              </div>
            ))}
          </div>

          {/* Decision Support Section */}
          <div className="pt-2">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>AI Decision Support (Dukungan Keputusan)</span>
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(todayBriefing?.decisionSupportNotes || []).map((item, idx) => (
                <div key={idx} className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-white">{item.topic}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'Aman' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      item.status === 'Perhatian' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {item.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Priority Tasks & Quick Checklist */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-white text-base flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <span>Prioritas Utama Hari Ini</span>
              </h4>
              <span className="text-xs font-semibold text-amber-400">
                {priorities.filter(p => p.isDone).length}/{priorities.length} Selesai
              </span>
            </div>

            <div className="space-y-2.5 mt-4">
              {priorities.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => togglePriority(item.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    item.isDone 
                      ? 'bg-slate-950/50 border-slate-800/50 text-slate-500 line-through' 
                      : 'bg-slate-950 border-slate-800 hover:border-amber-500/40 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                      item.isDone ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-700 bg-slate-900'
                    }`}>
                      {item.isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className="text-xs font-semibold">{item.title}</div>
                      <span className="text-[10px] text-slate-400">{item.category}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.priority === 'Tinggi' ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <div className="bg-gradient-to-r from-indigo-950 to-slate-950 p-3.5 rounded-2xl border border-indigo-800/30 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-indigo-400 shrink-0" />
              <div className="text-xs text-slate-300">
                Otomasi AI berjalan aktif. Tugas rutin akan diperbarui secara otomatis.
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Multi-Module Reminders Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-rose-400">
            <Heart className="w-5 h-5" />
            <span className="text-[10px] font-bold bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full">Kesehatan</span>
          </div>
          <div className="text-xs font-bold text-white">Kontrol Gigi & Vitamin</div>
          <p className="text-[10px] text-slate-400">Suplemen kalsium anak siap di konsumsi pagi ini.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-emerald-400">
            <DollarSign className="w-5 h-5" />
            <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">Keuangan</span>
          </div>
          <div className="text-xs font-bold text-white">Premi Asuransi</div>
          <p className="text-[10px] text-slate-400">Jatuh tempo besok Rp 1.250.000.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <ShoppingBag className="w-5 h-5" />
            <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">Belanja</span>
          </div>
          <div className="text-xs font-bold text-white">Stok Susu Dapur</div>
          <p className="text-[10px] text-slate-400">Susu tersisa 1 kotak, perlu dibeli.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-sky-400">
            <Utensils className="w-5 h-5" />
            <span className="text-[10px] font-bold bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full">Nutrisi</span>
          </div>
          <div className="text-xs font-bold text-white">Menu Malam AI</div>
          <p className="text-[10px] text-slate-400">Sup Ayam Brokoli tinggi protein.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-purple-400">
            <GraduationCap className="w-5 h-5" />
            <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">Edukasi</span>
          </div>
          <div className="text-xs font-bold text-white">Ujian Matematika</div>
          <p className="text-[10px] text-slate-400">Sesi ujian jam 09:00 WIB.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-amber-300">
            <Smile className="w-5 h-5" />
            <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">Mood</span>
          </div>
          <div className="text-xs font-bold text-white">Kondisi Harmonis</div>
          <p className="text-[10px] text-slate-400">88% mood energi positif harian.</p>
        </div>
      </div>

      {/* AI Recommendations Engine Highlights */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h4 className="font-bold text-white text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Rekomendasi Cerdas Terpilih AI Engine</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">Saran proaktif berdasarkan pola aktivitas & kebutuhan keluarga</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.slice(0, 4).map((rec) => (
            <div key={rec.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 hover:border-indigo-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {rec.category} • {rec.relatedModule}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    rec.impactLevel === 'Tinggi' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    Dampak: {rec.impactLevel}
                  </span>
                </div>
                <h5 className="font-bold text-white text-sm">{rec.title}</h5>
                <p className="text-xs text-slate-300">{rec.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">Oleh: {rec.suggestedBy}</span>
                <button
                  onClick={() => markRecommendationApplied(rec.id)}
                  disabled={rec.isApplied}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                    rec.isApplied 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  }`}
                >
                  {rec.isApplied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Telah Diterapkan</span>
                    </>
                  ) : (
                    <>
                      <span>Terapkan Rekomendasi</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
