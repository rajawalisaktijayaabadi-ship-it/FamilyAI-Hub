import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Filter, 
  Calendar,
  Sparkles,
  Save,
  Check
} from 'lucide-react';
import { Child, Milestone, MilestoneStatus } from '../types';

interface MilestoneTrackerTabProps {
  child: Child;
  milestones: Milestone[];
  onUpdateMilestoneStatus: (id: string, status: MilestoneStatus, notes?: string) => void;
  onAddMilestone: (milestone: Omit<Milestone, 'id'>) => void;
}

export const MilestoneTrackerTab: React.FC<MilestoneTrackerTabProps> = ({
  child,
  milestones,
  onUpdateMilestoneStatus,
  onAddMilestone
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Milestone['category']>('Learning Development');
  const [targetAgeMonth, setTargetAgeMonth] = useState(child.age * 12);

  const childMilestones = milestones.filter((m) => m.childId === child.id);

  const filteredMilestones = childMilestones.filter((m) => {
    const matchCat = filterCategory === 'All' || m.category === filterCategory;
    const matchStatus = filterStatus === 'All' || m.status === filterStatus;
    return matchCat && matchStatus;
  });

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddMilestone({
      childId: child.id,
      title,
      description,
      category,
      targetAgeMonth: Number(targetAgeMonth),
      status: 'Proses',
      notes: 'Milestone disesuaikan dengan target pertumbuhan anak.'
    });

    setTitle('');
    setDescription('');
    setShowAddModal(false);
  };

  const getStatusBadge = (status: MilestoneStatus) => {
    switch (status) {
      case 'Selesai':
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> Selesai
          </span>
        );
      case 'Proses':
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Clock className="w-3 h-3" /> Dalam Proses
          </span>
        );
      case 'Belum Dimulai':
      default:
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            <AlertCircle className="w-3 h-3" /> Belum Dimulai
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-400" />
            <span>Timeline & Tracker Milestone Perkembangan</span>
          </h2>
          <p className="text-xs text-slate-400">
            Pantau pencapaian milestone tahapan usia untuk {child.name} ({child.age} Tahun).
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold rounded-2xl shadow-lg transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Milestone Baru</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Filter className="w-4 h-4 text-pink-400" />
          <span className="font-semibold text-white">Filter Milestone:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl p-2 outline-none"
          >
            <option value="All">Semua Kategori</option>
            <option value="Physical Growth">Physical Growth</option>
            <option value="Emotional Development">Emotional Development</option>
            <option value="Social Development">Social Development</option>
            <option value="Language Development">Language Development</option>
            <option value="Learning Development">Learning Development</option>
            <option value="Motor Skills">Motor Skills</option>
            <option value="Creativity">Creativity</option>
            <option value="Life Skills">Life Skills</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl p-2 outline-none"
          >
            <option value="All">Semua Status</option>
            <option value="Belum Dimulai">Belum Dimulai</option>
            <option value="Proses">Proses</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>
      </div>

      {/* Milestone Timeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
          Visual Timeline Target Usia
        </h3>

        {filteredMilestones.length === 0 ? (
          <p className="text-xs text-slate-400 py-8 text-center">Tidak ada milestone ditemukan sesuai filter.</p>
        ) : (
          <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-6">
            {filteredMilestones.map((ms) => (
              <div key={ms.id} className="relative group">
                {/* Timeline Dot */}
                <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-slate-900 ${
                  ms.status === 'Selesai' ? 'bg-emerald-400' : ms.status === 'Proses' ? 'bg-amber-400' : 'bg-slate-700'
                }`} />

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{ms.title}</span>
                      {getStatusBadge(ms.status)}
                    </div>
                    <span className="text-[10px] text-pink-400 font-semibold bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
                      {ms.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">{ms.description}</p>

                  {ms.notes && (
                    <p className="text-[11px] text-slate-400 italic bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                      Catatan: {ms.notes}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                    <span className="text-[10px] text-slate-400">
                      Target Usia: Math.floor({ms.targetAgeMonth} / 12) Thn ({ms.targetAgeMonth} Bulan)
                    </span>

                    <div className="flex items-center gap-1.5">
                      {ms.status !== 'Selesai' && (
                        <button
                          onClick={() => onUpdateMilestoneStatus(ms.id, 'Selesai', 'Pencapaian milestone selesai dengan sangat baik.')}
                          className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-[11px] shadow transition-all"
                        >
                          <Check className="w-3 h-3" />
                          <span>Tandai Selesai</span>
                        </button>
                      )}

                      {ms.status !== 'Proses' && (
                        <button
                          onClick={() => onUpdateMilestoneStatus(ms.id, 'Proses')}
                          className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 font-bold rounded-xl text-[11px] transition-all"
                        >
                          Mulai Proses
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Add Milestone */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl text-xs">
            <h3 className="text-base font-bold text-white">Tambah Milestone Baru</h3>

            <form onSubmit={handleAddMilestone} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Judul Milestone</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  placeholder="mis. Mampu Mengaitkan Kancing Baju Sendiri..."
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Kategori Milestone</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                >
                  <option value="Learning Development">Learning Development</option>
                  <option value="Physical Growth">Physical Growth</option>
                  <option value="Emotional Development">Emotional Development</option>
                  <option value="Social Development">Social Development</option>
                  <option value="Language Development">Language Development</option>
                  <option value="Motor Skills">Motor Skills</option>
                  <option value="Creativity">Creativity</option>
                  <option value="Life Skills">Life Skills</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Deskripsi Detail</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  placeholder="Kriteria pencapaian..."
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Target Usia (Bulan)</label>
                <input
                  type="number"
                  value={targetAgeMonth}
                  onChange={(e) => setTargetAgeMonth(Number(e.target.value))}
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
                  <span>Simpan Milestone</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
