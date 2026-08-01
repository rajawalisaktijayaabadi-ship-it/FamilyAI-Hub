import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Home, 
  Thermometer, 
  Droplets, 
  Users, 
  Plus, 
  Trash2, 
  X, 
  Edit3, 
  CheckCircle2, 
  Layers
} from 'lucide-react';
import { useDeviceStore } from '../../../stores/useDeviceStore';
import { Room, RoomCategoryType } from '../../../types';
import { roomSchema, RoomFormValues } from '../schemas';

export const RoomManagementTab: React.FC = () => {
  const { rooms, devices, addRoom, deleteRoom, updateRoom } = useDeviceStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<RoomFormValues>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: '',
      category: 'Ruang Tamu',
      temperature: 25.0,
      humidity: 55,
      photoUrl: ''
    }
  });

  const onSubmit = (data: RoomFormValues) => {
    const newRoom: Room = {
      id: `rm-${Date.now()}`,
      name: data.name,
      category: data.category as RoomCategoryType,
      temperature: data.temperature,
      humidity: data.humidity,
      deviceIds: [],
      isOccupied: false,
      photoUrl: data.photoUrl || 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80'
    };

    addRoom(newRoom);
    setIsModalOpen(false);
    reset();
  };

  const roomCategories: RoomCategoryType[] = [
    'Ruang Tamu', 'Kamar Tidur', 'Kamar Anak', 'Dapur', 'Kamar Mandi', 'Garasi', 'Taman', 'Gudang', 'Custom Room'
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Home className="w-5 h-5 text-indigo-400" />
            <span>Manajemen Zona & Ruangan Rumah</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Mengelompokkan perangkat pintar per zona, mengukur suhu °C & kelembapan %, dan deteksi hunian.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Ruangan Baru</span>
        </button>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {rooms.map((rm) => {
          const roomDevices = devices.filter(d => d.room === rm.name);
          const activeDevices = roomDevices.filter(d => d.status);

          return (
            <div
              key={rm.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 transition-all space-y-4 shadow-xl relative overflow-hidden"
            >
              {/* Image Header Background */}
              {rm.photoUrl && (
                <div className="h-32 -mx-6 -mt-6 mb-4 relative overflow-hidden">
                  <img
                    src={rm.photoUrl}
                    alt={rm.name}
                    className="w-full h-full object-cover opacity-40 hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  
                  <div className="absolute bottom-3 left-6 right-6 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                        {rm.category}
                      </span>
                      <h4 className="font-extrabold text-white text-xl mt-1">{rm.name}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        rm.isOccupied ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {rm.isOccupied ? 'Ada Penghuni' : 'Kosong'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Environmental Metrics */}
              <div className="grid grid-cols-3 gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-500 block">Suhu Udara</span>
                  <div className="text-sm font-bold text-cyan-400 flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5" />
                    {rm.temperature}°C
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-500 block">Kelembapan</span>
                  <div className="text-sm font-bold text-blue-400 flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5" />
                    {rm.humidity}%
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-500 block">Perangkat</span>
                  <div className="text-sm font-bold text-amber-400 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" />
                    {activeDevices.length} / {roomDevices.length} Aktif
                  </div>
                </div>
              </div>

              {/* Room Devices Badges */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 block">Perangkat Terpasang:</span>
                {roomDevices.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">Belum ada perangkat di ruangan ini.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {roomDevices.map(d => (
                      <span 
                        key={d.id}
                        className={`px-2.5 py-1 rounded-xl text-xs font-medium border ${
                          d.status ? 'bg-indigo-950 text-indigo-300 border-indigo-500/40' : 'bg-slate-950 text-slate-500 border-slate-800'
                        }`}
                      >
                        {d.name} ({d.category})
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => updateRoom(rm.id, { isOccupied: !rm.isOccupied })}
                  className="text-indigo-400 hover:underline font-semibold"
                >
                  Ubah Status Hunian
                </button>

                <button
                  onClick={() => deleteRoom(rm.id)}
                  className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Add Room Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                <span>Tambah Ruangan Rumah Baru</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Nama Ruangan:</label>
                <input
                  {...register('name')}
                  placeholder="Contoh: Kamar Anak Lantai 2"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                />
                {errors.name && <p className="text-[10px] text-rose-400 mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Kategori:</label>
                <select
                  {...register('category')}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                >
                  {roomCategories.map((rc) => (
                    <option key={rc} value={rc}>{rc}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Suhu Normal (°C):</label>
                  <input
                    type="number"
                    step="0.5"
                    {...register('temperature', { valueAsNumber: true })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Kelembapan (%):</label>
                  <input
                    type="number"
                    {...register('humidity', { valueAsNumber: true })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">URL Foto Sampul Ruangan:</label>
                <input
                  {...register('photoUrl')}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all"
              >
                Simpan Ruangan
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
