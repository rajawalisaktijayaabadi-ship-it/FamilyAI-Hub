import React from 'react';
import {
  ShieldCheck,
  CreditCard,
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
  Users,
  Building,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  Calendar,
  PhoneCall,
  Plus
} from 'lucide-react';
import { useInsuranceStore } from '../../../store/useInsuranceStore';
import { FamilyMember } from '../../../types';

interface InsuranceDashboardTabProps {
  familyMembers: FamilyMember[];
  onNavigateTab: (tab: string) => void;
  onOpenAIModal: () => void;
}

export const InsuranceDashboardTab: React.FC<InsuranceDashboardTabProps> = ({
  familyMembers,
  onNavigateTab,
  onOpenAIModal
}) => {
  const {
    policies,
    premiums,
    claims,
    getProtectionScore,
    getCoverageSummary
  } = useInsuranceStore();

  const activePolicies = policies.filter((p) => p.status === 'active');
  const expiredPolicies = policies.filter((p) => p.status === 'expired' || p.status === 'grace_period');
  
  const totalMonthlyPremium = activePolicies.reduce((acc, p) => {
    if (p.paymentFrequency === 'Bulanan') return acc + p.premiumAmount;
    if (p.paymentFrequency === 'Tahunan') return acc + Math.round(p.premiumAmount / 12);
    if (p.paymentFrequency === 'Semesteran') return acc + Math.round(p.premiumAmount / 6);
    if (p.paymentFrequency === 'Triwulan') return acc + Math.round(p.premiumAmount / 3);
    return acc;
  }, 0);

  const totalAnnualPremium = totalMonthlyPremium * 12;
  const totalCoverageLimit = activePolicies.reduce((acc, p) => acc + p.coverageLimit, 0);

  const upcomingPremiums = premiums.filter((p) => p.status === 'unpaid');
  const activeClaims = claims.filter((c) => c.status !== 'Closed' && c.status !== 'Rejected');

  const protectionScore = getProtectionScore();
  const coverageSummaryList = getCoverageSummary();

  return (
    <div className="space-y-6">
      
      {/* 1. Main Metrics Grid (8 KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Active Policies */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2 relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Polis Aktif</span>
            <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{activePolicies.length} Polis</div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
            <span>{expiredPolicies.length} Perlu Perhatian / Expired</span>
            <button
              onClick={() => onNavigateTab('policies')}
              className="text-cyan-400 hover:underline font-bold flex items-center gap-1"
            >
              Lihat <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 2: Total Premium Expense */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2 relative overflow-hidden group hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Estimasi Premi Bulanan</span>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-cyan-300">
            Rp {totalMonthlyPremium.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-slate-400 pt-1">
            Tahunan: <span className="text-slate-200 font-medium">Rp {totalAnnualPremium.toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* Card 3: Total Coverage Limit */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Uang Pertanggungan</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400">
            Rp {(totalCoverageLimit / 1000000).toLocaleString('id-ID')} Juta
          </div>
          <div className="text-[11px] text-slate-400 pt-1">
            Melindungi seluruh anggota keluarga
          </div>
        </div>

        {/* Card 4: Protection Score */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2 relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Protection Score</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-black text-amber-400">{protectionScore.overallScore}/100</div>
            <span className="text-xs font-bold text-slate-300">{protectionScore.level}</span>
          </div>
          <div className="text-[11px] text-slate-400 pt-1">
            Evaluasi AI tingkat keamanan finansial
          </div>
        </div>

      </div>

      {/* 2. AI Protection Insight & Coverage Summary Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: AI Protection Insight Card */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-sm">
                Analisis & Celah Proteksi AI (AI Protection Insight)
              </h3>
            </div>
            <button
              onClick={onOpenAIModal}
              className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1"
            >
              Konsultasi AI <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Risk Gaps Detected */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-2">
              <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Potensi Celah Risiko (Gaps)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {protectionScore.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-900/60 p-2 rounded-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                    <span>{rec}</span>
                  </li>
                ))}
                {protectionScore.recommendations.length === 0 && (
                  <p className="text-slate-400 text-xs">
                    Semua kategori proteksi utama telah terpenuhi dengan baik!
                  </p>
                )}
              </ul>
            </div>

            {/* Smart Action Recommendations */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-2">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Rekomendasi Cerdas AI</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-900/60 rounded-xl space-y-1">
                  <div className="font-bold text-slate-200">1. Salinan Digital Kartu Peserta</div>
                  <p className="text-[11px] text-slate-400">
                    Unggah e-Card BPJS & Swasta ke Vault Dokumen agar siap diakses saat darurat.
                  </p>
                </div>
                <div className="p-2.5 bg-slate-900/60 rounded-xl space-y-1">
                  <div className="font-bold text-slate-200">2. Sinkronkan Kontak Darurat RS</div>
                  <p className="text-[11px] text-slate-400">
                    Isi data Rumah Sakit favorit pada Kartu Darurat untuk seluruh anggota keluarga.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right 1 Col: Quick Category Coverage Meters */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-sm">Cakupan Kategori Proteksi</h3>
            <button
              onClick={() => onNavigateTab('coverage')}
              className="text-xs text-cyan-400 hover:underline font-bold"
            >
              Detail
            </button>
          </div>

          <div className="space-y-3">
            {coverageSummaryList.slice(0, 4).map((cov) => {
              let badgeColor = 'bg-slate-800 text-slate-300';
              if (cov.status === 'Optimal') badgeColor = 'bg-emerald-950 text-emerald-300 border-emerald-500/30';
              else if (cov.status === 'Cukup') badgeColor = 'bg-blue-950 text-blue-300 border-blue-500/30';
              else if (cov.status === 'Kurang') badgeColor = 'bg-amber-950 text-amber-300 border-amber-500/30';

              return (
                <div key={cov.id} className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200">{cov.category}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeColor}`}>
                      {cov.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{cov.activePoliciesCount} Polis Aktif</span>
                    <span className="font-mono text-cyan-300">
                      Rp {(cov.totalLimit / 1000000).toLocaleString('id-ID')} Juta
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 3. Active Policies & Claims Center Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Active Policies List */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-white text-sm">Daftar Polis Utama Keluarga</h3>
            </div>
            <button
              onClick={() => onNavigateTab('policies')}
              className="px-3 py-1.5 bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-bold hover:bg-cyan-600/30 transition-all flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah Polis
            </button>
          </div>

          <div className="space-y-3">
            {activePolicies.slice(0, 3).map((policy) => (
              <div
                key={policy.id}
                className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 hover:border-slate-700 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold">
                      {policy.category}
                    </span>
                    <h4 className="font-bold text-white text-sm mt-1">{policy.title}</h4>
                    <p className="text-xs text-slate-400">
                      No. Polis: <span className="font-mono text-slate-300">{policy.policyNumber}</span> • {policy.providerName}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Uang Pertanggungan</div>
                    <div className="text-sm font-black text-emerald-400">
                      Rp {policy.coverageLimit.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-900">
                  <div className="flex items-center gap-1 text-slate-300">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Ditanggung: {policy.insuredMemberNames.length} Anggota</span>
                  </div>
                  <span className="font-mono text-cyan-300">
                    Premi: Rp {policy.premiumAmount.toLocaleString('id-ID')} / {policy.paymentFrequency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Upcoming Premiums & Active Claims */}
        <div className="space-y-6">
          
          {/* Upcoming Premiums Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-sm">Jatuh Tempo Premi Terdekat</h3>
              </div>
              <button
                onClick={() => onNavigateTab('premium')}
                className="text-xs text-amber-400 hover:underline font-bold"
              >
                Kelola Premi
              </button>
            </div>

            <div className="space-y-2">
              {upcomingPremiums.slice(0, 3).map((prem) => (
                <div
                  key={prem.id}
                  className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-200">{prem.policyTitle}</div>
                    <div className="text-[10px] text-slate-400">
                      Jatuh Tempo: <span className="text-amber-400 font-bold">{prem.dueDate}</span> • {prem.providerName}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-amber-300">
                      Rp {prem.amount.toLocaleString('id-ID')}
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/30 font-bold">
                      Belum Dibayar
                    </span>
                  </div>
                </div>
              ))}
              {upcomingPremiums.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-4">
                  Tidak ada tagihan premi jatuh tempo saat ini.
                </p>
              )}
            </div>
          </div>

          {/* Active Claims Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-white text-sm">Status Pengajuan Klaim</h3>
              </div>
              <button
                onClick={() => onNavigateTab('claim')}
                className="text-xs text-blue-400 hover:underline font-bold"
              >
                Pusat Klaim
              </button>
            </div>

            <div className="space-y-2">
              {claims.slice(0, 2).map((claim) => (
                <div
                  key={claim.id}
                  className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{claim.claimNumber}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-500/30 text-[10px] font-bold">
                      Status: {claim.status}
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs">{claim.policyTitle}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Anggota: {claim.insuredMemberName}</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      Nominal: Rp {claim.claimedAmount.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
