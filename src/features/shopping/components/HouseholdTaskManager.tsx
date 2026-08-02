import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  User,
  Calendar,
  CheckCircle2,
  Trash2,
  Edit,
  Sparkles,
  X,
  ListTodo,
  Check
} from 'lucide-react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { HouseholdTask, FamilyMember } from '../../../types';
import { useHouseholdStore } from '../../../store/useHouseholdStore';

const taskSchema = z.object({
  title: z.string().min(3, 'Judul tugas minimal 3 karakter'),
  category: z.string().min(1, 'Pilih kategori tugas'),
  assignedMemberId: z.string().min(1, 'Pilih anggota keluarga'),
  frequency: z.enum(['Harian', 'Mingguan', 'Bulanan', 'Insidental']),
  dueDate: z.string().min(1, 'Tanggal jatuh tempo wajib'),
  priority: z.enum(['Tinggi', 'Sedang', 'Rendah']),
  notes: z.string().optional()
});

type TaskFormValues = z.infer<typeof taskSchema>;

const defaultHouseholdCategories = [
  'Membersihkan Rumah',
  'Mencuci',
  'Menyapu',
  'Mengepel',
  'Merawat Tanaman',
  'Memberi Makan Hewan',
  'Buang Sampah',
  'Lainnya'
];

interface HouseholdTaskManagerProps {
  familyMembers?: FamilyMember[];
}

