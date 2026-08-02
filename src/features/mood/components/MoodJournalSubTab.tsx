import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Tag, 
  Trash2, 
  Heart, 
  Lock, 
  Users, 
  ShieldCheck, 
  Sparkles,
  Calendar as CalendarIcon,
  Filter
} from 'lucide-react';
import { useMoodStore } from '../stores/useMoodStore';
import { MOOD_META_MAP } from '../utils/moodData';
import { SupportedMoodType, PrivacyLevel } from '../types/moodTypes';
import { FamilyMember } from '../../../types';

interface MoodJournalSubTabProps {
  currentMember?: FamilyMember;
}

export const MoodJournalSubTab: React.FC<MoodJournalSubTabProps> = ({ currentMember: propMember }) => {
  const { 
    getFilteredJournals, 
    journalSearchQuery, 
    setJournalSearchQuery, 
    journalTagFilter, 
    setJournalTagFilter,
    selectedMemberId,
    setSelectedMemberId,
    addJournal,
    deleteJournal,
    familyMoods
  } = useMoodStore();

  const [isNewJournalOpen, setNewJournalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<SupportedMoodType>('happy');
  const [tagsInput, setTagsInput] = useState('Keluarga, Catatan');
  const [privacy, setPrivacy] = useState<PrivacyLevel>('family_only');
  const [saving, setSaving] = useState(false);

  const filteredJournals = getFilteredJournals();

  const currentMember = propMember ? {
    memberId: propMember.id,
    memberName: propMember.name,
    detailedRole: propMember.roleTitle || propMember.detailedRole || propMember.relationship || 'Anggota Keluarga',
    avatar: propMember.avatar
  } : (familyMoods[0] || {
    memberId: 'mem_1',
    memberName: 'Budi Santoso',
    detailedRole: 'Ayah',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  });

  const handleCreateJournal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setSaving(true);
    try {
      const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
      await addJournal({
        memberId: currentMember.memberId,
        memberName: currentMember.memberName,
        memberRole: currentMember.detailedRole,
        memberAvatar: currentMember.avatar,
        title,
        content,
        mood,
        tags,
        date: new Date().toISOString().split('T')[0],
        privacy
      });

      setTitle('');
      setContent('');
      setNewJournalOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action & Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <span>Mood Journal & Refleksi Emosional</span>
            </h2>
            <p className="text-xs text-slate-400">
              Jurnal refleksi harian pribadi & keluarga untuk melatih kesadaran emosional (mindfulness)
            </p>
          </div>

          <button
            onClick={() => setNewJournalOpen(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-2xl text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Jurnal Baru</span>
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800/80">
          <div className="flex-1 min-w-[200px] bg-slate-950 border border-slate-800 rounded-2xl px-3 py-2 flex items-center gap-2 text-xs">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={journalSearchQuery}
              onChange={(e) => setJournalSearchQuery(e.target.value)}
              placeholder="Cari kata kunci jurnal emosi..."
              className="bg-transparent text-slate-200 outline-none w-full placeholder:text-slate-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={selectedMemberId}
              onChange={(e) => setSelectedMemberId(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none"
            >
              <option value="all">Semua Anggota Keluarga</option>
              {familyMoods.map((m) => (
                <option key={m.memberId} value={m.memberId}>{m.memberName} ({m.detailedRole})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* New Journal Modal / Expandable Form */}
      {isNewJournalOpen && (
        <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 space-y-4 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" /> Tulis Catatan Refleksi Baru
            </h3>
            <button
              onClick={() => setNewJournalOpen(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Tutup
            </button>
          </div>

          <form onSubmit={handleCreateJournal} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Judul Jurnal / Momen:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Refleksi setelah diskusi hangat dengan anak..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Pilih Suasana Hati:</label>
              <div className="flex flex-wrap gap-2">
                {Object.values(MOOD_META_MAP).slice(0, 8).map((m) => (
                  <button
                    key={m.type}
                    type="button"
                    onClick={() => setMood(m.type)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                      mood === m.type
                        ? 'bg-indigo-600 border-indigo-500 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>{m.emoji}</span>
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Isi Jurnal / Perasaan:</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                placeholder="Tuliskan pengalaman, pemicu emosi, atau pelajaran bernilai hari ini..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Tag (dipisah koma):</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Keluarga, Pekerjaan, Refleksi"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Pengaturan Akses / Privasi:</label>
                <select
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value as PrivacyLevel)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
                >
                  <option value="family_only">Tampak Seluruh Keluarga</option>
                  <option value="parent_only">Tampak Orang Tua Saja</option>
                  <option value="private">Privat / Diri Sendiri Saja</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setNewJournalOpen(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>{saving ? 'Menganalisis & Menyimpan...' : 'Simpan Jurnal AI'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Journal List Grid */}
      <div className="space-y-4">
        {filteredJournals.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 space-y-3">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">Belum Ada Catatan Jurnal Emosi</p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Mulailah menuliskan pengalaman dan kejelasan pikiranmu hari ini untuk membantu AI memberikan refleksi mendalam.
            </p>
          </div>
        ) : (
          filteredJournals.map((j) => {
            const meta = MOOD_META_MAP[j.mood] || MOOD_META_MAP.happy;
            const matchMember = familyMoods.find(m => m.memberId === j.memberId || m.memberName.toLowerCase() === j.memberName.toLowerCase());
            const displayAvatar = matchMember?.avatar || j.memberAvatar;

            return (
              <div 
                key={j.id} 
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 space-y-4 shadow-xl transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={displayAvatar} alt={j.memberName} className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30" />
                    <div>
                      <div className="font-bold text-sm text-white flex items-center gap-2">
                        <span>{j.title}</span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${meta.color}`}>
                          {meta.emoji} {meta.label}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {j.memberName} ({j.memberRole}) • {j.date} pukul {j.timestamp}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 font-mono flex items-center gap-1">
                      {j.privacy === 'private' ? <Lock className="w-3 h-3 text-rose-400" /> : <Users className="w-3 h-3 text-indigo-400" />}
                      {j.privacy}
                    </span>
                    <button
                      onClick={() => deleteJournal(j.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 bg-slate-950 hover:bg-rose-950/40 rounded-xl transition-colors"
                      title="Hapus Jurnal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line bg-slate-950/50 p-4 rounded-2xl border border-slate-800/80">
                  {j.content}
                </p>

                {/* AI Guidance Box */}
                {j.aiGuidance && (
                  <div className="bg-indigo-950/40 border border-indigo-500/30 p-3.5 rounded-2xl text-xs space-y-1">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Refleksi Reflektif AI Assistant</span>
                    </div>
                    <p className="text-slate-300 italic">{j.aiGuidance}</p>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {(j.tags || []).map((tag) => (
                    <span key={tag} className="text-[10px] px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
