import React, { useState } from 'react';
import { 
  Brain, 
  Search, 
  Plus, 
  Trash2, 
  Tag, 
  Clock, 
  AlertCircle, 
  Check, 
  X,
  Sparkles
} from 'lucide-react';
import { useMemoryStore } from '../stores/useMemoryStore';
import { useContextStore } from '../stores/useContextStore';
import { ImportanceLevel } from '../types/aiTypes';

export const AIMemoryView: React.FC = () => {
  const { 
    memories, 
    searchTerm, 
    setSearchTerm, 
    addMemory, 
    deleteMemory, 
    updateMemoryImportance 
  } = useMemoryStore();

  const { context } = useContextStore();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [summary, setSummary] = useState('');
  const [importance, setImportance] = useState<ImportanceLevel>('medium');
  const [category, setCategory] = useState('Kesehatan');

  const filteredMemories = memories.filter((m) => {
    const matchesSearch = m.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary.trim() || !topic.trim()) return;

    addMemory({
      conversationId: 'manual',
      userId: context?.currentUser?.id || 'u-1',
      familyId: context?.familyInformation?.id || 'fam-1',
      summary,
      keywords: summary.toLowerCase().split(' ').slice(0, 5),
      topic,
      category,
      importance
    });

    setTopic('');
    setSummary('');
    setIsAddOpen(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-xl">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-2xl text-white shadow-lg">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span>Sistem AI Memory Hub (ai_memory)</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold uppercase">
                {memories.length} Fakta Tersimpan
              </span>
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">
              AI mengingat fakta penting keluarga untuk memberikan saran yang dipersonalisasi secara otomatis.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Memori Baru</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Cari kata kunci memori, alergi, preferensi, atau topik..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Memory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMemories.map((mem) => {
          const importanceBadge = {
            high: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
            medium: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
            low: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
          }[mem.importance];

          return (
            <div
              key={mem.id}
              className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-lg relative group hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${importanceBadge}`}>
                    Tingkat: {mem.importance}
                  </span>
                  <h4 className="font-bold text-white text-sm mt-1.5">{mem.topic}</h4>
                </div>
                <button
                  onClick={() => deleteMemory(mem.id)}
                  className="p-1.5 bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-400 rounded-lg transition-all"
                  title="Hapus Memori"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                "{mem.summary}"
              </p>

              {/* Keywords */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {mem.keywords.map((kw, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-slate-900 text-purple-300 rounded-md text-[10px] font-medium border border-slate-800">
                    #{kw}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-900">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Terakhir digunakan: {mem.lastUsed}</span>
                </span>
                <span className="font-semibold text-slate-400">{mem.category}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Memory Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>Tambah Catatan AI Memory</span>
              </h3>
              <button onClick={() => setIsAddOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Topik / Judul Memori *</label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Contoh: Alergi Makanan Budi"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Fakta / Ringkasan Memori *</label>
                <textarea
                  required
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Contoh: Budi tidak bisa makan udang dan makanan laut."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
                  >
                    <option value="Kesehatan">Kesehatan</option>
                    <option value="Jadwal">Jadwal</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="Keuangan">Keuangan</option>
                    <option value="Gaya Hidup">Gaya Hidup</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Tingkat Penting</label>
                  <select
                    value={importance}
                    onChange={(e) => setImportance(e.target.value as ImportanceLevel)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
                  >
                    <option value="low">Rendah (Low)</option>
                    <option value="medium">Sedang (Medium)</option>
                    <option value="high">Sangat Penting (High)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 hover:text-white rounded-xl font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg"
                >
                  Simpan ke AI Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
