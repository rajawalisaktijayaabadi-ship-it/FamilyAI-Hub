import React, { useState } from 'react';
import { Camera, Heart, Plus, Sparkles, Tag, Calendar, User, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MemoryPhoto, FamilyMember } from '../../types';

interface MemoriesViewProps {
  memories: MemoryPhoto[];
  currentMember: FamilyMember;
  onAddMemory: (memory: MemoryPhoto) => void;
  onLikeMemory: (id: string) => void;
}

export const MemoriesView: React.FC<MemoriesViewProps> = ({
  memories = [],
  currentMember,
  onAddMemory,
  onLikeMemory
}) => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&auto=format&fit=crop&q=80');
  const [tagInput, setTagInput] = useState<string>('Keluarga, Bahagia');

  const handleLike = (id: string) => {
    onLikeMemory(id);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleSaveMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newMemory: MemoryPhoto = {
      id: Date.now().toString(),
      title,
      description,
      date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
      imageUrl,
      tags: tagInput.split(',').map(t => t.trim()),
      uploadedBy: currentMember.name,
      likes: 1
    };

    onAddMemory(newMemory);
    setShowAddModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-fuchsia-950 via-slate-900 to-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-2 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Camera className="w-6 h-6 text-fuchsia-400" />
              <h2 className="text-xl font-bold">Family Memories & Album Foto Cerdas</h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Galeri foto kebersamaan keluarga dengan tagging otomatis AI dan pengingat kenangan berharga.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Unggah Kenangan Baru</span>
          </button>
        </div>
      </div>

      {/* Memories Photo Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {memories.map((m) => (
          <div key={m.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col group">
            <div className="relative h-56 overflow-hidden">
              <img
                src={m.imageUrl}
                alt={m.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-amber-300 border border-slate-800">
                {m.date}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-base text-white">{m.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{m.description}</p>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-800/80">
                <div className="flex flex-wrap gap-1.5">
                  {m.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-fuchsia-950/80 text-fuchsia-300 border border-fuchsia-500/30">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px]">Diunggah oleh {m.uploadedBy}</span>
                  <button
                    onClick={() => handleLike(m.id)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 text-rose-300 border border-rose-500/30 font-bold hover:bg-rose-900/60 transition-all cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>{m.likes} Menyukai</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Memory Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-bold text-white text-base">Unggah Foto Momen Keluarga</h3>

            <form onSubmit={handleSaveMemory} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Judul Momen:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="misal: Piknik Akhir Pekan..."
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 p-3 rounded-2xl outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Cerita Keterangan:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 p-3 rounded-2xl outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">URL Gambar Foto:</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 p-3 rounded-2xl outline-none"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={!title.trim()}
                  className="px-5 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold rounded-xl"
                >
                  Simpan Kenangan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
