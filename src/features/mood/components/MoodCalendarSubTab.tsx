import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Heart, 
  Zap, 
  Activity, 
  X,
  Users
} from 'lucide-react';
import { useMoodStore } from '../stores/useMoodStore';
import { MOOD_META_MAP } from '../utils/moodData';
import { SupportedMoodType, DailyCheckIn } from '../types/moodTypes';

export const MoodCalendarSubTab: React.FC = () => {
  const { checkIns, familyMoods } = useMoodStore();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 1)); // July 2026
  const [selectedDayCheckIn, setSelectedDayCheckIn] = useState<DailyCheckIn | null>(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthName = currentDate.toLocaleString('id-ID', { month: 'long', year: 'numeric' });

  // Map checkins by date key YYYY-MM-DD
  const checkInMap = new Map<string, DailyCheckIn>();
  checkIns.forEach((c) => {
    checkInMap.set(c.date, c);
  });

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-indigo-400" />
            <span>Kalender Suasana Hati (Mood Calendar)</span>
          </h2>
          <p className="text-xs text-slate-400">
            Peta visual warna emosi harian keluarga dalam tampilan kalender bulanan
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrevMonth}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-bold text-white font-mono min-w-[140px] text-center">
            {monthName}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-800">
          <div>Min</div>
          <div>Sen</div>
          <div>Sel</div>
          <div>Rab</div>
          <div>Kam</div>
          <div>Jum</div>
          <div>Sab</div>
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells before month start */}
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty_${i}`} className="h-24 bg-slate-950/30 rounded-2xl border border-slate-800/40" />
          ))}

          {/* Actual days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const monthStr = String(currentDate.getMonth() + 1).padStart(2, '0');
            const dayStr = String(dayNum).padStart(2, '0');
            const dateKey = `${currentDate.getFullYear()}-${monthStr}-${dayStr}`;

            const checkIn = checkInMap.get(dateKey);
            const moodMeta = checkIn ? MOOD_META_MAP[checkIn.mood] : null;

            return (
              <div
                key={dateKey}
                onClick={() => checkIn && setSelectedDayCheckIn(checkIn)}
                className={`h-24 rounded-2xl p-2.5 border flex flex-col justify-between transition-all cursor-pointer ${
                  checkIn
                    ? `${moodMeta?.color} shadow-md hover:scale-[1.03]`
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-slate-200">{dayNum}</span>
                  {checkIn && <span className="text-lg">{moodMeta?.emoji}</span>}
                </div>

                {checkIn ? (
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold truncate text-slate-200">{moodMeta?.label}</div>
                    <div className="text-[9px] opacity-80 font-mono">⚡ Energi: {checkIn.energyLevel}/10</div>
                  </div>
                ) : (
                  <div className="text-[9px] text-slate-600 italic">Belum diisi</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Slide-Over Modal */}
      {selectedDayCheckIn && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl relative text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{MOOD_META_MAP[selectedDayCheckIn.mood]?.emoji}</span>
                <div>
                  <h3 className="font-bold text-sm">
                    Detail Mood Tanggal {selectedDayCheckIn.date}
                  </h3>
                  <p className="text-xs text-slate-400">{selectedDayCheckIn.memberName} ({selectedDayCheckIn.memberRole})</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDayCheckIn(null)}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Level Energi</div>
                  <div className="text-amber-400 font-bold text-sm">{selectedDayCheckIn.energyLevel} / 10 ⚡</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Level Stress</div>
                  <div className="text-rose-400 font-bold text-sm">{selectedDayCheckIn.stressLevel} / 10 ⚡</div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Catatan Emosi:</label>
                <p className="text-xs text-slate-200 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  "{selectedDayCheckIn.note}"
                </p>
              </div>

              {(selectedDayCheckIn.gratitudeItems?.length || 0) > 0 && (
                <div>
                  <label className="text-xs font-bold text-amber-300 block mb-1">Disyukuri Hari Ini:</label>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    {(selectedDayCheckIn.gratitudeItems || []).map((g, idx) => (
                      <li key={idx}>{g}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedDayCheckIn.aiReflectionNote && (
                <div className="bg-indigo-950/40 border border-indigo-500/30 p-3 rounded-2xl text-xs space-y-1">
                  <div className="font-bold text-amber-300 flex items-center gap-1">
                    <Sparkles className="w-4 h-4" /> AI Reflection
                  </div>
                  <p className="text-slate-200">{selectedDayCheckIn.aiReflectionNote}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
