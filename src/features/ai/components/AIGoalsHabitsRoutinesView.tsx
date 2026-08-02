import React, { useState } from 'react';
import { 
  Target, 
  Flame, 
  Clock, 
  Plus, 
  CheckCircle2, 
  TrendingUp, 
  Calendar 
} from 'lucide-react';
import { useInsightStore } from '../stores/useInsightStore';

export const AIGoalsHabitsRoutinesView: React.FC = () => {
  const { goals, habits, addGoal, updateGoalProgress, incrementHabitStreak } = useInsightStore();

  const [showGoalModal, setShowGoalModal] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalCategory, setGoalCategory] = useState<'Kesehatan' | 'Keuangan' | 'Pendidikan' | 'Relationship' | 'Travel' | 'Habit'>('Keuangan');
  const [targetValue, setTargetValue] = useState(10000000);
  const [unit, setUnit] = useState('Rp');
  const [targetDate, setTargetDate] = useState('2026-12-31');

  const routines = [
    { title: 'Rutinitas Pagi Sekolah', time: '06:00 - 07:30 WIB', items: ['Bangun & Doa Pagi', 'Sarapan Protein Tinggi', 'Siapkan Tas & Buku Sekolah'] },
    { title: 'Rutinitas Malam & Istirahat', time: '20:00 - 21:30 WIB', items: ['Kurangi Layar Gawai (Digital Detox)', 'Membaca Buku 15 Menit', 'Persiapan Baju Besok Hari'] },
    { title: 'Rutinitas Akhir Pekan Keluarga', time: 'Sabtu / Minggu', items: ['Olahraga Jalan Pagi Bersama', 'Refleksi Mood & Capaian Minggu Ini', 'Masak Menu Pilihan Anak'] }
  ];

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalTitle.trim()) return;

    addGoal({
      title: goalTitle,
      category: goalCategory,
      targetValue: Number(targetValue),
      unit,
      targetDate
    });

    setGoalTitle('');
    setShowGoalModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Target className="w-6 h-6 text-amber-400" />
              <span>AI Goal Manager, Habit Engine & Family Routines</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Kelola target jangka panjang, kebiasaan positif harian (streak), dan rutinitas harmonis keluarga.
            </p>
          </div>

          <button
            onClick={() => setShowGoalModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-black text-xs rounded-2xl shadow-lg flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Target Baru</span>
          </button>
        </div>

        {/* Goals Progress Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {goals.map((goal) => {
            const percent = Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100));
            return (
              <div
                key={goal.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 hover:border-amber-500/40 transition-all shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {goal.category}
                    </span>
                    <span className="text-[10px] text-slate-400">Target: {goal.targetDate}</span>
                  </div>
                  <h4 className="font-extrabold text-white text-sm">{goal.title}</h4>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Capaian:</span>
                    <span className="font-bold text-white">
                      {goal.currentValue.toLocaleString('id-ID')} / {goal.targetValue.toLocaleString('id-ID')} {goal.unit}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] pt-1">
                    <span className="text-emerald-400 font-bold">{percent}% Terpenuhi</span>
                    <button
                      onClick={() => {
                        const addVal = prompt('Masukkan nilai tambahan capaian:', '500000');
                        if (addVal) updateGoalProgress(goal.id, goal.currentValue + Number(addVal));
                      }}
                      className="text-amber-400 hover:underline font-semibold"
                    >
                      + Update Capaian
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Habits Engine & Routines Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Habit Intelligence Tracker */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <h4 className="font-bold text-white text-base flex items-center gap-2 border-b border-slate-800 pb-3">
            <Flame className="w-5 h-5 text-rose-500 animate-bounce" />
            <span>Habit Intelligence (Kebiasaan Positif & Streak)</span>
          </h4>

          <div className="space-y-3">
            {habits.map((hab) => (
              <div
                key={hab.id}
                className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between gap-3 hover:border-indigo-500/40 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-white">{hab.habitName}</span>
                    <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full">
                      {hab.memberName}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Skor AI: <strong className="text-amber-300">{hab.aiScore}/100</strong> • Terakhir: {hab.lastCompletedDate}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-center px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                    <div className="text-sm font-black text-rose-400">{hab.streakCount} Hari</div>
                    <div className="text-[9px] text-slate-400 uppercase font-bold">Streak</div>
                  </div>

                  <button
                    onClick={() => incrementHabitStreak(hab.id)}
                    className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md transition-all"
                    title="Tandai Selesai Hari Ini"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Family Routines Scheduler */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <h4 className="font-bold text-white text-base flex items-center gap-2 border-b border-slate-800 pb-3">
            <Clock className="w-5 h-5 text-indigo-400" />
            <span>Rutinitas Keluarga Terjadwal</span>
          </h4>

          <div className="space-y-3">
            {routines.map((rt, idx) => (
              <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white">{rt.title}</span>
                  <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/20 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                    {rt.time}
                  </span>
                </div>
                <ul className="space-y-1">
                  {rt.items.map((it, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl text-xs">
            <h3 className="font-extrabold text-white text-base">Buat Target Jangka Panjang Baru</h3>
            <form onSubmit={handleCreateGoal} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Judul Target:</label>
                <input
                  type="text"
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  placeholder="misal: Renovasi Dapur Utama..."
                  className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-xl outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Kategori:</label>
                  <select
                    value={goalCategory}
                    onChange={(e) => setGoalCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-xl outline-none"
                  >
                    <option value="Keuangan">Keuangan</option>
                    <option value="Kesehatan">Kesehatan</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="Travel">Travel</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Satuan:</label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="Rp / Nilai / Km..."
                    className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Target Angka / Nilai Akhir:</label>
                <input
                  type="number"
                  value={targetValue}
                  onChange={(e) => setTargetValue(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-xl outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGoalModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl"
                >
                  Simpan Target
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
