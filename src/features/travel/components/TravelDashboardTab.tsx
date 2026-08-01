import React from 'react';
import { 
  Plane, 
  Calendar, 
  Clock, 
  CheckSquare, 
  DollarSign, 
  Sparkles, 
  PartyPopper, 
  Users, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  HeartPulse,
  Plus
} from 'lucide-react';
import { useTravelStore } from '../../../stores/useTravelStore';

interface TravelDashboardTabProps {
  onOpenAIModal: () => void;
  onNavigateTab: (tab: 'travel' | 'vacation' | 'events' | 'itinerary') => void;
  onOpenTripModal: () => void;
}

export const TravelDashboardTab: React.FC<TravelDashboardTabProps> = ({
  onOpenAIModal,
  onNavigateTab,
  onOpenTripModal
}) => {
  const { 
    trips, 
    activeTripId, 
    setActiveTripId, 
    checklists, 
    budgets, 
    familyEvents, 
    recommendations,
    travelHistory
  } = useTravelStore();

  const activeTrip = trips.find(t => t.id === activeTripId) || trips[0];

  // Countdown calculation
  const getDaysUntilTrip = (startDateStr?: string) => {
    if (!startDateStr) return 0;
    const now = new Date();
    const tripDate = new Date(startDateStr);
    const diffTime = tripDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysCountdown = activeTrip ? getDaysUntilTrip(activeTrip.startDate) : 0;

  // Active trip checklist progress
  const activeChecklists = checklists.filter(c => c.tripId === activeTrip?.id);
  const packedCount = activeChecklists.filter(c => c.isPacked).length;
  const checklistPercent = activeChecklists.length > 0 
    ? Math.round((packedCount / activeChecklists.length) * 100) 
    : 100;

  // Active trip budget
  const activeBudgets = budgets.filter(b => b.tripId === activeTrip?.id);
  const totalEstBudget = activeBudgets.reduce((acc, b) => acc + b.estimatedCostIdr, 0);
  const totalActBudget = activeBudgets.reduce((acc, b) => acc + b.actualCostIdr, 0);

  // Next Family Event
  const nextEvent = familyEvents[0];

  return (
    <div className="space-y-6">
      
      {/* Hero Active Trip Banner with Countdown */}
      {activeTrip ? (
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={activeTrip.coverImage} 
              alt={activeTrip.name} 
              className="w-full h-full object-cover opacity-25 filter blur-[1px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
          </div>

          <div className="relative z-10 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5" /> {activeTrip.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {activeTrip.city}, {activeTrip.country}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  Status: {activeTrip.status}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {activeTrip.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeTrip.notes}
              </p>

              <div className="flex items-center gap-4 text-xs font-medium text-slate-300 pt-2 flex-wrap">
                <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>{activeTrip.startDate} s/d {activeTrip.endDate} ({activeTrip.durationDays} Hari)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>{activeTrip.familyMemberIds.length} Anggota Keluarga</span>
                </div>
              </div>
            </div>

            {/* Countdown Box */}
            <div className="shrink-0 bg-slate-950/90 border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 min-w-[200px] shadow-xl">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4 animate-pulse" /> Countdown
              </div>
              <div className="text-4xl font-black text-white tracking-tight">
                {daysCountdown} <span className="text-sm font-normal text-slate-400">Hari Lagi</span>
              </div>
              <p className="text-[11px] text-slate-400">Keberangkatan Perjalanan</p>
              
              <button
                onClick={() => onNavigateTab('itinerary')}
                className="w-full mt-2 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <span>Lihat Itinerary</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
          <Plane className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">Belum Ada Perjalanan Aktif</h3>
          <p className="text-xs text-slate-400">Buat rencana perjalanan liburan atau mudik baru keluarga Anda.</p>
          <button
            onClick={onOpenTripModal}
            className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-500"
          >
            + Buat Rencana Perjalanan Baru
          </button>
        </div>
      )}

      {/* AI Proactive Travel Insights Bar */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            <Sparkles className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider block">AI Travel Insight Hari Ini</span>
            <p className="text-xs text-slate-200 mt-0.5">
              {recommendations[0]?.recommendationText || 'Sistem AI menganalisis cuaca, kecukupan dokumen, dan anggaran perjalanan Anda secara realtime.'}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAIModal}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shrink-0 flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-4 h-4 fill-slate-950" />
          <span>Tanya AI Travel Assistant</span>
        </button>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Upcoming Trips */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Rencana Perjalanan</span>
            <Plane className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">{trips.length} Trip</div>
          <p className="text-[11px] text-slate-400">
            {trips.filter(t => t.status === 'Planned').length} Terjadwal • {trips.filter(t => t.status === 'Ongoing').length} Berjalan
          </p>
        </div>

        {/* Metric 2: Travel Budget */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Est. Total Anggaran</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">
            Rp {(totalEstBudget / 1000000).toFixed(1)} Juta
          </div>
          <p className="text-[11px] text-slate-400">
            Realisasi: Rp {(totalActBudget / 1000000).toFixed(1)} Juta
          </p>
        </div>

        {/* Metric 3: Travel Checklist */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Kesiapan Checklist</span>
            <CheckSquare className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-white">{checklistPercent}%</span>
            <span className="text-xs text-slate-400">{packedCount}/{activeChecklists.length} Terkemas</span>
          </div>
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-500 rounded-full transition-all" 
              style={{ width: `${checklistPercent}%` }} 
            />
          </div>
        </div>

        {/* Metric 4: Next Family Event */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Event Keluarga Terdekat</span>
            <PartyPopper className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-sm font-bold text-white truncate">{nextEvent?.name || 'Belum Ada Event'}</div>
          <p className="text-[11px] text-purple-300">{nextEvent?.date || '-'} • {nextEvent?.location || '-'}</p>
        </div>

      </div>

      {/* Main Grid: Upcoming Trips List & Family Availability */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Upcoming Trips */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-white text-base flex items-center gap-2">
              <Plane className="w-4 h-4 text-indigo-400" />
              <span>Daftar Perjalanan & Liburan Keluarga</span>
            </h3>

            <button
              onClick={onOpenTripModal}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Trip</span>
            </button>
          </div>

          <div className="space-y-3">
            {trips.map((trip) => {
              const isSelected = trip.id === activeTrip?.id;
              return (
                <div
                  key={trip.id}
                  onClick={() => setActiveTripId(trip.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-500/60 shadow-lg shadow-indigo-600/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={trip.coverImage} 
                      alt={trip.name} 
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-800"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">{trip.category}</span>
                        <span className="text-[10px] text-slate-500">• {trip.durationDays} Hari</span>
                      </div>
                      <h4 className="font-bold text-white text-sm mt-0.5">{trip.name}</h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-indigo-400" />
                        <span>{trip.city}, {trip.country}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-200 block">{trip.startDate}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        trip.status === 'Planned' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {trip.status}
                      </span>
                    </div>

                    <button className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Family Availability & Travel History */}
        <div className="space-y-4">
          
          {/* Family Availability Grid */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="font-extrabold text-white text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Presensi Ketersediaan Keluarga</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Ayah Hendra</span>
                  <span className="text-[10px] text-slate-400">Cuti Disetujui 15-20 Agu</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                  Siap Berangkat
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Ibu Siska</span>
                  <span className="text-[10px] text-slate-400">Jadwal Bebas</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                  Siap Berangkat
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Rina (Anak)</span>
                  <span className="text-[10px] text-slate-400">Libur Sekolah Semester</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                  Siap Berangkat
                </span>
              </div>
            </div>
          </div>

          {/* Past Travel History Quick Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-white text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Riwayat Perjalanan</span>
              </h4>
              <button 
                onClick={() => onNavigateTab('vacation')}
                className="text-xs text-indigo-400 hover:underline font-bold"
              >
                Lihat Semua
              </button>
            </div>

            <div className="space-y-2">
              {travelHistory.map((his) => (
                <div key={his.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{his.tripName}</span>
                    <span className="text-[10px] text-slate-400">{his.destination} • {his.durationDays} Hari</span>
                  </div>
                  <span className="font-bold text-emerald-400 text-[11px]">
                    Rp {(his.totalCostIdr / 1000000).toFixed(1)}M
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
