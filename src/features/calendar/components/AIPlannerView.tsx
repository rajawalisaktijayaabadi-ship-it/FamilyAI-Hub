import React, { useEffect } from 'react';
import { 
  Bot, AlertTriangle, Sparkles, Clock, Calendar, Check, X, RefreshCw, 
  Lightbulb, ArrowRight, FileText, CheckCircle2 
} from 'lucide-react';
import { useCalendarStore } from '../stores/useCalendarStore';
import { usePlannerStore } from '../stores/usePlannerStore';
import { CalendarService } from '../services/calendarService';
import { PlannerService } from '../services/plannerService';

export const AIPlannerView: React.FC = () => {
  const { events, selectedDate } = useCalendarStore();
  const { suggestions, history, generateSuggestions, acceptSuggestion, dismissSuggestion } = usePlannerStore();

  useEffect(() => {
    generateSuggestions();
  }, [events]);

  const conflicts = CalendarService.detectConflicts(events);
  const freeSlots = CalendarService.findFreeTimeSlots(events, selectedDate);

  const dailySummary = PlannerService.generateDailySummary(events, selectedDate);
  const weeklySummary = PlannerService.generateWeeklySummary(events);
  const monthlySummary = PlannerService.generateMonthlySummary(events);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900/60 via-indigo-900/40 to-slate-900 border border-purple-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="flex items-start justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-purple-500/20 text-purple-300 rounded-2xl border border-purple-500/40 shadow-inner">
              <Bot className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Smart AI Planner Engine</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/40 font-bold uppercase">
                  AI Active
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Sistem optimasi jadwal pintar yang mendeteksi bentrok kegiatan, menganalisis slot waktu luang, dan merekomendasikan aktivitas ideal keluarga.
              </p>
            </div>
          </div>

          <button
            onClick={() => generateSuggestions()}
            className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-purple-600/30 transition-all whitespace-nowrap"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Analisis Ulang
          </button>
        </div>
      </div>

      {/* Peringatan Konflik Jadwal (jika ada) */}
      {conflicts.length > 0 && (
        <div className="p-5 rounded-3xl bg-rose-950/40 border border-rose-500/50 space-y-3">
          <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            Terdeteksi {conflicts.length} Bentrok Jadwal Anggota Keluarga!
          </div>

          <div className="space-y-2">
            {conflicts.map((c) => (
              <div key={c.id} className="p-3.5 rounded-2xl bg-rose-900/20 border border-rose-500/30 text-xs text-rose-200 space-y-1">
                <div className="font-semibold text-rose-300">{c.conflictReason}</div>
                <div className="text-slate-300 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> <span className="font-medium text-amber-300">Solusi AI:</span> {c.suggestedResolution}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid Summary & Free Time Finder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summaries Panel */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-5 backdrop-blur-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Ringkasan AI Agenda & Distribusi Kegiatan</h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-1">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wide">Ringkasan Harian ({selectedDate})</span>
              <p className="text-xs text-slate-200 whitespace-pre-line leading-relaxed">{dailySummary}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-1">
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wide">Analisis Mingguan</span>
              <p className="text-xs text-slate-200 leading-relaxed">{weeklySummary}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-1">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Estimasi Bulanan</span>
              <p className="text-xs text-slate-200 leading-relaxed">{monthlySummary}</p>
            </div>
          </div>
        </div>

        {/* Free Time Finder Panel */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 backdrop-blur-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Clock className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Free Time Finder ({selectedDate})</h3>
          </div>

          <p className="text-xs text-slate-400">
            Slot waktu senggang bersama (08:00 - 21:00) yang siap dimanfaatkan untuk kegiatan santai:
          </p>

          <div className="space-y-2">
            {freeSlots.length === 0 ? (
              <div className="p-4 rounded-2xl bg-slate-800/30 text-center text-xs text-slate-500">
                Jadwal padat. Tidak ditemukan slot senggang di atas 30 menit.
              </div>
            ) : (
              freeSlots.map((slot, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-emerald-300 font-mono">{slot.startTime} - {slot.endTime}</div>
                    <div className="text-[10px] text-slate-400">Durasi: {slot.durationMinutes} menit</div>
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Senggang
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Rekomendasi AI & Actionable Suggestions */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Rekomendasi AI Planner</h3>
          </div>
          <span className="text-xs text-slate-400">{suggestions.filter(s => s.status === 'pending').length} saran tersedia</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.filter(s => s.status === 'pending').map((sug) => (
            <div key={sug.id} className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-3 flex flex-col justify-between hover:border-purple-500/50 transition-all">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                    {sug.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{sug.suggestedDate} @ {sug.suggestedTime}</span>
                </div>
                <h4 className="text-sm font-bold text-white">{sug.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{sug.description}</p>
                <div className="text-[11px] text-emerald-400 bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
                  ⚡ Impact: {sug.impactText}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-700/50">
                <button
                  onClick={() => acceptSuggestion(sug.id)}
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30 transition-colors"
                >
                  <Check className="w-3.5 h-3.5" /> Terima & Jadwalkan
                </button>
                <button
                  onClick={() => dismissSuggestion(sug.id)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl text-xs font-semibold transition-colors border border-slate-700"
                >
                  Abaikan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
