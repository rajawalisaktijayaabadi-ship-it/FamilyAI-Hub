import React from 'react';
import { 
  Users, 
  MapPin, 
  Wifi, 
  Home, 
  Moon, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  Smartphone
} from 'lucide-react';
import { useSecurityStore } from '../../../stores/useSecurityStore';
import { FamilyPresence } from '../../../types';

export const FamilyPresenceTab: React.FC = () => {
  const { familyPresenceList, updatePresence } = useSecurityStore();

  const getStatusBadge = (status: FamilyPresence['status']) => {
    switch (status) {
      case 'Di Rumah':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Di Rumah</span>;
      case 'Keluar':
        return <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Keluar Rumah</span>;
      case 'Tidur':
        return <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold flex items-center gap-1"><Moon className="w-3.5 h-3.5" /> Istirahat / Tidur</span>;
      case 'Di Sekolah/Kantor':
        return <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> Sekolah / Kerja</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            <span>Deteksi Presensi & Kehadiran Anggota Keluarga</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Melacak posisi geofence, sinyal Wi-Fi mesh, serta otomatisasi pemicu penyambutan saat pulang.
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl text-xs font-bold text-purple-300 flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-purple-400" />
          <span>Geofence 100m Aktif</span>
        </div>
      </div>

      {/* Member Presence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {familyPresenceList.map((m) => (
          <div
            key={m.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-purple-300 font-bold uppercase">{m.role}</span>
                <h4 className="font-extrabold text-white text-lg">{m.memberName}</h4>
              </div>

              <div>{getStatusBadge(m.status)}</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span>Titik Deteksi Terakhir:</span>
                <span className="text-white font-mono">{m.locationTag}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Waktu Terakhir:</span>
                <span className="text-slate-300">{m.lastSeen}</span>
              </div>
            </div>

            {/* Quick Status Setter */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 block">Pilih Status Baru:</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => updatePresence(m.id, 'Di Rumah')}
                  className={`py-2 px-3 rounded-xl border font-semibold transition-all ${
                    m.status === 'Di Rumah' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Di Rumah
                </button>

                <button
                  onClick={() => updatePresence(m.id, 'Keluar')}
                  className={`py-2 px-3 rounded-xl border font-semibold transition-all ${
                    m.status === 'Keluar' ? 'bg-amber-600 text-white border-amber-500' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Keluar Rumah
                </button>

                <button
                  onClick={() => updatePresence(m.id, 'Tidur')}
                  className={`py-2 px-3 rounded-xl border font-semibold transition-all ${
                    m.status === 'Tidur' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Istirahat / Tidur
                </button>

                <button
                  onClick={() => updatePresence(m.id, 'Di Sekolah/Kantor')}
                  className={`py-2 px-3 rounded-xl border font-semibold transition-all ${
                    m.status === 'Di Sekolah/Kantor' ? 'bg-purple-600 text-white border-purple-500' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Sekolah / Kerja
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
