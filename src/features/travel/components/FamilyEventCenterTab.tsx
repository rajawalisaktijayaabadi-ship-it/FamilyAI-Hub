import React, { useState } from 'react';
import { 
  PartyPopper, 
  Calendar, 
  MapPin, 
  Plus, 
  Trash2, 
  CheckSquare, 
  Square, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  X
} from 'lucide-react';
import { useTravelStore } from '../../../stores/useTravelStore';
import { FamilyEventType } from '../../../types/travel';

export const eventTypeList: FamilyEventType[] = [
  'Ulang Tahun',
  'Anniversary',
  'Family Gathering',
  'Reuni',
  'Wisuda',
  'Perayaan',
  'Arisan',
  'Syukuran',
  'Custom Event'
];

export const FamilyEventCenterTab: React.FC = () => {
  const { 
    familyEvents, 
    eventPlanners, 
    addEvent, 
    deleteEvent, 
    toggleEventChecklistItem,
    addEventPlannerTask 
  } = useTravelStore();

  const [showAddEventModal, setShowAddEventModal] = useState<boolean>(false);
  const [selectedPlannerId, setSelectedPlannerId] = useState<string | null>(eventPlanners[0]?.id || null);

  // Form State
  const [eventName, setEventName] = useState<string>('');
  const [eventType, setEventType] = useState<FamilyEventType>('Ulang Tahun');
  const [eventDate, setEventDate] = useState<string>('');
  const [eventLocation, setEventLocation] = useState<string>('');
  const [eventDescription, setEventDescription] = useState<string>('');

  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  const activePlanner = eventPlanners.find(ep => ep.id === selectedPlannerId) || eventPlanners[0];

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName.trim()) return;

    addEvent({
      name: eventName,
      type: eventType,
      date: eventDate || new Date().toISOString().split('T')[0],
      location: eventLocation || 'Rumah / Ballroom',
      description: eventDescription,
      status: 'Planning'
    });

    setEventName('');
    setEventDescription('');
    setShowAddEventModal(false);
  };

  const handleAddTaskToPlanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePlanner || !newTaskTitle.trim()) return;

    addEventPlannerTask(activePlanner.id, newTaskTitle);
    setNewTaskTitle('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl">
        <div>
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">
            Family Event Center & Event Planner
          </span>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-0.5">
            <PartyPopper className="w-5 h-5 text-purple-400" />
            <span>Pusat Acara & Perayaan Keluarga</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Kelola momen ulang tahun, anniversary, reuni keluarga, wisuda, arisan, hingga syukuran.
          </p>
        </div>

        <button
          onClick={() => setShowAddEventModal(true)}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-2xl transition-all shadow-lg flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Event Baru</span>
        </button>
      </div>

      {/* Events Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {familyEvents.map((evt) => (
          <div
            key={evt.id}
            className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold text-[10px] uppercase">
                  {evt.type}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  evt.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {evt.status}
                </span>
              </div>

              <h3 className="font-bold text-white text-base mt-2">{evt.name}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1">{evt.description}</p>

              <div className="pt-3 space-y-1 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{evt.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{evt.location}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Family Event</span>
              <button
                onClick={() => deleteEvent(evt.id)}
                className="text-slate-500 hover:text-rose-400 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Event Planner Tool */}
      {activePlanner && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-bold text-purple-400 uppercase">Interactive Event Planner</span>
              <h3 className="font-extrabold text-white text-base">{activePlanner.name}</h3>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
              <span>Undangan: {activePlanner.attendees.length} Orang</span>
              <span>Anggaran: Rp {activePlanner.budgetEstimatedIdr.toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* Checklist Task Vendor Section */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs">Checklist Persiapan & Task Event</h4>

            <form onSubmit={handleAddTaskToPlanner} className="flex gap-2">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Tambah tugas/persiapan vendor..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl"
              >
                Tambah Task
              </button>
            </form>

            <div className="space-y-2">
              {activePlanner.checklist.map((chk) => (
                <div
                  key={chk.id}
                  onClick={() => toggleEventChecklistItem(activePlanner.id, chk.id)}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2 cursor-pointer text-xs"
                >
                  <div className="flex items-center gap-2">
                    <button className="text-purple-400">
                      {chk.done ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-600" />
                      )}
                    </button>
                    <span className={chk.done ? 'line-through text-slate-500' : 'text-white'}>
                      {chk.title}
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-500">
                    {chk.done ? 'Selesai' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal Add Event */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleCreateEvent} className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">Buat Acara Keluarga Baru</h3>
              <button type="button" onClick={() => setShowAddEventModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Nama Acara / Event</label>
                <input
                  type="text"
                  required
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="mis. Syukuran Kelahiran & Aqiqah"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Kategori Event</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                  >
                    {eventTypeList.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Tanggal Event</label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Lokasi Event</label>
                <input
                  type="text"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="mis. Restoran Bunga Rampai Jakarta"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Deskripsi Acara</label>
                <textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  placeholder="Rincian singkat jalannya acara..."
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl"
            >
              Simpan Event Baru
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
