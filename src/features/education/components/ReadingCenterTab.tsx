import React, { useState } from 'react';
import {
  BookMarked,
  Plus,
  Trash2,
  Star,
  CheckCircle2,
  BookOpen,
  Edit2,
  Clock,
  Bookmark
} from 'lucide-react';
import { useEducationStore } from '../../../store/useEducationStore';
import { ReadingCategory } from '../types';

interface ReadingCenterTabProps {
  childName: string;
}

export const ReadingCenterTab: React.FC<ReadingCenterTabProps> = ({ childName }) => {
  const { selectedChildId, readingLogs, addReadingLog, updateReadingProgress, deleteReadingLog } =
    useEducationStore();

  const childLogs = readingLogs.filter((r) => r.childId === selectedChildId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState<ReadingCategory>('Buku');
  const [totalPages, setTotalPages] = useState(100);
  const [pagesRead, setPagesRead] = useState(0);
  const [summary, setSummary] = useState('');
  const [rating, setRating] = useState(5);

  const [editingLogId, setEditingLogId] = useState<string | null>(null);
  const [tempPages, setTempPages] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReadingLog({
      childId: selectedChildId,
      bookTitle,
      author,
      category,
      totalPages,
      pagesRead,
      status: pagesRead >= totalPages ? 'Selesai' : 'Sedang Dibaca',
      summary,
      rating,
      lastReadDate: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(false);
    setBookTitle('');
    setAuthor('');
  };

  const handleUpdatePages = (id: string) => {
    updateReadingProgress(id, tempPages);
    setEditingLogId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-indigo-400" />
            <span>Pojok Baca & Jurnal Literasi ({childName})</span>
          </h2>
          <p className="text-xs text-slate-400">
            Catat buku cerita, ensiklopedia, dan komik edukasi yang sedang atau telah selesai dibaca.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Buku Baru</span>
        </button>
      </div>

      {/* Book Cards Grid */}
      {childLogs.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-3">
          <BookMarked className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm font-bold text-white">Belum Ada Catatan Membaca</p>
          <p className="text-xs text-slate-400">
            Tambahkan buku favorit anak untuk melacak kemajuan bacaan per halaman.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {childLogs.map((log) => {
            const percent = Math.round((log.pagesRead / log.totalPages) * 100);
            const isCompleted = log.status === 'Selesai';

            return (
              <div
                key={log.id}
                className="bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-3xl p-5 shadow-lg space-y-4 flex flex-col justify-between transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                      {log.category}
                    </span>
                    <button
                      onClick={() => deleteReadingLog(log.id)}
                      className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white line-clamp-2">{log.bookTitle}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Karya: {log.author}</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="bg-slate-950/80 rounded-2xl p-3 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Halaman Dibaca</span>
                      <span className="font-bold text-white">
                        {log.pagesRead} <span className="text-[10px] text-slate-500">/ {log.totalPages}</span>
                      </span>
                    </div>

                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isCompleted ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Progres: {percent}%</span>
                      <span>Terakhir: {log.lastReadDate}</span>
                    </div>
                  </div>

                  {log.summary && (
                    <p className="text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80 line-clamp-2">
                      "{log.summary}"
                    </p>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{log.rating || 5} / 5</span>
                  </div>

                  {editingLogId === log.id ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        max={log.totalPages}
                        value={tempPages}
                        onChange={(e) => setTempPages(Number(e.target.value))}
                        className="w-16 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-white"
                      />
                      <button
                        onClick={() => handleUpdatePages(log.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold"
                      >
                        OK
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingLogId(log.id);
                        setTempPages(log.pagesRead);
                      }}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-xl text-xs font-semibold flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Update Halaman</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Add Book */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl relative">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Tambah Buku / Bacaan Baru</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Judul Buku / Artikel</label>
                <input
                  type="text"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  required
                  placeholder="misal: Ensiklopedia Keajaiban Tata Surya"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Penulis / Penerbit</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    placeholder="misal: National Geographic Kids"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ReadingCategory)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Buku">Buku</option>
                    <option value="Artikel">Artikel</option>
                    <option value="Komik Edukasi">Komik Edukasi</option>
                    <option value="Novel">Novel</option>
                    <option value="Jurnal">Jurnal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Total Halaman</label>
                  <input
                    type="number"
                    min={1}
                    value={totalPages}
                    onChange={(e) => setTotalPages(Number(e.target.value))}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Sudah Dibaca (Halaman)</label>
                  <input
                    type="number"
                    min={0}
                    max={totalPages}
                    value={pagesRead}
                    onChange={(e) => setPagesRead(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Ringkasan / Kesan Anak Terhadap Buku</label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={2}
                  placeholder="Ceritakan singkat hal paling menarik dari isi buku..."
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
                  Simpan Bacaan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
