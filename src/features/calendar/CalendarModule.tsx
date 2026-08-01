import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, Bot, Users, Bell, 
  List, GitCommitHorizontal, ChevronLeft, ChevronRight, Plus 
} from 'lucide-react';
import { useCalendarStore } from './stores/useCalendarStore';
import { CalendarViewMode } from './types/calendarTypes';
import { DayView } from './components/DayView';
import { WeekView } from './components/WeekView';
import { MonthView } from './components/MonthView';
import { AgendaView } from './components/AgendaView';
import { TimelineView } from './components/TimelineView';
import { AIPlannerView } from './components/AIPlannerView';
import { FamilyTimeView } from './components/FamilyTimeView';
import { ReminderCenterView } from './components/ReminderCenterView';
import { EventFormModal } from './components/EventFormModal';

type CalendarSubTab = 'calendar' | 'planner' | 'family_time' | 'reminders';

interface CalendarModuleProps {
  initialSubTab?: CalendarSubTab;
}

export const CalendarModule: React.FC<CalendarModuleProps> = ({ initialSubTab = 'calendar' }) => {
  const [subTab, setSubTab] = useState<CalendarSubTab>(initialSubTab);

  const { 
    activeView, setActiveView, 
    selectedDate, setSelectedDate, 
    openAddEventModal, getFilteredEvents 
  } = useCalendarStore();

  const filteredEvents = getFilteredEvents();

  // Navigate date previous / next
  const handleDateShift = (direction: 'prev' | 'next') => {
    const d = new Date(selectedDate);
    if (activeView === 'day') {
      d.setDate(d.getDate() + (direction === 'next' ? 1 : -1));
    } else if (activeView === 'week') {
      d.setDate(d.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      d.setMonth(d.getMonth() + (direction === 'next' ? 1 : -1));
    }
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    setSelectedDate(`${year}-${month}-${day}`);
  };

  const handleSetToday = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    setSelectedDate(`${year}-${month}-${day}`);
  };

  const viewModes: { id: CalendarViewMode; label: string }[] = [
    { id: 'month', label: 'Bulan' },
    { id: 'week', label: 'Minggu' },
    { id: 'day', label: 'Hari' },
    { id: 'agenda', label: 'Agenda List' },
    { id: 'timeline', label: 'Timeline Anggota' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Sub Navigation */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              Smart Family Calendar & AI Planner
            </h1>
            <p className="text-xs text-slate-400">
              Pusat penjadwalan terpadu keluarga cerdas FamilyAI Hub
            </p>
          </div>
        </div>

        {/* Sub-Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800/80">
          <button
            onClick={() => setSubTab('calendar')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              subTab === 'calendar'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <CalendarIcon className="w-4 h-4" /> Kalender
          </button>

          <button
            onClick={() => setSubTab('planner')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              subTab === 'planner'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Bot className="w-4 h-4 text-purple-400" /> AI Planner
          </button>

          <button
            onClick={() => setSubTab('family_time')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              subTab === 'family_time'
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Users className="w-4 h-4 text-indigo-400" /> Family Time
          </button>

          <button
            onClick={() => setSubTab('reminders')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              subTab === 'reminders'
                ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Bell className="w-4 h-4 text-amber-400" /> Reminder Center
          </button>
        </div>
      </div>

      {/* Main Tab 1: Calendar View Controls & Content */}
      {subTab === 'calendar' && (
        <div className="space-y-6">
          {/* Controls Bar: Prev/Next, Today, View Mode Selector, Add Event */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-xl">
            {/* Date Navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDateShift('prev')}
                className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleSetToday}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
              >
                Hari Ini
              </button>
              <button
                onClick={() => handleDateShift('next')}
                className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <span className="text-sm font-bold text-white ml-2 font-mono">
                {selectedDate}
              </span>
            </div>

            {/* View Modes */}
            <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
              {viewModes.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveView(v.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeView === v.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>

            {/* Add Event Button */}
            <button
              onClick={() => openAddEventModal(selectedDate)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" /> Tambah Agenda
            </button>
          </div>

          {/* Active View Component */}
          {activeView === 'month' && <MonthView events={filteredEvents} />}
          {activeView === 'week' && <WeekView events={filteredEvents} />}
          {activeView === 'day' && <DayView events={filteredEvents} />}
          {activeView === 'agenda' && <AgendaView events={filteredEvents} />}
          {activeView === 'timeline' && <TimelineView events={filteredEvents} />}
        </div>
      )}

      {/* Main Tab 2: AI Planner */}
      {subTab === 'planner' && <AIPlannerView />}

      {/* Main Tab 3: Family Time */}
      {subTab === 'family_time' && <FamilyTimeView />}

      {/* Main Tab 4: Reminder Center */}
      {subTab === 'reminders' && <ReminderCenterView />}

      {/* Shared Event Modal */}
      <EventFormModal />
    </div>
  );
};
