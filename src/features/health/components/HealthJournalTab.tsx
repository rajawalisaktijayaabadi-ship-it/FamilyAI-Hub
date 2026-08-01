import React, { useState } from 'react';
import { 
  BookOpen, Plus, Search, Tag, Trash2, Smile, 
  Meh, Frown, Sparkles, CheckCircle2 
} from 'lucide-react';
import { useHealthStore } from '../../../store/useHealthStore';
import { FamilyMember } from '../../../types';

interface HealthJournalTabProps {
  familyMembers: FamilyMember[];
  activeMemberId: string;
}

export const HealthJournalTab: React.FC<HealthJournalTabProps> = ({
  familyMembers,
  activeMemberId,
}) => {
  const { healthJournals, addHealthJournal, deleteHealthJournal } = useHealthStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formMemberId, setFormMemberId] = useState(activeMemberId === 'all' ? 'm1' : activeMemberId);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagsText, setTagsText] = useState('Olahraga, Tensi Normal');
  const [moodRating, setMoodRating] = useState(5);

  const filteredJournals = healthJournals.filter((j) => {
    const matchesMember = activeMemberId === 'all' || j.memberId === activeMemberId;
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          j.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'all' || j.tags.includes(selectedTag);
    return matchesMember && matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(healthJournals.flatMap(j => j.tags)));

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addHealthJournal({
      memberId: formMemberId,
      date: new Date().toISOString().split('T')[0],
      title: title.trim(),
      content: content.trim(),
      tags: tagsText.split(',').map(t => t.trim()).filter(Boolean),
      moodRating,
      symptoms: []
    });

    setTitle('');
    setContent('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-rose-400" />
            <span>Health Journal & Symptom Diary</span>
          </h3>
          <p className="text-xs text-slate-400">
            Catatan harian gejala tubuh, suasana hati (mood), keluhan, dan progres gaya hidup sehat.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-600/30 flex items-center gap-2 transition-all self-start md:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tulis Catatan Baru</span>
        </button>
      </div>

      {/* Search & Tag Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari kata kunci jurnal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-rose-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedTag === 'all'
                ? 'bg-rose-600 text-white'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Semua Tag
          </button>

          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedTag === t
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              #{t}
            </button>
          ))}
        </div>
      </div>

      {/* Journal Entry Cards */}
      <div className="space-y-4">
        {filteredJournals.length === 0 ? (
          <div className="p-12 text-center bg-slate-900 rounded-3xl border border-slate-800 text-slate-500 text-xs">
            Belum ada catatan jurnal kesehatan yang cocok.
          </div>
        ) : (
          filteredJournals.map((journal) => {
            const memberObj = familyMembers.find((m) => m.id === journal.memberId);

            return (
              <div 
                key={journal.id} 
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 space-y-3 shadow-xl transition-all relative group"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    {memberObj && <img src={memberObj.avatar} alt={memberObj.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-rose-500/30" />}
                    <div>
                      <span className="font-bold text-xs text-white block">{memberObj?.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{journal.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1">
                      <Smile className="w-3.5 h-3.5 text-amber-400" />
                      <span>Mood: {journal.moodRating}/5</span>
                    </span>

                    <button
                      onClick={() => deleteHealthJournal(journal.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-bold text-base text-white">{journal.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    "{journal.content}"
                  </p>
                </div>

                {journal.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {journal.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2.5 py-0.5 rounded-lg bg-slate-800 text-rose-300 border border-slate-700 font-semibold">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modal Add Journal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl text-white animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-rose-400" />
                <span>Tulis Jurnal Kesehatan</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white font-bold text-xs">✕</button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Anggota Keluarga</label>
                <select
                  value={formMemberId}
                  onChange={(e) => setFormMemberId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                >
                  {familyMembers.map((m) => (
                    <option key={m.id} value={m.id}>{m.name} ({m.relationship})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Judul Jurnal</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Merasa bertenaga usai olahraga pagi"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Isi Catatan / Gejala</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ceritakan rasa tubuh, makanan, kebiasaan, atau keluhan fisik hari ini..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Tag (pisahkan koma)</label>
                  <input
                    type="text"
                    value={tagsText}
                    onChange={(e) => setTagsText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Skor Kebugaran (1-5)</label>
                  <select
                    value={moodRating}
                    onChange={(e) => setMoodRating(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                  >
                    <option value={5}>5 - Sangat Bertenaga</option>
                    <option value={4}>4 - Baik & Segar</option>
                    <option value={3}>3 - Cukup Sehat</option>
                    <option value={2}>2 - Agak Lemas</option>
                    <option value={1}>1 - Sakit / Kurang Fit</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-lg shadow-rose-600/30 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
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
