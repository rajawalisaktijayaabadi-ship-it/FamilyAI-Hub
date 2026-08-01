import React from 'react';
import { 
  Brain, 
  TrendingUp, 
  Sparkles, 
  Heart, 
  MessageCircle, 
  Users, 
  Activity, 
  Smile, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  ShieldCheck,
  Calendar as CalendarIcon
} from 'lucide-react';
import { usePsychologyStore } from '../stores/usePsychologyStore';

export const PsychologyDashboardSubTab: React.FC = () => {
  const { wellnessScore, reports, assessmentResults, challenges } = usePsychologyStore();

  const recommendations = [
    { category: 'Communication', text: 'Gunakan metode "Saya merasa..." saat menyampaikan masukan kepada pasangan.', priority: 'High' },
    { category: 'Relationship', text: 'Pertahankan sesi kencan 30 menit tanpa gadget setiap Jumat malam.', priority: 'Medium' },
    { category: 'Parenting', text: 'Berikan apresiasi khusus saat anak menyelesaikan tugas sekolah secara mandiri.', priority: 'High' },
    { category: 'Self Care', text: 'Alokasikan waktu 15 menit istirahat tenang setelah jam kerja.', priority: 'Medium' },
    { category: 'Family Time', text: 'Agendakan jalan sehat pagi bersama hari Minggu ini.', priority: 'Medium' },
    { category: 'Gratitude', text: 'Tuliskan 1 hal yang disyukuri dalam jurnal sebelum tidur.', priority: 'Low' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Main Score Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Card 1: Family Wellness Score */}
        <div className="lg:col-span-2 bg-gradient-to-br from-purple-950/80 via-slate-900 to-indigo-950/90 border border-purple-500/30 rounded-3xl p-6 text-white space-y-4 shadow-xl backdrop-blur-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider">
              <Brain className="w-4 h-4 text-purple-400" />
              <span>Family Wellness Score</span>
            </div>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +{wellnessScore.weeklyChange}% Minggu Ini
            </span>
          </div>

          <div className="flex items-end gap-4">
            <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-emerald-300 font-mono">
              {wellnessScore.overallScore}
            </div>
            <div className="text-xs text-slate-300 pb-1">
              <div className="font-bold text-emerald-400 text-sm">Status: Sangat Sehat</div>
              <div>Berdasarkan Mood, Activity, Journal, & Calendar</div>
            </div>
          </div>

          {/* Breakdown Mini Bars */}
          <div className="space-y-2 pt-2 border-t border-purple-500/20 text-xs">
            <div className="text-[11px] font-semibold text-slate-300 mb-1">Komponen Penilaian AI:</div>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300 font-mono">
              <div className="flex justify-between bg-slate-950/60 p-1.5 rounded-lg border border-slate-800">
                <span>Mood Check-in</span>
                <span className="text-emerald-400 font-bold">{wellnessScore.breakdown.moodCheckinScore}%</span>
              </div>
              <div className="flex justify-between bg-slate-950/60 p-1.5 rounded-lg border border-slate-800">
                <span>Quality Time</span>
                <span className="text-indigo-400 font-bold">{wellnessScore.breakdown.qualityTimeScore}%</span>
              </div>
              <div className="flex justify-between bg-slate-950/60 p-1.5 rounded-lg border border-slate-800">
                <span>Family Activity</span>
                <span className="text-purple-400 font-bold">{wellnessScore.breakdown.familyActivityScore}%</span>
              </div>
              <div className="flex justify-between bg-slate-950/60 p-1.5 rounded-lg border border-slate-800">
                <span>Communication</span>
                <span className="text-amber-400 font-bold">{wellnessScore.breakdown.communicationActivityScore}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Communication Score */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-amber-400" /> Communication
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
              Empatis
            </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white font-mono">{wellnessScore.communicationScore}/100</div>
            <p className="text-[11px] text-slate-400 mt-1">Saling mendengar aktif & minim interupsi</p>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full" style={{ width: `${wellnessScore.communicationScore}%` }} />
          </div>
        </div>

        {/* Card 3: Quality Time Score */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-indigo-400" /> Quality Time
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
              Keluarga
            </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white font-mono">{wellnessScore.qualityTimeScore}/100</div>
            <p className="text-[11px] text-slate-400 mt-1">Interaksi tatap muka tanpa gadget</p>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-400 h-full rounded-full" style={{ width: `${wellnessScore.qualityTimeScore}%` }} />
          </div>
        </div>

        {/* Card 4: Stress Indicator */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-400" /> Indikator Stress
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
              Rendah
            </span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{wellnessScore.stressIndicator}%</div>
            <p className="text-[11px] text-slate-400 mt-1">Tingkat ketegangan rumah tangga stabil</p>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-300 h-full rounded-full" style={{ width: `${wellnessScore.stressIndicator}%` }} />
          </div>
        </div>

      </div>

      {/* AI Wellness Insight Section */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-base font-bold text-white">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>AI Wellness Insight & Analisis Tren Bulanan</span>
          </div>
          <span className="text-xs text-indigo-300 font-mono">Updated Today</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 space-y-2">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Insight Mingguan
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              "Komunikasi keluarga terlihat semakin hangat minggu ini. Inisiatif mendengarkan tanpa interupsi dan sesi makan malam bebas gadget berhasil menurunkan gesekan komunikasi sebesar 25%."
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 space-y-2">
            <div className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> Insight Bulanan
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              "Kualitas waktu bersama meningkat secara konsisten. Pertahankan rutinitas jalan sehat pagi hari Minggu dan refleksi ucapan syukur sebelum tidur untuk menjaga daya tahan emosi keluarga."
            </p>
          </div>
        </div>
      </div>

      {/* AI Recommendations Grid */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          <span>Rekomendasi Tindakan AI (AI Recommendations)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {recommendations.map((rec, i) => (
            <div key={i} className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 space-y-2 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold">
                  {rec.category}
                </span>
                <span className={`text-[10px] font-bold ${
                  rec.priority === 'High' ? 'text-rose-400' : 'text-amber-400'
                }`}>
                  {rec.priority} Priority
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">{rec.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Wellness Timeline */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-sky-400" />
          <span>Timeline Aktivitas Kesejahteraan (Wellness Timeline)</span>
        </h3>

        <div className="space-y-3 text-xs">
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 flex items-start gap-3">
            <span className="text-lg">😊</span>
            <div>
              <div className="font-bold text-slate-200">Selesai Menulis Refleksi Ucapan Syukur</div>
              <div className="text-[10px] text-slate-400">Budi Santoso • Hari Ini pukul 20:30 WIB</div>
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 flex items-start gap-3">
            <span className="text-lg">🏆</span>
            <div>
              <div className="font-bold text-slate-200">Mencapai Badge "Healthy Communication"</div>
              <div className="text-[10px] text-slate-400">Tantangan No Gadget Dinner berhasil diselesaikan 5 hari berturut-turut</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
