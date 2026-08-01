import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  Car, 
  DollarSign, 
  FileText,
  ChevronRight,
  X
} from 'lucide-react';
import { useTravelStore } from '../../../stores/useTravelStore';
import { ItineraryStatus } from '../../../types/travel';

export const ItineraryBuilderTab: React.FC = () => {
  const { 
    trips, 
    activeTripId, 
    itineraries, 
    addItinerary, 
    updateItinerary, 
    deleteItinerary,
    generateAIItineraryForTrip 
  } = useTravelStore();

  const activeTrip = trips.find(t => t.id === activeTripId) || trips[0];
  const activeItineraries = itineraries.filter(i => i.tripId === activeTrip?.id);

  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form State
  const [time, setTime] = useState<string>('09:00');
  const [location, setLocation] = useState<string>('');
  const [activity, setActivity] = useState<string>('');
  const [transportation, setTransportation] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [estimatedCost, setEstimatedCost] = useState<number>(0);

  const daysList = activeTrip 
    ? Array.from({ length: activeTrip.durationDays }, (_, i) => i + 1)
    : [1, 2, 3];

  const currentDayItineraries = activeItineraries.filter(i => i.dayNumber === selectedDay);

  const handleCreateItinerary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTrip || !activity.trim()) return;

    addItinerary({
      tripId: activeTrip.id,
      dayNumber: selectedDay,
      time: time || '10:00',
      location: location || activeTrip.city,
      activity,
      transportation: transportation || 'Mobil / Jalan kaki',
      notes,
      status: 'Pending',
      estimatedCostIdr: estimatedCost
    });

    setActivity('');
    setLocation('');
    setNotes('');
    setEstimatedCost(0);
    setShowAddModal(false);
  };

  const handleToggleStatus = (id: string, currentStatus: ItineraryStatus) => {
    const nextStatus: ItineraryStatus = currentStatus === 'Completed' ? 'Pending' : 'Completed';
    updateItinerary(id, { status: nextStatus });
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Trip Info Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl">
        <div>
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
            Interactive Itinerary Builder
          </span>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-0.5">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <span>Itinerary: {activeTrip?.name || 'Pilih Trip'}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Susun jadwal harian, estimasi jam, rute kendaraan, dan waktu istirahat keluarga.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => activeTrip && generateAIItineraryForTrip(activeTrip.id)}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs rounded-2xl transition-all shadow-lg flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>AI Auto Generate Itinerary</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-2xl transition-all shadow-lg flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Agenda</span>
          </button>
        </div>
      </div>

      {/* Day Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {daysList.map((dayNum) => {
          const countForDay = activeItineraries.filter(i => i.dayNumber === dayNum).length;
          const isSelected = selectedDay === dayNum;
          return (
            <button
              key={dayNum}
              onClick={() => setSelectedDay(dayNum)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>Hari ke-{dayNum}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                isSelected ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
              }`}>
                {countForDay}
              </span>
            </button>
          );
        })}
      </div>

      {/* Interactive Timeline View */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Timeline Jadwal Hari Ke-{selectedDay}</span>
          </h3>
          <span className="text-xs text-slate-400">Total {currentDayItineraries.length} Kegiatan</span>
        </div>

        {currentDayItineraries.length > 0 ? (
          <div className="relative border-l-2 border-indigo-500/30 ml-4 space-y-6 pl-6 py-2">
            {currentDayItineraries.map((itin) => {
              const isDone = itin.status === 'Completed';
              return (
                <div key={itin.id} className="relative group">
                  {/* Circle Marker on Timeline */}
                  <button
                    onClick={() => handleToggleStatus(itin.id, itin.status)}
                    className={`absolute -left-[31px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isDone 
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950' 
                        : 'bg-slate-950 border-indigo-500 text-indigo-400 hover:bg-indigo-600 hover:text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  {/* Activity Card */}
                  <div className={`p-5 rounded-2xl border transition-all ${
                    isDone 
                      ? 'bg-slate-950/60 border-slate-800 opacity-75' 
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 shadow-md'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-extrabold text-xs font-mono">
                          {itin.time}
                        </span>
                        <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{itin.location}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {itin.estimatedCostIdr && itin.estimatedCostIdr > 0 ? (
                          <span className="text-xs font-bold text-emerald-400">
                            Rp {itin.estimatedCostIdr.toLocaleString('id-ID')}
                          </span>
                        ) : null}

                        <button
                          onClick={() => deleteItinerary(itin.id)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h4 className={`font-bold text-white text-sm ${isDone ? 'line-through text-slate-400' : ''}`}>
                      {itin.activity}
                    </h4>

                    {itin.notes && (
                      <p className="text-xs text-slate-400 mt-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
                        💡 {itin.notes}
                      </p>
                    )}

                    {itin.transportation && (
                      <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                        <Car className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Transport: {itin.transportation}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 space-y-2">
            <Clock className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400 font-medium">Belum ada agenda disusun untuk Hari ke-{selectedDay}.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl"
            >
              + Tambah Agenda Hari Ini
            </button>
          </div>
        )}
      </div>

      {/* Add Itinerary Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleCreateItinerary} className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">Tambah Agenda (Hari Ke-{selectedDay})</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Jam Kegiatan</label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="mis. 09:30"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Lokasi / Destinasi</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="mis. Pantai Kuta Bali"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Nama Aktivitas / Rencana</label>
                <input
                  type="text"
                  required
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  placeholder="mis. Foto sunset dan makan malam seafood bersama"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Transportasi</label>
                  <input
                    type="text"
                    value={transportation}
                    onChange={(e) => setTransportation(e.target.value)}
                    placeholder="mis. Mobil Rental"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Est. Biaya (Rp)</label>
                  <input
                    type="number"
                    value={estimatedCost}
                    onChange={(e) => setEstimatedCost(parseInt(e.target.value) || 0)}
                    placeholder="mis. 500000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Catatan Penting</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="mis. Siapkan baju ganti anak & kamera"
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl"
            >
              Simpan Agenda Hari ke-{selectedDay}
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
