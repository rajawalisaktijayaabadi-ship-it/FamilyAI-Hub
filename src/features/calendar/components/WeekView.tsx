import React from 'react';
import { CalendarEvent } from '../types/calendarTypes';
import { useCalendarStore } from '../stores/useCalendarStore';
import { MapPin } from 'lucide-react';

interface WeekViewProps {
  events: CalendarEvent[];
}

export const WeekView: React.FC<WeekViewProps> = ({ events }) => {
  const { selectedDate, setSelectedDate, openEditEventModal, openAddEventModal } = useCalendarStore();

  // Calculate start of week (Monday) based on selectedDate
  const getWeekDates = (currentDateStr: string) => {
    const current = new Date(currentDateStr);
    const dayOfWeek = current.getDay();
    // Monday = 1, Sunday = 0
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(current);
    monday.setDate(current.getDate() + diffToMonday);

    const week = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      week.push({
        dateStr: `${year}-${month}-${day}`,
        dayName: d.toLocaleDateString('id-ID', { weekday: 'short' }),
        dayNum: d.getDate(),
        monthName: d.toLocaleDateString('id-ID', { month: 'short' }),
        isToday: `${year}-${month}-${day}` === new Date().toISOString().split('T')[0]
      });
    }
    return week;
  };

  const weekDays = getWeekDates(selectedDate);

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl overflow-x-auto">
      <div className="grid grid-cols-7 gap-3 min-w-[800px]">
        {weekDays.map((day) => {
          const dayEvents = events.filter(e => e.startDate === day.dateStr);
          const isSelected = day.dateStr === selectedDate;

          return (
            <div
              key={day.dateStr}
              className={`flex flex-col min-h-[420px] rounded-2xl border transition-all ${
                isSelected
                  ? 'bg-indigo-950/30 border-indigo-500/60 ring-1 ring-indigo-500/50'
                  : 'bg-slate-800/20 border-slate-800/80 hover:border-slate-700/80'
              }`}
            >
              {/* Day Header */}
              <div 
                onClick={() => setSelectedDate(day.dateStr)}
                className={`p-3 text-center border-b rounded-t-2xl cursor-pointer transition-colors ${
                  day.isToday 
                    ? 'bg-indigo-600/30 border-indigo-500/50 text-indigo-300' 
                    : 'border-slate-800/80 hover:bg-slate-800/40'
                }`}
              >
                <div className="text-[11px] uppercase font-semibold text-slate-400">{day.dayName}</div>
                <div className={`text-lg font-bold ${day.isToday ? 'text-indigo-300' : 'text-white'}`}>
                  {day.dayNum} <span className="text-xs font-normal text-slate-400">{day.monthName}</span>
                </div>
              </div>

              {/* Day Events Container */}
              <div className="flex-1 p-2 space-y-2 overflow-y-auto max-h-[380px]">
                {dayEvents.length === 0 ? (
                  <button
                    onClick={() => openAddEventModal(day.dateStr)}
                    className="w-full py-4 text-center text-slate-600 hover:text-indigo-400 text-xs italic transition-colors"
                  >
                    + Agenda
                  </button>
                ) : (
                  dayEvents.map((evt) => (
                    <div
                      key={evt.id}
                      onClick={() => openEditEventModal(evt)}
                      className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700/70 hover:border-indigo-500/80 shadow-md cursor-pointer transition-all hover:scale-102"
                      style={{ borderLeftColor: evt.color, borderLeftWidth: '3px' }}
                    >
                      <div className="text-xs font-bold text-white truncate">{evt.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                        {evt.startTime} - {evt.endTime}
                      </div>
                      <div className="mt-1 flex items-center gap-1">
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 truncate">
                          {evt.category}
                        </span>
                      </div>
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
