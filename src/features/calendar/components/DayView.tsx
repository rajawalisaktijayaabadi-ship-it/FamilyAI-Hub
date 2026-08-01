import React from 'react';
import { Clock, MapPin, Tag, User, AlertTriangle } from 'lucide-react';
import { CalendarEvent } from '../types/calendarTypes';
import { useCalendarStore } from '../stores/useCalendarStore';

interface DayViewProps {
  events: CalendarEvent[];
}

export const DayView: React.FC<DayViewProps> = ({ events }) => {
  const { selectedDate, openEditEventModal, openAddEventModal } = useCalendarStore();

  const hours = Array.from({ length: 16 }, (_, i) => i + 6); // 06:00 to 21:00

  const dayEvents = events.filter(e => e.startDate === selectedDate);

  const formattedSelectedDate = new Date(selectedDate).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white capitalize">{formattedSelectedDate}</h2>
          <p className="text-xs text-slate-400">Total {dayEvents.length} agenda terdaftar untuk hari ini</p>
        </div>
        <button
          onClick={() => openAddEventModal(selectedDate)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
        >
          + Tambah Agenda Hari Ini
        </button>
      </div>

      <div className="space-y-3">
        {hours.map((hour) => {
          const hourStr = `${String(hour).padStart(2, '0')}:00`;
          const hourEvents = dayEvents.filter(e => {
            const eventStartHour = parseInt(e.startTime.split(':')[0], 10);
            return eventStartHour === hour;
          });

          return (
            <div key={hour} className="flex gap-4 min-h-[64px] group">
              <div className="w-16 text-right text-xs font-mono font-medium text-slate-400 pt-1 border-r border-slate-800/80 pr-3">
                {hourStr}
              </div>

              <div className="flex-1 bg-slate-800/20 rounded-2xl border border-slate-800/40 p-2.5 transition-colors group-hover:border-slate-700/60 min-h-[60px] flex flex-wrap gap-2">
                {hourEvents.length === 0 ? (
                  <div 
                    onClick={() => openAddEventModal(selectedDate)}
                    className="w-full h-full min-h-[40px] flex items-center justify-center text-slate-600 text-xs italic opacity-0 group-hover:opacity-100 cursor-pointer hover:text-indigo-400 transition-all"
                  >
                    + Klik untuk tambah agenda jam {hourStr}
                  </div>
                ) : (
                  hourEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => openEditEventModal(event)}
                      className="flex-1 min-w-[240px] p-3 rounded-xl bg-slate-800/90 border border-slate-700/80 hover:border-indigo-500/60 shadow-lg cursor-pointer transition-all hover:scale-[1.01]"
                      style={{ borderLeftColor: event.color, borderLeftWidth: '4px' }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white truncate">{event.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700/80 text-slate-300 font-mono">
                          {event.startTime} - {event.endTime}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 mt-1">
                        <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {event.category}
                        </span>
                        {event.location && (
                          <span className="flex items-center gap-1 text-slate-400">
                            <MapPin className="w-3 h-3 text-rose-400" /> {event.location}
                          </span>
                        )}
                      </div>

                      {event.description && (
                        <p className="text-xs text-slate-400 mt-2 line-clamp-1">{event.description}</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
