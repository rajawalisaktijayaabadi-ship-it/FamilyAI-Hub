import React, { useState } from 'react';
import { 
  GitCommitHorizontal, 
  Calendar, 
  User, 
  Zap, 
  Activity, 
  Sparkles, 
  Lock, 
  Users 
} from 'lucide-react';
import { useMoodStore } from '../stores/useMoodStore';
import { MOOD_META_MAP } from '../utils/moodData';

export const MoodTimelineSubTab: React.FC = () => {
  const { checkIns, familyMoods, selectedMemberId, setSelectedMemberId } = useMoodStore();
  const [filterPeriod, setFilterPeriod] = useState<'day' | 'week' | 'month'>('week');

  const filteredCheckIns = selectedMemberId === 'all' 
    ? checkIns 
    : checkIns.filter((c) => c.memberId === selectedMemberId);

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <GitCommitHorizontal className="w-5 h-5 text-sky-400" />
            <span>Timeline Emosi Kronologis (Emotion Stream)</span>
          </h2>
          <p className="text-xs text-slate-400">
            Jejak perubahan suasana hati dan pemicu emosional sepanjang waktu
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedMemberId}
            onChange={(e) => setSelectedMemberId(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-2xl px-3 py-2 text-xs text-slate-200 outline-none"
          >
            <option value="all">Seluruh Anggota Keluarga</option>
            {familyMoods.map((m) => (
              <option key={m.memberId} value={m.memberId}>{m.memberName} ({m.detailedRole})</option>
            ))}
          </select>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => setFilterPeriod('day')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterPeriod === 'day' ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              Per Hari
            </button>
            <button
              onClick={() => setFilterPeriod('week')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterPeriod === 'week' ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              Per Minggu
            </button>
            <button
              onClick={() => setFilterPeriod('month')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterPeriod === 'month' ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              Per Bulan
            </button>
          </div>
        </div>
      </div>

      {/* Vertical Timeline Stream */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 relative">
        <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-slate-800 hidden sm:block" />

        {filteredCheckIns.length === 0 ? (
          <div className="text-center py-12 text-slate-400 space-y-2">
            <GitCommitHorizontal className="w-10 h-10 mx-auto text-slate-600" />
            <p className="text-xs">Belum ada riwayat timeline emosi yang tercatat.</p>
          </div>
        ) : (
          filteredCheckIns.map((chk, index) => {
            const meta = MOOD_META_MAP[chk.mood] || MOOD_META_MAP.happy;
            const matchMember = familyMoods.find(m => m.memberId === chk.memberId || m.memberName.toLowerCase() === chk.memberName.toLowerCase());
            const displayAvatar = matchMember?.avatar || chk.memberAvatar;

            return (
              <div key={chk.id} className="flex items-start gap-4 sm:pl-4 relative">
                {/* Timeline Dot */}
                <div className="w-8 h-8 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center text-sm flex-shrink-0 z-10 shadow-lg hidden sm:flex">
                  {meta.emoji}
                </div>

                {/* Card Body */}
                <div className="flex-1 bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-3 shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                    <div className="flex items-center gap-2.5">
                      <img src={displayAvatar} alt={chk.memberName} className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30" />
                      <div>
                        <div className="font-bold text-xs text-white">{chk.memberName} ({chk.memberRole})</div>
                        <div className="text-[10px] text-slate-400">{chk.date} • {chk.timestamp}</div>
                      </div>
                    </div>

                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${meta.color}`}>
                      {meta.emoji} {meta.label}
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 italic">"{chk.note}"</p>

                  {/* Meters & Activities */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-3 text-[11px] font-mono text-slate-300">
                      <span className="text-amber-400">⚡ Energi: {chk.energyLevel}/10</span>
                      <span className="text-rose-400">⚡ Stress: {chk.stressLevel}/10</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {chk.activities?.map((act) => (
                        <span key={act} className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
                          {act}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* AI Advice */}
                  {chk.aiReflectionNote && (
                    <div className="text-[11px] text-indigo-300 bg-indigo-950/40 border border-indigo-500/20 p-2.5 rounded-xl flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300 flex-shrink-0 mt-0.5" />
                      <span>{chk.aiReflectionNote}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
