import React from 'react';
import { 
  Bell, 
  Clock, 
  CheckCircle, 
  Moon, 
  Wind, 
  Droplet, 
  Smile, 
  Plus 
} from 'lucide-react';
import { useMoodStore } from '../stores/useMoodStore';

export const MoodRemindersSubTab: React.FC = () => {
  const { reminders, toggleReminder } = useMoodStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'fill_mood': return <Smile className="w-5 h-5 text-amber-400" />;
      case 'drink_water': return <Droplet className="w-5 h-5 text-sky-400" />;
      case 'meditation': return <Wind className="w-5 h-5 text-purple-400" />;
      case 'sleep': return <Moon className="w-5 h-5 text-indigo-400" />;
      default: return <Clock className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <span>Pusat Pengingat Kesejahteraan (Mood & Wellness Reminders)</span>
          </h2>
          <p className="text-xs text-slate-400">
            Jadwal notifikasi pintar pengisi mood, waktu istirahat, dan sesi mindfulness
          </p>
        </div>

        <button
          onClick={() => alert('Fitur penambahan jadwal pengingat kustom siap dikonfigurasi!')}
          className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-bold rounded-2xl text-xs flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Reminder Baru</span>
        </button>
      </div>

      {/* Reminder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reminders.map((rem) => (
          <div 
            key={rem.id}
            className={`bg-slate-950/80 border rounded-3xl p-5 space-y-4 shadow-md transition-all ${
              rem.enabled ? 'border-amber-500/40 shadow-amber-500/5' : 'border-slate-800 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-2xl">
                  {getIcon(rem.type)}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white leading-tight">{rem.title}</h4>
                  <p className="text-sm font-mono font-bold text-amber-300 mt-0.5">{rem.time} WIB</p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={() => toggleReminder(rem.id)}
                className={`w-12 h-6 rounded-full p-1 transition-colors flex items-center ${
                  rem.enabled ? 'bg-amber-500 justify-end' : 'bg-slate-800 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-slate-950 shadow-md" />
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">{rem.description}</p>

            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/80">
              <span>Hari: {rem.days?.join(', ') || 'Setiap Hari'}</span>
              <span className={rem.enabled ? 'text-amber-400 font-bold' : 'text-slate-600'}>
                {rem.enabled ? 'Aktif' : 'Nonaktif'}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
