import React, { useState } from 'react';
import { 
  Dumbbell, Flame, Timer, Target, Plus, Trash2, 
  Bike, Footprints, Heart, Sparkles, CheckCircle2 
} from 'lucide-react';
import { useHealthStore } from '../../../store/useHealthStore';
import { FamilyMember } from '../../../types';
import { ExerciseType } from '../types';

interface FitnessExerciseTabProps {
  familyMembers: FamilyMember[];
  activeMemberId: string;
}

export const FitnessExerciseTab: React.FC<FitnessExerciseTabProps> = ({
  familyMembers,
  activeMemberId,
}) => {
  const { exerciseLogs, addExerciseLog, deleteExerciseLog } = useHealthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formMemberId, setFormMemberId] = useState(activeMemberId === 'all' ? 'm1' : activeMemberId);
  const [type, setType] = useState<ExerciseType>('running');
  const [duration, setDuration] = useState(30);
  const [calories, setCalories] = useState(250);
  const [notes, setNotes] = useState('');

  const filteredLogs = exerciseLogs.filter((e) => activeMemberId === 'all' || e.memberId === activeMemberId);

  const totalCaloriesToday = filteredLogs.reduce((acc, curr) => acc + curr.caloriesBurned, 0);
  const totalMinutesToday = filteredLogs.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  const getExerciseLabel = (t: ExerciseType) => {
    switch (t) {
      case 'walking': return { label: 'Jalan Santai', icon: Footprints, color: 'text-emerald-400' };
      case 'running': return { label: 'Lari / Jogging', icon: Dumbbell, color: 'text-rose-400' };
      case 'cycling': return { label: 'Bersepeda', icon: Bike, color: 'text-cyan-400' };
      case 'yoga': return { label: 'Yoga & Pilates', icon: Heart, color: 'text-purple-400' };
      case 'gym': return { label: 'Latihan Beban / Gym', icon: Dumbbell, color: 'text-amber-400' };
      case 'swimming': return { label: 'Berenang', icon: Dumbbell, color: 'text-blue-400' };
      default: return { label: 'Olahraga Custom', icon: Dumbbell, color: 'text-slate-400' };
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addExerciseLog({
      memberId: formMemberId,
      type,
      durationMinutes: Number(duration),
      caloriesBurned: Number(calories),
      targetCalories: 300,
      date: new Date().toISOString().split('T')[0],
      notes: notes.trim() || undefined
    });

    setNotes('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Stats */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Dumbbell className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-white">Exercise & Fitness Activity Tracker</h3>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            Pencatatan aktivitas fisik harian keluarga: lari, bersepeda, yoga, renang, dan pembakaran kalori.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Total Menit</span>
            <span className="text-xl font-extrabold text-white">{totalMinutesToday} <span className="text-xs font-semibold text-slate-400">menit</span></span>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Kalori Terbakar</span>
            <span className="text-xl font-extrabold text-amber-400">{totalCaloriesToday} <span className="text-xs font-semibold text-slate-400">kcal</span></span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-2 px-3.5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-amber-600/30 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Catat Sesi</span>
          </button>
        </div>
      </div>

      {/* Exercise Logs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLogs.map((log) => {
          const meta = getExerciseLabel(log.type);
          const Icon = meta.icon;
          const memberObj = familyMembers.find((m) => m.id === log.memberId);

          return (
            <div 
              key={log.id} 
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-3 shadow-lg transition-all group relative"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl bg-slate-950 border border-slate-800 ${meta.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-white block">{log.customTypeName || meta.label}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{log.date}</span>
                  </div>
                </div>

                <button
                  onClick={() => deleteExerciseLog(log.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-center">
                <div>
                  <span className="text-[10px] text-slate-500 block">Durasi Sesi</span>
                  <span className="font-extrabold text-white text-sm flex items-center justify-center gap-1">
                    <Timer className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{log.durationMinutes} mnt</span>
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Kalori Terbakar</span>
                  <span className="font-extrabold text-amber-400 text-sm flex items-center justify-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>{log.caloriesBurned} kcal</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <div className="flex items-center gap-2">
                  {memberObj && <img src={memberObj.avatar} alt={memberObj.name} className="w-5 h-5 rounded-full object-cover" />}
                  <span className="text-slate-300 font-semibold">{memberObj?.name}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Target Tuntas
                </span>
              </div>

              {log.notes && (
                <p className="text-[11px] text-slate-400 italic bg-slate-950 p-2 rounded-xl border border-slate-800">
                  "{log.notes}"
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal Add Exercise */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl text-white animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-amber-400" />
                <span>Catat Sesi Olahraga Baru</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white font-bold text-xs">✕</button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Anggota Keluarga</label>
                <select
                  value={formMemberId}
                  onChange={(e) => setFormMemberId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-amber-500 outline-none"
                >
                  {familyMembers.map((m) => (
                    <option key={m.id} value={m.id}>{m.name} ({m.relationship})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Jenis Aktivitas</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as ExerciseType)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-amber-500 outline-none"
                >
                  <option value="walking">Jalan Santai</option>
                  <option value="running">Lari / Jogging</option>
                  <option value="cycling">Bersepeda</option>
                  <option value="yoga">Yoga & Senam</option>
                  <option value="gym">Gym / Beban</option>
                  <option value="swimming">Berenang</option>
                  <option value="custom">Aktivitas Lainnya</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Durasi (Menit)</label>
                  <input
                    type="number"
                    required
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Estimasi Kalori (kcal)</label>
                  <input
                    type="number"
                    required
                    value={calories}
                    onChange={(e) => setCalories(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Catatan Olahraga</label>
                <input
                  type="text"
                  placeholder="Contoh: Bersepeda 10 km keliling komplek"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold shadow-lg shadow-amber-600/30 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simpan Sesi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
