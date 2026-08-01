import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Bell, 
  Calendar, 
  Clock, 
  AlertCircle,
  Save
} from 'lucide-react';
import { Child, ChildTask } from '../types';

interface TaskManagementTabProps {
  child: Child;
  tasks: ChildTask[];
  onToggleTaskCompleted: (taskId: string) => void;
  onAddTask: (task: Omit<ChildTask, 'id' | 'completed'>) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskManagementTab: React.FC<TaskManagementTabProps> = ({
  child,
  tasks,
  onToggleTaskCompleted,
  onAddTask,
  onDeleteTask
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ChildTask['category']>('Belajar');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueTime, setDueTime] = useState('17:00');
  const [priority, setPriority] = useState<ChildTask['priority']>('Sedang');
  const [pointReward, setPointReward] = useState(20);
  const [reminderEnabled, setReminderEnabled] = useState(true);

  const childTasks = tasks.filter((t) => t.childId === child.id);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      childId: child.id,
      title,
      category,
      dueDate,
      dueTime,
      priority,
      pointReward: Number(pointReward),
      reminderEnabled
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
            <CheckSquare className="w-5 h-5 text-indigo-400" />
            <span>Manajemen Tugas & Tanggung Jawab Harian</span>
          </h2>
          <p className="text-xs text-slate-400">
            Atur tugas PR, belajar, membersihkan kamar, ibadah, & bantu rumah untuk {child.name}. Lengkap dengan reminder.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold rounded-2xl shadow-lg transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Buat Tugas Baru</span>
        </button>
      </div>

      {/* Task List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
            Daftar Tugas {child.name}
          </h3>
          <span className="text-xs text-indigo-300 font-bold">
            {childTasks.filter((t) => t.completed).length} / {childTasks.length} Selesai
          </span>
        </div>

        {childTasks.length === 0 ? (
          <p className="text-xs text-slate-400 py-8 text-center">Belum ada tugas dibuat untuk {child.name}.</p>
        ) : (
          <div className="space-y-3">
            {childTasks.map((t) => (
              <div
                key={t.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  t.completed
                    ? 'bg-emerald-950/20 border-emerald-500/40 opacity-80'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onToggleTaskCompleted(t.id)}
                    className="text-indigo-400 shrink-0"
                  >
                    {t.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-500/20" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-600 hover:text-indigo-400" />
                    )}
                  </button>

                  <div className="space-y-0.5">
                    <h4 className={`text-xs font-bold ${t.completed ? 'text-emerald-200 line-through' : 'text-white'}`}>
                      {t.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-semibold">{t.category}</span>
                      <span>•</span>
                      <span>Batas: {t.dueDate} {t.dueTime || ''}</span>
                      <span>•</span>
                      <span className="text-amber-400 font-bold">+{t.pointReward} Poin</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {t.reminderEnabled && (
                    <span className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg text-[10px] flex items-center gap-1 font-semibold border border-indigo-500/20">
                      <Bell className="w-3 h-3" /> Reminder
                    </span>
                  )}

                  <button
                    onClick={() => onDeleteTask(t.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Add Task */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl text-xs">
            <h3 className="text-base font-bold text-white">Buat Tugas Baru</h3>

            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Judul Tugas</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  placeholder="mis. Mengerjakan PR Matematika..."
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Kategori Tugas</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                >
                  <option value="Belajar">Belajar</option>
                  <option value="PR">PR Sekolah</option>
                  <option value="Membersihkan Kamar">Membersihkan Kamar</option>
                  <option value="Membantu Orang Tua">Membantu Orang Tua</option>
                  <option value="Ibadah">Ibadah</option>
                  <option value="Olahraga">Olahraga</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Tanggal Batas</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Jam Batas</label>
                  <input
                    type="time"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Prioritas</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  >
                    <option value="Rendah">Rendah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Tinggi">Tinggi</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Bonus Poin Reward</label>
                  <input
                    type="number"
                    value={pointReward}
                    onChange={(e) => setPointReward(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="remind"
                  checked={reminderEnabled}
                  onChange={(e) => setReminderEnabled(e.target.checked)}
                  className="accent-pink-500 rounded cursor-pointer"
                />
                <label htmlFor="remind" className="text-slate-300 font-semibold cursor-pointer">
                  Aktifkan Notifikasi Pengingat
                </label>
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
                  <span>Simpan Tugas</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
