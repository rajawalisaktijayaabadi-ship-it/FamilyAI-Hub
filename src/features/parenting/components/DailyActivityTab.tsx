import React, { useState } from 'react';
import { 
  Clock, 
  Plus, 
  BookOpen, 
  Activity as SportIcon, 
  Gamepad2, 
  Palette, 
  Music, 
  Moon, 
  Utensils, 
  Sparkles, 
  Home, 
  Smile,
  Calendar,
  Save
} from 'lucide-react';
import { Child, DailyActivity, ActivityCategory } from '../types';

interface DailyActivityTabProps {
  child: Child;
  dailyActivities: DailyActivity[];
  onAddDailyActivity: (activity: Omit<DailyActivity, 'id'>) => void;
}

export const DailyActivityTab: React.FC<DailyActivityTabProps> = ({
  child,
  dailyActivities,
  onAddDailyActivity
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [category, setCategory] = useState<ActivityCategory>('Belajar');
  const [title, setTitle] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [startTime, setStartTime] = useState('16:00');
  const [notes, setNotes] = useState('');
  const [moodRating, setMoodRating] = useState(5);

  const childActivities = dailyActivities.filter((a) => a.childId === child.id);

  const categoriesConfig: { category: ActivityCategory; icon: any; color: string }[] = [
    { category: 'Belajar', icon: BookOpen, color: 'text-purple-400' },
    { category: 'Membaca', icon: BookOpen, color: 'text-indigo-400' },
    { category: 'Olahraga', icon: SportIcon, color: 'text-emerald-400' },
    { category: 'Bermain', icon: Gamepad2, color: 'text-pink-400' },
    { category: 'Menggambar', icon: Palette, color: 'text-amber-400' },
    { category: 'Musik', icon: Music, color: 'text-teal-400' },
    { category: 'Tidur', icon: Moon, color: 'text-blue-400' },
    { category: 'Makan', icon: Utensils, color: 'text-rose-400' },
    { category: 'Ibadah', icon: Sparkles, color: 'text-amber-300' },
    { category: 'Kegiatan Rumah', icon: Home, color: 'text-cyan-400' }
  ];

  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddDailyActivity({
      childId: child.id,
      date: new Date().toISOString().split('T')[0],
      category,
      title,
      durationMinutes: Number(durationMinutes),
      startTime,
      notes,
      moodRating: Number(moodRating)
    });

    setTitle('');
    setNotes('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-pink-400" />
            <span>Pencatatan Aktivitas Harian Anak</span>
          </h2>
          <p className="text-xs text-slate-400">
            Catat rutinitas belajar, membaca, olahraga, bermain, musik, tidur, ibadah, & kegiatan rumah {child.name}.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold rounded-2xl shadow-lg transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Catat Aktivitas</span>
        </button>
      </div>

      {/* Quick Category Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categoriesConfig.map((catItem) => {
          const IconComp = catItem.icon;
          return (
            <button
              key={catItem.category}
              onClick={() => {
                setCategory(catItem.category);
                setShowAddModal(true);
              }}
              className="flex items-center gap-2 px-3 py-2 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 rounded-2xl text-xs font-semibold text-slate-200 shrink-0 transition-all"
            >
              <IconComp className={`w-4 h-4 ${catItem.color}`} />
              <span>{catItem.category}</span>
            </button>
          );
        })}
      </div>

      {/* Activity Logs List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-pink-400" />
          <span>Jurnal & Log Aktivitas {child.name}</span>
        </h3>

        {childActivities.length === 0 ? (
          <p className="text-xs text-slate-400 py-8 text-center">Belum ada aktivitas anak dicatat hari ini.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {childActivities.map((act) => {
              const matchedConfig = categoriesConfig.find((c) => c.category === act.category) || categoriesConfig[0];
              const IconComp = matchedConfig.icon;

              return (
                <div key={act.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg bg-slate-900 border border-slate-800 ${matchedConfig.color}`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-pink-300">{act.category}</span>
                    </div>

                    <span className="text-[10px] text-slate-400 font-semibold">
                      {act.startTime || ''} ({act.durationMinutes} mnt)
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white">{act.title}</h4>

                  {act.notes && <p className="text-xs text-slate-300 leading-snug">{act.notes}</p>}

                  {act.moodRating && (
                    <div className="flex items-center gap-1 text-[11px] text-amber-300 pt-1">
                      <Smile className="w-3.5 h-3.5 text-amber-400" />
                      <span>Mood / Antusiasme: {act.moodRating}/5 Star</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Add Activity */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl text-xs">
            <h3 className="text-base font-bold text-white">Catat Aktivitas Anak</h3>

            <form onSubmit={handleSaveActivity} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Kategori Aktivitas</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                >
                  {categoriesConfig.map((c) => (
                    <option key={c.category} value={c.category}>{c.category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Nama / Judul Aktivitas</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  placeholder="mis. Belajar Matematika Pecahan..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Durasi (Menit)</label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Jam Mulai</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Skala Antusiasme / Mood Anak (1-5)</label>
                <select
                  value={moodRating}
                  onChange={(e) => setMoodRating(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (Sangat Antusias)</option>
                  <option value={4}>⭐⭐⭐⭐ (Senang)</option>
                  <option value={3}>⭐⭐⭐ (Cukup)</option>
                  <option value={2}>⭐⭐ (Biasa saja)</option>
                  <option value={1}>⭐ (Kurang nyaman)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Catatan Orang Tua</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  placeholder="Hasil aktivitas, minat yang terlihat..."
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
                  <span>Simpan Aktivitas</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
