import React, { useState } from 'react';
import { 
  TrendingUp, 
  Heart, 
  Zap, 
  Activity, 
  Moon, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle,
  Clock,
  ArrowUpRight,
  Wind,
  BookOpen
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useMoodStore } from '../stores/useMoodStore';
import { MoodDisclaimerBanner } from './MoodDisclaimerBanner';
import { MOOD_META_MAP } from '../utils/moodData';

const MOCK_TREND_DATA_7D = [
  { day: 'Sen', happiness: 82, energy: 7.5, stress: 3.5 },
  { day: 'Sel', happiness: 85, energy: 8.0, stress: 3.0 },
  { day: 'Rab', happiness: 78, energy: 6.8, stress: 4.8 },
  { day: 'Kam', happiness: 88, energy: 8.2, stress: 2.8 },
  { day: 'Jum', happiness: 92, energy: 8.8, stress: 2.2 },
  { day: 'Sab', happiness: 95, energy: 9.2, stress: 1.8 },
  { day: 'Min', happiness: 90, energy: 8.5, stress: 2.0 }
];

const MOCK_TREND_DATA_30D = [
  { day: 'Minggu 1', happiness: 80, energy: 7.2, stress: 4.0 },
  { day: 'Minggu 2', happiness: 84, energy: 7.8, stress: 3.2 },
  { day: 'Minggu 3', happiness: 89, energy: 8.4, stress: 2.5 },
  { day: 'Minggu 4', happiness: 91, energy: 8.7, stress: 2.1 }
];

