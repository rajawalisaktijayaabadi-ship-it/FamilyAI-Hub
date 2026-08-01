import React, { useState } from 'react';
import { 
  Moon, Clock, Sparkles, Watch, Plus, CheckCircle2, 
  TrendingUp, ShieldCheck 
} from 'lucide-react';
import { useHealthStore } from '../../../store/useHealthStore';
import { FamilyMember } from '../../../types';

interface SleepTrackerTabProps {
  familyMembers: FamilyMember[];
  activeMemberId: string;
}

export const SleepTrackerTab: React.FC<SleepTrackerTabProps> = ({
  familyMembers,
  activeMemberId,
}) => {
  const { sleepLogs, addSleepLog } = useHealthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formMemberId, setFormMemberId] = useState(activeMemberId === 'all' ? 'm1' : activeMemberId);
  const [bedtime, setBedtime] = useState('22:30');
  const [waketime, setWaketime] = useState('06:00');
  const [durationHours, setDurationHours] = useState(7.5);
  const [sleepQuality, setSleepQuality] = useState<'Sangat Baik' | 'Baik' | 'Cukup' | 'Buruk'>('Sangat Baik');
  const [notes, setNotes] = useState('');

  const filteredSleep = sleepLogs.filter((s) => activeMemberId === 'all' || s.memberId === activeMemberId);

  const avgHours = filteredSleep.length > 0 
    ? (filteredSleep.reduce((acc, curr) => acc + curr.durationHours, 0) / filteredSleep.length).toFixed(1)
    : '7.5';

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addSleepLog({
      memberId: formMemberId,
      date: new Date().toISOString().split('T')[0],
      bedtime,
      waketime,
      durationHours: Number(durationHours),
      sleepQuality,
      wearableSynced: true,
      notes: notes.trim() || undefined
    });

    setNotes('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Stats */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Moon className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-white">Sleep & Recovery Tracker</h3>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            Pemantauan jam tidur, waktu bangun, durasi istirahat, dan skor pemulihan tubuh (Sleep Quality).
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Rata-Rata Tidur</span>
            <span className="text-xl font-extrabold text-indigo-400">{avgHours} <span className="text-xs font-semibold text-slate-400">Jam / Malam</span></span>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Status Pemulihan</span>
            <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Sangat Baik</span>
            </span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-2 px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Catat Tidur</span>
          </button>
        </div>
      </div>

      {/* Sleep Logs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSleep.map((log) => {
          const memberObj = familyMembers.find((m) => m.id === log.memberId);

          return (
            <div key={log.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  {memberObj && <img src={memberObj.avatar} alt={memberObj.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-indigo-500/30" />}
                  <div>
                    <span className="font-bold text-xs text-white block">{memberObj?.name}</span>
                    <span className="text-[10px] text-slate-400">{memberObj?.relationship}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {log.wearableSynced && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold flex items-center gap-1">
                      <Watch className="w-3 h-3" />
                      <span>Wearable Synced</span>
                    </span>
                  )}
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-bold">
                    Kualitas: {log.sleepQuality}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                <div>
                  <span className="text-[10px] text-slate-500 block font-bold">Jam Tidur</span>
                  <span className="font-mono font-bold text-indigo-300 text-xs">{log.bedtime}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block font-bold">Jam Bangun</span>
                  <span className="font-mono font-bold text-amber-300 text-xs">{log.waketime}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block font-bold">Durasi Total</span>
                  <span className="font-extrabold text-white text-sm">{log.durationHours} jam</span>
                </div>
              </div>

              {log.notes && (
                <p className="text-[11px] text-slate-400 italic bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
                  "{log.notes}"
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal Add Sleep Log */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl text-white animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Moon className="w-5 h-5 text-indigo-400" />
                <span>Catat Riwayat Tidur</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white font-bold text-xs">✕</button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Anggota Keluarga</label>
                <select
                  value={formMemberId}
                  onChange={(e) => setFormMemberId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-indigo-500 outline-none"
                >
                  {familyMembers.map((m) => (
                    <option key={m.id} value={m.id}>{m.name} ({m.relationship})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Jam Tidur</label>
                  <input
                    type="time"
                    value={bedtime}
                    onChange={(e) => setBedtime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-indigo-500 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Jam Bangun</label>
                  <input
                    type="time"
                    value={waketime}
                    onChange={(e) => setWaketime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-indigo-500 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Total Jam (Durasi)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={durationHours}
                    onChange={(e) => setDurationHours(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Kualitas Tidur</label>
                  <select
                    value={sleepQuality}
                    onChange={(e) => setSleepQuality(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-indigo-500 outline-none"
                  >
                    <option value="Sangat Baik">Sangat Baik</option>
                    <option value="Baik">Baik</option>
                    <option value="Cukup">Cukup</option>
                    <option value="Buruk">Buruk</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Catatan Kualitas Tidur</label>
                <input
                  type="text"
                  placeholder="Contoh: Tidur lelap tanpa terbangun malam hari"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-indigo-500 outline-none"
                />
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
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simpan Data Tidur</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
