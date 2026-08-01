import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

export const MoodDisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-500/30 rounded-2xl p-4 text-xs text-amber-200/90 flex items-start gap-3 shadow-lg backdrop-blur-md">
      <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
      <div className="space-y-1">
        <div className="font-bold text-amber-300 flex items-center gap-1.5">
          <span>Disclaimer Pendamping Kesejahteraan (Non-Diagnosis Medis)</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          AI Mood Detection Center berfungsi secara eksklusif sebagai <strong>pendamping well-being & iklim emosional keluarga</strong>. Sistem AI <strong>tidak memberikan diagnosis medis, psikologis, atau gangguan kesehatan mental</strong>. Seluruh rekomendasi dan analisis bersifat edukatif & reflektif. Jika Anda membutuhkan dukungan profesional, harap berkonsultasi dengan psikolog atau faskes terdekat.
        </p>
      </div>
    </div>
  );
};
