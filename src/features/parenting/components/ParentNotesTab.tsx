import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Tag as TagIcon, 
  Lock, 
  Eye, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  Save 
} from 'lucide-react';
import { Child, ParentNote, ParentNotePrivacy } from '../types';

interface ParentNotesTabProps {
  child: Child;
  parentNotes: ParentNote[];
  onAddParentNote: (note: Omit<ParentNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateParentNote: (id: string, note: Partial<ParentNote>) => void;
  onDeleteParentNote: (id: string) => void;
}

export const ParentNotesTab: React.FC<ParentNotesTabProps> = ({
  child,
  parentNotes,
  onAddParentNote,
  onUpdateParentNote,
  onDeleteParentNote
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrivacyFilter, setSelectedPrivacyFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNote, setEditingNote] = useState<ParentNote | null>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagsStr, setTagsStr] = useState('Edukasi, Minat');
  const [privacy, setPrivacy] = useState<ParentNotePrivacy>('Parent');
  const [isEncrypted, setIsEncrypted] = useState(false);

  const childNotes = parentNotes.filter((pn) => pn.childId === child.id);

  const filteredNotes = childNotes.filter((pn) => {
    const matchesSearch =
      pn.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pn.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pn.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPrivacy = selectedPrivacyFilter === 'All' || pn.privacy === selectedPrivacyFilter;
    return matchesSearch && matchesPrivacy;
  });

  const handleOpenAdd = () => {
    setEditingNote(null);
    setTitle('');
    setContent('');
    setTagsStr('Perkembangan, Emosi');
    setPrivacy('Parent');
    setIsEncrypted(false);
    setShowAddModal(true);
  };

  const handleOpenEdit = (note: ParentNote) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setTagsStr(note.tags?.join(', ') || '');
    setPrivacy(note.privacy);
    setIsEncrypted(note.isEncrypted);
    setShowAddModal(true);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsStr.split(',').map((t) => t.trim()).filter(Boolean);

    if (editingNote) {
      onUpdateParentNote(editingNote.id, {
        title,
        content,
        tags,
        privacy,
        isEncrypted
      });
    } else {
      onAddParentNote({
        childId: child.id,
        title,
        content,
        tags,
        privacy,
        isEncrypted
      });
    }

    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-pink-400" />
            <span>Catatan Pribadi & Jurnal Pengasuhan</span>
          </h2>
          <p className="text-xs text-slate-400">
            Simpan catatan observasi perilaku, rekomendasi medis/alergi, & jurnal perkembangan {child.name}.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold rounded-2xl shadow-lg transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Catatan Baru</span>
        </button>
      </div>

      {/* Search & Privacy Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-slate-200 outline-none focus:border-pink-500"
            placeholder="Cari kata kunci atau tag..."
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-slate-400 font-semibold shrink-0">Akses Privasi:</span>
          {['All', 'Parent', 'Private Notes', 'Family', 'Child', 'Admin'].map((priv) => (
            <button
              key={priv}
              onClick={() => setSelectedPrivacyFilter(priv)}
              className={`px-3 py-1.5 rounded-xl font-semibold shrink-0 border transition-all ${
                selectedPrivacyFilter === priv
                  ? 'bg-pink-600 text-white border-pink-400/50'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {priv}
            </button>
          ))}
        </div>
      </div>

      {/* Parent Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.length === 0 ? (
          <p className="text-xs text-slate-400 py-8 text-center col-span-2">Tidak ada catatan ditemukan.</p>
        ) : (
          filteredNotes.map((note) => (
            <div key={note.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {note.isEncrypted ? (
                      <span className="p-1 bg-amber-500/10 text-amber-400 rounded-md border border-amber-500/20">
                        <Lock className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="p-1 bg-pink-500/10 text-pink-400 rounded-md border border-pink-500/20">
                        <Eye className="w-3.5 h-3.5" />
                      </span>
                    )}
                    <h3 className="text-sm font-bold text-white">{note.title}</h3>
                  </div>

                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-950 text-slate-300 font-semibold border border-slate-800">
                    {note.privacy}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{note.content}</p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {note.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded-lg bg-pink-500/10 text-pink-300 border border-pink-500/20 font-semibold flex items-center gap-1">
                      <TagIcon className="w-3 h-3 text-pink-400" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-[10px] text-slate-400">
                <span>Dibuat: {note.createdAt}</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(note)}
                    className="p-1.5 text-slate-300 hover:text-white bg-slate-950 border border-slate-800 rounded-lg"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteParentNote(note.id)}
                    className="p-1.5 text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Add / Edit Parent Note */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl text-xs">
            <h3 className="text-base font-bold text-white">{editingNote ? 'Edit Catatan Orang Tua' : 'Tambah Catatan Orang Tua'}</h3>

            <form onSubmit={handleSaveNote} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Judul Catatan</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  placeholder="mis. Observasi Sikap Belajar..."
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Isi Catatan Pengasuhan</label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  placeholder="Detail catatan..."
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Tag (pisahkan koma)</label>
                <input
                  type="text"
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  placeholder="Edukasi, Emosi, Alergi..."
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Hak Akses Privasi</label>
                <select
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                >
                  <option value="Parent">Parent (Khusus Orang Tua)</option>
                  <option value="Private Notes">Private Notes (Hanya Penulis)</option>
                  <option value="Family">Family (Seluruh Keluarga)</option>
                  <option value="Child">Child (Anak Dapat Melihat)</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="enc"
                  checked={isEncrypted}
                  onChange={(e) => setIsEncrypted(e.target.checked)}
                  className="accent-pink-500 rounded cursor-pointer"
                />
                <label htmlFor="enc" className="text-slate-300 font-semibold cursor-pointer flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Enkripsi Catatan Pribadi (Encrypted Ready)</span>
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
                  <span>Simpan Catatan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
