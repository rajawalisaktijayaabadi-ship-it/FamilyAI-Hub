import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

export const PsychologyDisclaimer: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-2xl p-4 text-xs text-amber-200 shadow-md backdrop-blur-md">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400 flex-shrink-0 mt-0.5">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <div className="font-bold text-amber-300 flex items-center gap-1.5">
            <span>Pemberitahuan Resmi AI Family Psychology Center</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
              Edukasi & Refleksi
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Sistem AI ini dirancang khusus untuk <strong className="text-white">edukasi, panduan komunikasi empati, refleksi emosional, dan coaching kebiasaan positif keluarga</strong>. AI <strong className="text-rose-300">BUKAN psikolog, psikiater, atau tenaga medis profesional</strong>, dan <strong className="text-rose-300">TIDAK memberikan diagnosis klinis atau menentukan gangguan mental</strong>. Jika Anda atau anggota keluarga membutuhkan penanganan medis/psikologis klinis, mohon segera berkonsultasi dengan profesional kesehatan mental resmi.
          </p>
        </div>
      </div>
    </div>
  );
};
