import React from 'react';
import { Watch, CheckCircle2, RefreshCw, X, ShieldCheck } from 'lucide-react';
import { useHealthStore } from '../../../store/useHealthStore';

interface WearableIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WearableIntegrationModal: React.FC<WearableIntegrationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { wearableDevices, toggleWearableConnection, syncWearableData } = useHealthStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl text-white relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Watch className="w-5 h-5" />
            </span>
            <h3 className="font-bold text-base text-white">Hubungkan Smartwatch & Wearable</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold text-xs p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400">
          Otomatisasi sinkronisasi detak jantung, langkah harian, waktu tidur, dan kalori dari platform smartwatch favorit Anda.
        </p>

        {/* Devices List */}
        <div className="space-y-3">
          {wearableDevices.map((device) => (
            <div 
              key={device.id}
              className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                  <Watch className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">{device.name}</h4>
                  <span className="text-[10px] text-slate-400 block">{device.brand} • Terakhir: {device.lastSynced}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {device.isConnected && (
                  <button
                    onClick={() => syncWearableData(device.id)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-xl border border-slate-700 transition-all"
                    title="Sinkronkan Sekarang"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => toggleWearableConnection(device.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    device.isConnected
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30'
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/30'
                  }`}
                >
                  {device.isConnected ? 'Terhubung' : 'Hubungkan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 text-center">
          Enkripsi data kesehatan tingkat lanjut sesuai standar enkripsi end-to-end.
        </div>

      </div>
    </div>
  );
};
