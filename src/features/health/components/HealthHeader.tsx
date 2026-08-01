import React from 'react';
import { 
  HeartPulse, ShieldAlert, Sparkles, User, Users, 
  QrCode, Watch, Stethoscope, AlertTriangle, ChevronRight
} from 'lucide-react';
import { FamilyMember } from '../../../types';

interface HealthHeaderProps {
  familyMembers: FamilyMember[];
  activeMemberId: string;
  onSelectMember: (id: string) => void;
  onOpenAICoach: () => void;
  onOpenEmergencyQR: () => void;
  onOpenWearables: () => void;
}

export const HealthHeader: React.FC<HealthHeaderProps> = ({
  familyMembers,
  activeMemberId,
  onSelectMember,
  onOpenAICoach,
  onOpenEmergencyQR,
  onOpenWearables,
}) => {
  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/30">
                <HeartPulse className="w-6 h-6" />
              </span>
              <h1 className="text-2xl font-bold tracking-tight">Pusat Kesehatan & Wellness Keluarga</h1>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                AI Health Active
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Pantau rekam medis, vital signs, jadwal obat, janji temu dokter, olahraga, tidur, dan hidrasi keluarga dengan asistensi cerdas AI.
            </p>
            
            {/* Medical Disclaimer Alert */}
            <div className="mt-3 p-2.5 bg-amber-950/40 border border-amber-500/30 rounded-2xl text-[11px] text-amber-200 flex items-center gap-2 max-w-2xl">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-400" />
              <span>
                <strong>Perhatian:</strong> AI Health memberikan edukasi & rekomendasi gaya hidup sehat. AI bukan dokter dan tidak memberikan diagnosis medis resmi.
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenAICoach}
              className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/30 flex items-center gap-2 border border-rose-400/30 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Tanya Dokter AI / Gejala</span>
            </button>

            <button
              onClick={onOpenEmergencyQR}
              className="px-3.5 py-2.5 bg-slate-800/90 hover:bg-slate-700 text-rose-300 hover:text-white border border-rose-500/30 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
            >
              <QrCode className="w-4 h-4 text-rose-400" />
              <span>Kartu Darurat QR</span>
            </button>

            <button
              onClick={onOpenWearables}
              className="px-3.5 py-2.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Watch className="w-4 h-4 text-cyan-400" />
              <span>Sinkron Wearable</span>
            </button>
          </div>
        </div>
      </div>

      {/* Member Selector Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-between gap-3 overflow-x-auto scrollbar-none shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold px-2 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-rose-400" />
            <span>Pilih Anggota:</span>
          </span>

          <button
            onClick={() => onSelectMember('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeMemberId === 'all'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20 border border-rose-400'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Seluruh Keluarga</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900/60 font-mono">
              {familyMembers.length}
            </span>
          </button>

          {familyMembers.map((m) => {
            const isSelected = activeMemberId === m.id;
            return (
              <button
                key={m.id}
                onClick={() => onSelectMember(m.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20 border border-rose-400 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <img src={m.avatar} alt={m.name} className="w-5 h-5 rounded-full object-cover ring-1 ring-white/20" />
                <span>{m.name.split(' ')[0]}</span>
                <span className="text-[10px] text-slate-400 font-normal">({m.relationship})</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
