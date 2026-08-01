import React from 'react';
import { 
  HeartPulse, 
  Sparkles, 
  Clock, 
  Pill, 
  Users, 
  Brain, 
  CheckCircle2, 
  Square, 
  CheckSquare 
} from 'lucide-react';
import { usePsychologyStore } from '../stores/usePsychologyStore';

export const SeniorCareSubTab: React.FC = () => {
  const { seniorCare, toggleSeniorMedicine, toggleSeniorActivity } = usePsychologyStore();

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/90 border border-emerald-500/30 rounded-3xl p-6 text-white space-y-3 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-2xl">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Layanan Kesejahteraan Lansia (Senior Care & Memory Hub)</h2>
            <p className="text-xs text-slate-300">
              Pendampingan kesehatan emosi lansia, latihan stimulasi memori, dan pengingat aktivitas harian
            </p>
          </div>
        </div>
      </div>

      {/* Mood Summary Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>Ringkasan Kondisi Emosi Lansia (Oma / Opa)</span>
        </h3>
        <p className="text-xs text-slate-200 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
          "{seniorCare.moodSummary}"
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Activity Reminders */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Jadwal Aktivitas Sehat</span>
          </h3>

          <div className="space-y-2">
            {seniorCare.activityReminders.map((act) => (
              <button
                key={act.id}
                onClick={() => toggleSeniorActivity(act.id)}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between text-xs transition-all ${
                  act.done 
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200 line-through' 
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="font-bold">{act.title}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{act.time}</div>
                </div>
                {act.done ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4 text-slate-500" />}
              </button>
            ))}
          </div>
        </div>

        {/* Medicine Reminders */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Pill className="w-4 h-4 text-rose-400" />
            <span>Pengingat Vitamin / Obat</span>
          </h3>

          <div className="space-y-2">
            {seniorCare.medicineReminders.map((med) => (
              <button
                key={med.id}
                onClick={() => toggleSeniorMedicine(med.id)}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between text-xs transition-all ${
                  med.taken 
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200 line-through' 
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="font-bold">{med.name} ({med.dosage})</div>
                  <div className="text-[10px] text-slate-400 font-mono">{med.time}</div>
                </div>
                {med.taken ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4 text-slate-500" />}
              </button>
            ))}
          </div>
        </div>

        {/* Memory Activities & Family Visit */}
        <div className="space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-400" />
              <span>Stimulasi Memori & Kognitif</span>
            </h3>

            <div className="space-y-2 text-xs">
              {seniorCare.memoryActivities.map((act, i) => (
                <div key={i} className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-5 space-y-2 shadow-xl">
            <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-400" /> Jadwal Kumpul Hangat Keluarga
            </div>
            <p className="text-xs text-slate-300">{seniorCare.familyVisitReminder}</p>
          </div>
        </div>

      </div>

    </div>
  );
};
