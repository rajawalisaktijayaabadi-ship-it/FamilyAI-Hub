import React from 'react';
import { CalendarEvent } from '../types/calendarTypes';
import { useCalendarStore } from '../stores/useCalendarStore';
import { Plus } from 'lucide-react';

interface MonthViewProps {
  events: CalendarEvent[];
}

export const MonthView: React.FC<MonthViewProps> = ({ events }) => {
  const { selectedDate, setSelectedDate, openEditEventModal, openAddEventModal } = useCalendarStore();

  const current = new Date(selectedDate);
  const year = current.getFullYear();
  const month = current.getMonth();

  // First day of month
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // Monday = 0, Sunday = 6

  const monthName = firstDayOfMonth.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  const daysGrid = [];
  // Previous month padding
  for (let i = 0; i < startingDayOfWeek; i++) {
    daysGrid.push(null);
  }
  // Month days
  for (let day = 1; day <= daysInMonth; day++) {
    const mStr = String(month + 1).padStart(2, '0');
    const dStr = String(day).padStart(2, '0');
    daysGrid.push(`${year}-${mStr}-${dStr}`);
  }

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white capitalize">{monthName}</h2>
        <div className="text-xs text-slate-400">
          Klik pada tanggal untuk melihat/menambah agenda
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-semibold text-slate-400 border-b border-slate-800/80 pb-2">
        <div>Sen</div>
        <div>Sel</div>
        <div>Rab</div>
        <div>Kam</div>
        <div>Jum</div>
        <div>Sab</div>
        <div>Min</div>
      </div>

      {/* Month Days Grid */}
      <div className="grid grid-cols-7 gap-2">
        {daysGrid.map((dateStr, idx) => {
          if (!dateStr) {
            return <div key={`empty-${idx}`} className="min-h-[96px] bg-slate-950/20 rounded-2xl opacity-30" />;
          }

          const dayNum = parseInt(dateStr.split('-')[2], 10);
          const dayEvents = events.filter(e => e.startDate === dateStr);
          const isSelected = dateStr === selectedDate;
          const isToday = dateStr === todayStr;

          return (
            <div
              key={dateStr}
              onClick={() => setSelectedDate(dateStr)}
              className={`group min-h-[100px] p-2 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-950/40 border-indigo-500/80 ring-1 ring-indigo-500/50 shadow-lg'
                  : isToday
                  ? 'bg-indigo-900/20 border-indigo-500/40'
                  : 'bg-slate-800/20 border-slate-800/60 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                    isToday
                      ? 'bg-indigo-600 text-white shadow-md'
                      : isSelected
                      ? 'bg-indigo-500/30 text-indigo-200'
                      : 'text-slate-300'
                  }`}
                >
                  {dayNum}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openAddEventModal(dateStr);
                  }}
                  className="p-1 text-slate-500 hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg hover:bg-slate-800"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Day Events Badges */}
              <div className="space-y-1 my-1 overflow-hidden max-h-[60px]">
                {dayEvents.slice(0, 2).map((evt) => (
                  <div
                    key={evt.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditEventModal(evt);
                    }}
                    className="text-[10px] px-1.5 py-0.5 rounded-lg bg-slate-800 border border-slate-700/80 text-white truncate hover:bg-slate-700 transition-colors"
                    style={{ borderLeftColor: evt.color, borderLeftWidth: '3px' }}
                  >
                    {evt.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-[9px] font-semibold text-indigo-400 pl-1">
                    +{dayEvents.length - 2} agenda lagi
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
