import React from 'react';
import { 
  HeartPulse, 
  ShieldAlert, 
  Pill, 
  PhoneCall, 
  Hospital, 
  FileText, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { useTravelStore } from '../../../stores/useTravelStore';

export const TravelHealthSafetyTab: React.FC = () => {
  const { trips, activeTripId, healthRecords, safetyRecords } = useTravelStore();

  const activeTrip = trips.find(t => t.id === activeTripId) || trips[0];
  const health = healthRecords.find(h => h.tripId === activeTrip?.id) || healthRecords[0];
  const safety = safetyRecords.find(s => s.tripId === activeTrip?.id) || safetyRecords[0];

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl">
        <div>
          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
            Integrated Health & Safety Center
          </span>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-0.5">
            <HeartPulse className="w-5 h-5 text-rose-400" />
            <span>Kesehatan & Keamanan Perjalanan</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Persiapan obat rutin keluarga, vaksinasi, nomor kontak darurat, rumah sakit rujukan destinasi & kepolisian.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Travel Health Card */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-sm">Rencana Kesehatan & Obat Keluarga</h3>
              <p className="text-[11px] text-slate-400">P3K, Suplemen & Rumah Sakit Destinasi</p>
            </div>
          </div>

          {health ? (
            <div className="space-y-4 text-xs">
              <div>
                <span className="font-bold text-amber-400 block mb-1">💊 Obat Rutin & Kit P3K:</span>
                <ul className="space-y-1 text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {(health.medications || []).map((m, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-indigo-400 block mb-1">💉 Status Vaksinasi Perjalanan:</span>
                <ul className="space-y-1 text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {(health.vaccinesPlaceholder || []).map((v, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-rose-400 block mb-1">🏥 Rumah Sakit Rujukan Destinasi:</span>
                <div className="space-y-2">
                  {(health.destinationHospitalsPlaceholder || []).map((hosp, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="font-bold text-white">{hosp.name}</div>
                      <div className="text-[11px] text-slate-400">{hosp.address}</div>
                      <div className="text-[11px] text-rose-400 font-bold mt-1">📞 {hosp.phone}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">Belum ada data kesehatan perjalanan.</p>
          )}
        </div>

        {/* Travel Safety Card */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-sm">Protokol Keamanan & Kontak Darurat</h3>
              <p className="text-[11px] text-slate-400">Polsek, Kedutaan, & Bantuan Asuransi</p>
            </div>
          </div>

          {safety ? (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-slate-400 block">Nomor Bantuan Darurat Utama:</span>
                <div className="text-base font-black text-rose-400 flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                  <span>{safety.emergencyContact}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-500 block">Layanan Kepolisian Destinasi:</span>
                  <span className="font-bold text-white">{safety.policePlaceholder}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-500 block">Polis & Hotline Asuransi Perjalanan:</span>
                  <span className="font-bold text-emerald-400">{safety.insurancePolicyNumber}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-500 block">Layanan Darurat Luar Negeri / Kedutaan:</span>
                  <span className="font-bold text-indigo-300">{safety.embassyPlaceholder}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">{safety.safetyNotes}</p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">Belum ada data protokol keamanan.</p>
          )}
        </div>

      </div>

    </div>
  );
};
