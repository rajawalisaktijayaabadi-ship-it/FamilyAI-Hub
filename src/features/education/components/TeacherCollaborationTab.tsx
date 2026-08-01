import React, { useState } from 'react';
import { UserCheck, MessageSquare, Plus, Trash2, Bell, Heart, AlertCircle, Bookmark } from 'lucide-react';
import { useEducationStore } from '../../../store/useEducationStore';

interface TeacherCollaborationTabProps {
  childName: string;
}

export const TeacherCollaborationTab: React.FC<TeacherCollaborationTabProps> = ({ childName }) => {
  const { selectedChildId, teacherNotes, addTeacherNote } = useEducationStore();

  const childNotes = teacherNotes.filter((t) => t.childId === selectedChildId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherName, setTeacherName] = useState('');
  const [subject, setSubject] = useState('');
  const [note, setNote] = useState('');
  const [type, setType] = useState<'Pujian' | 'Perhatian' | 'Pengumuman' | 'Tugas'>('Pujian');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTeacherNote({
      childId: selectedChildId,
      teacherName,
      subject,
      note,
      type
    });
    setIsModalOpen(false);
    setTeacherName('');
    setNote('');
  };

  const getTypeBadge = (t: string) => {
    switch (t) {
      case 'Pujian':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Perhatian':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'Pengumuman':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default:
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-400" />
            <span>Kolaborasi & Catatan Wali Kelas / Guru ({childName})</span>
          </h2>
          <p className="text-xs text-slate-400">
            Arsip pesan, rekomendasi, pujian, dan perhatian khusus dari guru pengampu di sekolah.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Catatan Guru</span>
        </button>
      </div>

      {/* Notes List */}
      {childNotes.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-3">
          <MessageSquare className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm font-bold text-white">Belum Ada Catatan Guru</p>
          <p className="text-xs text-slate-400">Catat pesan dari grup WhatsApp kelas atau buku penghubung sekolah.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {childNotes.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-3xl p-5 shadow-lg space-y-2 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getTypeBadge(item.type)}`}>
                  {item.type}
                </span>
                <span className="text-xs text-slate-400">{item.date}</span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{item.teacherName} ({item.subject})</h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-2xl border border-slate-800">
                "{item.note}"
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl relative">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Tambah Catatan / Pesan Guru</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Nama Guru</label>
                  <input
                    type="text"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    required
                    placeholder="misal: Bpk. Hendra, S.Pd."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Mata Pelajaran / Peran</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    placeholder="misal: Wali Kelas / Matematika"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Tipe Pesan</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Pujian">Pujian</option>
                  <option value="Perhatian">Perhatian</option>
                  <option value="Pengumuman">Pengumuman</option>
                  <option value="Tugas">Tugas Khusus</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Isi Catatan Guru</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  required
                  placeholder="Tuliskan pesan atau masukan guru..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                />
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
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold"
                >
                  Simpan Catatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
