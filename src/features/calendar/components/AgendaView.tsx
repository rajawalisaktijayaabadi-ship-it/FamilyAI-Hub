import React from 'react';
import { CalendarEvent, EventPriority } from '../types/calendarTypes';
import { useCalendarStore } from '../stores/useCalendarStore';
import { 
  Calendar, Clock, MapPin, Tag, User, AlertCircle, CheckCircle2, 
  Search, Filter, Paperclip, MoreHorizontal, Check 
} from 'lucide-react';
import { useFamilyStore } from '../../../store/useFamilyStore';

interface AgendaViewProps {
  events: CalendarEvent[];
}

export const AgendaView: React.FC<AgendaViewProps> = ({ events }) => {
  const { familyMembers } = useFamilyStore();
  const { 
    searchQuery, setSearchQuery, 
    filterCategory, setFilterCategory, 
    filterPriority, setFilterPriority,
    filterMemberId, setFilterMemberId,
    filterCalendarScope, setFilterCalendarScope,
    openEditEventModal, openAddEventModal, updateEvent,
    categories
  } = useCalendarStore();

  const sortedEvents = [...events].sort((a, b) => {
    const dateA = `${a.startDate} ${a.startTime}`;
    const dateB = `${b.startDate} ${b.startTime}`;
    return dateA.localeCompare(dateB);
  });

  const handleToggleComplete = (event: CalendarEvent) => {
    const newStatus = event.status === 'completed' ? 'scheduled' : 'completed';
    updateEvent(event.id, { status: newStatus });
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari agenda, lokasi, atau deskripsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Semua Kategori</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Semua Prioritas</option>
            <option value="high">Prioritas Tinggi</option>
            <option value="medium">Prioritas Sedang</option>
            <option value="low">Prioritas Rendah</option>
          </select>

          {/* Member Filter */}
          <select
            value={filterMemberId}
            onChange={(e) => setFilterMemberId(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Semua Anggota</option>
            {familyMembers.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>

          {/* Scope Filter */}
          <select
            value={filterCalendarScope}
            onChange={(e) => setFilterCalendarScope(e.target.value as any)}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Semua Scope Kalender</option>
            <option value="family">Keluarga (Family)</option>
            <option value="personal">Pribadi (Personal)</option>
            <option value="kids">Anak-anak (Kids)</option>
            <option value="spouse">Pasangan (Spouse)</option>
            <option value="seniors">Lansia (Seniors)</option>
          </select>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {sortedEvents.length === 0 ? (
          <div className="text-center py-12 text-slate-500 space-y-3">
            <Calendar className="w-10 h-10 mx-auto text-slate-600" />
            <p className="text-sm">Tidak ada agenda yang cocok dengan filter atau kata kunci pencarian.</p>
            <button
              onClick={() => openAddEventModal()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30"
            >
              + Tambah Agenda Baru
            </button>
          </div>
        ) : (
          sortedEvents.map((evt) => {
            const isCompleted = evt.status === 'completed';

            return (
              <div
                key={evt.id}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-slate-900/40 border-slate-800 opacity-60'
                    : 'bg-slate-800/40 border-slate-700/60 hover:border-indigo-500/60 shadow-lg'
                }`}
                style={{ borderLeftColor: evt.color, borderLeftWidth: '4px' }}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <button
                    onClick={() => handleToggleComplete(evt)}
                    className={`mt-1 p-1 rounded-full border transition-colors ${
                      isCompleted
                        ? 'bg-emerald-500 border-emerald-400 text-white'
                        : 'border-slate-600 hover:border-indigo-400 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className={`text-sm font-bold ${isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                        {evt.title}
                      </h4>

                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium border border-slate-700">
                        {evt.category}
                      </span>

                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        evt.priority === 'high'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : evt.priority === 'medium'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {evt.priority}
                      </span>

                      {evt.sourceModule && evt.sourceModule !== 'Manual' && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          dari {evt.sourceModule}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-1">{evt.description}</p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                      <span className="flex items-center gap-1 font-mono text-indigo-300">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" /> {evt.startDate}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-indigo-400" /> {evt.startTime} - {evt.endTime}
                      </span>
                      {evt.location && (
                        <span className="flex items-center gap-1 text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-rose-400" /> {evt.location}
                        </span>
                      )}
                      {evt.attachments && evt.attachments.length > 0 && (
                        <span className="flex items-center gap-1 text-teal-300">
                          <Paperclip className="w-3.5 h-3.5" /> {evt.attachments.length} file
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => openEditEventModal(evt)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors border border-slate-700"
                  >
                    Edit / Detail
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
