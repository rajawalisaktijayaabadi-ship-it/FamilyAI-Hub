import React, { useState, useEffect } from 'react';
import { X, Plane, Calendar, MapPin, Tag } from 'lucide-react';
import { useTravelStore } from '../../../stores/useTravelStore';
import { TravelTrip, TravelCategory, TripStatus } from '../../../types/travel';
import { categoryList } from './TripManagementTab';

interface TravelTripFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editTrip?: TravelTrip | null;
}

export const TravelTripFormModal: React.FC<TravelTripFormModalProps> = ({
  isOpen,
  onClose,
  editTrip
}) => {
  const { addTrip, updateTrip } = useTravelStore();

  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<TravelCategory>('Liburan');
  const [destination, setDestination] = useState<string>('');
  const [country, setCountry] = useState<string>('Indonesia');
  const [city, setCity] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [transportationType, setTransportationType] = useState<string>('Pesawat Terbang');
  const [notes, setNotes] = useState<string>('');
  const [status, setStatus] = useState<TripStatus>('Planned');
  const [coverImage, setCoverImage] = useState<string>('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80');

  useEffect(() => {
    if (editTrip) {
      setName(editTrip.name);
      setCategory(editTrip.category);
      setDestination(editTrip.destination);
      setCountry(editTrip.country);
      setCity(editTrip.city);
      setStartDate(editTrip.startDate);
      setEndDate(editTrip.endDate);
      setTransportationType(editTrip.transportationType);
      setNotes(editTrip.notes);
      setStatus(editTrip.status);
      setCoverImage(editTrip.coverImage);
    } else {
      setName('');
      setCategory('Liburan');
      setDestination('');
      setCountry('Indonesia');
      setCity('');
      setStartDate('');
      setEndDate('');
      setTransportationType('Pesawat Terbang');
      setNotes('');
      setStatus('Planned');
    }
  }, [editTrip, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !city.trim()) return;

    // Calculate duration
    let durationDays = 3;
    if (startDate && endDate) {
      const diff = new Date(endDate).getTime() - new Date(startDate).getTime();
      durationDays = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }

    if (editTrip) {
      updateTrip(editTrip.id, {
        name,
        category,
        destination: destination || city,
        country,
        city,
        startDate,
        endDate,
        durationDays,
        transportationType,
        notes,
        status,
        coverImage
      });
    } else {
      addTrip({
        name,
        category,
        destination: destination || city,
        country,
        city,
        startDate: startDate || new Date().toISOString().split('T')[0],
        endDate: endDate || new Date().toISOString().split('T')[0],
        durationDays,
        familyMemberIds: ['mem-1', 'mem-2', 'mem-3'],
        transportationType,
        notes,
        status,
        coverImage
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Plane className="w-5 h-5 text-indigo-400" />
            <span>{editTrip ? 'Edit Rencana Perjalanan' : 'Buat Trip Perjalanan Baru'}</span>
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="text-slate-400 block mb-1 font-semibold">Nama Perjalanan / Liburan</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="mis. Liburan Akhir Tahun Ke Bali & Labuan Bajo"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Kategori Perjalanan</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
              >
                {categoryList.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Status Trip</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
              >
                <option value="Planned">Planned</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Kota Tujuan</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="mis. Denpasar / Labuan Bajo"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Negara</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="mis. Indonesia"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Tanggal Berangkat</label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Tanggal Pulang</label>
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 block mb-1 font-semibold">Transportasi Utama</label>
            <input
              type="text"
              value={transportationType}
              onChange={(e) => setTransportationType(e.target.value)}
              placeholder="mis. Pesawat Garuda Indonesia & Mobil Rental"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1 font-semibold">Catatan / Rencana Singkat</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="mis. Menginap di Nusa Dua, sewa mobil keluarga 7 seat..."
              rows={2}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1 font-semibold">Cover Image URL</label>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-2xl shadow-lg transition-all"
        >
          {editTrip ? 'Simpan Perubahan Trip' : 'Buat Rencana Perjalanan'}
        </button>
      </form>
    </div>
  );
};
