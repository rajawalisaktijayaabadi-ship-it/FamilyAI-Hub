import React from 'react';
import { X, BarChart3, TrendingUp, Award, Utensils, CheckCircle2, DollarSign, Calendar, Sparkles } from 'lucide-react';
import { useMealStore } from '../../../stores/useMealStore';
import { useNutritionStore } from '../../../stores/useNutritionStore';

interface MealReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MealReportsModal: React.FC<MealReportsModalProps> = ({ isOpen, onClose }) => {
  const { report, mealPlans } = useMealStore();
  const { summary } = useNutritionStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-900 p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Laporan Analisis Nutrisi & Menu Keluarga</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  Skor: {report.nutritionScore}/100
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                Periode: {report.period}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Menu Terlaksana</span>
              <div className="text-xl font-extrabold text-indigo-400">{report.mealsCompleted} / {report.totalMealsPlanned}</div>
              <span className="text-[10px] text-emerald-400">85% Kepatuhan Plan</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Rata-rata Kalori Harian</span>
              <div className="text-xl font-extrabold text-amber-400">{report.averageDailyCalories} kcal</div>
              <span className="text-[10px] text-slate-400">Target: {summary.targetCalories} kcal</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Tingkat Food Waste</span>
              <div className="text-xl font-extrabold text-emerald-400">{report.foodWastePercentage}%</div>
              <span className="text-[10px] text-emerald-400">Sangat Rendah (Bagus!)</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Estimasi Penghematan</span>
              <div className="text-xl font-extrabold text-teal-400">Rp{(report.estimatedSavingsRupiah / 1000).toFixed(0)}k</div>
              <span className="text-[10px] text-slate-400">Dari Optimasi Kulkas</span>
            </div>
          </div>

          {/* AI Insights Summary */}
          <div className="bg-gradient-to-r from-purple-950/40 to-slate-950 p-5 rounded-2xl border border-purple-500/30 space-y-3">
            <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Insight AI Nutrisi & Efisiensi Dapur:</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-200">
              {report.insights.map((ins, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{ins}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Meal History Table Log */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>Riwayat Makanan Pekan Ini:</span>
            </h4>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-semibold">
                    <th className="p-3">Tanggal / Waktu</th>
                    <th className="p-3">Nama Menu</th>
                    <th className="p-3">Kategori</th>
                    <th className="p-3">Keluarga</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {mealPlans.map((mp) => (
                    <tr key={mp.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3 font-mono text-slate-400">{mp.date} ({mp.timeSlot})</td>
                      <td className="p-3 font-bold text-white">{mp.name}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                          {mp.category}
                        </span>
                      </td>
                      <td className="p-3">{mp.assignedMemberName}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          mp.status === 'Done' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          mp.status === 'Cooking' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {mp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
