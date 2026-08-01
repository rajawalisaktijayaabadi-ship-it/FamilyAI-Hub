import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Plus,
  CheckCircle2,
  Trash2,
  Sparkles,
  Target,
  RotateCcw
} from 'lucide-react';
import { useEducationStore } from '../../../store/useEducationStore';
import { PriorityLevel } from '../types';

interface StudyPlannerTabProps {
  childName: string;
}

export const StudyPlannerTab: React.FC<StudyPlannerTabProps> = ({ childName }) => {
  const { selectedChildId, studyPlans, subjects, addStudyPlan, toggleStudyPlan, deleteStudyPlan } =
    useEducationStore();

  const childPlans = studyPlans.filter((p) => p.childId === selectedChildId);
  const childSubjects = subjects.filter((s) => s.childId === selectedChildId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [frequency, setFrequency] = useState<'Harian' | 'Mingguan' | 'Bulanan'>('Harian');
  const [targetDurationMinutes, setTargetDurationMinutes] = useState(45);
  const [subjectId, setSubjectId] = useState(childSubjects[0]?.id || '');
  const [timeOfDay, setTimeOfDay] = useState('16:00 - 16:45');
  const [priority, setPriority] = useState<PriorityLevel>('Sedang');

  const completedCount = childPlans.filter((p) => p.completed).length;
  const totalMinutesTarget = childPlans.reduce((acc, curr) => acc + curr.targetDurationMinutes, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selSub = childSubjects.find((s) => s.id === subjectId);
    addStudyPlan({
      childId: selectedChildId,
      title,
      frequency,
      targetDurationMinutes,
      subjectId: subjectId || 'sub-custom',
      subjectName: selSub ? selSub.name : 'Umum',
      timeOfDay,
      priority
    });
    setIsModalOpen(false);
    setTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Header & Stats Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span>Perencana & Jadwal Belajar Mandiri ({childName})</span>
            </h2>
            <p className="text-xs text-slate-400">
              Disiplin sesi belajar harian & mingguan untuk membangun habit konsistensi.
            </p>
          </div>

          <button
            onClick={() => {
              if (childSubjects.length > 0) setSubjectId(childSubjects[0].id);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Sesi Belajar</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 text-purple-300 rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400">Sesi Tuntas Hari Ini</p>
              <p className="text-lg font-bold text-white">
                {completedCount} <span className="text-xs font-normal text-slate-400">/ {childPlans.length} Sesi</span>
              </p>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 text-indigo-300 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400">Target Durasi Belajar</p>
              <p className="text-lg font-bold text-white">{totalMinutesTarget} Menit</p>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl flex items-center gap-3 col-span-2 md:col-span-1">
            <div className="p-2 bg-amber-500/20 text-amber-300 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400">Fokus Optimal AI</p>
              <p className="text-xs font-bold text-amber-300">Jam 16.00 - 17.00 WIB</p>
            </div>
          </div>
        </div>
      </div>

      {/* List of Study Plans */}
      {childPlans.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-3">
          <Calendar className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm font-bold text-white">Belum Ada Sesi Belajar Terjadwal</p>
          <p className="text-xs text-slate-400">
            Buatlah rutinitas belajar 30-45 menit setiap hari untuk memperkuat hasil akademik anak.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold"
          >
            Buat Sesi Belajar Pertama
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {childPlans.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-3xl p-4 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                plan.completed
                  ? 'bg-slate-950/60 border-slate-800/60 opacity-70'
                  : 'bg-slate-900 border-slate-800 hover:border-purple-500/40'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <button
                  onClick={() => toggleStudyPlan(plan.id)}
                  className={`w-6 h-6 rounded-xl border flex items-center justify-center transition-all shrink-0 ${
                    plan.completed
                      ? 'bg-purple-600 border-purple-500 text-white'
                      : 'border-slate-700 bg-slate-950 hover:border-purple-500'
                  }`}
                >
                  {plan.completed && <CheckCircle2 className="w-4 h-4" />}
                </button>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30">
                      {plan.subjectName}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold">
                      {plan.frequency}
                    </span>
                  </div>
                  <h4 className={`text-sm font-bold ${plan.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                    {plan.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-purple-300 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{plan.timeOfDay} ({plan.targetDurationMinutes} Menit)</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => deleteStudyPlan(plan.id)}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Study Plan Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl relative">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Tambah Sesi Belajar Mandiri</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Judul Aktivitas Belajar</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="misal: Review Rumus Pecahan & Latihan Soal"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Frekuensi</label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Harian">Harian</option>
                    <option value="Mingguan">Mingguan</option>
                    <option value="Bulanan">Bulanan</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Mata Pelajaran</label>
                  <select
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    {childSubjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                    {childSubjects.length === 0 && <option value="custom">Umum</option>}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Jam / Waktu Hari</label>
                  <input
                    type="text"
                    value={timeOfDay}
                    onChange={(e) => setTimeOfDay(e.target.value)}
                    placeholder="misal: 16:00 - 16:45"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Target Durasi (Menit)</label>
                  <input
                    type="number"
                    min={10}
                    max={180}
                    value={targetDurationMinutes}
                    onChange={(e) => setTargetDurationMinutes(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold"
                >
                  Simpan Sesi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
