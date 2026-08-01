import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Wrench, 
  Plus, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  X, 
  ShieldCheck, 
  UserCheck
} from 'lucide-react';
import { useSecurityStore } from '../../../stores/useSecurityStore';
import { Maintenance } from '../../../types';
import { maintenanceSchema, MaintenanceFormValues } from '../schemas';

export const MaintenanceTab: React.FC = () => {
  const { maintenances, addMaintenance, completeMaintenance } = useSecurityStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<MaintenanceFormValues>({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: {
      deviceName: 'AC Kamar Utama',
      serviceType: 'Servis AC',
      dueDate: new Date().toISOString().split('T')[0],
      estimatedCostIdr: 150000,
      assignedTechnician: 'Teknisi Langganan'
    }
  });

  const onSubmit = (data: MaintenanceFormValues) => {
    const newMaint: Maintenance = {
      id: `maint-${Date.now()}`,
      deviceName: data.deviceName,
      serviceType: data.serviceType,
      dueDate: data.dueDate,
      lastServiceDate: new Date().toISOString().split('T')[0],
      warrantyExpiryDate: '2027-12-31',
      status: 'Terjadwal',
      estimatedCostIdr: data.estimatedCostIdr,
      assignedTechnician: data.assignedTechnician || 'Teknisi Mandiri'
    };

    addMaintenance(newMaint);
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-indigo-400" />
            <span>Perawatan Perangkat & Garansi Perhitungan</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Jadwal servis berkala AC, penggantian filter air, kalibrasi sensor, dan kontak teknisi resmi.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Jadwalkan Perawatan</span>
        </button>
      </div>

      {/* Maintenances Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {maintenances.map((m) => (
          <div
            key={m.id}
            className={`p-6 rounded-3xl border transition-all space-y-4 flex flex-col justify-between ${
              m.status === 'Mendesak'
                ? 'bg-gradient-to-b from-rose-950/60 via-slate-900 to-slate-900 border-rose-500/50 shadow-xl'
                : m.status === 'Selesai'
                ? 'bg-slate-900 border-slate-800 opacity-60'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  m.status === 'Mendesak' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                  m.status === 'Selesai' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                  'bg-indigo-500/20 text-indigo-300'
                }`}>
                  {m.serviceType} • {m.status}
                </span>

                <span className="text-[10px] text-slate-500 font-mono">
                  Garansi: {m.warrantyExpiryDate}
                </span>
              </div>

              <h4 className="font-extrabold text-white text-base">{m.deviceName}</h4>

              <div className="mt-3 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    Jadwal Servis:
                  </span>
                  <span className="font-bold text-amber-300">{m.dueDate}</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Teknisi:
                  </span>
                  <span className="font-semibold text-white">{m.assignedTechnician}</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    Est. Biaya:
                  </span>
                  <span className="font-bold font-mono text-emerald-400">Rp {m.estimatedCostIdr.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-500">Servis terakhir: {m.lastServiceDate}</span>

              {m.status !== 'Selesai' && (
                <button
                  onClick={() => {
                    completeMaintenance(m.id);
                    alert(`Perawatan '${m.deviceName}' telah ditandai Selesai!`);
                  }}
                  className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl font-bold text-[11px] hover:bg-emerald-500/30 transition-all flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Selesai
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Add Maintenance Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                <span>Jadwalkan Servis / Perawatan Perangkat</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Nama Perangkat / Komponen:</label>
                <input
                  {...register('deviceName')}
                  placeholder="Contoh: AC Kamar Utama"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                />
                {errors.deviceName && <p className="text-[10px] text-rose-400 mt-1">{errors.deviceName.message}</p>}
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Jenis Layanan Perawatan:</label>
                <select
                  {...register('serviceType')}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                >
                  <option value="Servis AC">Servis AC</option>
                  <option value="Ganti Filter Air">Ganti Filter Air</option>
                  <option value="Pengecekan Elektronik">Pengecekan Elektronik</option>
                  <option value="Perbaikan Pintu/Kunci">Perbaikan Pintu/Kunci</option>
                  <option value="Pengecatan">Pengecatan</option>
                  <option value="Custom">Custom Service</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Tanggal Jatuh Tempo Servis:</label>
                  <input
                    type="date"
                    {...register('dueDate')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Estimasi Biaya (Rp):</label>
                  <input
                    type="number"
                    {...register('estimatedCostIdr', { valueAsNumber: true })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Teknisi / Penyedia Jasa:</label>
                <input
                  {...register('assignedTechnician')}
                  placeholder="Contoh: Daikin Service / Teknisi Pak Budi"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all"
              >
                Simpan Jadwal Servis
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
