import React from 'react';
import { CalendarEvent } from '../types/calendarTypes';
import { useCalendarStore } from '../stores/useCalendarStore';
import { useFamilyStore } from '../../../store/useFamilyStore';
import { User, Clock } from 'lucide-react';

interface TimelineViewProps {
  events: CalendarEvent[];
}

export const TimelineView: React.FC<TimelineViewProps> = ({ events }) => {
  const { selectedDate, openEditEventModal } = useCalendarStore();
  const { familyMembers } = useFamilyStore();

  const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 08:00 to 21:00

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 overflow-x-auto">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white">Timeline Alokasi Anggota Keluarga</h3>
          <p className="text-xs text-slate-400">
            Perbandingan jadwal dan ketersediaan waktu setiap anggota keluarga pada tanggal {selectedDate}
          </p>
        </div>
      </div>

      <div className="min-w-[700px] space-y-4">
        {/* Hours Header */}
        <div className="flex items-center gap-2 pl-40 text-xs font-mono font-medium text-slate-400 border-b border-slate-800 pb-2">
          {hours.map(h => (
            <div key={h} className="flex-1 text-center">
              {String(h).padStart(2, '0')}:00
            </div>
          ))}
        </div>

        {/* Member Timeline Rows */}
        {familyMembers.map((member) => {
          const memberEvents = events.filter(
            e => e.startDate === selectedDate && e.assignedMemberIds.includes(member.id)
          );

          return (
            <div key={member.id} className="flex items-center gap-2 group">
              {/* Member Info */}
              <div className="w-36 flex items-center gap-2.5 pr-2">
                <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                <div className="truncate">
                  <div className="text-xs font-bold text-white truncate">{member.name.split(' ')[0]}</div>
                  <div className="text-[10px] text-indigo-400 truncate">{member.roleTitle}</div>
                </div>
              </div>

              {/* Grid Timeline Bar */}
              <div className="flex-1 h-12 bg-slate-800/30 rounded-2xl border border-slate-800/80 p-1 relative flex items-center gap-1">
                {memberEvents.length === 0 ? (
                  <div className="w-full text-center text-[11px] text-slate-600 italic">
                    Senggang (Bebas Agenda)
                  </div>
                ) : (
                  memberEvents.map((evt) => {
                    const startH = parseInt(evt.startTime.split(':')[0], 10);
                    const endH = parseInt(evt.endTime.split(':')[0], 10);
                    const durationHours = Math.max(1, endH - startH);

                    return (
                      <div
                        key={evt.id}
                        onClick={() => openEditEventModal(evt)}
                        className="h-10 px-2 rounded-xl bg-slate-800 border border-slate-700/80 text-white text-xs flex flex-col justify-center cursor-pointer hover:border-indigo-500 shadow-md transition-all hover:scale-[1.02] truncate"
                        style={{
                          borderLeftColor: evt.color,
                          borderLeftWidth: '4px',
                          flex: durationHours
                        }}
                      >
                        <span className="font-bold truncate text-[11px]">{evt.title}</span>
                        <span className="text-[9px] text-slate-400 font-mono">{evt.startTime} - {evt.endTime}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
