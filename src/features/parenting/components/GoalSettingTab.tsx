import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Calendar, 
  Clock, 
  Save 
} from 'lucide-react';
import { Child, GoalSetting } from '../types';

interface GoalSettingTabProps {
  child: Child;
  goals: GoalSetting[];
  onAddGoal: (goal: Omit<GoalSetting, 'id' | 'status'>) => void;
  onUpdateGoalProgress: (goalId: string, newValue: number) => void;
}

export const GoalSettingTab: React.FC<GoalSettingTabProps> = ({
  child,
  goals,
  onAddGoal,
  onUpdateGoalProgress
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Literasi & Edukasi');
  const [targetValue, setTargetValue] = useState(10);
  const [currentValue, setCurrentValue] = useState(0);
  const [unit, setUnit] = useState('Buku');
  const [deadline, setDeadline] = useState('2026-08-31');

  const childGoals = goals.filter((g) => g.childId === child.id);

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddGoal({
      childId: child.id,
      title,
      category,
      targetValue: Number(targetValue),
      currentValue: Number(currentValue),
      unit,
      deadline
    });

    setTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-400" />
            <span>Target & Goal Perkembangan Anak</span>
          </h2>
          <p className="text-xs text-slate-400">
            Tetapkan dan pantau target membaca buku, waktu belajar, olahraga, & tidur tepat waktu untuk {child.name}.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold rounded-2xl shadow-lg transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Buat Target Baru</span>
        </button>
      </div>

      {/* Goal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {childGoals.map((goal) => {
          const percent = Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100));
          const isAchieved = goal.status === 'Achieved' || percent >= 100;

          return (
            <div
              key={goal.id}
              className={`p-5 rounded-3xl border transition-all space-y-3 ${
                isAchieved
                  ? 'bg-emerald-950/20 border-emerald-500/40 shadow-xl'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {goal.category}
                </span>

                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  isAchieved ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}>
                  {isAchieved ? 'Tercapai' : `Batas: ${goal.deadline}`}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{goal.title}</h3>
                <div className="flex items-center justify-between text-xs text-slate-300 mt-1">
                  <span>Progres: <strong>{goal.currentValue} / {goal.targetValue} {goal.unit}</strong></span>
                  <span className="font-bold text-emerald-400">{percent}%</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>

              {/* Increment / Decrement Progress Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="text-[10px] text-slate-400">Update Progres:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateGoalProgress(goal.id, goal.currentValue - 1)}
                    className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-bold flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-bold text-white px-1">{goal.currentValue}</span>
                  <button
                    onClick={() => onUpdateGoalProgress(goal.id, goal.currentValue + 1)}
                    className="w-7 h-7 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold flex items-center justify-center shadow"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Add Goal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl text-xs">
            <h3 className="text-base font-bold text-white">Buat Target / Goal Perkembangan</h3>

            <form onSubmit={handleCreateGoal} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Judul Target</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  placeholder="mis. Membaca 10 Buku Sains..."
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Kategori Target</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  placeholder="Literasi, Kesehatan, Kedisiplinan..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Nilai Target</label>
                  <input
                    type="number"
                    required
                    value={targetValue}
                    onChange={(e) => setTargetValue(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Satuan (Unit)</label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                    placeholder="Buku, Sesi, Hari, Kali..."
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Tenggat Waktu (Deadline)</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-pink-600 text-white font-bold rounded-xl shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Target</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