export const MoodOverviewSubTab: React.FC = () => {
  const { 
    wellbeingScore, 
    familyMoods, 
    insights, 
    recommendations, 
    setCheckInModalOpen, 
    setSelectedMemberId,
    setActiveSubTab
  } = useMoodStore();

  const [trendRange, setTrendRange] = useState<'7d' | '30d' | '90d'>('7d');
  const chartData = trendRange === '7d' ? MOCK_TREND_DATA_7D : MOCK_TREND_DATA_30D;

  return (
    <div className="space-y-6">
      
      {/* 1. Disclaimer Banner */}
      <MoodDisclaimerBanner />

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Happiness Score */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-5 space-y-2 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider">Happiness Score</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 font-mono">
            {wellbeingScore.happinessScore} <span className="text-xs text-slate-400 font-sans">/ 100</span>
          </div>
          <div className="text-[11px] text-slate-300 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Kondisi emosi sangat prima</span>
          </div>
        </div>

        {/* Stability Index */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-5 space-y-2 shadow-xl">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider">Indeks Stabilitas</span>
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-indigo-400 font-mono">
            {wellbeingScore.stabilityIndex}%
          </div>
          <div className="text-[11px] text-slate-300">
            Fluktuasi emosi dalam batas wajar
          </div>
        </div>

        {/* Avg Energy & Stress */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-5 space-y-2 shadow-xl">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider">Energi vs Stress</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2 font-mono">
            <span className="text-2xl font-black text-amber-400">{wellbeingScore.energyAvg}⚡</span>
            <span className="text-xs text-slate-500">vs</span>
            <span className="text-xl font-bold text-rose-400">{wellbeingScore.stressLevelAvg}⚡</span>
          </div>
          <div className="text-[11px] text-slate-300">
            Rata-rata energi tinggi, stress rendah
          </div>
        </div>

        {/* Sleep Quality */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-5 space-y-2 shadow-xl">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider">Kualitas Tidur</span>
            <Moon className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-3xl font-black text-sky-400 font-mono">
            {wellbeingScore.sleepAvg} <span className="text-xs text-amber-400 font-sans">★</span>
          </div>
          <div className="text-[11px] text-slate-300">
            Rata-rata tidur 7.5 jam/malam
          </div>
        </div>
      </div>

      {/* 3. Family Mood Overview Cards */}
      <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              <span>Family Mood Overview (Suasana Hati Anggota Keluarga)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Pantau kondisi emosi Ayah, Ibu, Anak, dan Lansia hari ini secara real-time
            </p>
          </div>

          <button
            onClick={() => setActiveSubTab('parent_view')}
            className="px-3.5 py-1.5 bg-indigo-950 hover:bg-indigo-900 text-indigo-300 rounded-xl text-xs font-semibold border border-indigo-500/30 flex items-center gap-1.5 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Parent Monitoring</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {familyMoods.map((member) => {
            const meta = MOOD_META_MAP[member.currentMood] || MOOD_META_MAP.happy;
            const isNeedSupport = member.statusBadge === 'Need Support';

            return (
              <div 
                key={member.memberId}
                className={`bg-slate-950/70 border rounded-2xl p-4 space-y-3 relative overflow-hidden transition-all hover:border-slate-700 ${
                  isNeedSupport ? 'border-rose-500/50 shadow-lg shadow-rose-500/10' : 'border-slate-800'
                }`}
              >
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={member.avatar} 
                      alt={member.memberName} 
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/40" 
                    />
                    <div>
                      <div className="font-bold text-xs text-white leading-tight">{member.memberName}</div>
                      <div className="text-[10px] text-slate-400">{member.detailedRole}</div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isNeedSupport 
                      ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300 animate-pulse' 
                      : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                  }`}>
                    {member.statusBadge}
                  </span>
                </div>

                {/* Mood Tile */}
                <div className={`p-3 rounded-xl border flex items-center justify-between ${meta.color}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{meta.emoji}</span>
                    <div>
                      <div className="text-xs font-bold">{member.moodLabel}</div>
                      <div className="text-[10px] opacity-80">Terakhir: {member.lastCheckIn}</div>
                    </div>
                  </div>
                </div>

                {/* Meters */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <div className="text-[9px] text-slate-400 uppercase">Energi</div>
                    <div className="text-amber-400 font-bold">{member.energyLevel} / 10 ⚡</div>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <div className="text-[9px] text-slate-400 uppercase">Stress</div>
                    <div className="text-rose-400 font-bold">{member.stressLevel} / 10 ⚡</div>
                  </div>
                </div>

                {/* Today's Note */}
                {member.todayNote && (
                  <p className="text-[11px] text-slate-300 italic line-clamp-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800/60">
                    "{member.todayNote}"
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Emotional Trend Chart & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Column */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800/90 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span>Tren Emosi & Kebahagiaan (Emotional Trend)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Visualisasi dinamika kebahagiaan, energi, dan tingkat stress
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setTrendRange('7d')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  trendRange === '7d' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                7 Hari
              </button>
              <button
                onClick={() => setTrendRange('30d')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  trendRange === '30d' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                30 Hari
              </button>
            </div>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHappiness" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="happiness" name="Kebahagiaan" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorHappiness)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-400 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>Skor Kebahagiaan (0 - 100)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span>Level Stress (Tercatat Rendah)</span>
            </div>
          </div>
        </div>

        {/* AI Insights Column */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">AI Mood Insight</h3>
            </div>
            <p className="text-xs text-slate-400">
              Analisis cerdas pola emosional keluarga (Dummy AI Core)
            </p>

            <div className="space-y-3">
              {insights.map((ins) => (
                <div key={ins.id} className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-2xl space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" /> {ins.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{ins.confidence}% match</span>
                  </div>
                  <p className="text-xs text-slate-300">{ins.description}</p>
                  <p className="text-[11px] text-indigo-300 font-medium bg-indigo-950/40 p-2 rounded-xl border border-indigo-500/20">
                    💡 <strong>Saran:</strong> {ins.suggestion}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCheckInModalOpen(true)}
            className="w-full py-2.5 bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-300 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 mt-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Minta Analisis AI Terbaru</span>
          </button>
        </div>

      </div>

      {/* 5. AI Recommendation Grid */}
      <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-400" />
              <span>Rekomendasi Well-being AI Keluarga</span>
            </h3>
            <p className="text-xs text-slate-400">
              Aktivitas terkurasi untuk menjaga harmoni dan kestabilan pikiran seluruh anggota keluarga
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div className="space-y-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
                  {rec.tag} • {rec.estimatedMinutes} Mnt
                </span>
                <h4 className="font-bold text-xs text-white leading-snug">{rec.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{rec.description}</p>
              </div>

              <button
                onClick={() => alert(`Aktivitas "${rec.title}" dijadwalkan!`)}
                className="w-full py-2 bg-slate-900 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-800 transition-all flex items-center justify-center gap-1"
              >
                <span>{rec.actionText}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
