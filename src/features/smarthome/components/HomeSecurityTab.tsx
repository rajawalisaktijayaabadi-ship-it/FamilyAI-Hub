import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Unlock, 
  Camera, 
  Radar, 
  Flame, 
  Droplets, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Video, 
  Play
} from 'lucide-react';
import { useSecurityStore } from '../../../stores/useSecurityStore';
import { useDeviceStore } from '../../../stores/useDeviceStore';

export const HomeSecurityTab: React.FC = () => {
  const { isArmSystem, securityEvents, toggleArmSystem, resolveSecurityEvent } = useSecurityStore();
  const { devices, toggleDevice } = useDeviceStore();

  const securityDevices = devices.filter(d => 
    d.category === 'Smart Lock' || 
    d.category === 'Kamera CCTV' || 
    d.category === 'Sensor Gerak' || 
    d.category === 'Sensor Pintu' || 
    d.category === 'Sensor Asap' || 
    d.category === 'Sensor Gas' ||
    d.category === 'Sensor Air'
  );

  const cctvCameras = devices.filter(d => d.category === 'Kamera CCTV');

  return (
    <div className="space-y-6">
      
      {/* Top System Security Status */}
      <div className={`border rounded-3xl p-6 transition-all shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 ${
        isArmSystem 
          ? 'bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-900 border-emerald-500/50' 
          : 'bg-gradient-to-r from-slate-900 via-rose-950/60 to-slate-900 border-rose-500/50'
      }`}>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
              isArmSystem ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}>
              {isArmSystem ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : <ShieldAlert className="w-4 h-4 text-rose-400" />}
              {isArmSystem ? 'SISTEM KEAMANAN AKTIF SIAGA' : 'SISTEM KEAMANAN NONAKTIF (DISARMED)'}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white">
            Pusat Keamanan & Pemantauan Bahaya Rumah
          </h3>

          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Sistem memantau {securityDevices.length} sensor keamanan, mendeteksi potensi kebobolan pintu, kebocoran gas, asap kebakaran, serta luapan air.
          </p>
        </div>

        <button
          onClick={toggleArmSystem}
          className={`px-6 py-3.5 rounded-2xl font-bold text-xs shadow-xl transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
            isArmSystem 
              ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950' 
              : 'bg-rose-600 hover:bg-rose-500 text-white'
          }`}
        >
          {isArmSystem ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
          <span>{isArmSystem ? 'Matikan Alarm (Disarm)' : 'Aktifkan Sistem Siaga (Arming)'}</span>
        </button>
      </div>

      {/* CCTV Camera Stream Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <Video className="w-4 h-4 text-rose-400" />
            <span>Kamera CCTV 4K Realtime Stream ({cctvCameras.length})</span>
          </h4>
          <span className="text-[10px] text-emerald-400 font-mono font-bold">● LIVE 1080P HD</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cctvCameras.map((cam) => (
            <div 
              key={cam.id}
              className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden space-y-2 group relative"
            >
              <div className="h-48 bg-slate-900 relative flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=800&q=80"
                  alt={cam.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider animate-pulse">
                    LIVE
                  </span>
                  <span className="text-xs text-white font-bold bg-slate-950/80 px-2 py-0.5 rounded backdrop-blur-sm">
                    {cam.name} ({cam.room})
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 text-[10px] text-slate-300 font-mono bg-slate-950/80 px-2 py-0.5 rounded">
                  2026-08-01 02:45:10
                </div>
              </div>

              <div className="p-3 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">{cam.brand} {cam.model}</span>
                <button
                  onClick={() => alert(`Streaming penuh CCTV '${cam.name}' dibuka di modal terpisah.`)}
                  className="text-xs font-bold text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Lihat Fullscreen
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Devices & Sensors List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h4 className="font-bold text-white text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Status Sensor Pintu, Asap, Gas & Kebocoran Air</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {securityDevices.map((sd) => (
            <div
              key={sd.id}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 uppercase font-mono">{sd.room}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  sd.status ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {sd.status ? 'Normal / Aman' : 'Perlu Perhatian'}
                </span>
              </div>

              <h5 className="font-bold text-white text-sm">{sd.name}</h5>
              <p className="text-xs text-indigo-300">{sd.value || 'Status Terpantau'}</p>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Baterai: {sd.batteryLevel > 0 ? `${sd.batteryLevel}%` : 'AC Power'}</span>
                <button
                  onClick={() => toggleDevice(sd.id)}
                  className="text-xs text-indigo-400 font-semibold hover:underline"
                >
                  Toggle Status
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Event Timeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h4 className="font-bold text-white text-sm flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Riwayat Kejadian Keamanan (Security Timeline)</span>
        </h4>

        <div className="space-y-3">
          {securityEvents.map((evt) => (
            <div 
              key={evt.id}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    evt.severity === 'Critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                    evt.severity === 'Warning' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    'bg-indigo-500/20 text-indigo-300'
                  }`}>
                    {evt.type} • {evt.severity}
                  </span>
                  <h5 className="font-bold text-white text-xs">{evt.location}</h5>
                </div>
                <p className="text-xs text-slate-300">{evt.description}</p>
              </div>

              <div className="text-right shrink-0 space-y-1">
                <span className="text-[10px] text-slate-500 block">{evt.timestamp}</span>
                {evt.status === 'Active' ? (
                  <button
                    onClick={() => resolveSecurityEvent(evt.id)}
                    className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-[10px] font-bold hover:bg-emerald-500/30"
                  >
                    Selesaikan Incident
                  </button>
                ) : (
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center justify-end gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Tuntas
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
