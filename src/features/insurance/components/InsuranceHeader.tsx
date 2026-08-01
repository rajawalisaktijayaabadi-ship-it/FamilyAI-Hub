import React from 'react';
import {
  ShieldCheck,
  Sparkles,
  PhoneCall,
  AlertTriangle,
  Award,
  CreditCard,
  FileText
} from 'lucide-react';
import { useInsuranceStore } from '../../../store/useInsuranceStore';
import { FamilyMember } from '../../../types';

interface InsuranceHeaderProps {
  familyMembers: FamilyMember[];
  onOpenAIModal: () => void;
  onOpenEmergencyCard: () => void;
}

export const InsuranceHeader: React.FC<InsuranceHeaderProps> = ({
  onOpenAIModal,
  onOpenEmergencyCard
}) => {
  const { policies, premiums, getProtectionScore } = useInsuranceStore();

  const activePoliciesCount = policies.filter((p) => p.status === 'active').length;
  const totalMonthlyPremium = premiums
    .filter((p) => p.status === 'unpaid')
    .reduce((acc, p) => acc + p.amount, 0);

  const protectionScore = getProtectionScore();

  return (
    <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -right-12 -top-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        
        {/* Left: Module Title & Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl text-white shadow-lg shadow-cyan-900/30">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white tracking-tight">
                  Pusat Proteksi & Asuransi Keluarga
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold uppercase tracking-wider">
                  AI Protection Center
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Kelola polis, tagihan premi, pengajuan klaim, analisis celah perlindungan, serta Kartu Darurat RS Keluarga.
              </p>
            </div>
          </div>

          {/* Quick Disclaimer Badge */}
          <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>AI memberikan nasihat edukatif dan tidak menggantikan agen resmi atau penjamin klaim.</span>
          </div>
        </div>

        {/* Right: Key Stats & Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Protection Score Chip */}
          <div className="bg-slate-950/80 border border-slate-800/80 px-4 py-2.5 rounded-2xl flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-medium">Skor Proteksi</div>
              <div className="text-sm font-black text-emerald-400">
                {protectionScore.overallScore}/100{' '}
                <span className="text-[10px] font-normal text-slate-400">({protectionScore.level})</span>
              </div>
            </div>
          </div>

          {/* Active Policies & Premiums Chip */}
          <div className="bg-slate-950/80 border border-slate-800/80 px-4 py-2.5 rounded-2xl flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-xl">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-medium">{activePoliciesCount} Polis Aktif</div>
              <div className="text-sm font-black text-cyan-300">
                Rp {totalMonthlyPremium.toLocaleString('id-ID')}{' '}
                <span className="text-[10px] font-normal text-slate-400">/bln</span>
              </div>
            </div>
          </div>

          {/* Emergency Card Button */}
          <button
            onClick={onOpenEmergencyCard}
            className="px-4 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-2xl shadow-lg shadow-rose-950/40 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
          >
            <PhoneCall className="w-4 h-4 text-white animate-pulse" />
            <span>Kartu Darurat RS</span>
          </button>

          {/* AI Advisor Button */}
          <button
            onClick={onOpenAIModal}
            className="px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-2xl shadow-lg shadow-amber-950/40 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Konsultasi AI Proteksi</span>
          </button>
        </div>

      </div>
    </div>
  );
};