export const HouseholdTaskManager: React.FC<HouseholdTaskManagerProps> = ({
  familyMembers = []
}) => {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompleted,
    toggleChecklistItem
  } = useHouseholdStore();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<HouseholdTask | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: 'Mengepel & Lap Debu Dapur',
      category: 'Mengepel',
      assignedMemberId: familyMembers[0]?.id || 'mem-1',
      frequency: 'Harian',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'Tinggi',
      notes: ''
    }
  });

  const handleOpenAddModal = () => {
    setEditingTask(null);
    reset({
      title: 'Membersihkan Rumah & Merapikan Teras',
      category: 'Membersihkan Rumah',
      assignedMemberId: familyMembers[0]?.id || 'mem-1',
      frequency: 'Harian',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'Sedang',
      notes: ''
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (task: HouseholdTask) => {
    setEditingTask(task);
    reset({
      title: task.title,
      category: task.category,
      assignedMemberId: task.assignedMemberId,
      frequency: task.frequency,
      dueDate: task.dueDate,
      priority: task.priority,
      notes: task.notes || ''
    });
    setShowModal(true);
  };

  const onSubmitForm = (values: TaskFormValues) => {
    const mem = familyMembers.find((m) => m.id === values.assignedMemberId);
    const assignedMemberName = mem ? mem.name : 'Anggota Keluarga';
    const assignedMemberAvatar = mem ? mem.avatar : '';

    if (editingTask) {
      updateTask(editingTask.id, {
        ...values,
        assignedMemberName,
        assignedMemberAvatar
      });
    } else {
      addTask({
        ...values,
        completed: false,
        assignedMemberName,
        assignedMemberAvatar,
        checklist: [
          { id: 'c1', text: 'Lakukan langkah persiapan awal', done: false },
          { id: 'c2', text: 'Penyelesaian & perapian', done: false }
        ]
      });
    }
    setShowModal(false);
  };

  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Manajemen Tugas Rumah Tangga</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Pembagian piket harian/mingguan: menyapu, mengepel, mencuci, merawat tanaman, & memberi makan hewan.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-xs rounded-2xl shadow-lg flex items-center gap-1.5 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Buat Tugas Piket Baru</span>
        </button>
      </div>

      {/* Task Sections: Pending & Completed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pending Tasks Column */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <ListTodo className="w-4 h-4 text-amber-400" />
              <span>Tugas Pending ({pendingTasks.length})</span>
            </h3>
          </div>

          <div className="space-y-3">
            {pendingTasks.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-8">Seluruh tugas piket rumah telah selesai diselesaikan!</p>
            ) : (
              pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 bg-slate-950 rounded-2xl border border-slate-800 hover:border-slate-700 space-y-3 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompleted(task.id)}
                        className="w-4 h-4 mt-1 rounded text-cyan-500 cursor-pointer"
                      />
                      <div>
                        <h4 className="font-bold text-white text-sm">{task.title}</h4>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span className="px-2 py-0.5 rounded-full bg-slate-900 text-amber-300 font-bold border border-slate-800">
                            {task.category}
                          </span>
                          <span>• {task.frequency}</span>
                          <span>• Tgl: {task.dueDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditModal(task)}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Checklist Items */}
                  {task.checklist && task.checklist.length > 0 && (
                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 space-y-1.5 text-xs">
                      {(task.checklist || []).map((item, idx) => (
                        <div
                          key={item.id}
                          onClick={() => toggleChecklistItem(task.id, idx)}
                          className="flex items-center gap-2 text-slate-300 cursor-pointer hover:text-white"
                        >
                          <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[10px] ${
                            item.done ? 'bg-cyan-500 border-cyan-400 text-slate-950 font-bold' : 'border-slate-700'
                          }`}>
                            {item.done && <Check className="w-2.5 h-2.5" />}
                          </div>
                          <span className={item.done ? 'line-through text-slate-500' : ''}>
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Assigned Member Bar */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="flex items-center gap-2">
                      <img
                        src={task.assignedMemberAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                        alt={task.assignedMemberName}
                        className="w-5 h-5 rounded-full object-cover border border-slate-700"
                      />
                      <span className="text-slate-300 font-semibold">{task.assignedMemberName}</span>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      task.priority === 'Tinggi'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      Priority: {task.priority}
                    </span>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>

        {/* Completed Tasks Column */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Selesai Dikerjakan ({completedTasks.length})</span>
            </h3>
          </div>

          <div className="space-y-3">
            {completedTasks.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-8">Belum ada tugas piket yang ditandai selesai hari ini.</p>
            ) : (
              completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-2 opacity-75"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompleted(task.id)}
                        className="w-4 h-4 rounded text-emerald-500 cursor-pointer"
                      />
                      <div>
                        <h4 className="font-bold text-slate-300 text-xs line-through">{task.title}</h4>
                        <div className="text-[10px] text-slate-500 flex items-center gap-2">
                          <span>{task.category}</span>
                          <span>• Selesai oleh {task.assignedMemberName}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Add / Edit Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl relative my-8">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-950"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">
                {editingTask ? 'Edit Tugas Rumah Tangga' : 'Buat Tugas Piket Rumah Tangga'}
              </h3>
            </div>

            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 text-xs">
              
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Judul Tugas Piket:</label>
                <input
                  type="text"
                  {...register('title')}
                  placeholder="misal: Membersihkan Rumah, Menyapu Dapur, Memberi Makan Kucing..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-slate-200 outline-none"
                />
                {errors.title && <p className="text-rose-400 text-[10px] mt-1">{errors.title.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Kategori Tugas:</label>
                  <select
                    {...register('category')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-slate-200 outline-none"
                  >
                    {defaultHouseholdCategories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Piketer (Anggota):</label>
                  <select
                    {...register('assignedMemberId')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-slate-200 outline-none"
                  >
                    {familyMembers.map((m) => (
                      <option key={m.id} value={m.id}>{m.name} ({m.relationship})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Frekuensi:</label>
                  <select
                    {...register('frequency')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-slate-200 outline-none"
                  >
                    <option value="Harian">Harian</option>
                    <option value="Mingguan">Mingguan</option>
                    <option value="Bulanan">Bulanan</option>
                    <option value="Insidental">Insidental</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Jatuh Tempo:</label>
                  <input
                    type="date"
                    {...register('dueDate')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Prioritas:</label>
                  <select
                    {...register('priority')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-slate-200 outline-none"
                  >
                    <option value="Tinggi">Tinggi</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Rendah">Rendah</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Catatan Instruksi:</label>
                <textarea
                  {...register('notes')}
                  rows={2}
                  placeholder="Gunakan pembersih khusus, instruksi waktu..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-slate-200 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-300 font-semibold rounded-2xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black rounded-2xl shadow-lg"
                >
                  {editingTask ? 'Simpan Perubahan' : 'Buat Tugas'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
