import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Trash2,
  BrainCircuit,
  FileText,
  Paperclip,
  CheckSquare
} from 'lucide-react';
import { useEducationStore } from '../../../store/useEducationStore';
import { Homework, HomeworkCategory, PriorityLevel, HomeworkStatus } from '../types';

interface HomeworkCenterTabProps {
  childName: string;
  onOpenAiAssistant: (hwId?: string) => void;
}

export const HomeworkCenterTab: React.FC<HomeworkCenterTabProps> = ({ childName, onOpenAiAssistant }) => {
  const { selectedChildId, homeworks, subjects, addHomework, updateHomeworkStatus, deleteHomework } =
    useEducationStore();

  const childHomeworks = homeworks.filter((h) => h.childId === selectedChildId);
  const childSubjects = subjects.filter((s) => s.childId === selectedChildId);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [subjectFilter, setSubjectFilter] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [subjectId, setSubjectId] = useState(childSubjects[0]?.id || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('18:00');
  const [priority, setPriority] = useState<PriorityLevel>('Sedang');
  const [category, setCategory] = useState<HomeworkCategory>('PR');

  const filteredHomeworks = childHomeworks.filter((hw) => {
    const matchesStatus = statusFilter === 'Semua' || hw.status === statusFilter;
    const matchesSubject = subjectFilter === 'Semua' || hw.subjectName === subjectFilter;
    const matchesSearch =
      hw.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hw.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSubject && matchesSearch;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selSub = childSubjects.find((s) => s.id === subjectId);
    addHomework({
      childId: selectedChildId,
      subjectId: subjectId || 'subj-custom',
      subjectName: selSub ? selSub.name : 'Mata Pelajaran',
      title,
      description,
      dueDate: dueDate || new Date().toISOString().split('T')[0],
      dueTime,
      priority,
      status: 'Belum Dikerjakan',
      category
    });
    setIsAddModalOpen(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <span>Pusat Pekerjaan Rumah (PR) & Proyek</span>
          </h2>
          <p className="text-xs text-slate-400">
            Pantau tenggat PR {childName}, status penyelesaian, serta minta bantuan AI untuk memahami materi.
          </p>
        </div>

        <button
          onClick={() => {
            if (childSubjects.length > 0) setSubjectId(childSubjects[0].id);
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Catat PR Baru</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-xs text-slate-400 font-semibold shrink-0">Status:</span>
          {['Semua', 'Belum Dikerjakan', 'Sedang Dikerjakan', 'Selesai'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul PR..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Homework Cards List */}
      {filteredHomeworks.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
          <p className="text-sm font-bold text-white">Tidak Ada PR Terdaftar</p>
          <p className="text-xs text-slate-400">
            Semua pekerjaan rumah atau filter yang kamu pilih saat ini bersih.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHomeworks.map((hw) => {
            const isDone = hw.status === 'Selesai';
            return (
              <div
                key={hw.id}
                className={`border rounded-3xl p-5 shadow-lg transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  isDone
                    ? 'bg-slate-950/60 border-slate-800/60 opacity-80'
                    : 'bg-slate-900 border-slate-800 hover:border-indigo-500/40'
                }`}
              >
                <div className="space-y-2 w-full md:w-2/3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                      {hw.subjectName}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-bold">
                      {hw.category}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${
                        hw.priority === 'Tinggi'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                          : hw.priority === 'Sedang'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      }`}
                    >
                      Prioritas {hw.priority}
                    </span>
                  </div>

                  <h3 className={`text-base font-bold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                    {hw.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">{hw.description}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5 text-rose-300 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Tenggat: {hw.dueDate} ({hw.dueTime})</span>
                    </span>

                    {hw.aiHelpCount > 0 && (
                      <span className="flex items-center gap-1 text-amber-300 font-semibold">
                        <BrainCircuit className="w-3.5 h-3.5" />
                        <span>{hw.aiHelpCount}x Bantuan AI</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                  <select
                    value={hw.status}
                    onChange={(e) => updateHomeworkStatus(hw.id, e.target.value as HomeworkStatus)}
                    className="bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Belum Dikerjakan">Belum Dikerjakan</option>
                    <option value="Sedang Dikerjakan">Sedang Dikerjakan</option>
                    <option value="Selesai">Selesai ✓</option>
                  </select>

                  <button
                    onClick={() => onOpenAiAssistant(hw.id)}
                    className="px-3.5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-indigo-500/20"
                  >
                    <BrainCircuit className="w-3.5 h-3.5 text-amber-300" />
                    <span>AI Assistant</span>
                  </button>

                  <button
                    onClick={() => deleteHomework(hw.id)}
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Homework Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl relative">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Catat PR Baru</h3>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Pilih Mata Pelajaran</label>
                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  {childSubjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.category})
                    </option>
                  ))}
                  {childSubjects.length === 0 && <option value="custom">Mata Pelajaran Umum</option>}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Judul PR / Tugas</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="misal: Latihan Soal Pecahan Halaman 45-48"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Deskripsi / Detail Instuksi Guru</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  required
                  placeholder="Kerjakan 10 soal cerita penjumlahan pecahan campuran di buku tugas..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Tanggal Tenggat</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Jam Tenggat</label>
                  <input
                    type="time"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Prioritas</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Tinggi">Tinggi</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Rendah">Rendah</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Kategori Tugas</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as HomeworkCategory)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="PR">PR</option>
                    <option value="Tugas Harian">Tugas Harian</option>
                    <option value="Proyek">Proyek</option>
                    <option value="Presentasi">Presentasi</option>
                    <option value="Portofolio">Portofolio</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold"
                >
                  Simpan PR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
