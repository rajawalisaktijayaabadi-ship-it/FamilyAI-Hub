import React from 'react';
import { 
  Utensils, 
  Sparkles, 
  Clock, 
  Flame, 
  CheckCircle2, 
  ShoppingBag, 
  AlertCircle, 
  Calendar, 
  Heart, 
  ChevronRight, 
  Droplet,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { useMealStore } from '../../../stores/useMealStore';
import { useNutritionStore } from '../../../stores/useNutritionStore';

interface MealDashboardTabProps {
  onOpenAIGenerator: () => void;
  onNavigateTab: (tab: 'planner' | 'recipes' | 'nutrition' | 'kitchen') => void;
}

export const MealDashboardTab: React.FC<MealDashboardTabProps> = ({ 
  onOpenAIGenerator,
  onNavigateTab 
}) => {
  const { 
    mealPlans, 
    recipes, 
    ingredients, 
    updateMealPlanStatus, 
    leftovers 
  } = useMealStore();

  const { 
    summary, 
    insights, 
    waterIntakeMl, 
    waterTargetMl, 
    addWaterIntake 
  } = useNutritionStore();

  const todayStr = new Date().toISOString().split('T')[0];
  const todayMeals = mealPlans.filter(mp => mp.date === todayStr || mp.date === '2026-08-01');

  const expiringIngredients = ingredients.filter(i => i.status === 'Mendekati Kedaluwarsa' || i.status === 'Kedaluwarsa');
  const favoriteRecipes = recipes.filter(r => r.isFavorite);

  const calPct = Math.min(100, Math.round((summary.totalCalories / summary.targetCalories) * 100));
  const protPct = Math.min(100, Math.round((summary.proteinGrams / summary.targetProteinGrams) * 100));
  const carbsPct = Math.min(100, Math.round((summary.carbsGrams / summary.targetCarbsGrams) * 100));
  const fatPct = Math.min(100, Math.round((summary.fatGrams / summary.targetFatGrams) * 100));

  return (
    <div className="space-y-6">
      
      {/* Top Banner & AI Recommendation Quick Trigger */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-purple-950 border border-slate-800 rounded-3xl p-6 text-white shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
              Smart Kitchen Hub
            </span>
            <span className="text-xs text-amber-300/80">Menu Harian & Nutrisi Keluarga</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Pusat Perencanaan Makan & Nutrisi Keluarga
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Menyusun menu harian bergizi seimbang, memantau asupan kalori, memaksimalkan stok kulkas, dan memberikan resep sehat ramah anak & lansia.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <button
            onClick={onOpenAIGenerator}
            className="flex-1 lg:flex-initial px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs rounded-2xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>Rekomendasi Menu AI (Kulkas)</span>
          </button>
          
          <button
            onClick={() => onNavigateTab('planner')}
            className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-2xl border border-slate-700 transition-all flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span>Atur Jadwal</span>
          </button>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Today's Menu & Nutrition Progress */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Today's Menu Cards */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-amber-400" />
                  <span>Menu Hari Ini ({todayMeals.length} Makanan)</span>
                </h3>
                <p className="text-xs text-slate-400">Jadwal konsumsi sarapan, makan siang, dan makan malam keluarga.</p>
              </div>

              <button
                onClick={() => onNavigateTab('planner')}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
              >
                <span>Kelola Semua</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {todayMeals.map((mp) => (
                <div 
                  key={mp.id} 
                  className="bg-slate-950 border border-slate-800/80 hover:border-slate-700 p-4 rounded-2xl space-y-3 transition-all relative overflow-hidden group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-amber-400">
                      {mp.category} • {mp.timeString}
                    </span>

                    <button
                      onClick={() => {
                        const nextStatus = mp.status === 'Planned' ? 'Cooking' : mp.status === 'Cooking' ? 'Done' : 'Planned';
                        updateMealPlanStatus(mp.id, nextStatus);
                      }}
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border transition-all ${
                        mp.status === 'Done' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                        mp.status === 'Cooking' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                        'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {mp.status === 'Done' ? 'Selesai' : mp.status === 'Cooking' ? 'Memasak' : 'Terjadwal'}
                    </button>
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors">
                      {mp.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {mp.notes || 'Menu favorit keluarga'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/60 text-slate-400">
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-rose-400" />
                      {mp.estimatedCalories} kcal
                    </span>
                    <span className="text-[11px] font-medium text-slate-300">
                      {mp.assignedMemberName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calories & Nutrition Overview Widget */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-400" />
                  <span>Ringkasan Nutrisi & Kalori Hari Ini</span>
                </h3>
                <p className="text-xs text-slate-400">Progres ketercapaian energi & makronutrisi keluarga.</p>
              </div>

              <button
                onClick={() => onNavigateTab('nutrition')}
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
              >
                <span>Detail Nutrisi</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Calories Progress Meter */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Kalori Harian Terpenuhi:</span>
                <span className="font-mono text-amber-400 font-bold">
                  {summary.totalCalories} / {summary.targetCalories} kcal ({calPct}%)
                </span>
              </div>
              <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div 
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${calPct}%` }}
                />
              </div>
            </div>

            {/* Macros 3 Bar Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold">Protein</span>
                  <span className="text-emerald-400 font-mono font-bold">{summary.proteinGrams}g / {summary.targetProteinGrams}g</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${protPct}%` }} />
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold">Karbohidrat</span>
                  <span className="text-sky-400 font-mono font-bold">{summary.carbsGrams}g / {summary.targetCarbsGrams}g</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full rounded-full" style={{ width: `${carbsPct}%` }} />
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold">Lemak Sehat</span>
                  <span className="text-purple-400 font-mono font-bold">{summary.fatGrams}g / {summary.targetFatGrams}g</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: `${fatPct}%` }} />
                </div>
              </div>
            </div>

            {/* Water Tracker Widget */}
            <div className="bg-gradient-to-r from-sky-950/40 to-slate-950 border border-sky-500/30 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                  <Droplet className="w-5 h-5 fill-sky-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">Hidrasi Air Minum Keluarga</h4>
                  <p className="text-[11px] text-slate-300">
                    Tercapai <span className="font-bold text-sky-300">{waterIntakeMl} ml</span> dari target <span className="font-bold">{waterTargetMl} ml</span>.
                  </p>
                </div>
              </div>

              <button
                onClick={() => addWaterIntake(250)}
                className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+250ml Gelas Air</span>
              </button>
            </div>

          </div>

        </div>

        {/* Right 1 Col: Kitchen Stock, Expiring Alerts & AI Insights */}
        <div className="space-y-6">
          
          {/* Available Ingredients & Expiring Warning */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
                <span>Bahan Kulkas & Pantry</span>
              </h3>
              <button
                onClick={() => onNavigateTab('kitchen')}
                className="text-[11px] text-emerald-400 hover:underline font-semibold"
              >
                Kelola Stok
              </button>
            </div>

            {expiringIngredients.length > 0 && (
              <div className="bg-rose-950/30 border border-rose-500/30 p-3 rounded-2xl text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-rose-300">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Segera Olah (Mendekati Kedaluwarsa)</span>
                </div>
                <p className="text-[11px] text-rose-200/80">
                  {expiringIngredients.map(i => i.name).join(', ')} perlu digunakan dalam 1–2 hari.
                </p>
              </div>
            )}

            <div className="space-y-2">
              {ingredients.slice(0, 5).map((ing) => (
                <div key={ing.id} className="p-2.5 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-200 block">{ing.name}</span>
                    <span className="text-[10px] text-slate-400">{ing.location} • Kadaluwarsa: {ing.expirationDate}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    ing.status === 'Segar' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {ing.quantity} {ing.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Leftovers Reminder */}
          {leftovers.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-amber-400" />
                <span>Sisa Makanan Kulkas ({leftovers.length})</span>
              </h3>

              <div className="space-y-2">
                {leftovers.map((l) => (
                  <div key={l.id} className="p-3 bg-slate-950 border border-amber-500/20 rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{l.foodName}</span>
                      <span className="text-[10px] text-amber-400 font-semibold">{l.portionsLeft} porsi</span>
                    </div>
                    <p className="text-[11px] text-slate-300 italic">{l.usageRecommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Nutrition Insights */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <h3 className="text-sm font-bold text-purple-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>AI Nutrition Insights</span>
            </h3>

            <div className="space-y-2">
              {insights.map((ins) => (
                <div key={ins.id} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-1">
                  <div className="font-bold text-purple-200">{ins.title}</div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{ins.description}</p>
                  {ins.actionableStep && (
                    <div className="text-[10px] font-semibold text-emerald-400 pt-1 border-t border-slate-800">
                      💡 {ins.actionableStep}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
