import React, { useState, useEffect } from 'react';
import { Tv, Clock, Sun, Heart, Home, ShieldCheck, X, Volume2, Calendar, Sparkles } from 'lucide-react';
import { FamilyMember, TaskItem, SmartDevice } from '../types';

interface SmartTVDashboardProps {
  familyMembers: FamilyMember[];
  tasks: TaskItem[];
  smartDevices: SmartDevice[];
  onClose: () => void;
}

export const SmartTVDashboard: React.FC<SmartTVDashboardProps> = ({
  familyMembers = [],
  tasks = [],
  smartDevices = [],
  onClose
}) => {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white p-8 flex flex-col justify-between overflow-hidden">
      
      {/* Top TV Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-lg font-black">
            TV
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">
              FamilyAI Hub • Smart TV Dashboard
            </h1>
            <p className="text-xs text-slate-400 font-semibold">Tampilan Ruang Keluarga & Layar Utama Ruang Tamu</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-3xl font-black font-mono text-amber-400">{time}</div>
            <div className="text-xs text-slate-400 font-medium">{date}</div>
          </div>

          <button
            onClick={onClose}
            className="p-3 bg-slate-900 hover:bg-slate-800 rounded-2xl border border-slate-800 text-slate-300 transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main TV Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-auto">
        
        {/* Family Member Moods */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
          <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-400" />
            <span>Suasana Hati Keluarga Hari Ini</span>
          </h2>

          <div className="space-y-3">
            {familyMembers.map((m) => (
              <div key={m.id} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/40" />
                  <div>
                    <div className="font-bold text-sm text-slate-100">{m.name}</div>
                    <div className="text-xs text-slate-400">{m.relationship}</div>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-900 border border-slate-800 font-bold text-amber-300 capitalize">
                  {m.mood} • {m.statusText}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Agenda & Tasks */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
          <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <span>Agenda & Kegiatan Hari Ini</span>
          </h2>

          <div className="space-y-3">
            {tasks.map((t) => (
              <div key={t.id} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-slate-100">{t.title}</div>
                  <div className="text-xs text-slate-400">Penanggungjawab: {t.assignedToName}</div>
                </div>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                  t.completed ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
                }`}>
                  {t.completed ? 'Selesai' : t.dueDate}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Home Quick Status */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
          <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2">
            <Home className="w-5 h-5 text-emerald-400" />
            <span>Status Smart Home Ruang Utama</span>
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {smartDevices.slice(0, 4).map((d) => (
              <div key={d.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between h-28">
                <span className="text-[10px] text-slate-400 uppercase font-bold">{d.room}</span>
                <div className="font-bold text-xs text-white truncate">{d.name}</div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full self-start ${
                  d.status ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-slate-900 text-slate-500'
                }`}>
                  {d.status ? 'AKTIF' : 'MATI'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom TV Bar */}
      <div className="border-t border-slate-800 pt-4 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2 text-amber-300 font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>Pengingat AI: "Selamat menikmati waktu berkualitas bersama keluarga malam ini."</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Kualitas Udara: 24 AQI (Sangat Baik)</span>
          <span>•</span>
          <span>Suhu Ruang: 24°C</span>
        </div>
      </div>

    </div>
  );
};
