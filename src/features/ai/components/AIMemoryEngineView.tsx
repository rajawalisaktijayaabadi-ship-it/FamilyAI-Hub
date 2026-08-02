import React, { useState } from 'react';
import { 
  Brain, 
  Search, 
  Plus, 
  Trash2, 
  Tag, 
  ShieldCheck, 
  Lock, 
  Bookmark, 
  Clock 
} from 'lucide-react';
import { MemoryType, AIMemory, PrivacyLevel } from '../../../types/aiSuperAssistant';

export const AIMemoryEngineView: React.FC = () => {
  const [memories, setMemories] = useState<AIMemory[]>([
    {
      id: 'mem-1',
      type: 'Preference Memory',
      title: 'Alergi Kacang & Telur Setengah Matang',
      content: 'Anak sulung memiliki reaksi alergi ringan pada kacang mete. Selalu pastikan masakan dapur bebas mete.',
      tags: ['Kesehatan', 'Alergi', 'Anak'],
      createdAt: '2026-07-01',
      updatedAt: '2026-07-01',
      privacyLevel: 'Family',
      confidenceScore: 99
    },
    {
      id: 'mem-2',
      type: 'Routine Memory',
      title: 'Jadwal Kursus Renang Minggu Pagi',
      content: 'Ibu dan anak rutin berangkat kursus renang setiap jam 08:00 WIB hari Minggu.',
      tags: ['Rutinitas', 'Kesehatan'],
      createdAt: '2026-06-15',
      updatedAt: '2026-07-20',
      privacyLevel: 'Family',
      confidenceScore: 95
    },
    {
      id: 'mem-3',
      type: 'Long Term Memory',
      title: 'Target Liburan Keluarga Semester Akhir',
      content: 'Keluarga telah sepakat memesan paket liburan keluarga ke Bali pada bulan Desember 2026 dengan anggaran Rp 15.000.000.',
      tags: ['Travel', 'Keuangan', 'Impian'],
      createdAt: '2026-05-10',
      updatedAt: '2026-07-28',
      privacyLevel: 'Parent Only',
      confidenceScore: 98
    },
    {
      id: 'mem-4',
      type: 'Family Habit Memory',
      title: 'Makan Malam Bersama Tanpa Layar Gawai',
      content: 'Pukul 19:00 WIB adalah waktu makan malam keluarga tanpa ponsel di meja.',
      tags: ['Kebiasaan', 'Harmoni'],
      createdAt: '2026-04-01',
      updatedAt: '2026-07-25',
      privacyLevel: 'Family',
      confidenceScore: 92
    }
  ]);

  const [filterType, setFilterType] = useState<string>('Semua Memori');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<MemoryType>('Preference Memory');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('');

  const memoryTypesList: MemoryType[] = [
    'Short Term Memory',
    'Long Term Memory',
    'Conversation Memory',
    'Preference Memory',
    'Routine Memory',
    'Family Habit Memory',
    'Goal Memory'
  ];

  const filteredMemories = memories.filter((mem) => {
    const matchesType = filterType === 'Semua Memori' || mem.type === filterType;
    const matchesSearch = mem.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          mem.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newMem: AIMemory = {
      id: `mem-${Date.now()}`,
      type: newType,
      title: newTitle,
      content: newContent,
      tags: newTags ? newTags.split(',').map((t) => t.trim()) : ['Umum'],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      privacyLevel: 'Family',
      confidenceScore: 95
    };

    setMemories([newMem, ...memories]);
    setNewTitle('');
    setNewContent('');
    setNewTags('');
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    setMemories(memories.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-400" />
              <span>AI Long-Term & Short-Term Memory Engine</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Pusat memori terenkripsi AI: Menyimpan preferensi, rutinitas, kebiasaan, & impian keluarga.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Catatan Memori AI</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 relative w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari memori AI (misal: alergi, renang, liburan)..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 text-xs text-white pl-10 pr-4 py-3 rounded-2xl outline-none"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-200 p-3 rounded-2xl outline-none w-full sm:w-auto"
          >
            <option value="Semua Memori">Semua Tipe Memori ({memories.length})</option>
            {memoryTypesList.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Memory Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMemories.map((mem) => (
          <div
            key={mem.id}
            className="bg-slate-950 border border-slate-800 rounded-3xl p-5 space-y-3 hover:border-purple-500/40 transition-all shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {mem.type}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>{mem.privacyLevel}</span>
                  </span>
                  <button
                    onClick={() => handleDelete(mem.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h4 className="font-extrabold text-white text-base">{mem.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{mem.content}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-1.5 flex-wrap">
                {mem.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded-lg border border-slate-800">
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-amber-400 font-bold">
                Akurasi AI: {mem.confidenceScore}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Memory Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-extrabold text-white text-lg">Tambah Catatan Memori AI</h3>
            <form onSubmit={handleAddMemory} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Tipe Memori:</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as MemoryType)}
                  className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-xl outline-none"
                >
                  {memoryTypesList.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Judul Memori:</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="misal: Ukuran Sepatu & Baju Anak..."
                  className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-xl outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Isi Catatan Memori:</label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Penjelasan rinci yang perlu diingat AI..."
                  className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-xl outline-none h-24"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Tagar (pisahkan dengan koma):</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Pakaian, Belanja, Anak..."
                  className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-xl outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl"
                >
                  Simpan ke Memori
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
