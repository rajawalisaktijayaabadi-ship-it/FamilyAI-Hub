import React, { useState } from 'react';
import {
  Home,
  Plus,
  Edit,
  Trash2,
  MapPin,
  X,
  Building
} from 'lucide-react';

import { useHouseholdStore } from '../../../store/useHouseholdStore';
import { useInventoryStore } from '../../../store/useInventoryStore';

export const HouseholdManager: React.FC = () => {
  const { rooms, addRoom, deleteRoom } = useHouseholdStore();
  const { locations, addLocation, deleteLocation } = useInventoryStore();

  const [newRoomName, setNewRoomName] = useState<string>('');
  const [newLocationName, setNewLocationName] = useState<string>('');

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;
    addRoom({
      name: newRoomName.trim(),
      description: 'Ruangan Rumah Tangga'
    });
    setNewRoomName('');
  };

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocationName.trim()) return;
    addLocation({
      name: newLocationName.trim(),
      description: 'Tempat Penyimpanan Stok Barang'
    });
    setNewLocationName('');
  };

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Rooms Management */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Building className="w-5 h-5 text-amber-400" />
              <span>Daftar Ruangan Rumah</span>
            </h3>
            <span className="text-xs text-slate-400 font-bold">{rooms.length} Ruangan</span>
          </div>

          <form onSubmit={handleAddRoom} className="flex gap-2">
            <input
              type="text"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              placeholder="Nama ruangan baru (misal: Ruang Kerja)..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-2 text-xs text-slate-200 outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-2xl flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah</span>
            </button>
          </form>

          <div className="space-y-2">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs"
              >
                <span className="font-bold text-white">{room.name}</span>
                <button
                  onClick={() => deleteRoom(room.id)}
                  className="p-1 text-slate-500 hover:text-rose-400 rounded-lg"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Locations Management */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <span>Lokasi Penyimpanan Barang</span>
            </h3>
            <span className="text-xs text-slate-400 font-bold">{locations.length} Lokasi</span>
          </div>

          <form onSubmit={handleAddLocation} className="flex gap-2">
            <input
              type="text"
              value={newLocationName}
              onChange={(e) => setNewLocationName(e.target.value)}
              placeholder="Lokasi baru (misal: Rak Dapur Bawah)..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-2 text-xs text-slate-200 outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-2xl flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah</span>
            </button>
          </form>

          <div className="space-y-2">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs"
              >
                <span className="font-bold text-white">{loc.name}</span>
                <button
                  onClick={() => deleteLocation(loc.id)}
                  className="p-1 text-slate-500 hover:text-rose-400 rounded-lg"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
