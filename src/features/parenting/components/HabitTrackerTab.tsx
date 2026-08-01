import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Flame, 
  Plus, 
  Sparkles, 
  Sun, 
  Moon, 
  BookOpen, 
  Droplet, 
  Bed, 
  Activity, 
  Award,
  Save
} from 'lucide-react';
import { Child, Habit } from '../types';

interface HabitTrackerTabProps {
  child: Child;
  habits: Habit[];
  onToggleHabitCheckin: (habitId: string, dateStr: string) => void;
  onAddHabit: (habit: Omit<Habit, 'id' | 'currentStreak' | 'bestStreak' | 'completedDates'>) => void;
}

export const HabitTrackerTab: React.FC<HabitTrackerTabProps> = ({
  child,
  habits,
  onToggleHabitCheckin,
  onAddHabit
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [pointReward, setPointReward] = useState(15);
  const [category, setCategory] = useState('Kedisiplinan');

  const todayStr = new Date().toISOString().split('T')[0];
  const childHabits = habits.filter((h) => h.childId === child.id);

  const predefinedHabits = [
    { name: 'Bangun Pagi Pukul 05.00', icon: Sun, category: 'Disiplin', reward: 15 },
    { name: 'Merapikan Tempat Tidur', icon: Bed, category: 'Membantu Rumah', reward: 10 },
    { name: 'Sikat Gigi Sebelum Tidur', icon: Sparkles, category: 'Kesehatan', reward: 10 },
    { name: 'Belajar 30 Menit', icon: BookOpen, category: 'Edukasi', reward: 20 },
    { name: 'Membaca Buku 20 Menit', icon: BookOpen, category: 'Literasi', reward: 20 },
    { name: 'Olahraga Sore', icon: Activity, category: 'Kesehatan', reward: 15 },
    { name: 'Minum Air Putih 8 Gelas', icon: Droplet, category: 'Kesehatan', reward: 10 },
    { name: 'Tidur Tepat Waktu < 21.00', icon: Moon, category: 'Kedisiplinan', reward: 15 }
  ];

  const handleCreateHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddHabit({
      childId: child.id,
      name,
      iconName: 'Sparkles',
      targetFrequency: 'Daily',
      pointReward: Number(pointReward),
      category
    });

    setName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <span>Habit Tracker & Pembiasaan Karakter Positif</span>
          </h2>
          <p className="text-xs text-slate-400">
            Checklist harian kebiasaan baik {child.name}. Bangun streak & dapatkan poin reward untuk setiap habit!
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold rounded-2xl shadow-lg transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah Habit Baru</span>
        </button>
      </div>

      {/* Predefined Quick Add Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3">
        <h3 className="text-xs font-bold text-pink-300 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Rekomendasi Kebiasaan Baik Sesuai Usia {child.age} Tahun:</span>
        </h3>

        <div className="flex flex-wrap gap-2">
          {predefinedHabits.map((pHabit, idx) => (
            <button
              key={idx}
              onClick={() => {
                onAddHabit({
                  childId: child.id,
                  name: pHabit.name,
                  iconName: 'Sparkles',
                  targetFrequency: 'Daily',
                  pointReward: pHabit.reward,
                  category: pHabit.category
                });
              }}
              className="px-3 py-1.5 bg-slate-950 hover:bg-pink-500/10 hover:border-pink-500/30 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-pink-400" />
              <span>{pHabit.name}</span>
              <span className="text-[10px] text-amber-400 font-bold ml-1">+{pHabit.reward} Poin</span>
            </button>
          ))}
        </div>
      </div>

      {/* Daily Habits Checklist */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
            Checklist Harian ({todayStr})
          </h3>
          <span className="text-xs text-pink-300 font-bold">
            {childHabits.filter((h) => h.completedDates.includes(todayStr)).length} / {childHabits.length} Selesai
          </span>
        </div>

        {childHabits.length === 0 ? (
          <p className="text-xs text-slate-400 py-8 text-center">Belum ada habit terdaftar. Klik rekomendasi di atas untuk menambahkan.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {childHabits.map((habit) => {
              const isCheckedToday = habit.completedDates.includes(todayStr);

              return (
                <div
                  key={habit.id}
                  onClick={() => onToggleHabitCheckin(habit.id, todayStr)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isCheckedToday
                      ? 'bg-emerald-950/20 border-emerald-500/40 shadow-md'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button className="text-emerald-400 shrink-0">
                      {isCheckedToday ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-500/20" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-600 hover:text-pink-400" />
                      )}
                    </button>

                    <div className="space-y-0.5">
                      <h4 className={`text-xs font-bold ${isCheckedToday ? 'text-emerald-200 line-through' : 'text-white'}`}>
                        {habit.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span>{habit.category}</span>
                        <span>•</span>
                        <span className="text-amber-400 font-bold">+{habit.pointReward} Poin</span>
                      </div>
                    </div>
                  </div>

                  {/* Streak badge */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold shrink-0">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>{habit.currentStreak} Hari</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Add Habit */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl text-xs">
            <h3 className="text-base font-bold text-white">Tambah Habit Baru</h3>

            <form onSubmit={handleCreateHabit} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Nama Kebiasaan Baik</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  placeholder="mis. Membereskan Mainan Sendiri..."
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Kategori Habit</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  placeholder="Kedisiplinan, Kesehatan, Literasi..."
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Poin Reward (Bonus Checkin)</label>
                <input
                  type="number"
                  value={pointReward}
                  onChange={(e) => setPointReward(Number(e.target.value))}
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
                  <span>Simpan Habit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
