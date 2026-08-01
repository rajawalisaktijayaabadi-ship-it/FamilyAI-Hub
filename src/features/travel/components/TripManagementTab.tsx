import React, { useState } from 'react';
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Building2, 
  Car, 
  CheckCircle2, 
  Clock, 
  X,
  Hotel,
  Tag
} from 'lucide-react';
import { useTravelStore } from '../../../stores/useTravelStore';
import { TravelCategory, TripStatus, TravelTrip } from '../../../types/travel';

interface TripManagementTabProps {
  onOpenTripModal: () => void;
  onEditTripModal: (trip: TravelTrip) => void;
}

export const categoryList: TravelCategory[] = [
  'Liburan',
  'Mudik',
  'Bisnis',
  'Sekolah',
  'Family Gathering',
  'Staycation',
  'Road Trip',
  'Camping',
  'Honeymoon',
  'Religi',
  'Medical Trip',
  'Custom'
];

export const TripManagementTab: React.FC<TripManagementTabProps> = ({
  onOpenTripModal,
  onEditTripModal
}) => {
  const { 
    trips, 
    activeTripId, 
    setActiveTripId, 
    deleteTrip, 
    accommodations, 
    transportations,
    addAccommodation,
    addTransportation
  } = useTravelStore();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('Semua');
  
  // Modals for Accommodation & Transportation Placeholders
  const [showAccModal, setShowAccModal] = useState<boolean>(false);
  const [showTransModal, setShowTransModal] = useState<boolean>(false);

  const [accName, setAccName] = useState<string>('');
  const [accType, setAccType] = useState<'Hotel' | 'Villa' | 'Apartment' | 'Guest House' | 'Camping'>('Hotel');
  const [accAddress, setAccAddress] = useState<string>('');
  const [accCheckIn, setAccCheckIn] = useState<string>('');
  const [accCheckOut, setAccCheckOut] = useState<string>('');

  const [transCategory, setTransCategory] = useState<'Pesawat' | 'Kereta' | 'Mobil' | 'Bus' | 'Kapal' | 'Motor' | 'Rental'>('Pesawat');
  const [transProvider, setTransProvider] = useState<string>('');
  const [transDepTime, setTransDepTime] = useState<string>('');
  const [transArrTime, setTransArrTime] = useState<string>('');

  const activeTrip = trips.find(t => t.id === activeTripId) || trips[0];

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          trip.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategoryFilter === 'Semua' || trip.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCreateAcc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTrip || !accName.trim()) return;
    addAccommodation({
      tripId: activeTrip.id,
      name: accName,
      type: accType,
      address: accAddress || 'Sesuai pesanan',
      checkInDate: accCheckIn || activeTrip.startDate,
      checkOutDate: accCheckOut || activeTrip.endDate,
    });
    setAccName('');
    setShowAccModal(false);
  };

  const handleCreateTrans = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTrip || !transProvider.trim()) return;
    addTransportation({
      tripId: activeTrip.id,
      category: transCategory,
      providerName: transProvider,
      departureTime: transDepTime || activeTrip.startDate,
      arrivalTime: transArrTime || activeTrip.startDate,
    });
    setTransProvider('');
    setShowTransModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Plane className="w-5 h-5 text-indigo-400" />
            <span>Manajemen Perjalanan & Liburan</span>
          </h2>
          <p className="text-xs text-slate-400">
            Kelola tujuan, kategori perjalanan, tiket transportasi, serta akomodasi penginapan keluarga.
          </p>
        </div>

        <button
          onClick={onOpenTripModal}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-2xl transition-all shadow-lg flex items-center justify-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Trip Baru</span>
        </button>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setSelectedCategoryFilter('Semua')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            selectedCategoryFilter === 'Semua' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Semua Kategori ({trips.length})
        </button>
        {categoryList.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategoryFilter(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategoryFilter === cat ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari destinasi, nama perjalanan, atau kota..."
          className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white outline-none"
        />
      </div>

      {/* Trips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTrips.map((trip) => {
          const isSelected = trip.id === activeTrip?.id;
          return (
            <div
              key={trip.id}
              className={`rounded-3xl border overflow-hidden transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 shadow-xl ring-1 ring-indigo-500/30'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Cover Image & Category Tag */}
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={trip.coverImage} 
                    alt={trip.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider">
                      {trip.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-300">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{trip.city}, {trip.country}</span>
                    </div>
                    <span className="text-[10px] bg-slate-950/80 px-2 py-0.5 rounded-full border border-slate-800 font-semibold">
                      {trip.durationDays} Hari
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-white text-base leading-snug">{trip.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{trip.notes}</p>

                  <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Tanggal:</span>
                      <span className="font-semibold text-white">{trip.startDate} - {trip.endDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Transportasi:</span>
                      <span className="font-semibold text-indigo-300 truncate max-w-[160px]">{trip.transportationType}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveTripId(trip.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-300 hover:text-white'
                  }`}
                >
                  {isSelected ? 'Trip Aktif' : 'Pilih Trip'}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEditTripModal(trip)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white"
                    title="Edit Trip"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Hapus trip "${trip.name}"?`)) deleteTrip(trip.id);
                    }}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400"
                    title="Hapus Trip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Accommodation & Transportation Section for Active Trip */}
      {activeTrip && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          
          {/* Accommodation Placeholder Section */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                  <Hotel className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-sm">Akomodasi & Penginapan</h3>
                  <p className="text-[11px] text-slate-400">Hotel, Villa, Apartment & Resort</p>
                </div>
              </div>

              <button
                onClick={() => setShowAccModal(true)}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Hotel</span>
              </button>
            </div>

            <div className="space-y-3">
              {accommodations.filter(a => a.tripId === activeTrip.id).map((acc) => (
                <div key={acc.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-bold text-[10px] uppercase">
                      {acc.type}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Kode: {acc.bookingCode || '-'}</span>
                  </div>
                  <h4 className="font-bold text-white text-xs">{acc.name}</h4>
                  <p className="text-[11px] text-slate-400">{acc.address}</p>
                  <div className="text-[10px] text-slate-300 font-medium">
                    Check-in: {acc.checkInDate} • Check-out: {acc.checkOutDate}
                  </div>
                </div>
              ))}
              {accommodations.filter(a => a.tripId === activeTrip.id).length === 0 && (
                <p className="text-xs text-slate-500 italic text-center py-4">Belum ada data akomodasi ditambahkan.</p>
              )}
            </div>
          </div>

          {/* Transportation Placeholder Section */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-sm">Transportasi & Tiket</h3>
                  <p className="text-[11px] text-slate-400">Pesawat, Kereta, Bus & Rental Mobil</p>
                </div>
              </div>

              <button
                onClick={() => setShowTransModal(true)}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Transport</span>
              </button>
            </div>

            <div className="space-y-3">
              {transportations.filter(t => t.tripId === activeTrip.id).map((trans) => (
                <div key={trans.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold text-[10px] uppercase">
                      {trans.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Kursi: {trans.seatNumber || '-'}</span>
                  </div>
                  <h4 className="font-bold text-white text-xs">{trans.providerName}</h4>
                  <div className="text-[10px] text-slate-300 font-medium">
                    Keberangkatan: {trans.departureTime}
                  </div>
                </div>
              ))}
              {transportations.filter(t => t.tripId === activeTrip.id).length === 0 && (
                <p className="text-xs text-slate-500 italic text-center py-4">Belum ada data transportasi ditambahkan.</p>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Modal Add Accommodation */}
      {showAccModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleCreateAcc} className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">Tambah Akomodasi Baru</h3>
              <button type="button" onClick={() => setShowAccModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Nama Hotel / Villa</label>
                <input
                  type="text"
                  required
                  value={accName}
                  onChange={(e) => setAccName(e.target.value)}
                  placeholder="mis. Grand Hyatt Bali"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Jenis</label>
                  <select
                    value={accType}
                    onChange={(e) => setAccType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                  >
                    <option value="Hotel">Hotel</option>
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Guest House">Guest House</option>
                    <option value="Camping">Camping</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Check-in</label>
                  <input
                    type="date"
                    value={accCheckIn}
                    onChange={(e) => setAccCheckIn(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Alamat / Lokasi</label>
                <input
                  type="text"
                  value={accAddress}
                  onChange={(e) => setAccAddress(e.target.value)}
                  placeholder="Alamat lengkap hotel"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl"
            >
              Simpan Akomodasi
            </button>
          </form>
        </div>
      )}

      {/* Modal Add Transportation */}
      {showTransModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleCreateTrans} className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">Tambah Tiket / Transportasi</h3>
              <button type="button" onClick={() => setShowTransModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Provider / Maskapai / Moda</label>
                <input
                  type="text"
                  required
                  value={transProvider}
                  onChange={(e) => setTransProvider(e.target.value)}
                  placeholder="mis. Garuda Indonesia GA-402"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Moda</label>
                  <select
                    value={transCategory}
                    onChange={(e) => setTransCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                  >
                    <option value="Pesawat">Pesawat</option>
                    <option value="Kereta">Kereta</option>
                    <option value="Mobil">Mobil</option>
                    <option value="Bus">Bus</option>
                    <option value="Kapal">Kapal</option>
                    <option value="Motor">Motor</option>
                    <option value="Rental">Rental</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Waktu Berangkat</label>
                  <input
                    type="text"
                    value={transDepTime}
                    onChange={(e) => setTransDepTime(e.target.value)}
                    placeholder="mis. 15 Aug 08:30"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl"
            >
              Simpan Transportasi
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
