import React, { useState } from 'react';
import { 
  Heart, 
  Flame, 
  Award, 
  Sparkles, 
  ShieldAlert, 
  Plus, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  BarChart2, 
  Info,
  Droplet
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { useMealStore } from '../../../stores/useMealStore';
import { useNutritionStore } from '../../../stores/useNutritionStore';
import { SpecialDietCategory } from '../../../types';

export const NutritionCenterTab: React.FC = () => {
  const { familyPreferences, updatePreference } = useMealStore();
  const { summary, insights, activeSpecialDiet, setActiveSpecialDiet } = useNutritionStore();

  const [selectedMemberId, setSelectedMemberId] = useState<string>(familyPreferences[0]?.id || 'pref-1');

  const specialDiets: SpecialDietCategory[] = [
    'Rendah Gula', 'Rendah Garam', 'Tinggi Protein', 'Vegetarian', 'Vegan', 'Bebas Gluten', 'Rendah Lemak', 'Custom'
  ];

  const weeklyNutriData = [
    { day: 'Sen', calories: 1950, target: 2100, protein: 110 },
    { day: 'Sel', calories: 2020, target: 2100, protein: 118 },
    { day: 'Rab', calories: 1890, target: 2100, protein: 105 },
    { day: 'Kam', calories: 2150, target: 2100, protein: 125 },
    { day: 'Jum', calories: 1980, target: 2100, protein: 115 },
    { day: 'Sab', calories: 2200, target: 2100, protein: 130 },
    { day: 'Min', calories: 1270, target: 2100, protein: 106 }
  ];

  const currentPref = familyPreferences.find(p => p.id === selectedMemberId) || familyPreferences[0];

  return (
    <div className="space-y-6">
      
      {/* Disclaimer Banner Required by Prompt 13 */}
      <div className="p-4 bg-amber-950/30 border border-amber-500/40 rounded-3xl text-xs text-amber-200 leading-relaxed flex items-start gap-3 shadow-lg">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white block text-sm mb-0.5">Penting - Edukasi Nutrisi Keluarga:</span>
          AI Nutrition Center berfungsi memberikan edukasi pola makan seimbang, rekap asupan nutrisi harian, dan saran variasi menu umum. AI tidak memberikan diagnosis medis, terapi gizi klinik, atau diet pengobatan penyakit berat.
        </div>
      </div>

      {/* Top Special Diet Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>Kategori Diet Spesial Keluarga</span>
          </h4>
          <span className="text-xs text-slate-400">Pilih mode diet untuk memfilter resep</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setActiveSpecialDiet('Semua')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              activeSpecialDiet === 'Semua'
                ? 'bg-rose-500 text-white border-rose-400 shadow-md'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            Semua Diet
          </button>
          {specialDiets.map((diet) => (
            <button
              key={diet}
              onClick={() => setActiveSpecialDiet(diet)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                activeSpecialDiet === diet
                  ? 'bg-rose-500 text-white border-rose-400 shadow-md'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              {diet}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Section: Macros Breakdown & Recharts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Recharts Weekly Intake & Detailed Nutrients */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Weekly Calorie Recharts Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-indigo-400" />
                  <span>Tren Asupan Kalori Harian (Pekan Ini)</span>
                </h3>
                <p className="text-xs text-slate-400">Target Rata-rata: {summary.targetCalories} kcal/hari</p>
              </div>

              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Sangat Seimbang
              </span>
            </div>

            <div className="h-60 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyNutriData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px', color: '#fff' }}
                  />
                  <Bar dataKey="calories" radius={[6, 6, 0, 0]}>
                    {weeklyNutriData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.calories > entry.target ? '#f43f5e' : '#6366f1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Vitamins & Minerals Detailed Cards */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Mikronutrisi: Vitamin & Mineral Hari Ini</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Vitamins */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Vitamin Utama</span>
                <div className="space-y-2 text-xs">
                  {summary.vitamins.map((v, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-slate-300">
                        <span>{v.name} ({v.amount})</span>
                        <span className="font-bold text-amber-400">{v.percentageOfDay}%</span>
                      </div>
                      <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full rounded-full" style={{ width: `${v.percentageOfDay}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Minerals */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">Mineral Esensial</span>
                <div className="space-y-2 text-xs">
                  {summary.minerals.map((m, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-slate-300">
                        <span>{m.name} ({m.amount})</span>
                        <span className="font-bold text-teal-400">{m.percentageOfDay}%</span>
                      </div>
                      <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-teal-400 h-full rounded-full" style={{ width: `${m.percentageOfDay}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right 1 Col: Family Food Preferences & Allergies */}
        <div className="space-y-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-400" />
              <span>Preferensi & Alergi Anggota Keluarga</span>
            </h3>

            {/* Member Selector Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {familyPreferences.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedMemberId(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedMemberId === p.id 
                      ? 'bg-indigo-600 text-white shadow' 
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {p.memberName}
                </button>
              ))}
            </div>

            {/* Current Selected Member Details */}
            {currentPref && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4 text-xs">
                <div>
                  <span className="font-bold text-amber-400 block mb-1">Makanan Favorit:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentPref.favoriteFoods.map((f, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        ❤️ {f}
                      </span>
                    ))}
                  </div>
                </div>

                {currentPref.allergies.length > 0 && (
                  <div>
                    <span className="font-bold text-rose-400 block mb-1">Alergi Makanan (Penting):</span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentPref.allergies.map((a, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold flex items-center gap-1">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <span className="font-bold text-purple-400 block mb-1">Pantangan / Batasan Diet:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentPref.restrictions.map((r, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        🚫 {r}
                      </span>
                    ))}
                  </div>
                </div>

                {currentPref.childPreferences && (
                  <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded-xl text-purple-200">
                    <span className="font-bold block text-purple-300">Catatan Anak:</span>
                    <span>{currentPref.childPreferences}</span>
                  </div>
                )}

                {currentPref.seniorPreferences && (
                  <div className="p-3 bg-cyan-950/30 border border-cyan-500/30 rounded-xl text-cyan-200">
                    <span className="font-bold block text-cyan-300">Catatan Lansia:</span>
                    <span>{currentPref.seniorPreferences}</span>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
