import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Lightbulb, 
  Thermometer, 
  Lock, 
  Camera, 
  Tv, 
  Wind, 
  Zap, 
  Plus, 
  Search, 
  Trash2, 
  Wifi, 
  Battery, 
  Sliders, 
  X, 
  CheckCircle2, 
  Filter, 
  Volume2, 
  Bot, 
  WashingMachine, 
  Flame, 
  ShieldAlert
} from 'lucide-react';
import { useDeviceStore } from '../../../stores/useDeviceStore';
import { Device, DeviceCategoryType } from '../../../types';
import { deviceSchema, DeviceFormValues } from '../schemas';

export const DeviceManagementTab: React.FC = () => {
  const { devices, rooms, toggleDevice, updateDeviceValue, addDevice, deleteDevice } = useDeviceStore();

  const [search, setSearch] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<string>('Semua');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<DeviceFormValues>({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      name: '',
      category: 'Lampu',
      room: 'Ruang Tamu',
      brand: 'Philips',
      model: 'Smart Series',
      serialNumber: `SN-${Date.now()}`,
      powerConsumptionWatts: 15,
      value: 80,
      unit: '%'
    }
  });

  const onSubmit = (data: DeviceFormValues) => {
    const newDev: Device = {
      id: `dev-${Date.now()}`,
      name: data.name,
      category: data.category as DeviceCategoryType,
      room: data.room,
      brand: data.brand,
      model: data.model,
      serialNumber: data.serialNumber,
      status: true,
      firmwareVersion: 'v1.0.0',
      onlineStatus: 'Online',
      batteryLevel: 100,
      signalStrength: 90,
      lastActive: 'Baru saja',
      value: data.value || 'Active',
      unit: data.unit || '',
      powerConsumptionWatts: data.powerConsumptionWatts
    };

    addDevice(newDev);
    setIsModalOpen(false);
    reset();
  };

  const categories: DeviceCategoryType[] = [
    'Lampu', 'AC', 'TV', 'Kulkas', 'Mesin Cuci', 'Dispenser', 'Kipas', 
    'Stop Kontak Pintar', 'Smart Lock', 'Kamera CCTV', 'Sensor Gerak', 
    'Sensor Pintu', 'Sensor Asap', 'Sensor Gas', 'Sensor Air', 'Robot Vacuum', 'Smart Speaker', 'Custom Device'
  ];

  const filteredDevices = devices.filter(dev => {
    const matchesSearch = dev.name.toLowerCase().includes(search.toLowerCase()) ||
                          dev.brand.toLowerCase().includes(search.toLowerCase()) ||
                          dev.model.toLowerCase().includes(search.toLowerCase());
    const matchesRoom = selectedRoom === 'Semua' || dev.room === selectedRoom;
    const matchesCategory = selectedCategory === 'Semua' || dev.category === selectedCategory;

    return matchesSearch && matchesRoom && matchesCategory;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Lampu': return <Lightbulb className="w-5 h-5 text-amber-400" />;
      case 'AC': return <Thermometer className="w-5 h-5 text-cyan-400" />;
      case 'TV': return <Tv className="w-5 h-5 text-purple-400" />;
      case 'Smart Lock': return <Lock className="w-5 h-5 text-emerald-400" />;
      case 'Kamera CCTV': return <Camera className="w-5 h-5 text-rose-400" />;
      case 'Robot Vacuum': return <Bot className="w-5 h-5 text-teal-400" />;
      case 'Smart Speaker': return <Volume2 className="w-5 h-5 text-indigo-400" />;
      default: return <Zap className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-400" />
            <span>Manajemen & Kontrol Perangkat IoT</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Daftar seluruh perangkat pintar rumah, status daya, baterai, versi firmware, dan sinyal.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari perangkat, merek..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Perangkat</span>
          </button>
        </div>
      </div>

      {/* Filter Bars */}
      <div className="space-y-3">
        {/* Room Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <span className="text-xs font-bold text-slate-500 mr-1 shrink-0">Ruangan:</span>
          <button
            onClick={() => setSelectedRoom('Semua')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              selectedRoom === 'Semua'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            Semua Ruangan
          </button>
          {rooms.map((rm) => (
            <button
              key={rm.id}
              onClick={() => setSelectedRoom(rm.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedRoom === rm.name
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              {rm.name}
            </button>
          ))}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <span className="text-xs font-bold text-slate-500 mr-1 shrink-0">Kategori:</span>
          <button
            onClick={() => setSelectedCategory('Semua')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              selectedCategory === 'Semua'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            Semua Kategori
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Devices Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevices.map((dev) => (
          <div
            key={dev.id}
            className={`p-5 rounded-3xl border transition-all space-y-4 flex flex-col justify-between ${
              dev.status 
                ? 'bg-gradient-to-b from-indigo-950/80 via-slate-900 to-slate-900 border-indigo-500/50 shadow-xl' 
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <div>
              {/* Card Header: Icon + Toggle */}
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                  {getCategoryIcon(dev.category)}
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    dev.onlineStatus === 'Online' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {dev.onlineStatus}
                  </span>

                  <button
                    onClick={() => toggleDevice(dev.id)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer shrink-0 ${
                      dev.status ? 'bg-indigo-600' : 'bg-slate-800'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      dev.status ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>

              {/* Info Title */}
              <div>
                <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider">{dev.room} • {dev.category}</span>
                <h4 className="font-bold text-white text-base mt-0.5">{dev.name}</h4>
                <p className="text-xs text-slate-400">{dev.brand} {dev.model} ({dev.serialNumber})</p>
              </div>

              {/* Value Controls (Slider for AC / Dimmer) */}
              {dev.status && dev.category === 'AC' && (
                <div className="mt-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-300">
                    <span>Suhu AC:</span>
                    <span className="text-cyan-400">{dev.value}°C</span>
                  </div>
                  <input
                    type="range"
                    min="16"
                    max="30"
                    value={typeof dev.value === 'number' ? dev.value : 24}
                    onChange={(e) => updateDeviceValue(dev.id, parseInt(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              )}

              {dev.status && dev.category === 'Lampu' && (
                <div className="mt-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-300">
                    <span>Intensitas Redup:</span>
                    <span className="text-amber-400">{dev.value}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={typeof dev.value === 'number' ? dev.value : 100}
                    onChange={(e) => updateDeviceValue(dev.id, parseInt(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Card Footer Status */}
            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-mono">
                  <Wifi className="w-3 h-3 text-indigo-400" />
                  {dev.signalStrength}%
                </span>

                <span className="flex items-center gap-1 font-mono">
                  <Battery className="w-3 h-3 text-emerald-400" />
                  {dev.batteryLevel > 0 ? `${dev.batteryLevel}%` : 'AC Power'}
                </span>
              </div>

              <button
                onClick={() => deleteDevice(dev.id)}
                className="text-slate-500 hover:text-rose-400 transition-colors p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Device Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                <span>Tambah Perangkat Smart Home</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Nama Perangkat:</label>
                <input
                  {...register('name')}
                  placeholder="Contoh: Lampu Ruang Makan 1"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                />
                {errors.name && <p className="text-[10px] text-rose-400 mt-1">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Kategori:</label>
                  <select
                    {...register('category')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Ruangan:</label>
                  <select
                    {...register('room')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                  >
                    {rooms.map((r) => (
                      <option key={r.id} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Merek:</label>
                  <input
                    {...register('brand')}
                    placeholder="Contoh: Philips / Daikin"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Daya Konsumsi (Watt):</label>
                  <input
                    type="number"
                    {...register('powerConsumptionWatts', { valueAsNumber: true })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all"
              >
                Simpan Perangkat Baru
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
