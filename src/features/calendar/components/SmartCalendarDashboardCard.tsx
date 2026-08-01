import React from 'react';
import { 
  Calendar, Clock, Bot, Gift, Bell, Plus, Users, Video, ChevronRight, MapPin 
} from 'lucide-react';
import { useCalendarStore } from '../stores/useCalendarStore';
import { useReminderStore } from '../stores/useReminderStore';
import { usePlannerStore } from '../stores/usePlannerStore';

interface SmartCalendarDashboardCardProps {
  onNavigateToCalendar: () => void;
  onNavigateToReminders: () => void;
}

export const SmartCalendarDashboardCard: React.FC<SmartCalendarDashboardCardProps> = ({
  onNavigateToCalendar,
  onNavigateToReminders
}) => {
  const { events, openAddEventModal } = useCalendarStore();
  const { reminders } = useReminderStore();
  const { suggestions } = usePlannerStore();

  const todayStr = new Date().toISOString().split('T')[0];
  const todayEvents = events.filter(e => e.startDate === todayStr);
  const upcomingBirthdays = events.filter(e => e.category === 'Ulang Tahun');
  const activeReminders = reminders.filter(r => !r.isCompleted);
  const activeSuggestions = suggestions.filter(s => s.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Quick Action Bar */}
      <div className="p-4 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-400" />
          <span className="text-sm font-bold text-white">Smart Calendar & Planner Quick Actions</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => openAddEventModal(todayStr)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> + Agenda Hari Ini
          </button>
          <button
            onClick={onNavigateToCalendar}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-xl text-xs font-semibold border border-slate-700 transition-all"
          >
            <Users className="w-3.5 h-3.5 text-indigo-400" /> + Family Time
          </button>
          <button
            onClick={() => openAddEventModal(todayStr)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl text-xs font-semibold border border-slate-700 transition-all"
          >
            <Video className="w-3.5 h-3.5 text-cyan-400" /> + Meeting
          </button>
          <button
            onClick={() => openAddEventModal(todayStr)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-rose-300 rounded-xl text-xs font-semibold border border-slate-700 transition-all"
          >
            <Gift className="w-3.5 h-3.5 text-rose-400" /> + Birthday
          </button>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Today's Schedule */}
        <div 
          onClick={onNavigateToCalendar}
          className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/60 cursor-pointer transition-all backdrop-blur-xl shadow-xl flex flex-col justify-between group space-y-3"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <h4 className="text-xs font-bold text-white">Agenda Hari Ini</h4>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold">
              {todayEvents.length} Event
            </span>
          </div>

          <div className="space-y-2 flex-1">
            {todayEvents.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">Tidak ada agenda hari ini.</p>
            ) : (
              todayEvents.slice(0, 2).map((e) => (
                <div key={e.id} className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-0.5">
                  <div className="text-xs font-bold text-white truncate">{e.title}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{e.startTime} - {e.endTime}</div>
                </div>
              ))
            )}
          </div>

          <div className="text-[11px] font-semibold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-1 border-t border-slate-800">
            Buka Kalender <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Upcoming Birthdays */}
        <div 
          onClick={onNavigateToReminders}
          className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/60 cursor-pointer transition-all backdrop-blur-xl shadow-xl flex flex-col justify-between group space-y-3"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-rose-400" />
              <h4 className="text-xs font-bold text-white">Ulang Tahun</h4>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold">
              {upcomingBirthdays.length}
            </span>
          </div>

          <div className="space-y-2 flex-1">
            {upcomingBirthdays.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">Tidak ada ulang tahun terdekat.</p>
            ) : (
              upcomingBirthdays.slice(0, 2).map((b) => (
                <div key={b.id} className="p-2 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-0.5">
                  <div className="text-xs font-bold text-rose-200 truncate">{b.title}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{b.startDate}</div>
                </div>
              ))
            )}
          </div>

          <div className="text-[11px] font-semibold text-rose-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-1 border-t border-slate-800">
            Lihat Detail Ulang Tahun <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Reminder Card */}
        <div 
          onClick={onNavigateToReminders}
          className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/60 cursor-pointer transition-all backdrop-blur-xl shadow-xl flex flex-col justify-between group space-y-3"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-bold text-white">Reminder Pusat</h4>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
              {activeReminders.length} Aktif
            </span>
          </div>

          <div className="space-y-2 flex-1">
            {activeReminders.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">Tidak ada pengingat aktif.</p>
            ) : (
              activeReminders.slice(0, 2).map((r) => (
                <div key={r.id} className="p-2 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-0.5">
                  <div className="text-xs font-bold text-amber-200 truncate">{r.title}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{r.dueTime} • {r.assignedMemberName}</div>
                </div>
              ))
            )}
          </div>

          <div className="text-[11px] font-semibold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-1 border-t border-slate-800">
            Pusat Pengingat <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 4: AI Planner Card */}
        <div 
          onClick={onNavigateToCalendar}
          className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/60 cursor-pointer transition-all backdrop-blur-xl shadow-xl flex flex-col justify-between group space-y-3"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-purple-400" />
              <h4 className="text-xs font-bold text-white">Smart AI Planner</h4>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold">
              AI Ready
            </span>
          </div>

          <div className="space-y-2 flex-1">
            {activeSuggestions.length === 0 ? (
              <p className="text-xs text-slate-400">Jadwal seimbang & teratur.</p>
            ) : (
              <div className="p-2 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-1">
                <div className="text-xs font-bold text-purple-200">{activeSuggestions[0].title}</div>
                <div className="text-[10px] text-slate-300 line-clamp-1">{activeSuggestions[0].description}</div>
              </div>
            )}
          </div>

          <div className="text-[11px] font-semibold text-purple-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-1 border-t border-slate-800">
            Analisis AI Planner <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
